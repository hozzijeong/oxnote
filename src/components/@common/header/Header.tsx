import { URL_PATH } from '@constants/path';
import { Link, generatePath } from 'react-router-dom';
import Back from '@assets/back.svg';
import Menu from '@assets/menu_vertical.svg';
import styles from './header.module.scss';

interface HeaderProps {
	title: string;
	backUrl?: keyof typeof URL_PATH;
	pathId?: string | number;
	menuCallback?: () => void;
}

const Header = ({ title, backUrl, pathId, menuCallback }: HeaderProps) => {
	return (
		<header className={styles.wrapper}>
			{backUrl && (
				<Link
					className={styles['back-arrow']}
					to={
						pathId
							? generatePath(URL_PATH[backUrl], { id: pathId })
							: URL_PATH[backUrl]
					}
				>
					<img src={Back} width={20} height={20} alt='뒤로 가기' />
				</Link>
			)}
			{title}
			{menuCallback && (
				<button
					className={styles.menu}
					type='button'
					onClick={menuCallback}
					aria-label='메뉴'
				>
					<img src={Menu} width={20} height={20} alt='메뉴 클릭' />
				</button>
			)}
		</header>
	);
};

export default Header;
