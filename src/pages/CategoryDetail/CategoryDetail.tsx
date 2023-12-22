import { Header } from '@components/@common';
import QuizItem from '@components/quiz/quizItem/QuizItem';
import useGetCategoryQuizList from '@hooks/fireStore/useGetCategoryQuizList';
import useGetCurrentCategoryFromQuery from '@hooks/useGetCurrentCategoryFromQuery';
import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './categoryDetail.module.scss';
import useQuizIds from '@hooks/useQuizIds';

const CategoryDetail = () => {
	const params = useParams();

	const { updateQuizIds } = useQuizIds();

	const { category, goToCategoryPage } = useGetCurrentCategoryFromQuery(
		Number(params.id ?? 0)
	);

	if (!category) {
		goToCategoryPage();
		throw new Error('잘못된 접근입니다');
	}

	const { data: quizList } = useGetCategoryQuizList('yerim', category);

	useEffect(() => {
		// 테스트를 위함
		updateQuizIds(quizList.map((quiz) => quiz.id));
	}, [quizList]);

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
