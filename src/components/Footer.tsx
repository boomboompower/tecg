import { useMemo } from 'react';
import { Button } from '@headlessui/react';
import { CodeBracketSquareIcon } from '@heroicons/react/24/solid';

import { Alert } from './Alert';
import { useDialogProvider } from '../contexts/DialogProvider';
import { formatDate } from '../utils/formatDate';

// The build information for the latest build
import latestBuildRaw from '../data/latest_build.json';
const latestBuild: LatestBuild = latestBuildRaw as unknown as LatestBuild;

type LatestBuild = {
    buildId: string;
    updatedAt: number;
    experimentsCount: number;
    shorthand: {
        added: number;
        removed: number;
        activated: number;
        deactivated: number;
        modified: number;
    };
    comments: string[];
}

/**
 * We are using this component to display the footer of the page.
 * This is used to display the information about the project as well as legal information.
 *
 * Mostly, this is also for SEO purposes.
 */
export function Footer() {
    const { openDialogue } = useDialogProvider();

    const openDebugDialog = () => {
        openDialogue({
            content: <DebugDialog />,
            title: 'Debug Information',
            wider: true,
        });
    }

    return (
        <footer className="bg-gray-900 text-gray-400 py-8 px-4 mt-4 md:px-16 text-xs md:text-base">
            <div className="max-w-7xl mx-auto">
                <div className="space-y-4">
                    <h2 className="flex items-baseline gap-2 text-2xl font-bold text-white">
                        <span>About TECG - Stream Service Experiment Cookie Generator</span>
                        <span className="text-gray-500 hover:text-gray-300 cursor-pointer" title="Debug">
                            <span className="sr-only">Debug</span>
                            <button onClick={() => openDebugDialog() } className="align-middle cursor-pointer" >
                                <CodeBracketSquareIcon className={'w-5 h-5 size-5'} />
                            </button>
                        </span>
                    </h2>
                    <p>TECG is an open-source tool designed for developers and enthusiasts who want to explore
                        experimental features in their favorite streaming platforms. It allows users to generate and
                        manage custom cookies, potentially activating unreleased updates or testing new features that
                        might be available on some platforms.</p>

                    <ul className="list-disc list-inside">
                        <li>Generate and import custom experiment cookies for supported platforms.</li>
                        <li>Filter experiments by active, serving one, or unregistered states.</li>
                        <li>Easily copy and paste your generated cookie settings.</li>
                        <li>Explore hundreds of experimental configurations to personalize your experience.</li>
                        <li>User-friendly design, optimized for desktop and mobile use.</li>
                    </ul>

                    <Alert id='warning'>
                        <strong>Important Notice:</strong>
                        <p>Using these experimental overrides comes with some risks. Misusing this tool <span
                            className='italic'>COULD</span> result in
                            account restrictions, suspensions or other penalties depending on the platform&apos;s policies.
                            By using TECG, you acknowledge full responsibility for any actions taken.</p>
                    </Alert>

                    <p className="text-xs md:text-sm">TECG is an independent project and is not affiliated, associated, authorized,
                        endorsed by, or in any way officially connected with any specific streaming platform or service.
                        All trademarks, service marks, and company names mentioned here are the property of their
                        respective owners.</p>

                    <div className='text-center text-xs md:text-sm'>
                        <div>&copy; {new Date().getFullYear()} &#x2022; Open-source under the MIT
                            License
                        </div>
                        <div><span>Designed by </span>
                            <a href='https://github.com/boomboompower/tecg/' target='_blank'
                               rel='noopener noreferrer'>
                                <span className='text-blue-500 hover:text-blue-400'>boomboompower</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function DebugDialog() {
    const {closeDialog} = useDialogProvider();

    const coloredComments = useMemo(() => {
        let currentGroup: 'none' | 'added' | 'removed' | 'modified' = 'none';

        return latestBuild.comments.map((line, index) => {
            const lowerLine = line.toLowerCase();

            // Simple logic to determine the current group based on the line content
            if (lowerLine.includes('removed experiments') || lowerLine.includes('deactivated experiments')) {
                currentGroup = 'removed';
            } else if (lowerLine.includes('added experiments') || lowerLine.includes('activated experiments')) {
                currentGroup = 'added';
            } else if (lowerLine.includes('were modified')) {
                currentGroup = 'modified';
            } else if (line.trim() === '') {
                currentGroup = 'none';
            }

            // Determine the color class based on the current group
            let colorClass = 'text-white';
            if (currentGroup === 'added') colorClass = 'text-green-400';
            else if (currentGroup === 'modified') colorClass = 'text-yellow-400';
            else if (currentGroup === 'removed') colorClass = 'text-red-400';

            return (
                <div key={index} className={colorClass}>
                    {line}
                </div>
            );
        });
    }, []);

    return (
        <div>
            <p className="text-sm text-gray-400">
                Build ID: <span className="text-white">{latestBuild.buildId}</span>
            </p>
            <p className="text-sm text-gray-400">
                Updated At: <span className="text-white">{formatDate(latestBuild.updatedAt)}</span>
            </p>
            <p className="text-sm text-gray-400">
                Total Experiments: <span className="text-white">{latestBuild.experimentsCount}</span>
            </p>
            <div className="text-sm text-gray-400">
                Changes in last build:
                <ul className="list-disc list-inside mt-2">
                    <li>Added: <span className="text-white">{latestBuild.shorthand.added}</span></li>
                    <li>Removed: <span className="text-white">{latestBuild.shorthand.removed}</span></li>
                    <li>Activated: <span className="text-white">{latestBuild.shorthand.activated}</span></li>
                    <li>Deactivated: <span className="text-white">{latestBuild.shorthand.deactivated}</span></li>
                    <li>Modified: <span className="text-white">{latestBuild.shorthand.modified}</span></li>
                </ul>
            </div>
            <div className="text-sm text-gray-400 mt-2">
                <pre className="bg-black/50 text-sm p-4 rounded-md whitespace-pre font-mono mt-2 overflow-x-auto">
                    {coloredComments}
                </pre>
            </div>
            <Button
                className={'mt-3 w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 float-end'}
                onClick={closeDialog}
            >
                Close
            </Button>
        </div>
    )
}

export default Footer;
