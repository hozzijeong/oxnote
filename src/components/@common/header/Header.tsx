import { URL_PATH } from '@constants/path';
import { generatePath, useNavigate } from 'react-router-dom';
import Back from '@assets/back.svg';
import Menu from '@assets/menu_vertical.svg';
import styles from './header.module.scss';
import { useMemo } from 'react';
import useToggle from '@hooks/useToggle';

const isKeyofURLPath = (backUrl: any): backUrl is keyof typeof URL_PATH => {
	return backUrl in URL_PATH;
};

interface HeaderProps {
	title: string;
	backUrl?: keyof typeof URL_PATH | -1;
	pathId?: string | number;
	menuComponent?: React.ReactNode;
}

const Header = ({ title, backUrl, pathId, menuComponent }: HeaderProps) => {
	const navigate = useNavigate();

	const backClickHandler = () => {
		let historyBackUrl: string | number = -1;

		if (isKeyofURLPath(backUrl)) {
			historyBackUrl = pathId
				? generatePath(URL_PATH[backUrl], { id: pathId })
				: URL_PATH[backUrl];
		}

		if (typeof historyBackUrl === 'number') {
			navigate(-1);
		} else {
			navigate(historyBackUrl);
		}
	};

	const backUrlButton = useMemo(() => {
		return (
			backUrl && (
				<button className={styles['back-arrow']} onClick={backClickHandler}>
					<img src={Back} width={20} height={20} alt='뒤로 가기' />
				</button>
			)
		);
	}, []);

	const { isOn: menuOn, toggleHandler: menuHandler } = useToggle(false);

	return (
		<header className={styles.wrapper}>
			{backUrlButton}
			{title}
			{menuComponent && (
				<button
					className={styles.menu}
					type='button'
					onClick={menuHandler}
					aria-label='메뉴'
				>
					<img src={Menu} width={20} height={20} alt='메뉴 클릭' />
				</button>
			)}
			{menuOn && menuComponent}
		</header>
	);
};

export default Header;
