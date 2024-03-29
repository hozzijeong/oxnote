import type { QuizListItem } from '@models/quiz';
import styles from './quizItem.module.scss';
import { Link } from 'react-router-dom';
import { FIRE_STORE, URL_PATH } from '@constants/path';
import useUpdateDocument from '@hooks/fireStore/useUpdateDocument';
import { useQueryClient } from '@tanstack/react-query';
import FavoriteButton from '@components/@common/favoriteButton';

interface QuizItemProps {
	item: QuizListItem;
	categoryId: string;
}

const QuizItem = ({ item, categoryId }: QuizItemProps) => {
	const queryClient = useQueryClient();

	const { mutate: updateQuiz } = useUpdateDocument({
		path: `${FIRE_STORE.QUIZ}/${item.id}`,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['getCategoryQuizList', categoryId],
			});
		},
	});

	const favoriteClickHandler = () =>
		updateQuiz({
			data: {
				...item,
				favorite: Number(!item.favorite),
			},
		});

	return (
		<li className={styles.item} key={item.id}>
			<Link
				className={styles['quiz-title']}
				to={`${URL_PATH.QUIZ}?category=${categoryId}&quizId=${item.id}`}
			>
				<p>{item.quiz}</p>
			</Link>
			<div className={styles['info-container']}>
				{item.correctRate && (
					<span>{`${(item.correctRate * 100).toFixed(2)}%`}</span>
				)}
				<FavoriteButton
					isFavorite={Boolean(item.favorite)}
					onClick={favoriteClickHandler}
				/>
			</div>
		</li>
	);
};

export default QuizItem;
