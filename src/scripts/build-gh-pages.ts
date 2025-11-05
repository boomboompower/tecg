import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { formatDate } from '../utils/formatDate';
import { log } from '../utils/logger';
import { publish } from 'gh-pages';

const latestBuildJsonPath = './src/data/latest_build.json';
const commitMsgPath = './src/data/commit.txt';
let message = 'Default commit message';
let jsonData: { buildId: string, updatedAt: number | null };

function formatDuration(milliseconds: number): string {
    // If it only has milliseconds, return it as is with 'ms' suffix
    // If it's greater than 1000, convert to seconds and return with 's' suffix
    // If it's greater than 60000, convert to minutes and return with 'm' suffix as well as seconds
    if (milliseconds < 1000) {
        return `${milliseconds}ms`;
    } else if (milliseconds < 60000) {
        return `${(milliseconds / 1000).toFixed(2)}s`;
    } else {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = ((milliseconds % 60000) / 1000).toFixed(2);
        return `${minutes}m ${seconds}s`;
    }
}

async function buildPage() {
    try {
        const data = readFileSync(latestBuildJsonPath, 'utf8');
        jsonData = JSON.parse(data);
    } catch (_err: unknown) {
        jsonData = { buildId: 'unknown', updatedAt: null };
    }

    // Clear the console for better readability
    console.clear();

    log.info('Pushing to Github!');
    log.info(`  - Build ID: ${jsonData.buildId}`);
    log.info(`  - Updated At: ${formatDate(jsonData.updatedAt, 'UTC')}`);
    log.raw()

    try {
        message = readFileSync(commitMsgPath, 'utf8').trim();

        log.info(`Using commit message: "${message.includes('\n') ? message.split('\n')[0] : message}"`);
    } catch (err: unknown) {
        log.error(`Could not read ${commitMsgPath}:`, err);
    }

    if (!message || message.trim() === '') {
        log.error(`Commit message is empty or not set. Please set a commit message in ${commitMsgPath}.`);

        process.exit(1);
    }

    try {
        const now = new Date().getTime();
        log.info('Running gh-pages command...');

        await publish(resolve('./build'), {
            message: message,
            branch: 'gh-pages',
            dotfiles: false,
            history: true,
            add: true,
            remove: '**/.*{*,/**/*}' // Remove all dotfiles.
        }, (err: unknown) => {
            if (err) {
                log.error('gh-pages command failed:', err);
                process.exit(1);
            } else {
                log.success('gh-pages command completed successfully!');
            }
        });

        const duration = formatDuration(new Date().getTime() - now);

        log.success(`gh-pages command completed after ${duration}!`);
        log.raw();
    } catch (err: unknown) {
        log.error('gh-pages command failed:', err);
        process.exit(1);
    }
}

if (!process.env.GH_TOKEN || !process.env.GH_USERNAME || !process.env.GH_REPO) {
    log.error('GH_TOKEN, GH_USERNAME, or GH_REPO environment variables are not set.');
    process.exit(1);
}

buildPage();
