import { Header } from '@components/@common';
import QuizItem from '@components/quiz/quizItem/QuizItem';
import useGetCategoryList from '@hooks/fireStore/useGetCategoryList';
import useGetCurrentCategoryFromQuery from '@hooks/useGetCurrentCategoryFromQuery';
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import styles from './categoryDetail.module.scss';

const CategoryDetail = () => {
	const params = useParams();

	const { category, goToCategoryPage } = useGetCurrentCategoryFromQuery(
		Number(params.id ?? 0)
	);

	if (!category) {
		goToCategoryPage();
		throw new Error('잘못된 접근입니다');
	}

	const { data: quizList } = useGetCategoryList('yerim', category);

	return (
		<Fragment>
			<Header title={category.name} backUrl={'CATEGORY'} />
			<main>
				<ul className={styles['quiz-list']}>
					{quizList.map((item) => (
						<QuizItem key={item.id} item={item} />
					))}
				</ul>
			</main>
		</Fragment>
	);
};

export default CategoryDetail;
