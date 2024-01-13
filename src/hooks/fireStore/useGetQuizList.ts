import { QUIZ_PATH } from '@constants/path';
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
	filter: {
		category?: Category['id'][];
		favorite?: QuizInfo['favorite'];
	};
	selectHandler: (data: QuerySnapshot<DocumentData, DocumentData>) => V;
}

const useGetQuizList = <V>({
	filter = {},
	selectHandler,
}: GetQuizListProps<V>) =>
	useSuspenseQuery<QuerySnapshot<DocumentData, DocumentData>, Error, V>({
		queryKey: [...(filter.category ?? '')],
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

			return await FireStore.getQuerySnapShot(QUIZ_PATH, constrain);
		},
		select: selectHandler,
	});

export default useGetQuizList;
