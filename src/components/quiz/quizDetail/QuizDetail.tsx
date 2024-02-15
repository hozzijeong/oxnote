import useToggle from '@hooks/useToggle';
import styles from './quizDetail.module.scss';
import type { QuizInfo } from '@models/quiz';
import useGetDocument from '@hooks/fireStore/useGetDocument';
import { FIRE_STORE } from '@constants/path';
import useToast from '@hooks/useToast';
import FavoriteButton from '@components/@common/favoriteButton';
import useUpdateQuiz from '@hooks/quiz/useUpdateQuiz';
interface QuizDetailProps {
	quizId: QuizInfo['id'];
}

const QuizDetail = ({ quizId }: QuizDetailProps) => {
	const { addToast } = useToast();
	const { isOn: explainOn, toggleHandler: explainHandler } = useToggle();

	const { data: quiz } = useGetDocument<QuizInfo>({
		path: `${FIRE_STORE.QUIZ}/${quizId}`,
	});

	const updateQuiz = useUpdateQuiz({ quizId, type: 'favorite' });

	const answerClickHandler: React.MouseEventHandler<HTMLDivElement> = (
		event
	) => {
		if (!(event.target instanceof HTMLButtonElement)) return;

		const { value } = event.target;

		const answer = Boolean(Number(value));

		let recentCorrect = false;
		let wrongCount = quiz.wrongCount;
		let tryCount = quiz.tryCount + 1;

		if (answer === Boolean(quiz.answer)) {
			addToast({
				type: 'success',
				message: '맞았습니다',
			});
			recentCorrect = true;
		} else {
			addToast({
				type: 'error',
				message: '틀렸습니다',
			});
			wrongCount += 1;
		}

		updateQuiz({
			data: {
				...quiz,
				recentCorrect,
				tryCount,
				wrongCount,
				correctRate: (tryCount - wrongCount) / tryCount,
			},
		});
	};

	const favoriteClickHandler = () => {
		updateQuiz({
			data: {
				...quiz,
				favorite: !quiz.favorite,
			},
		});
	};

	return (
		<section>
			<div className={styles['quiz-container']}>
				<p>{quiz.quiz}</p>
				<FavoriteButton
					isFavorite={Boolean(quiz.favorite)}
					onClick={favoriteClickHandler}
				/>
			</div>

			<div className={styles['answer-container']}>
				<button type='button' onClick={explainHandler}>{`해설 ${
					explainOn ? '닫기' : '보기'
				}`}</button>
				{explainOn && <p>{quiz.explain}</p>}
			</div>

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
		</section>
	);
};

export default QuizDetail;
