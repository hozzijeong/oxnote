import { useLocation } from 'react-router-dom';
import { Header } from '@components/@common';
import styles from './quiz.module.scss';
import QuizNavbar from '@components/quiz/quizNavbar';
import useToggle from '@hooks/useToggle';
import QuizDetail from '@components/quiz/quizDetail';

const Quiz = () => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);

	const categoryId = queryParams.get('categoryId');
	const quizId = queryParams.get('quizId');

	if (categoryId === null || quizId === null) {
		throw new Error('여기에 존재하지 않습니다');
	}

	const { isOn: menuOn, toggleHandler: menuHandler } = useToggle();

	return (
		<main className={styles.main}>
			<Header title={'문제 풀기'} backUrl={-1} menuCallback={menuHandler} />
			{menuOn && (
				<div className={styles['menu-container']}>
					<button>수정하기</button>
					<button>삭제하기</button>
				</div>
			)}
			<QuizNavbar currentId={quizId} categoryId={Number(categoryId)} />
			<QuizDetail quizId={quizId} />
		</main>
	);
};

export default Quiz;
