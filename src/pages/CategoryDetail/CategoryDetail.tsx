import { Header } from '@components/@common';
import QuizItem from '@components/quiz/quizItem/QuizItem';
import useGetQuizList from '@hooks/fireStore/useGetQuizList';
import useGetCurrentCategoryFromQuery from '@hooks/category/useGetCurrentCategoryFromQuery';
import { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './categoryDetail.module.scss';
import type { QuizListItem } from '@models/quiz';
import { URL_PATH } from '@constants/path';

const CategoryDetail = () => {
	const params = useParams();

	const { category, goToCategoryPage } = useGetCurrentCategoryFromQuery(
		params.id ?? ''
	);

	if (!category) {
		goToCategoryPage();
		throw new Error('잘못된 접근입니다');
	}

	const { data: quizList } = useGetQuizList<QuizListItem[]>({
		categoryId: category.id,
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
				{quizList.length === 0 ? (
					<div className={styles['empty-container']}>
						<p>아직 등록된 문제가 없습니다</p>
						<Link className={styles['form-link']} to={URL_PATH.QUIZ_FORM}>
							등록하러 가기
						</Link>
					</div>
				) : (
					<ul className={styles['quiz-list']}>
						{quizList.map((item) => (
							<QuizItem key={item.id} item={item} categoryId={category.id} />
						))}
					</ul>
				)}
			</main>
		</Fragment>
	);
};

export default CategoryDetail;
