import { ButtonHTMLAttributes, forwardRef } from 'react';
import styles from './button.module.scss';

type Size = 'small' | 'large';
type Color = 'default' | 'primary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	size?: Size;
	color?: Color;
	clickHandler?: () => void;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function (
	{ size = 'large', color = 'default', ...props },
	ref
) {
	const className = `${styles.base} ${styles[size]} ${styles[color]}`;

	return <button ref={ref} {...props} className={className} />;
});

export default Button;
