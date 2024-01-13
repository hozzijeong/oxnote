import styles from './spinner.module.scss';

const Spinner = () => {
	return (
		<div className={styles['wrapper']}>
			<div className={styles['loader']} />
		</div>
	);
};

export default Spinner;
