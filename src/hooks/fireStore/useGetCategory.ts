import FireStore from '@fireStore/FireStore';
import type { Category } from '@models/quiz';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { DocumentData } from 'firebase/firestore';

const useGetCategory = () =>
	useSuspenseQuery<DocumentData[], Error, Category[]>({
		queryKey: ['category'],
		queryFn: () => FireStore.getDocInfos('yerim'),
		select: (data) => data.map(({ name, id }) => ({ name, id })),
	});

export default useGetCategory;
