import useQuizNavbar from '@hooks/quiz/useQuizNavbar';
import styles from './quizNavbar.module.scss';
import { useMemo } from 'react';
import { QuizInfo } from '@models/quiz';

export interface QuizNavbarProps {
	currentId: QuizInfo['id'];
	categoryId: QuizInfo['category'];
}

const QuizNavbar = ({ currentId, categoryId }: QuizNavbarProps) => {
	const { quizIds, cursor, moveHandler } = useQuizNavbar({
		currentId,
		categoryId,
	});

	const quizNavbar = useMemo(
		() =>
			quizIds.map((quiz, index) => {
				const className =
					cursor === index
						? styles['select-button']
						: styles['controller-button'];
				return (
					<button
						key={quiz}
						data-path={quiz}
						className={className}
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
