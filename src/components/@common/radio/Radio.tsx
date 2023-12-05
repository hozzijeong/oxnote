import styles from './radio.module.scss';

interface Option {
	title: string;
	value: React.InputHTMLAttributes<HTMLInputElement>['value'];
}
interface RadioProps {
	options: Option[];
	changeHandler?: React.ChangeEventHandler<HTMLInputElement>;
	required?: boolean;
	name: string;
}

const Radio = ({
	options,
	required = false,
	name,
	changeHandler,
}: RadioProps) => {
	const radioOptions = options.map(({ value, title }) => (
		<div key={title} className={styles['label-container']}>
			<label htmlFor={title}>
				<input
					id={title}
					value={value}
					type='radio'
					name={name}
					onChange={changeHandler}
					required={required}
				/>
				{title}
			</label>
		</div>
	));

	return <div className={styles.wrapper}>{radioOptions}</div>;
};

export default Radio;
