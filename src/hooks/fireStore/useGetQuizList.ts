import FireStore from '@fireStore/FireStore';
import type { Category } from '@models/quiz';
import { useSuspenseQuery } from '@tanstack/react-query';
import { DocumentData, QuerySnapshot, where } from 'firebase/firestore';

interface GetQuizListProps<V> {
	collectionId: string;
	filter: {
		category?: Category['id'] | null;
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
		queryFn: async () =>
			await FireStore.getQuerySnapShot(collectionId, 'Quiz/data', [
				where('category', '==', filter.category),
			]),
		select: selectHandler,
	});

export default useGetQuizList;
