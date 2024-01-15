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
	checkedValue?: React.InputHTMLAttributes<HTMLInputElement>['value'];
}

const Radio = ({
	options,
	required = false,
	name,
	changeHandler,
	checkedValue,
}: RadioProps) => {
	const radioOptions = options.map(({ value, title }) => {
		const checked = checkedValue === value;

		return (
			<div key={title} className={styles['label-container']}>
				<label htmlFor={title}>
					<input
						id={title}
						value={value}
						type='radio'
						name={name}
						onChange={changeHandler}
						required={required}
						checked={checked}
					/>
					{title}
				</label>
			</div>
		);
	});

	return <div className={styles.wrapper}>{radioOptions}</div>;
};

export default Radio;
