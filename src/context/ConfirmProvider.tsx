import { PropsWithChildren, createContext, useState } from 'react';

interface ConfirmState {
	title: string | null;
	message: string;
	isOpen: boolean;
	setAnswer: ((userAnswer: boolean) => void) | null;
}

interface ConfirmContextProps {
	confirmState: ConfirmState;
	setConfirmState: React.Dispatch<React.SetStateAction<ConfirmState>>;
}

const INITIAL_CONFIRM: ConfirmState = {
	title: null,
	message: '',
	isOpen: false,
	setAnswer: null,
};

export const ConfirmContext = createContext<ConfirmContextProps | null>(null);

export const ConfirmProvider = ({ children }: PropsWithChildren) => {
	const [confirmState, setConfirmState] =
		useState<ConfirmState>(INITIAL_CONFIRM);

	return (
		<ConfirmContext.Provider value={{ confirmState, setConfirmState }}>
			{children}
		</ConfirmContext.Provider>
	);
};
