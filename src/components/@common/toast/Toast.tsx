import { memo, useEffect, useState, useCallback, useRef } from 'react';
import { ToastItem } from '@context/ToastProvider';
import useToast from '@hooks/useToast';
import styles from './toast.module.scss';

const Toast = (props: ToastItem) => {
	const { id, type, message, time = 2100 } = props;

	const { setToastItem } = useToast();

	const [visible, setVisible] = useState(true);
	const timeoutId = useRef(0);

	const toastClose = useCallback(() => {
		setVisible(false);
		setTimeout(() => {
			setToastItem((prev) => prev.filter(({ id: toastId }) => toastId !== id));
		}, 200);
	}, [id]);

	useEffect(() => {
		timeoutId.current = self.setTimeout(toastClose, time);

		return () => {
			if (timeoutId.current) clearTimeout(timeoutId.current);
		};
	}, [time, toastClose]);

	return (
		<div
			className={`
			${styles['wrapper']}
			${styles[`${type}-border`]}
			${styles[`animation-${visible ? 'show' : 'hide'}`]}
			`}
			role='alert'
		>
			<div className={`${styles['left-aria']}`}>
				<div className={`${styles['content-area']}`}>
					<div className={`${styles['message-area']}`}>
						<p>{message}</p>
					</div>
				</div>
			</div>
			<div
				className={`${styles['progress-bar']} ${styles[`${type}-border`]}`}
			/>
		</div>
	);
};

export default memo(Toast);
