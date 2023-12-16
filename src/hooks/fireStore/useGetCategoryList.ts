import FireStore from '@fireStore/FireStore';
import type { Category } from '@models/quiz';
import { useSuspenseQuery } from '@tanstack/react-query';
import { invariantOf } from '@utils/invariantOf';
import type { DocumentData } from 'firebase/firestore';

const useGetCategory = (collectionId = 'yerim') =>
	useSuspenseQuery<DocumentData, Error, Category[]>({
		queryKey: [collectionId],
		queryFn: () => FireStore.getDocInfos(collectionId, 'Category'),
		select: (data) => {
			// TODO: 이게 솔직히 맞는지 모르겠음. 여기서 타입을 number로 지정한다고 해서 값이 number로 변하는게 아님;;
			const convertedArray = Object.entries(invariantOf(data)) as [
				number,
				string
			][];

			const convertedData = convertedArray.map(([id, name]) => ({
				id: Number(id),
				name,
			}));

			return convertedData;
		},
	});

export default useGetCategory;
