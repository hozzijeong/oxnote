import { Header } from '@components/@common';
import QuizItem from '@components/quiz/quizItem/QuizItem';
import useGetQuizList from '@hooks/fireStore/useGetQuizList';
import useGetCurrentCategoryFromQuery from '@hooks/useGetCurrentCategoryFromQuery';
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import styles from './categoryDetail.module.scss';
import type { QuizListItem } from '@models/quiz';

const CategoryDetail = () => {
	const params = useParams();

	const { category, goToCategoryPage } = useGetCurrentCategoryFromQuery(
		Number(params.id ?? 0)
	);

	if (!category) {
		goToCategoryPage();
		throw new Error('잘못된 접근입니다');
	}

	const { data: quizList } = useGetQuizList<QuizListItem[]>({
		collectionId: 'yerim',
		filter: {
			category: [category.id],
		},
		selectHandler: (data) => {
			const result: QuizListItem[] = [];

			data.forEach((value) => {
				const id = value.id;
				const data = value.data();

				const { favorite, wrongCount, tryCount, quiz } = data;

				const item = {
					id,
					favorite,
					wrongCount,
					tryCount,
					quiz,
				};

				// 정답률이 나타나는 경우
				const finalItem =
					data.correctRate && tryCount !== 0
						? {
								...item,
								correctRate: data.correctRate,
						  }
						: item;

				result.push({
					...finalItem,
				});
			});

			return result;
		},
	});

	return (
		<Fragment>
			<Header title={category.name} backUrl={'CATEGORY'} />
			<main>
				<ul className={styles['quiz-list']}>
					{quizList.map((item) => (
						<QuizItem
							key={item.id}
							item={item}
							collectionId='yerim'
							categoryId={category.id}
						/>
					))}
				</ul>
			</main>
		</Fragment>
	);
};

export default CategoryDetail;
