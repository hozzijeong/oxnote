import type { QuizListItem } from '@models/quiz';
import styles from './quizItem.module.scss';
import { Link } from 'react-router-dom';
import { URL_PATH } from '@constants/path';
import StarFill from '@assets/star_fill.svg';
import StarEmpty from '@assets/star_empty.svg';
import useUpdateDocument from '@hooks/fireStore/useUpdateDocument';
import { useQueryClient } from '@tanstack/react-query';

interface QuizItemProps {
	item: QuizListItem;
	collectionId: string;
	categoryId: number;
}

const QuizItem = ({ item, collectionId, categoryId }: QuizItemProps) => {
	const queryClient = useQueryClient();

	const { mutate: updateQuiz } = useUpdateDocument({
		path: `Quiz/data/${item.id}`,
		// 여기서 데이터 업데이트 구현하기
		successCallback: () => {
			queryClient.invalidateQueries({ queryKey: [collectionId, categoryId] });
		},
	});

	const favoriteClickHandler = () =>
		updateQuiz({
			collectionId,
			data: {
				...item,
				favorite: !item.favorite,
			},
		});

	return (
		<li className={styles.item} key={item.id}>
			<Link
				className={styles['quiz-title']}
				to={`${URL_PATH.QUIZ}?categoryId=${categoryId}&quizId=${item.id}`}
			>
				<p>{item.quiz}</p>
			</Link>
			<div className={styles['info-container']}>
				{item.correctRate && (
					<span>{`${(item.correctRate * 100).toFixed(2)}%`}</span>
				)}
				<button type='button' onClick={favoriteClickHandler}>
					<img
						src={item.favorite ? StarFill : StarEmpty}
						width={24}
						height={24}
						alt='즐겨찾기 등록/해제'
					/>
				</button>
			</div>
		</li>
	);
};

export default QuizItem;
