interface ExperimentPercentageProps {
    unusedCount: number;
    totalCount: number;
}

/**
 * ExperimentPercentage component to display the percentage of unused experiments.
 * This is used to show the bloat percentage of experiments in the system.
 *
 * The percentage is calculated as (Number of unused experiments / Total experiment count) * 100.
 * Any experiment which is either not active or serving a single group is considered unused.
 *
 * Active experiments are experiments which belong in production and are actively being served to users.
 * Serving one group experiments are experiments which are being served to a single group of users.
 *  - In an ideal world, these experiments should be removed then archived (as long as they have been launched).
 * Unregistered experiments are any experiment which are registered in the system but are not being served to any users.
 *  - They are not referenced at all in the source code and are not being served to any users.
 *  - This means they can safely be removed from the system.
 *
 * Colors are assigned based on the percentage:
 * - Red: > 80%                 A high level of bloat
 * - Yellow: > 50% and <= 80%   A moderate level of bloat
 * - Green: <= 50%              A low level of bloat
 *
 * @param unusedCount number - The number of unused experiments
 * @param totalCount number - The total number of experiments
 */
export function ExperimentPercentage({ unusedCount, totalCount }: ExperimentPercentageProps) {
    if (totalCount === 0) {
        return <div className="text-gray-500">No experiments available.</div>;
    }

    const bloatPercentage = (unusedCount / totalCount) * 100;

    // Determine the text color based on the bloat percentage
    const textColor =
        bloatPercentage > 80
            ? 'text-red-500'
            : bloatPercentage > 50
                ? 'text-yellow-500'
                : 'text-green-500';

    return (
        <div className="flex items-baseline gap-2 mb-3 mx-0 lg:gap-2.5 bg-gray-800/30 px-4 py-2.5 rounded-lg border border-gray-700/30" aria-label={'Experiment bloat percentage'} role={'banner'}>
            <span className="text-sm text-gray-400 font-medium">
                Bloat:
            </span>
            <span className={`text-lg md:text-xl font-bold ${textColor} drop-shadow-sm`}>
                {bloatPercentage.toFixed(1)}%
            </span>
            <span className="text-xs text-gray-500">
                ({unusedCount}/{totalCount} unused)
            </span>
        </div>
    );
}
