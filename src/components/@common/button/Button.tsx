import { ButtonHTMLAttributes, forwardRef } from 'react';
import styles from './button.module.scss';

type Size = 'small' | 'large';
type Color = 'default' | 'primary';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	size?: Size;
	color?: Color;
	className?: string;
};

const Button = forwardRef<HTMLButtonElement, Props>(
	({ size = 'large', color = 'default', className, ...props }, ref) => {
		const buttonClassName = `${styles['base']} ${styles[size]} ${
			styles[color]
		} ${className ? `${className}` : ''}`;
		return <button ref={ref} {...props} className={buttonClassName} />;
	}
);

export default Button;
