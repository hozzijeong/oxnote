import { Header } from '@components/@common';
import styles from './quiz.module.scss';
import QuizNavbar from '@components/quiz/quizNavbar';
import QuizDetail from '@components/quiz/quizDetail';
import useQuizMenu from '@hooks/quiz/useQuizMenu';
import useLocationQueryParams from '@hooks/useLocationQueryParams';
import { QUIZ_PARAMS } from '@constants/quiz';
import useGetQuizList from '@hooks/fireStore/useGetQuizList';
import { QuizInfo } from '@models/quiz';
import { Navigate, generatePath } from 'react-router-dom';
import { URL_PATH } from '@constants/path';

const { quiz } = QUIZ_PARAMS;

const Quiz = () => {
	const { getQueryParam } = useLocationQueryParams();

	const currentId = getQueryParam(quiz);

	const { data: quizIds } = useGetQuizList<QuizInfo['id'][]>({
		selectHandler: (data) => {
			if (data.empty) return [];

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

	if (quizIds.length === 0) {
		const categoryId = getQueryParam('category');

		return (
			<Navigate
				to={generatePath(URL_PATH.CATEGORY_DETAIL, { id: categoryId })}
			/>
		);
	}

	const currentIndex = quizIds.findIndex((id) => id === currentId);
	const nextId = quizIds[currentIndex + 1] ?? null;

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
			<QuizDetail quizId={currentId} nextId={nextId} />
		</main>
	);
};

export default Quiz;
