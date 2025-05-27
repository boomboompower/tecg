import {useMemo, useState} from 'react';
import {Radio, RadioGroup} from '@headlessui/react';
import {ExperimentIcon} from './ExperimentIcon';
import {Pill} from './Pill';
import {useExperimentOverrides} from '../contexts/ExperimentOverridesProvider';
import {CollatedExperiment} from '../hooks/useExperiments';

type ExperimentOverridesProps = {
    experiment: CollatedExperiment,
    isLuckyLast?: boolean,
}

export function ExperimentOverrides({experiment, isLuckyLast}: ExperimentOverridesProps) {
    // Retrieve the current override from the context
    const {overrides, setOverride, removeOverride} = useExperimentOverrides();

    const groupsToDisplay = useMemo(() => {
        // If the experiment has a staff override, we want to display it as a separate group
        const groups = experiment.groups.map((group) => ({
            ...group,
            hidden: false, // If experiments are here, they are not hidden
        }));

        // If the experiment has a staff override, we want to display it as a separate group
        if (experiment.staffOverride && !groups.some((group) => group.value === experiment.staffOverride)) {
            console.log(`Experiment ${experiment.name} has a staff override: ${experiment.staffOverride}`);
            groups.push({
                value: experiment.staffOverride,
                weight: 0, // Set weight to 0 so it doesn't affect the distribution
                hidden: true, // This is a hidden experiment group, only shown to staff
            });
        }
        return groups;
    }, [experiment.groups, experiment.staffOverride, overrides, experiment.name]);

    const [selected, setSelected] = useState(() => {
        // Default should be the group with the largest weight. But we want to preserve the order of the experiments
        // within the experiment object. So we need to clone the groups and sort them by weight.
        // This will be used to determine the default selected group
        const sortedGroups = [...groupsToDisplay].sort((a, b) => b.weight - a.weight);
        const defaultGroup = experiment.default || sortedGroups[0].value;

        // Check if the experiment has an override in the context
        const override = overrides[experiment.name];
        if (override) {
            return groupsToDisplay.find((group) => group.value === override)?.value || defaultGroup;
        }
        // If no override is found, return default group
        return defaultGroup;
    });
    const largestGroup = useMemo(() => {
        if (experiment.default) {
            // If the experiment has a default group, return it
            return experiment.default;
        }

        // Find the group with the largest weight by sorting the groups
        const sortedGroups = [...groupsToDisplay].sort((a, b) => b.weight - a.weight);
        return sortedGroups[0].value;
    }, [groupsToDisplay, experiment.default]);

    return (
        <RadioGroup
            key={experiment.name}
            value={selected}
            onChange={(override) => {
                setSelected(override);

                // If the selected group is the largest group, remove the override
                // We don't care since it's not an override
                if (override === largestGroup) {
                    removeOverride(experiment.name);
                    return;
                }

                setOverride(experiment.name, override);
            }}
            defaultValue={selected}
            className="space-y-0"
            aria-label={`Select an experiment group for ${experiment.name}`}
        >
            {groupsToDisplay.map((group, index) => (
                <div key={group.value}>
                    <Radio
                        as='div'
                        key={group.value}
                        value={group.value}
                        className={`group relative flex flex-grow cursor-pointer text-white transition py-3 px-10 border-2 border-transparent hover:bg-white/10 focus:bg-white/10 ${index % 2 === 0 ? 'bg-white/5' : 'bg-white/5'} ${isLuckyLast && index === groupsToDisplay.length - 1 ? 'rounded-b-md' : ''}`}
                    >
                        <div className="flex gap-4 w-full overflow-clip items-center">
                            <ExperimentIcon
                                isChecked={selected === group.value}
                                className="justify-self-start min-w-fit"
                            />

                            <div className="text-sm w-full">
                                <div className="font-semibold text-white">
                                    <span>{group.value}</span>
                                    {experiment.staffOverride && experiment.staffOverride === group.value && (<Pill label={'Staff Default'} type='staff' className="justify-self-end" title="This is the override for staff" />)}
                                    {largestGroup === group.value && <Pill label="Default" className="justify-self-end" title="This is the current version" />}
                                    {group.hidden && <Pill label="Hidden" type='none' className="justify-self-end" title="This group is hidden by default" />}
                                </div>
                                <div className="text-white/50">{group.weight}</div>
                            </div>
                        </div>
                    </Radio>
                    {index < groupsToDisplay.length - 1 && <hr className='border-white/15' />}
                </div>
            ))}
        </RadioGroup>
    )
}
