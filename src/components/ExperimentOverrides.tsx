import {useMemo} from 'react';
import {Radio, RadioGroup} from '@headlessui/react';
import {ExperimentIcon} from './ExperimentIcon';
import {Pill} from './Pill';
import {useExperimentOverrides} from '../contexts/ExperimentOverridesProvider';
import {CollatedExperiment} from '../hooks/useExperiments';

type ExperimentOverridesProps = {
    experiment: CollatedExperiment,
    // If it's the last experiment in the list, we want to apply a special style
    isLuckyLast?: boolean,
}

export function ExperimentOverrides({experiment, isLuckyLast}: ExperimentOverridesProps) {
    // Retrieve the current override from the context
    const {overrides, setOverride, removeOverride} = useExperimentOverrides();

    // Memoize the groups to display based on the experiment's groups and staff override
    // This ensures that we only recompute the groups when they change
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

    // Memoize the default group based on the experiment's default or the largest group
    // This ensures that we only recompute the default group when it changes (e.g., when the experiment's default or groups change)
    const defaultGroup = useMemo(() => {
        const sortedGroups = [...groupsToDisplay].sort((a, b) => b.weight - a.weight);
        return experiment.default || sortedGroups[0]?.value;
    }, [experiment.default, groupsToDisplay]);

    // Memoize the selected group based on the overrides and the default group
    // This is needed for when we reset the override or when the experiment changes
    const selected = useMemo(() => {
        const override = overrides[experiment.name];
        return override && groupsToDisplay.find((g) => g.value === override)
            ? override
            : defaultGroup;
    }, [overrides, experiment.name, groupsToDisplay, defaultGroup]);

    return (
        <RadioGroup
            key={experiment.name}
            value={selected}
            onChange={(override) => {
                // If the selected group is the largest group, remove the override
                // We don't care since it's not an override
                if (override === defaultGroup) {
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
                                    {defaultGroup === group.value && <Pill label="Default" className="justify-self-end" title="This is the current version" />}
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
