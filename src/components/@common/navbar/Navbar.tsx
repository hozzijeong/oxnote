import { URL_PATH } from '@constants/path';
import { Link } from 'react-router-dom';
import styles from './navbar.module.scss';
import Folder from '@assets/folder.svg';
import Plus from '@assets/plus.svg';
import Quiz from '@assets/quiz.svg';
import Profile from '@assets/profile.svg';

const Navbar = () => {
	return (
		<nav className={styles.wrapper}>
			<div>
				<Link className={styles.link} to={URL_PATH.QUIZ_FILTER} replace={true}>
					<img src={Quiz} alt='문제 풀기' width={24} height={24} />
					문제 풀기
				</Link>
			</div>
			<div>
				<Link className={styles.link} to={URL_PATH.QUIZ_FORM} replace={true}>
					<img src={Plus} alt='문제 등록하기' width={24} height={24} />
					문제 등록하기
				</Link>
			</div>
			<div>
				<Link className={styles.link} to={URL_PATH.CATEGORY} replace={true}>
					<img src={Folder} alt='모아보기' width={24} height={24} />
					모아보기
				</Link>
			</div>
			<div>
				<Link className={styles.link} to={URL_PATH.MY_PAGE} replace={true}>
					<img src={Profile} alt='마이페이지' width={24} height={24} />
					마이페이지
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
