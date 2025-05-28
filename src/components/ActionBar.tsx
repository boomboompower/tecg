import React, {useMemo} from 'react';
import {Button, Textarea} from '@headlessui/react';
import {useDialogProvider} from '../contexts/DialogProvider';
import {useExperimentOverrides} from '../contexts/ExperimentOverridesProvider';
import {convertCookieToOverrides} from '../utils/convertCookieToOverrides';
import {useExperiments} from '../hooks/useExperiments';
import {convertOverridesToCookie} from '../utils/convertOverridesToCookie';

export function ActionBar() {
    const {openDialogue} = useDialogProvider();
    const {overrides} = useExperimentOverrides()

    const overrideCount = useMemo(() => {
        return Object.keys(overrides).length;
    }, [overrides]);

    const openImportDialog = () => {
        openDialogue({
            content: <ImportDialog />,
            description: 'Paste your override JSON here to import.',
            title: 'Import Overrides',
        })
    }

    const openExportDialog = () => {
        openDialogue({
            content: <ExportDialog closeDialog={() => openDialogue(null)} />,
            description: 'This will copy your current overrides to the clipboard.',
            title: 'Export Overrides',
        });
    }

    const openResetDialog = () => {
        openDialogue({
            content: <ResetDialog />,
            description: 'This will reset all your overrides to the default settings.',
            title: 'Reset Overrides',
        });
    }

    return (
        <div className="w-full flex gap-2 justify-center flex-col mb-2 lg:w-auto">
            <Button
                aria-label={'Import an override from clipboard'}
                title={'Import overrides from clipboard. This will paste the overrides from your clipboard.'}
                onClick={openImportDialog}
                className={'w-full bg-tw text-white text-sm font-semibold py-1 px-3 rounded-md transition'}>
                Import
            </Button>
            <Button
                aria-label={'Export overrides to clipboard'}
                title={'Export overrides to clipboard. This will copy the current overrides to your clipboard.'}
                onClick={openExportDialog}
                className="w-full bg-export text-white text-sm font-semibold py-1 px-3 rounded-md transition">
                Export
            </Button>
            <Button
                aria-label={'Reset all experiment overrides'}
                title={overrideCount > 0 ? 'Reset all overrides to default' : 'No overrides to reset'}
                disabled={overrideCount === 0}
                onClick={openResetDialog}
                className="w-full bg-reset text-white text-sm font-semibold py-1 px-3 rounded-md transition disabled:text-white/50">
                {overrideCount > 0 ? 'Reset' : 'No Overrides'}
            </Button>
        </div>
    )
}

function ImportDialog() {
    const {closeDialog} = useDialogProvider();
    const {overrideOverrides} = useExperimentOverrides()
    const {experiments} = useExperiments();

    return (
        <div>
            <Textarea
                className="w-full mt-2 p-2 border rounded-md h-48 resize-none bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder='{%22experiments%22:{}%2C%22disabled%22:[]}'
                id={'cookie-input'}
            />
            <Button
                className="mt-3 w-full bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={(event) => {
                    const input = document.getElementById('cookie-input') as HTMLTextAreaElement;
                    const cookie = input.value;

                    // Convert the cookie to overrides
                    const newOverrides = convertCookieToOverrides(cookie, experiments);

                    if (!newOverrides) {
                        // Show an error with a cross saying it failed
                        event.currentTarget.innerText = '✗ Failed!';
                        event.currentTarget.setAttribute('disabled', 'true');
                        event.currentTarget.style.pointerEvents = 'none';

                        setTimeout(() => {
                            closeDialog();
                        }, 1000);
                        return;
                    } else {
                        overrideOverrides(newOverrides);
                    }

                    // Update the button text to indicate success
                    event.currentTarget.innerText = '✓ Imported!';
                    event.currentTarget.setAttribute('disabled', 'true');
                    event.currentTarget.style.pointerEvents = 'none';
                    setTimeout(() => {
                        closeDialog();
                    }, 1000);
                }}
            >
                Import Overrides
            </Button>
        </div>
    )
}

function ExportDialog({ closeDialog }: { closeDialog: () => void }) {
    const {experiments} = useExperiments();
    const {overrides} = useExperimentOverrides();

    // Convert overrides to cookie format
    const cookie = convertOverridesToCookie(overrides, experiments);

    return (
        <div>
            <Textarea
                className="w-full mt-2 p-2 border rounded-md h-48 resize-none bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly
                value={cookie}
            />
            <Button
                className="w-full mt-3 bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={(event) => {
                    navigator.clipboard.writeText(cookie).then(() => {
                        console.log('Copied to clipboard');
                    });

                    event.currentTarget.innerText = '✓ Copied!';
                    event.currentTarget.setAttribute('disabled', 'true');
                    event.currentTarget.style.pointerEvents = 'none';

                    setTimeout(() => {
                        closeDialog();
                    }, 1000);
                }}
            >
                Copy to Clipboard
            </Button>
        </div>
    )
}

function ResetDialog() {
    const {closeDialog} = useDialogProvider();
    const {clearOverrides} = useExperimentOverrides();

    return (
        <div>
            <p className="text-white">Are you sure you want to reset all overrides? This will remove all your custom settings.</p>
            <Button
                className="mt-3 w-full bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => {
                    clearOverrides();
                    closeDialog();
                }}
            >
                Reset Overrides
            </Button>
        </div>
    )
}

export default ActionBar;
