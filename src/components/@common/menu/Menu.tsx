import { PropsWithChildren, forwardRef } from 'react';
import styles from './menu.module.scss';

type Props<T extends HTMLElement> = React.HtmlHTMLAttributes<T> & {
	className?: string;
};

type ItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	itemType: 'default' | 'checkBox';
	checked?: boolean;
};

const Item = ({
	itemType = 'default',
	checked,
	className,
	type = 'button',
	...props
}: ItemProps & Props<HTMLButtonElement>) => {
	const itemClassName = `${styles['item']} ${
		itemType === 'checkBox' ? styles['check-box'] : ''
	} ${itemType === 'checkBox' && checked ? styles['checked'] : ''} ${
		className ? className : ''
	}`;

	return <button className={itemClassName} type={type} {...props} />;
};

const Menu = Object.assign(
	forwardRef<HTMLDivElement, PropsWithChildren & Props<HTMLDivElement>>(
		({ className, children, ...props }, ref) => {
			const menuClassName = `${styles['menu']} ${className ? className : ''}`;
			return (
				<div ref={ref} className={menuClassName} {...props}>
					{children}
				</div>
			);
		}
	),
	{
		Item,
	}
);

export default Menu;
