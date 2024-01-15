import { Fragment, useMemo } from 'react';
import { createPortal } from 'react-dom';
import useToast from '@hooks/useToast';
import Toast from './Toast';
import styles from './toast.module.scss';

const ToastList = () => {
	const { toastItem } = useToast();
	const root = document.getElementById('toast-root') ?? document.body;

	const toastItems = useMemo(
		() => toastItem.map((props) => <Toast key={props.id} {...props} />),
		[toastItem]
	);

	return createPortal(
		<Fragment>
			{toastItem.length > 0 && (
				<div className={styles['toast-list-wrapper']} aria-live='assertive'>
					{toastItems}
				</div>
			)}
		</Fragment>,
		root
	);
};

export default ToastList;
