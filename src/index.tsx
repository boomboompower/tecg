import './index.css'
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HolidaySeasons } from './components/HolidaySeasons';
import { OptionalAnalytics } from './components/OptionalAnalytics';
import { ExperimentOverridesProvider } from './contexts/ExperimentOverridesProvider';
import { DialogProvider } from './contexts/DialogProvider';
import { SortBarProvider } from './contexts/SortBarProvider';
import { HomePage } from './pages/HomePage';
import { PageNotFound } from './pages/PageNotFound';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HolidaySeasons>
            <PageNotFound>
                <ExperimentOverridesProvider>
                    <SortBarProvider>
                        <DialogProvider>
                            <HomePage/>
                        </DialogProvider>
                    </SortBarProvider>
                </ExperimentOverridesProvider>
            </PageNotFound>
        </HolidaySeasons>
        <OptionalAnalytics />
    </StrictMode>,
)
