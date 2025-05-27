import {existsSync, readFileSync, writeFileSync} from 'fs';
import {formatCompactTimestamp, formatDate} from '../utils/formatDate';
import {log} from '../utils/logger';

const COMMIT_MESSAGE = './src/data/commit.txt';
const EXPERIMENTS_DATA = './src/data/experiments.json';
const LATEST_BUILD_JSON = './src/data/latest_build.json';

/**
 * If it's an env environment, load environment variables from .env file
 * This is useful for local development, so we can use the same code
 */
function loadEnvIfNeeded() {
    if (process.env.NODE_ENV !== 'development') return;

    readFileSync('.env', {encoding: 'utf8'}).split('\n').forEach(line => {
        if (!line.trim() || line.startsWith('#') || !line.includes('=')) return;
        const [key, value] = line.split('=');
        process.env[key] = value;
    });
}

/**
 * We want to be able to visualize the changes in the experiments data. This function creates a small
 * commit message to summarize the changes in the experiments data. Will be used for the main commit message
 * to be displayed on GitHub.
 *
 * @param shorthandData {@link ShorthandData} - The shorthand data to use for the commit message
 * @param updatedAt {@link number} - The timestamp of the build, used to format the commit message
 */
function constructShorthandMessage(shorthandData: ShorthandData, updatedAt: number): string {
    const compactTimestamp = formatCompactTimestamp(updatedAt);

    // Shorthand message (below ~72 characters) to display on GitHub's commit page
    return `build: ${compactTimestamp} | +${shorthandData.added}/-${shorthandData.removed} exp, +${shorthandData.activated}/-${shorthandData.deactivated} active`;
}

/**
 * Checks the delta between the current and previous experiments data, and builds a comment based on the changes.
 *
 * @param buildComments {string[]} the array to push the comments to, will be used for the commit message
 * @param current {@link ExperimentData[]} - The current experiments data
 * @param previous {@link ExperimentData[]} - The previous experiments data
 * @param options { filter?: (e: ExperimentData) => boolean, label: string } - Options to filter the experiments and the label to use for the comments
 */
function checkExperimentDelta(buildComments: string[], current: ExperimentData[], previous: ExperimentData[], options: { filter?: (e: ExperimentData) => boolean, label: string }): { added: number, removed: number } {
    const filter = options.filter ?? (() => true);
    const currentFiltered = current.filter(filter);
    const previousFiltered = previous.filter(filter);

    const previousIds = new Set(previousFiltered.map(e => e.id));
    const currentIds = new Set(currentFiltered.map(e => e.id));

    const added = currentFiltered.filter(e => !previousIds.has(e.id));
    const removed = previousFiltered.filter(e => !currentIds.has(e.id));

    if (!added.length && !removed.length) {
        return { added: 0, removed: 0 };
    }

    // General comment for this section
    buildComments.push(`${added.length} experiments were ${options.label}ed, ${removed.length} experiments were un${options.label}ed.`);

    if (added.length > 0) {
        buildComments.push(`${options.label.charAt(0).toUpperCase() + options.label.slice(1)}ed experiments:`);
        for (const e of added) {
            buildComments.push(`- ${e.id} (${e.name})`);
            e.groups.forEach(g => buildComments.push(`  * ${g.value} (${g.weight})`));
        }
    }

    if (removed.length > 0) {
        buildComments.push(`Un${options.label}ed experiments:`);
        for (const e of removed) {
            buildComments.push(`- ${e.id} (${e.name})`);
            e.groups.forEach(g => buildComments.push(`  * ${g.value} (${g.weight})`));
        }
    }

    return { added: added.length, removed: removed.length };
}

function getPreviousBuildInfo(): StoredBuildData | null {
    if (!existsSync(LATEST_BUILD_JSON)) return null;

    try {
        const data = readFileSync(LATEST_BUILD_JSON, 'utf8');
        return JSON.parse(data) as StoredBuildData;
    } catch (err) {
        log.error('Failed to read or parse the latest build JSON:', err);
        return null;
    }
}

async function fetchLatestBuild(): Promise<BuildInfo | null> {
    try {
        const response = await fetch('https://static.twitchcdn.net/config/manifest.json?v=1');
        const data = await response.json();

        if (!data || !data.channels || !Array.isArray(data.channels) || data.channels.length === 0) {
            console.error('Invalid data structure received from the latest manifest.', data !== null ? data.channels : 'No data');
            return null;
        }

        const build = data.channels.find((c: BuildInfo) => c.primary);
        if (!build) {
            log.error('No primary build found in the latest manifest.');
            return null;
        }
        return build;
    } catch (err) {
        log.error('Failed to fetch latest build:', err);
        return null;
    }
}

function hasNewBuild(newestBuild: string, newestTime: string, storedData: StoredBuildData): boolean {
    if (!storedData) return true;

    const prevBuild = storedData.buildId.trim();
    const prevUpdatedAt = storedData.updatedAt.trim();

    // If the build ID is different, we have a new build
    if (prevBuild !== newestBuild.trim()) {
        log.info(`New build detected: ${newestBuild} -> ${prevBuild}`);
        return true;
    }

    // If the updated timestamp is different, we have a new build
    if (prevUpdatedAt !== newestTime) {
        log.info(`New update detected: ${prevUpdatedAt} -> ${newestTime}`);
        return true;
    }

    return false;
}

(async () => {
    loadEnvIfNeeded()

    // Check if environment variable are set for downloading the data
    const prodExpURL = process.env.EXPERIMENTS_URL;

    if (!prodExpURL) {
        log.error('Cannot determine experiment source, EXPERIMENTS_URL are not set!');

        return;
    }

    // Fetch the latest build information from Twitch's static CDN
    const buildInfo: BuildInfo | null = await fetchLatestBuild();

    if (!buildInfo) {
        log.error('Failed to fetch the latest build information.');

        return;
    }

    const previousBuildInfo = getPreviousBuildInfo();
    const updatedAt = formatDate(buildInfo.updated);

    // Check if the latest build is already stored, if so, we can skip the rest of the process
    if (!hasNewBuild(buildInfo.releases[0].buildId, updatedAt, previousBuildInfo)) {
        log.warn('No new build found - Build version remains unchanged.')

        return;
    }

    const previousData = existsSync(EXPERIMENTS_DATA) ? readFileSync(EXPERIMENTS_DATA, {encoding: 'utf8'}).trim() : '[]';
    const parsedPreviousData = JSON.parse(previousData) as ExperimentData[];
    // Track various comments for the build, will be used for the detailed commit message
    const buildComments: string[] = [];
    // Keeps track of the shorthand data for the commit message for the main commit message
    const shorthandData: ShorthandData = { added: 0, removed: 0, activated: 0, deactivated: 0 }

    log.info(`New build detected ${buildInfo.releases[0].buildId} - Updated at ${updatedAt}`);

    // Download the new data from an environment variable
    const experiments: ExperimentData[] | null = await fetch(prodExpURL).then(async (o) => {
        return await o.json();
    }).catch((err) => {
        log.error('Failed to fetch experiments data:', err);
        return null;
    });

    if (!experiments || !Array.isArray(experiments)) {
        log.error('Invalid experiments data received. Expected an array of experiments.');
        return;
    }

    // Observe the data against the previous data, make some comments
    const { added, removed } = checkExperimentDelta(buildComments, experiments, parsedPreviousData, {
        label: 'add'
    });
    const { added: activated, removed: deactivated } = checkExperimentDelta(buildComments, experiments, parsedPreviousData, {
        label: 'activate',
        filter: e => e.active
    });

    shorthandData.added = added;
    shorthandData.removed = removed;
    shorthandData.activated = activated;
    shorthandData.deactivated = deactivated;

    if (buildComments.length === 0) {
        log.warn('No changes detected in experiments data, nothing to update.');
        buildComments.push('No changes detected in experiments.');
    }

    // Write all our data to the files
    writeFileSync(EXPERIMENTS_DATA, JSON.stringify(experiments, null, 2), {encoding: 'utf8'});

    // Write the commit message we should use for the CI pipeline
    writeFileSync(COMMIT_MESSAGE, [
        constructShorthandMessage(shorthandData, buildInfo.updated),
        '',
        '',
        ...buildComments
    ].join('\n'), {encoding: 'utf8'});

    // Write the latest build information to a JSON file for React to use
    const latestBuildData = {
        buildId: buildInfo.releases[0].buildId,
        updatedAt: updatedAt,
        experimentsCount: experiments.length,
        shorthand: shorthandData,
        comments: buildComments
    };
    writeFileSync(LATEST_BUILD_JSON, JSON.stringify(latestBuildData, null, 2), {encoding: 'utf8'});

    log.success('Successfully handled new build!')
})();
