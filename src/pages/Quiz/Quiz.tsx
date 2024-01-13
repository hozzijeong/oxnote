import { Header } from '@components/@common';
import styles from './quiz.module.scss';
import QuizNavbar from '@components/quiz/quizNavbar';
import QuizDetail from '@components/quiz/quizDetail';
import useQuizMenu from '@hooks/quiz/useQuizMenu';
import useLocationQueryParams from '@hooks/useLocationQueryParams';
import { QUIZ_PARAMS } from '@constants/quiz';
import useGetQuizList from '@hooks/fireStore/useGetQuizList';
import { QuizInfo } from '@models/quiz';

const { quiz } = QUIZ_PARAMS;

const Quiz = () => {
	const { getQueryParam } = useLocationQueryParams();

	const currentId = getQueryParam(quiz);

	const { data: quizIds } = useGetQuizList<QuizInfo['id'][]>({
		selectHandler: (data) => {
			const result: QuizInfo['id'][] = [];

			data.forEach((value) => {
				const id = value.id;

				result.push(id);
			});
			return result;
		},
	});

	const { deleteClickHandler, updateClickHandler } = useQuizMenu({
		currentId,
		quizIds,
	});

	return (
		<main className={styles.main}>
			<Header
				key={currentId}
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
			<QuizNavbar currentId={currentId} quizIds={quizIds} />
			<QuizDetail quizId={currentId} />
		</main>
	);
};

export default Quiz;
