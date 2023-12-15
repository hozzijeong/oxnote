import FireStore from '@fireStore/FireStore';
import type { Category } from '@models/quiz';
import { useSuspenseQuery } from '@tanstack/react-query';
import { invariantOf } from '@utils/invariantOf';
import type { DocumentData } from 'firebase/firestore';

const useGetCategory = (collectionId = 'yerim') =>
	useSuspenseQuery<DocumentData, Error, Category[]>({
		queryKey: [collectionId],
		queryFn: () => FireStore.getDocInfos(collectionId),
		select: (data) => {
			// TODO: 이게 솔직히 맞는지 모르겠음.
			const convertedArray = Object.entries(invariantOf(data)) as [
				number,
				string
			][];

			const convertedData = convertedArray.map(([id, name]) => ({ id, name }));

			return convertedData;
		},
	});

export default useGetCategory;
