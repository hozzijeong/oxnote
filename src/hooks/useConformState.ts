import { ConfirmContext } from '@context/ConfirmProvider';
import { useContext } from 'react';

const useConfirmState = () => {
	const confirmContext = useContext(ConfirmContext);

	if (confirmContext === null) {
		throw new Error('ConfirmProvider 내부에서 사용해주세요');
	}

	const { confirmState, setConfirmState } = confirmContext;

	return { confirmState, setConfirmState };
};

export default useConfirmState;
