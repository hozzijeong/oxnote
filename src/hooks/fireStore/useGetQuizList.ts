import { UserAnswer } from '@constants/form';
import { QUIZ_PATH } from '@constants/path';
import FireStore from '@fireStore/FireStore';
import useGetQuizListQueryKey from '@hooks/quiz/useGetQuizListQueryKey';
import useLocationQueryParams from '@hooks/useLocationQueryParams';
import { Category } from '@models/quiz';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
	DocumentData,
	QueryFieldFilterConstraint,
	QuerySnapshot,
	where,
} from 'firebase/firestore';

interface GetCategoryQuizListProps<V> {
	categoryId: Category['id'];
	selectHandler: (data: QuerySnapshot<DocumentData, DocumentData>) => V;
}

interface GetQuizListProps<V> {
	selectHandler: (data: QuerySnapshot<DocumentData, DocumentData>) => V;
}

// 현재 location에 있는 params를 활용해서 해당 값을 받아내는 hook
// 사실 params 중에서 quizId만을 제외하고 다 받을 수 있음.

const { YES, NONE } = UserAnswer;

const useGetQuizList = <V>(
	props: GetQuizListProps<V> | GetCategoryQuizListProps<V>
) => {
	const { getWholeURLParams } = useLocationQueryParams();

	const constrain: QueryFieldFilterConstraint[] = [];
	let queryKey: unknown[];

	const params = getWholeURLParams();

	if (params['category'] !== undefined) {
		constrain.push(
			where('category', 'in', [...params['category'].split(',')].map(Number))
		);
	}

	if ('categoryId' in props) {
		queryKey = ['getCategoryQuizList', props.categoryId];
	} else {
		/**
		 * *중요*
		 * 같은 필드에 한에서면 >= <= < >와 같은 비교 연산자 사용이 가능하다
		 * 따라서 정답률을 나누는 correctRate같은 경우에는 필터를 나중에 받도록 하자
		 */

		queryKey = [...useGetQuizListQueryKey()];

		// 좋아요 확인
		if (
			params['favorite'] !== undefined &&
			Number(params['favorite']) !== NONE
		) {
			constrain.push(
				where(
					'favorite',
					'==',
					Number(params['favorite']) === YES ? true : false
				)
			);
		}

		if (params['isFirst'] !== undefined) {
			const isFirst = Number(params['isFirst']) === YES;
			constrain.push(where('tryCount', '>=', isFirst ? 1 : 0));

			if (!isFirst) {
				if (
					params['recentCorrect'] !== undefined &&
					Number(params['recentCorrect']) !== NONE
				) {
					constrain.push(
						where(
							'recentCorrect',
							'==',
							Number(params['recentCorrect']) ? true : false
						)
					);
				}
			}
		}
	}

	return useSuspenseQuery<QuerySnapshot<DocumentData, DocumentData>, Error, V>({
		queryKey: queryKey,
		queryFn: async () => {
			return await FireStore.getQuerySnapShot(QUIZ_PATH, constrain);
		},
		select: props.selectHandler,
	});
};

export default useGetQuizList;
