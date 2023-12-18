import useQuizNavbar from '@hooks/useQuizNavbar';
import styles from './quizNavbar.module.scss';
import { useMemo } from 'react';

interface QuizNavbarProps {
	currentId: string;
}

const QuizNavbar = ({ currentId }: QuizNavbarProps) => {
	const { quizzes, cursor, moveHandler } = useQuizNavbar(currentId);

	const quizNavbar = useMemo(
		() =>
			quizzes.map((quiz, index) => {
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
		[cursor, quizzes]
	);

	return (
		<div className={styles['controller-wrapper']}>
			<div className={styles['controller-container']}>{quizNavbar}</div>
		</div>
	);
};

export default QuizNavbar;
