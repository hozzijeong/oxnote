import { ToastContext, ToastItem } from '@context/ToastProvider';
import { useCallback, useContext } from 'react';

const useToast = () => {
	const toastContext = useContext(ToastContext);

	if (toastContext === null) {
		throw new Error('ToastProvider 내부에서 사용해주세요');
	}

	const { toastItem, setToastItem } = toastContext;

	const addToast = useCallback((props: Omit<ToastItem, 'id'>) => {
		const id = self.crypto.randomUUID();
		setToastItem((prev) => [...prev, { ...props, id }]);
	}, []);

	return { toastItem, addToast, setToastItem };
};

export default useToast;
