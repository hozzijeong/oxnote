import useGetDocument from '@hooks/fireStore/useGetDocument';
import type { QuizInfo } from '@models/quiz';
import { useParams } from 'react-router-dom';
import StarFill from '@assets/star_fill.svg';
import StarEmpty from '@assets/star_empty.svg';
import { useState } from 'react';
import { Header } from '@components/@common';
import useGetCurrentCategoryFromQuery from '@hooks/useGetCurrentCategoryFromQuery';
import styles from './quiz.module.scss';
import useUpdateDocument from '@hooks/fireStore/useUpdateDocument';
import { useQueryClient } from '@tanstack/react-query';
import QuizNavbar from '@components/quiz/quizNavbar';

const Quiz = () => {
	const param = useParams();
	const { id } = param;

	if (id === undefined) throw new Error('잘못된 접근입니다');

	const { data: quiz } = useGetDocument<QuizInfo>({
		collectionId: 'yerim',
		path: `Quiz/data/${id}`,
	});

	const { category } = useGetCurrentCategoryFromQuery(quiz.category);

	const queryClient = useQueryClient();

	const { mutate: update } = useUpdateDocument({
		path: `Quiz/data/${quiz.id}`,
		successCallback: () => {
			queryClient.invalidateQueries({ queryKey: [`getQuiz/data/${id}`] });
		},
	});

	const [explainOpen, setExplainOpen] = useState(false);

	const explainClickHandler = () => setExplainOpen((eo) => !eo);

	const answerClickHandler: React.MouseEventHandler<HTMLDivElement> = (
		event
	) => {
		if (!(event.target instanceof HTMLButtonElement)) return;

		const { value } = event.target;

		const answer = Boolean(Number(value));

		let recentCorrect = false;
		let wrongCount = quiz.wrongCount;
		let tryCount = quiz.tryCount + 1;

		if (answer === quiz.answer) {
			console.log('맞았습니다');
			recentCorrect = true;
		} else {
			console.log('틀렸습니다');
			wrongCount += 1;
		}

		update({
			collectionId: 'yerim',
			data: {
				...quiz,
				recentCorrect,
				tryCount,
				wrongCount,
				correctRate: (tryCount - wrongCount) / tryCount,
			},
		});
	};

	return (
		<main className={styles.main}>
			<Header
				title={'문제 풀기'}
				backUrl={'CATEGORY_DETAIL'}
				pathId={category?.id ?? ''}
			/>
			<QuizNavbar currentId={id} />
			<section className={styles['quiz-container']}>
				<p>{quiz.quiz}</p>
				<img
					src={quiz.favorite ? StarFill : StarEmpty}
					width={24}
					height={24}
					alt='즐겨찾기 상태'
				/>
			</section>

			<section className={styles['answer-container']}>
				<button type='button' onClick={explainClickHandler}>{`해설 ${
					explainOpen ? '닫기' : '보기'
				}`}</button>
				{explainOpen && <p>{quiz.explain}</p>}
			</section>

			<div
				role='button'
				className={styles['button-container']}
				onClick={answerClickHandler}
			>
				<button
					className={`${styles.button} ${styles['false-bg']}`}
					type='button'
					value={0}
				>
					X
				</button>
				<button
					className={`${styles.button} ${styles['true-bg']}`}
					type='button'
					value={1}
				>
					O
				</button>
			</div>
		</main>
	);
};

export default Quiz;
