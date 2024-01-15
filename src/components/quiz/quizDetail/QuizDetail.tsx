import useToggle from '@hooks/useToggle';
import styles from './quizDetail.module.scss';
import type { QuizInfo } from '@models/quiz';
import StarFill from '@assets/star_fill.svg';
import StarEmpty from '@assets/star_empty.svg';
import useGetDocument from '@hooks/fireStore/useGetDocument';
import { useQueryClient } from '@tanstack/react-query';
import useUpdateDocument from '@hooks/fireStore/useUpdateDocument';
import { QUIZ_PATH } from '@constants/path';
import useToast from '@hooks/useToast';

interface QuizDetailProps {
	quizId: QuizInfo['id'];
}

const QuizDetail = ({ quizId }: QuizDetailProps) => {
	const { addToast } = useToast();
	const { isOn: explainOn, toggleHandler: explainHandler } = useToggle();

	const { data: quiz } = useGetDocument<QuizInfo>({
		path: `${QUIZ_PATH}/${quizId}`,
	});

	const queryClient = useQueryClient();

	const { mutate: update } = useUpdateDocument({
		path: `${QUIZ_PATH}/${quizId}`,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [`get${QUIZ_PATH}/${quizId}`],
			});
		},
	});

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

		update({
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
		<section>
			<div className={styles['quiz-container']}>
				<p>{quiz.quiz}</p>
				<img
					src={quiz.favorite ? StarFill : StarEmpty}
					width={24}
					height={24}
					alt='즐겨찾기 상태'
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
