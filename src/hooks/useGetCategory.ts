import { invariantOf } from '@utils/invariantOf';
import useGetDocument from './fireStore/useGetDocument';
import type { Category } from '@models/quiz';

const useGetCategory = () =>
	useGetDocument<Category[]>({
		collectionId: 'yerim',
		path: 'Category',
		selectCallback: (data) => {
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
