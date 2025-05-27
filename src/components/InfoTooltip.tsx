import { InformationCircleIcon } from '@heroicons/react/20/solid';
import {CollatedExperiment} from '../hooks/useExperiments';

interface InfoTooltipProps {
    experiment: CollatedExperiment;
    override?: string;
}

export function InfoTooltip({ experiment, override }: InfoTooltipProps) {
    const iconClass = `ml-1 pt-0.5 w-4 h-4 transition-colors ${
        override
            ? override === experiment.name
                ? 'fill-yellow-500 hover:fill-yellow-400'
                : 'fill-blue-500 hover:fill-blue-400'
            : experiment.staffOverride ?
                'fill-yellow-500 hover:fill-yellow-400'
                : 'fill-white/60 hover:fill-white/80'
    }`;

    const title = [
        `ID: ${  experiment.id}`,
        `Name: ${  experiment.name}`,
        `Override: ${  override ?? 'None'}`,
        experiment.staffOverride ? `Staff Override: ${experiment.staffOverride}` : undefined
    ].filter((line) => line).join('\n');

    return (
        <div className="relative inline-block">
            <InformationCircleIcon
                className={iconClass}
                title={title}
            />
        </div>
    );
}
