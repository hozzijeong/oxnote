import { PropsWithChildren, createContext, useState } from 'react';

export interface ToastItem {
	id: string;
	type: 'info' | 'success' | 'warning' | 'error';
	message: string;
	time?: number;
	buttonContent?: string;
	onClickButton?: () => void;
}

interface ToastContextProps {
	toastItem: ToastItem[];
	setToastItem: React.Dispatch<React.SetStateAction<ToastItem[]>>;
}

export const ToastContext = createContext<ToastContextProps | null>(null);

export const ToastProvider = ({ children }: PropsWithChildren) => {
	const [toastItem, setToastItem] = useState<ToastItem[]>([]);
	return (
		<ToastContext.Provider value={{ toastItem, setToastItem }}>
			{children}
		</ToastContext.Provider>
	);
};
