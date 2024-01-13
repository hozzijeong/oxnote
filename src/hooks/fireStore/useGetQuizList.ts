import { QUIZ_PATH } from '@constants/path';
import FireStore from '@fireStore/FireStore';
import useGetQuizListQueryKey from '@hooks/quiz/useGetQuizListQueryKey';
import useLocationQueryParams from '@hooks/useLocationQueryParams';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
	DocumentData,
	QueryConstraint,
	QuerySnapshot,
	where,
} from 'firebase/firestore';

interface GetQuizListProps<V> {
	selectHandler: (data: QuerySnapshot<DocumentData, DocumentData>) => V;
}

// 현재 location에 있는 params를 활용해서 해당 값을 받아내는 hook
// 사실 params 중에서 quizId만을 제외하고 다 받을 수 있음.

const useGetQuizList = <V>({ selectHandler }: GetQuizListProps<V>) => {
	const queryKey = useGetQuizListQueryKey();

	const { getWholeURLParams } = useLocationQueryParams();

	return useSuspenseQuery<QuerySnapshot<DocumentData, DocumentData>, Error, V>({
		queryKey: [...queryKey],
		queryFn: async () => {
			const params = getWholeURLParams();
			const constrain: QueryConstraint[] = [];

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

			return await FireStore.getQuerySnapShot(QUIZ_PATH, constrain);
		},
		select: selectHandler,
	});
};

export default useGetQuizList;
