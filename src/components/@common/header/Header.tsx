import { URL_PATH } from '@constants/path';
import { Link } from 'react-router-dom';
import Back from '@assets/back.svg';
import Menu from '@assets/menu_vertical.svg';
import styles from './header.module.scss';

interface HeaderProps {
	title: string;
	backUrl?: keyof typeof URL_PATH;
	menuCallback?: () => void;
}

const Header = ({ title, backUrl, menuCallback }: HeaderProps) => {
	return (
		<header className={styles.wrapper}>
			{backUrl && (
				<Link to={backUrl}>
					<img src={Back} width={16} height={16} alt='뒤로 가기' />
				</Link>
			)}
			{title}
			{menuCallback && (
				<button type='button' onClick={menuCallback} aria-label='메뉴'>
					<img src={Menu} width={16} height={16} alt='메뉴 클릭' />
				</button>
			)}
		</header>
	);
};

export default Header;
