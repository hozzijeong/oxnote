import FireStore from '@fireStore/FireStore';
import type { Category, QuizInfo } from '@models/quiz';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
	DocumentData,
	QueryConstraint,
	QuerySnapshot,
	where,
} from 'firebase/firestore';

interface GetQuizListProps<V> {
	collectionId: string;
	filter: {
		category?: Category['id'][];
		favorite?: QuizInfo['favorite'];
	};
	selectHandler: (data: QuerySnapshot<DocumentData, DocumentData>) => V;
}

const useGetQuizList = <V>({
	collectionId,
	filter = {},
	selectHandler,
}: GetQuizListProps<V>) =>
	useSuspenseQuery<QuerySnapshot<DocumentData, DocumentData>, Error, V>({
		queryKey: [collectionId, filter.category],
		queryFn: async () => {
			const { category, favorite } = filter;
			const constrain: QueryConstraint[] = [];

			// 카테고리 중복 선언 가능
			if (category !== undefined) {
				constrain.push(where('category', 'in', [...category]));
			}

			// 좋아요 확인
			if (favorite !== undefined) {
				constrain.push(where('favorite', '==', favorite ? true : false));
			}

			return await FireStore.getQuerySnapShot(
				collectionId,
				'Quiz/data',
				constrain
			);
		},
		select: selectHandler,
	});

export default useGetQuizList;
