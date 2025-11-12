import { MouseEvent, memo } from 'react';
import { InformationCircleIcon } from '@heroicons/react/20/solid';
import { useDialogProvider } from '../contexts/DialogProvider';
import { CollatedExperiment } from '../hooks/useExperiments';
import { Pill } from './Pill';

interface InfoTooltipProps {
    experiment: CollatedExperiment;
    override?: string;
    prettyName?: string;
}

function DialogContent({ experiment }: { experiment: CollatedExperiment }) {
    // Show a grid with the experiment data using tailwind
    // 2-column grid (label + value pairs side-by-side).
    // The title should be bold and the value should be normal. Width of the grid should be responsive.
    return (
        <>
            <hr className="border-gray-700 my-2" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                <div className="flex items-center">
                    <div className="font-semibold">ID:</div>
                    <div className="text-gray-300 text-sm leading-relaxed ml-2">{experiment.id}</div>
                </div>
                <div className="flex items-center">
                    <div className="font-semibold">Name:</div>
                    <div className="text-gray-300 text-sm leading-relaxed ml-2">{experiment.name}</div>
                </div>
                <div className="flex items-center">
                    <div className="font-semibold">Active:</div>
                    <div className={`text-sm leading-relaxed ml-2 ${experiment.active ? 'text-green-500' : 'text-red-500'}`}>
                        {experiment.active ? 'Yes' : 'No'}
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="font-semibold">Has Been Active:</div>
                    <div className={`text-sm leading-relaxed ml-2 ${experiment.hasBeenActive ? 'text-green-500' : 'text-red-500'}`}>
                        {experiment.hasBeenActive ? 'Yes' : 'No'}
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="font-semibold">Serving One:</div>
                    <div className={`text-sm leading-relaxed ml-2 ${experiment.servingOne ? 'text-green-500' : 'text-red-500'}`}>
                        {experiment.servingOne ? 'Yes' : 'No'}
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="font-semibold">Default Group:</div>
                    <div className="text-gray-300 text-sm leading-relaxed ml-2"><Pill label={experiment.default} className={'ml-0'} /></div>
                </div>
                <div className="flex items-center">
                    <div className="font-semibold">Date Found:</div>
                    <div className="text-gray-300 text-sm leading-relaxed ml-2">{experiment.dateFound ? new Date(experiment.dateFound).toLocaleString(undefined, {timeZoneName: 'short'}) : 'N/A'}</div>
                </div>
                {experiment.dateActivated && (
                    <div className="flex items-center">
                        <div className="font-semibold">Date Activated:</div>
                        <div className="text-gray-300 text-sm leading-relaxed ml-2">{new Date(experiment.dateActivated).toLocaleString(undefined, {timeZoneName: 'short'})}</div>
                    </div>
                )}
                {experiment.dateDeactivated && (
                    <div className="flex items-center">
                        <div className="font-semibold">Date Deactivated:</div>
                        <div className="text-gray-300 text-sm leading-relaxed ml-2">{new Date(experiment.dateDeactivated).toLocaleString(undefined, {timeZoneName: 'short'})}</div>
                    </div>
                )}
                {experiment.staffOverride && (
                    <div className="flex items-center">
                        <div className="font-semibold">Staff Override:</div>
                        <div className="text-gray-300 text-sm leading-relaxed ml-2">{experiment.staffOverride}</div>
                    </div>
                )}
            </div>
            {experiment.description && (
                <>
                    <hr className="border-gray-700 my-2 col-span-2" />
                    <div className="mt-4">
                        <div className="font-semibold text-lg mb-2">Description</div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            {experiment.description.description}
                        </p>

                        {experiment.description.variantExplanations && Object.keys(experiment.description.variantExplanations).length > 0 && (
                            <div className="mt-4">
                                <div className="font-semibold mb-2">Variant Explanations</div>
                                <div className="space-y-2">
                                    {Object.entries(experiment.description.variantExplanations).map(([variant, explanation]) => (
                                        <div key={variant} className="text-sm">
                                            <span className="font-medium text-blue-400">{variant}:</span>
                                            <span className="text-gray-300 ml-2">{explanation}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    )
}

const InfoTooltipComponent = ({experiment, override, prettyName}: InfoTooltipProps) => {
    const {openDialogue, closeDialog} = useDialogProvider();

    function onExperimentClick(event: MouseEvent) {
        event.stopPropagation(); // Prevent the click from propagating to parent elements

        openDialogue({
            title: `Experiment: ${prettyName || experiment.name}`,
            wider: true,
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
};

// Memoize to prevent re-renders
export const InfoTooltip = memo(InfoTooltipComponent, (prevProps, nextProps) => {
    return (
        prevProps.experiment.id === nextProps.experiment.id &&
        prevProps.override === nextProps.override &&
        prevProps.prettyName === nextProps.prettyName
    );
});
