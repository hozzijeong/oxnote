import { URL_PATH } from '@constants/path';
import { Link } from 'react-router-dom';
import styles from './navbar.module.scss';
import Folder from '@assets/folder.svg';
import Plus from '@assets/plus.svg';
import Quiz from '@assets/quiz.svg';

const Navbar = () => {
	return (
		<nav className={styles.wrapper}>
			<div>
				<Link className={styles.link} to={URL_PATH.QUIZ_FILTER}>
					<img src={Quiz} alt='문제 풀기' width={24} height={24} />
					문제 풀기
				</Link>
			</div>
			<div>
				<Link className={styles.link} to={URL_PATH.QUIZ_FORM}>
					<img src={Plus} alt='문제 등록하기' width={24} height={24} />
					문제 등록하기
				</Link>
			</div>
			<div>
				<Link className={styles.link} to={URL_PATH.CATEGORY}>
					<img src={Folder} alt='모아보기' width={24} height={24} />
					모아보기
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
