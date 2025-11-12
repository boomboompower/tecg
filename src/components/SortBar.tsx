import {Field, Label, Select} from '@headlessui/react';
import {SortByType, useSortBar} from '../contexts/SortBarProvider';

export function SortBar({totalCount}: { totalCount: number }) {
    const { setSortBy } = useSortBar();

    if (totalCount === 0) {
        return (
            <Field className="flex items-center gap-2 mb-2 mt-2 w-full lg:w-auto lg:mb-0 lg:mt-0">
                <Label htmlFor="sort" className="block w-full text-sm/6 font-semibold text-gray-200">No experiments to sort</Label>
            </Field>
        );
    }

    return (
        <Field className="flex items-center gap-3 mb-2 mt-2 w-full lg:w-auto">
            <Label htmlFor="sort" className="block text-sm font-semibold text-gray-300 text-right whitespace-nowrap">Sort by:</Label>
            <Select
                onChange={(e) => setSortBy(e.target.value as SortByType)}
                className="w-full lg:w-auto bg-gray-800/80 text-gray-200 border border-gray-700/50 rounded-lg px-3 py-2 text-sm hover:border-gray-600 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 cursor-pointer shadow-sm">
                <option value="name">Name</option>
                <option value="discovery-newest">Newest to Oldest</option>
                <option value="discovery-oldest">Oldest to Newest</option>
            </Select>
        </Field>
    )
}
