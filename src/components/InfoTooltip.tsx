import { InformationCircleIcon, CheckIcon, ClipboardIcon } from '@heroicons/react/20/solid';
import { useDialogProvider } from '../contexts/DialogProvider';
import { CollatedExperiment } from '../hooks/useExperiments';
import { MouseEvent, useState } from 'react';

interface InfoTooltipProps {
    experiment: CollatedExperiment;
    override?: string;
    prettyName?: string;
}

function DataBlock({text}: {text: string}) {
    const [ isShowingCopyFeedback, setIsShowingCopyFeedback ] = useState(false);

    // This component is used to display a piece of data in a styled block
    // Should also support long text wrapping and overflow handling
    // If clicked, it should be copied to the clipboard with visual feedback (not with alert)
    const handleCopy = () => {
        if (isShowingCopyFeedback) {
            return; // Prevent multiple clicks from triggering the copy action
        }

        setIsShowingCopyFeedback(true);
        setTimeout(() => {
            setIsShowingCopyFeedback(false);
        }, 2000); // Reset feedback after 2 seconds

        navigator.clipboard.writeText(text).then(() => {
            console.log('Text copied to clipboard:', text);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }

    // Copied feedback should be a tick in the center of the block

    return (
        <div className={`${isShowingCopyFeedback ? 'bg-gray-700' : 'bg-gray-600 cursor-pointer'} text-white relative p-2 rounded shadow-sm overflow-x-auto whitespace-pre-wrap transition`} onClick={handleCopy}>
            {isShowingCopyFeedback ? (
                <div className="text-green-400 text-center">
                    <CheckIcon className="inline-block w-5 h-5" />
                    <div className="text-xs">Copied!</div>
                </div>
            ) : (
                <div>
                    {text}
                    <ClipboardIcon className="absolute top-2 right-2 w-3 h-3 text-gray-400" />
                </div>
            )}
        </div>
    )
}

function DialogContent({ experiment }: { experiment: CollatedExperiment }) {
    // Show a grid with the experiment data using tailwind
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <strong>ID:</strong> <DataBlock text={experiment.id} />
            </div>
            <div>
                <strong>Name:</strong> <DataBlock text={experiment.name} />
            </div>
            <div>
                <strong>Active:</strong> <DataBlock text={experiment.active ? 'Yes' : 'No'} />
            </div>
            <div>
                <strong>Has Been Active:</strong> <DataBlock text={experiment.hasBeenActive ? 'Yes' : 'No'} />
            </div>
            <div>
                <strong>Serving One:</strong> <DataBlock text={experiment.servingOne ? 'Yes' : 'No'} />
            </div>
            <div>
                <strong>Default Group:</strong> <DataBlock text={experiment.default} />
            </div>
            {experiment.dateFound && (
                <div>
                    <strong>Date Found:</strong> <DataBlock text={new Date(experiment.dateFound).toLocaleString()} />
                </div>
            )}
            {experiment.dateActivated && (
                <div>
                    <strong>Date Activated:</strong> <DataBlock text={new Date(experiment.dateActivated).toLocaleString()} />
                </div>
            )}
            {experiment.dateDeactivated && (
                <div>
                    <strong>Date Deactivated:</strong> <DataBlock text={new Date(experiment.dateDeactivated).toLocaleString()} />
                </div>
            )}
            {experiment.staffOverride && (
                <div>
                    <strong>Staff Override:</strong> <DataBlock text={experiment.staffOverride} />
                </div>
            )}
        </div>
    )
}

export function InfoTooltip({experiment, override, prettyName}: InfoTooltipProps) {
    const {openDialogue, closeDialog} = useDialogProvider();

    function onExperimentClick(event: MouseEvent) {
        event.stopPropagation(); // Prevent the click from propagating to parent elements

        openDialogue({
            title: `Experiment: ${prettyName || experiment.name}`,
            description: `Some additional details for experiment ${prettyName || experiment.name}`,
            content: (
                <div>
                    <DialogContent experiment={experiment}/>
                    <div>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
                            onClick={closeDialog}
                        >
                            Close
                        </button>
                    </div>
                </div>
            ),
        });
    }

    const iconClass = `mr-1 pt-0.5 size-4 transition-colors ${
        override
            ? override === experiment.name
                ? 'fill-yellow-500 hover:fill-yellow-400'
                : 'fill-blue-500 hover:fill-blue-400'
            : experiment.staffOverride ?
                'fill-yellow-500 hover:fill-yellow-400'
                : 'fill-white/60 hover:fill-white/80'
    }`;

    const title = [
        `ID: ${experiment.id}`,
        `Name: ${experiment.name}`,
        `Override: ${override ?? 'None'}`,
        experiment.staffOverride ? `Staff Override: ${experiment.staffOverride}` : undefined
    ].filter((line) => line).join('\n');

    return (
        <div className="relative inline-block" onClick={onExperimentClick}>
            <InformationCircleIcon
                className={iconClass}
                title={title}
            />
        </div>
    );
}
