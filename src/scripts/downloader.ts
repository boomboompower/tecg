import {existsSync, readFileSync, writeFileSync} from 'fs';
import {formatCompactTimestamp, formatDate} from '../utils/formatDate';
import {log} from '../utils/logger';
import fetch from 'node-fetch';

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
    return `build: ${compactTimestamp} | +${shorthandData.added}/-${shorthandData.removed} exp, +${shorthandData.activated}/-${shorthandData.deactivated} active, ${shorthandData.modified} modified`;
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

function hasNewBuild(newestBuild: string, newestTime: number, storedData: StoredBuildData): boolean {
    if (!storedData) return true;

    const prevBuild = storedData.buildId.trim();
    const prevUpdatedAt = storedData.updatedAt;

    // If the build ID is different, we have a new build
    if (prevBuild !== newestBuild.trim()) {
        log.info(`New build detected: ${prevBuild} -> ${newestBuild}`);
        return true;
    }

    // If the updated timestamp is different, we have a new build
    if (prevUpdatedAt !== newestTime) {
        log.info(`New update detected: ${formatDate(prevUpdatedAt, 'UTC')} -> ${formatDate(newestTime, 'UTC')}`);
        return true;
    }

    return false;
}

(async () => {
    loadEnvIfNeeded()

    // Check if environment variable are set for downloading the data
    const prodExpURL = process.env.EXPERIMENTS_URL;
    const prodExpDataURL = process.env.EXPERIMENTS_DATA_URL;
    const forceUpdate = process.env.FORCE_UPDATE && process.env.FORCE_UPDATE === 'true';

    if (!prodExpURL) {
        log.error('Cannot determine experiment source, EXPERIMENTS_URL are not set!');

        return;
    } else if (!prodExpDataURL) {
        log.error('Cannot determine experiment data source, EXPERIMENTS_DATA_URL are not set!');

        return;
    }

    // Fetch the latest build information from Twitch's static CDN
    const buildInfo: BuildInfo | null = await fetchLatestBuild();

    if (!buildInfo) {
        log.error('Failed to fetch the latest build information.');

        return;
    }

    const previousBuildInfo = getPreviousBuildInfo();
    const updateTime = buildInfo.updated;
    const updatedAt = formatDate(updateTime, 'UTC');

    // Check if the latest build is already stored, if so, we can skip the rest of the process
    if (!forceUpdate && previousBuildInfo && !hasNewBuild(buildInfo.releases[0].buildId, updateTime, previousBuildInfo)) {
        log.warn('No new build found - Build version remains unchanged.')

        return;
    }

    log.info(`New build detected ${buildInfo.releases[0].buildId} - Updated at ${updatedAt}`);

    // Download the new data from an environment variable
    const experiments: ExperimentData[] | null = await fetch(prodExpURL).then(async (o) => {
        return await o.json();
    }).catch((err: unknown): null => {
        log.error('Failed to fetch experiments:', err);
        return null;
    });

    if (!experiments || !Array.isArray(experiments)) {
        log.error('Invalid experiments data received. Expected an array of experiments.');
        return;
    }

    let buildData: RemoteBuildData | null = await fetch(prodExpDataURL).then(async (o) => {
        return await o.json();
    }).catch((err: unknown): null => {
        log.error('Failed to fetch experiments data:', err);
        return null;
    });

    // If the build data is not available, we will use default values
    // This is not ideal, but it's better than failing the entire script
    if (!buildData || !buildData.shorthand || !buildData.comments) {
        buildData = {
            comments: ['Failed to fetch build data, using defaults'],
            shorthand: {added: 0, removed: 0, activated: 0, deactivated: 0, modified: 0},
            buildVersion: buildInfo.releases[0].buildId
        }
    }

    if (buildData.comments.length === 0) {
        log.warn('No changes detected in experiments data, nothing to update.');
        buildData.comments.push('No changes detected in experiments.');
    }

    // Check if the old build comments exists, and if it matches the new one then assume no changes
    // Do not use JSON.stringify here, as the order of comments may change
    // This is to prevent commits where the only change is the update time or build ID or where comments are reordered.
    // Unfortunately, this also means the build data will not be updated next time, so I'd like to rework this in the future.
    if (previousBuildInfo && previousBuildInfo.comments.length === buildData.comments.length) {
        let commentsMatch = true;
        for (let i = 0; i < buildData.comments.length; i++) {
            if (previousBuildInfo.comments[i] !== buildData.comments[i]) {
                commentsMatch = false;
                break;
            }
        }

        if (commentsMatch) {
            log.warn('No changes detected in experiments comments, nothing to update.');
            return;
        }
    }

    // Write all our data to the files
    writeFileSync(EXPERIMENTS_DATA, JSON.stringify(experiments, null, 2), {encoding: 'utf8'});

    // Write the commit message we should use for the CI pipeline
    writeFileSync(COMMIT_MESSAGE, [
        constructShorthandMessage(buildData.shorthand, buildInfo.updated),
        '',
        '',
        ...buildData.comments
    ].join('\n'), {encoding: 'utf8'});

    // Write the latest build information to a JSON file for React to use
    const latestBuildData: StoredBuildData = {
        buildId: buildInfo.releases[0].buildId,
        updatedAt: updateTime,
        experimentsCount: experiments.length,
        shorthand: buildData.shorthand,
        comments: buildData.comments
    };
    writeFileSync(LATEST_BUILD_JSON, JSON.stringify(latestBuildData, null, 2), {encoding: 'utf8'});

    log.success('Successfully handled new build!')
})();
