import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useMemo } from 'react';

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
 */
export function Experiment({ experiment, isLuckyLast }: ExperimentProps) {
    const { overrides } = useExperimentOverrides();
    const prettyName = useMemo(() => prettifyName(experiment.name), [experiment.name]);
    const experimentDateText = useMemo(() => getExperimentDateText(experiment), [experiment]);

    return (
        <Disclosure as="div" key={experiment.name}>
            {({ open }) => (
                <>
                    <DisclosureButton className="gap-5 text-left group grid grid-cols-4 w-full items-center justify-end">
                        <div className="col-span-3 w-full text-lg font-semibold text-white p-3 justify-self-start">
                            <div>
                                <span>{prettyName}</span>
                                <InfoTooltip
                                    experiment={experiment}
                                    override={overrides[experiment.name]}
                                    prettyName={prettyName}
                                />
                            </div>
                            <div className="mt-1 text-xs text-gray-500">
                                <div>{experimentDateText}</div>
                            </div>
                        </div>
                        <div className='justify-self-end mr-2'>
                            <ChevronDownIcon className={`size-5 fill-white/60 transition-transform duration-200 ease-in-out group-hover:fill-white/50 ${open ? 'rotate-180' : ''}`} />
                        </div>
                    </DisclosureButton>
                    <DisclosurePanel as='div' transition className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? 'opacity-100' : 'max-h-0 opacity-0'}`}>
                        <ExperimentOverrides experiment={experiment} isLuckyLast={isLuckyLast} />
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    );
}
