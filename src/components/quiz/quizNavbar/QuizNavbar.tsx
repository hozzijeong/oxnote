import useMoveQuizNavbar from '@hooks/quiz/useMoveQuizNavbar';
import styles from './quizNavbar.module.scss';
import { useMemo } from 'react';
import { QuizInfo } from '@models/quiz';
import useGetQuizList from '@hooks/fireStore/useGetQuizList';

interface QuizNavbarProps {
	currentId: QuizInfo['id'];
}

const QuizNavbar = ({ currentId }: QuizNavbarProps) => {
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
