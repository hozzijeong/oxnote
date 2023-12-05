import styles from './inputLabel.module.scss';

interface InputLabelProps {
	title: string;
	htmlFor: string;
	element: JSX.Element;
}

const InputLabel = ({ title, element, htmlFor }: InputLabelProps) => {
	return (
		<div className={styles.wrapper}>
			<label className={styles.title} htmlFor={htmlFor}>
				{title}
			</label>
			{element}
		</div>
	);
};

export default InputLabel;
