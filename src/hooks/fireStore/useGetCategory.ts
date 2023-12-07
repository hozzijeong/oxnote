import FireStore from '@fireStore/FireStore';
import type { Category } from '@models/quiz';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { DocumentData } from 'firebase/firestore';

const useGetCategory = (collectionId = 'yerim') =>
	useSuspenseQuery<DocumentData[], Error, Category[]>({
		queryKey: [collectionId],
		queryFn: () => FireStore.getDocInfos(collectionId),
		select: (data) => data.map(({ name, id }) => ({ name, id })),
	});

export default useGetCategory;
