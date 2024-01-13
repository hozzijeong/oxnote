import { Header } from '@components/@common';
import styles from './quiz.module.scss';
import QuizNavbar from '@components/quiz/quizNavbar';
import QuizDetail from '@components/quiz/quizDetail';
import useQuizMenu from '@hooks/quiz/useQuizMenu';
import useLocationQueryParams from '@hooks/useLocationQueryParams';
import { QUIZ_PARAMS } from '@constants/quiz';

const { quiz } = QUIZ_PARAMS;

const Quiz = () => {
	const { getQueryParam } = useLocationQueryParams();

	const quizId = getQueryParam(quiz);

	const { deleteClickHandler, updateClickHandler } = useQuizMenu(quizId);

	return (
		<main className={styles.main}>
			<Header
				key={quizId}
				title={'문제 풀기'}
				backUrl={-1}
				menuComponent={
					<div className={styles['menu-container']}>
						<button onClick={updateClickHandler} type='button'>
							수정하기
						</button>
						<button onClick={deleteClickHandler} type='button'>
							삭제하기
						</button>
					</div>
				}
			/>
			<QuizNavbar currentId={quizId} />
			<QuizDetail quizId={quizId} />
		</main>
	);
};

export default Quiz;
