import {TabGroup} from '../components/TabGroup';
import {lazy} from 'react';

const AlertLazy = lazy(() => import('../components/Alert'));
const FooterLazy = lazy(() => import('../components/Footer'));
const ActionBarLazy = lazy(() => import('../components/ActionBar'));

// Want to see this on the actual website itself?
// Execute this code on the console:
// localStorage.setItem('twilight.force-benchmarking-tools', 'true');
export function HomePage() {
    return (
        <div className="h-screen w-full m-auto justify-center">
            <div className="w-full m-auto max-w-4xl px-4 pt-10 z-10">
                <header aria-label={'TECG - Experiment Cookie Generator'} className="mb-6">
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        <span className='block sm:hidden text-2xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>TECG - Experiment Cookie Generator</span>
                        <span className='hidden sm:block text-3xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>TECG - Streaming Service Experiment Cookie Generator</span>
                    </h1>
                    <p className="mt-2 text-sm text-gray-400">Manage and customize experiment configurations</p>
                </header>

                <AlertLazy className='my-3 hidden lg:block' dismissible>
                    <p className='font-semibold'>Important Notice:</p>
                    <p>Some experimental features may violate platform policies. Misuse could result in account
                        suspensions or other penalties. ️</p>
                    <p>&#128073; See the <a href='#warning' className='underline decoration-dotted'>warning
                        below</a> for more details.</p>
                </AlertLazy>

                <TabGroup />

                <ActionBarLazy />
            </div>
            <FooterLazy />
        </div>
    );
}
