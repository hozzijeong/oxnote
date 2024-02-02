import { useId } from 'react';
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

		const id = useId();

		return (
			<div
				key={`$${name}-${title}-${{ id }}`}
				className={styles['label-container']}
			>
				<label htmlFor={`$${name}-${title}-${{ id }}`}>
					<input
						id={`$${name}-${title}-${{ id }}`}
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
