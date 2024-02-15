import { invariantOf } from '@utils/invariantOf';
import useGetDocument from '../fireStore/useGetDocument';
import type { Category } from '@models/quiz';
import { FIRE_STORE } from '@constants/path';

const useGetCategory = () =>
	useGetDocument<Category[]>({
		path: FIRE_STORE.CATEGORY,
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
					}

					if (a.name > b.name) {
						return 1;
					}
					return 0;
				});

			return convertedData;
		},
	});

export default useGetCategory;
