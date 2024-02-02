import { invariantOf } from '@utils/invariantOf';
import useGetDocument from '../fireStore/useGetDocument';
import type { Category } from '@models/quiz';
import { CATEGORY_PATH } from '@constants/path';

const useGetCategory = () =>
	useGetDocument<Category[]>({
		path: CATEGORY_PATH,
		selectCallback: (data) => {
			const convertedArray = Object.entries(invariantOf(data)) as [
				number,
				string
			][];

			const convertedData = convertedArray
				.map(([id, name]) => ({
					id: Number(id),
					name,
				}))
				.sort((a, b) => {
					if (a.name < b.name) {
						return -1;
					} else if (a.name > b.name) {
						return 1;
					}
					return 0;
				});

			return convertedData;
		},
	});

export default useGetCategory;
