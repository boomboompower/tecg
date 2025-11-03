import React, { createContext, useContext, useState } from 'react';
import {Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from '@headlessui/react';

type DialogContent = {
    title: string;
    content: React.ReactNode;
    wider?: boolean
    description?: string;
}

interface DialogContextProps {
    closeDialog: () => void;
    isDialogOpen: boolean;
    openDialogue: (content: DialogContent | null) => void;
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined);

export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState<DialogContent | null>(null);

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    const panelClasses = dialogContent?.wider ?
        'w-full max-w-3xl' :
        'w-full max-w-lg';

    return (
        <DialogContext.Provider
            value={{
                closeDialog,
                isDialogOpen,
                openDialogue: (content: DialogContent | null) => {
                    setDialogContent(content);
                    setIsDialogOpen(true);
                }}}
        >
            {children}
            <Dialog
                open={isDialogOpen}
                onClose={closeDialog}
                transition
                className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-closed:opacity-0 z-10"
            >
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className={`${panelClasses} max-h-[90vh] overflow-y-auto rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 z-20`}
                    >
                        <DialogTitle as="h3" className="text-lg font-semibold text-white">
                            {dialogContent?.title}
                            <button
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 cursor-pointer"
                                onClick={closeDialog}
                            >
                                &times;
                            </button>
                        </DialogTitle>
                        <Description className="mt-2 text-sm text-gray-400">
                            {dialogContent?.description}
                        </Description>
                        <div className="overflow-y-auto">
                            {dialogContent?.content}
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </DialogContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDialogProvider = () => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error('useDialogProvider must be used within a DialogProvider');
    }
    return context;
};
