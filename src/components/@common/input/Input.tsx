import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './input.module.scss';

type Mode = 'text';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	mode?: Mode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function (
	{ mode, ...props },
	ref
) {
	const className = `${styles.base} ${mode ? styles[mode] : ''}`;

	return <input ref={ref} {...props} className={className} />;
});

export default Input;
