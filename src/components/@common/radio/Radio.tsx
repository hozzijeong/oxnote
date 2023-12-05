import styles from './radio.module.scss';

interface RadioProps {
	options: string[];
	changeHandler?: () => void;
}

const Radio = ({ options }: RadioProps) => {
	const radioOptions = options.map((value) => (
		<div key={value} className={styles['label-container']}>
			<label htmlFor={value}>
				<input id={value} value={value} type='radio' name='radio' />
				{value}
			</label>
		</div>
	));

	return <div className={styles.wrapper}>{radioOptions}</div>;
};

export default Radio;
