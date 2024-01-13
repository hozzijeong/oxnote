import useMoveQuizNavbar from '@hooks/quiz/useMoveQuizNavbar';
import styles from './quizNavbar.module.scss';
import { useMemo } from 'react';
import { QuizInfo } from '@models/quiz';
export interface QuizNavbarProps {
	currentId: QuizInfo['id'];
	quizIds: QuizInfo['id'][];
}

const QuizNavbar = ({ currentId, quizIds }: QuizNavbarProps) => {
	const { cursor, moveHandler } = useMoveQuizNavbar({
		currentId,
		quizIds,
	});

	const quizNavbar = useMemo(
		() =>
			quizIds.map((quiz, index) => {
				const className =
					cursor === index ? 'select-button' : 'controller-button';

				return (
					<button
						key={quiz}
						data-path={quiz}
						className={styles[className]}
						onClick={moveHandler}
					>
						{index + 1}
					</button>
				);
			}),
		[cursor, quizIds]
	);

	return (
		<div className={styles['controller-wrapper']}>
			<div className={styles['controller-container']}>{quizNavbar}</div>
		</div>
	);
};

export default QuizNavbar;
