import useGetQuizList from '@hooks/fireStore/useGetQuizList';
import useLocationQueryParams from '@hooks/useLocationQueryParams';
import { QuizInfo } from '@models/quiz';
import styles from './queryFilter.module.scss';
import { Link, Navigate } from 'react-router-dom';
import { URL_PATH } from '@constants/path';

const FilterParse = () => {
	const { getQueryParam, getCurrentParams, setQueryParam } =
		useLocationQueryParams();

	const { data } = useGetQuizList({
		selectHandler: (data) => {
			const result: QuizInfo['id'][] = [];

			data.forEach((value) => {
				const id = value.id;
				const data = value.data();
				const dataCorrectRate = data['correctRate'];

				try {
					const currentCorrectRate = getQueryParam('correctRate');
					if (dataCorrectRate <= Number(currentCorrectRate) / 100) {
						result.push(id);
					}
				} catch (e) {
					// 검사 조건에 correctRate가 없는 경우에는 일반적으로 추가함
					result.push(id);
				}
			});
			return result;
		},
	});

	if (data.length === 0) {
		return (
			<div className={styles['wrapper']}>
				<p className={styles['title']}>데이터와 일치하는 문제가 없습니다</p>
				<Link
					className={styles['back-button']}
					to={URL_PATH.QUIZ_FILTER}
					replace={true}
				>
					홈으로 돌아가기
				</Link>
			</div>
		);
	}

	setQueryParam('quizId', data[0]);

	return (
		<Navigate to={`${URL_PATH.QUIZ}?${getCurrentParams()}`} replace={true} />
	);
};

export default FilterParse;
