import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useMemo, memo } from 'react';

// Components
import {ExperimentOverrides} from './ExperimentOverrides';
import {InfoTooltip} from './InfoTooltip';

// Hooks
import {useExperimentOverrides} from '../contexts/ExperimentOverridesProvider';
import {CollatedExperiment } from '../hooks/useExperiments';

// Utility functions
import {prettifyName} from '../utils/prettifyName';
import {formatDate} from '../utils/formatDate';

interface ExperimentProps {
    experiment: CollatedExperiment;
    isLuckyLast?: boolean;
    isFirst?: boolean;
}

function getExperimentDateText(experiment: CollatedExperiment) {
    if (experiment.active) {
        return `Active since ${formatDate(experiment.dateFound)}`;
    } else if (experiment.hasBeenActive && experiment.dateDeactivated) {
        return `Inactive since ${formatDate(experiment.dateDeactivated)}`;
    } else if (experiment.dateFound) {
        return `Found ${formatDate(experiment.dateFound)}`;
    }
    return undefined;
}

/**
 * This component is used to display an experiment and its overrides.
 * It uses the Disclosure component from Headless UI to manage the open/closed state of the experiment details.
 *
 * Additionally, it displays:
 * - the experiment name,
 * - the date it was found,
 * - a pill indicating if the experiment has been overridden.
 *
 * @param experiment {@link CollatedExperiment} experiment - The experiment to display
 * @param isLuckyLast {boolean} - Whether the experiment is a lucky last experiment
 * @param isFirst {boolean} - Whether the experiment is the first in the list
 */
const ExperimentComponent = ({ experiment, isLuckyLast, isFirst }: ExperimentProps) => {
    const { overrides } = useExperimentOverrides();
    const prettyName = useMemo(() => prettifyName(experiment.name), [experiment.name]);
    const experimentDateText = useMemo(() => getExperimentDateText(experiment), [experiment]);

    return (
        <Disclosure as="div" key={experiment.name}>
            {({ open }) => (
                <>
                    <DisclosureButton as="div" className={`cursor-pointer gap-5 text-left group grid grid-cols-4 w-full items-center justify-end transition-all duration-200 hover:bg-white/5 active:bg-white/10 ${isFirst ? 'rounded-t-xl' : ''}`}>
                        <div className="col-span-3 w-full p-4 justify-self-start">
                            <div className="flex items-center gap-1">
                                <InfoTooltip
                                    experiment={experiment}
                                    override={overrides[experiment.name]}
                                    prettyName={prettyName}
                                />
                                <span className="text-lg font-semibold text-white tracking-tight">{prettyName}</span>
                            </div>
                            <div className="mt-1 space-y-1">
                                {experiment.description?.description && (
                                    <div className={`text-[11px] italic text-gray-400/100 leading-relaxed ${!open ? 'line-clamp-1' : ''}`}>
                                        {experiment.description.description}
                                    </div>
                                )}
                                <div className="text-xs text-gray-400 font-medium">{experimentDateText}</div>
                            </div>
                        </div>
                        <div className='justify-self-end mr-4'>
                            <ChevronDownIcon className={`size-5 fill-white/60 transition-all duration-300 ease-out group-hover:fill-white/80 group-hover:scale-110 ${open ? 'rotate-180' : ''}`} />
                        </div>
                    </DisclosureButton>
                    <DisclosurePanel as='div' unmount transition className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'opacity-100' : 'max-h-0 opacity-0'}`}>
                        <ExperimentOverrides experiment={experiment} isLuckyLast={isLuckyLast} />
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    );
};

// Memoize the component to prevent unnecessary re-renders
// Only re-render if experiment.id, isLuckyLast, or isFirst changes
export const Experiment = memo(ExperimentComponent, (prevProps, nextProps) => {
    return (
        prevProps.experiment.id === nextProps.experiment.id &&
        prevProps.isLuckyLast === nextProps.isLuckyLast &&
        prevProps.isFirst === nextProps.isFirst &&
        prevProps.experiment.name === nextProps.experiment.name
    );
});
