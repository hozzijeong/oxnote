import useConfirmState from '@hooks/useConformState';
import useConfirmModal from '@hooks/useConfirmModal';
import styles from './confirm.module.scss';

const Confirm = () => {
	const { confirmState } = useConfirmState();
	const modalRef = useConfirmModal();

	const { isOpen, title, message, setAnswer } = confirmState;

	return (
		isOpen && (
			<dialog
				className={styles['confirm-box']}
				ref={modalRef}
				key={Math.random()}
			>
				{title && <h2 className={styles['title']}>{title}</h2>}
				<p className={styles['message']}>{message}</p>
				<div className={styles['button-area']}>
					<button
						className={styles['primary-button']}
						type='button'
						onClick={() => setAnswer?.(true)}
					>
						네
					</button>
					<button
						className={styles['secondary-button']}
						type='button'
						onClick={() => setAnswer?.(false)}
					>
						아니오
					</button>
				</div>
			</dialog>
		)
	);
};

export default Confirm;
