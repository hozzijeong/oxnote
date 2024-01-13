import { QUIZ_PATH } from '@constants/path';
import FireStore from '@fireStore/FireStore';
import useGetQuizListQueryKey from '@hooks/quiz/useGetQuizListQueryKey';
import useLocationQueryParams from '@hooks/useLocationQueryParams';
import { Category } from '@models/quiz';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
	DocumentData,
	QueryConstraint,
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

const useGetQuizList = <V>(
	props: GetQuizListProps<V> | GetCategoryQuizListProps<V>
) => {
	const { getWholeURLParams } = useLocationQueryParams();

	const constrain: QueryConstraint[] = [];
	let queryKey: unknown[];

	if ('categoryId' in props) {
		queryKey = [props.categoryId];
		constrain.push(where('category', '==', props.categoryId));
	} else {
		queryKey = [...useGetQuizListQueryKey()];
		const params = getWholeURLParams();

		// 카테고리 중복 선언 가능
		if (params['category'] !== undefined) {
			constrain.push(where('category', 'in', [...params['category']]));
		}

		// 좋아요 확인
		if (params['favorite'] !== undefined) {
			constrain.push(
				where('favorite', '==', params['favorite'] ? true : false)
			);
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
