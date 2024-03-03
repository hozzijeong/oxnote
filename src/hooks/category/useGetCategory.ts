import type { Category } from '@models/quiz';
import { FIRE_STORE } from '@constants/path';
import useGetSnapshot from '@hooks/fireStore/useGetSnapshot';

const useGetCategory = () => {
	return useGetSnapshot<Category[]>({
		path: `${FIRE_STORE.CATEGORY}`,
		selectCallback: (data) => {
			if (data.empty) return [];

			const result: Category[] = [];

			data.forEach((d) => {
				const value = d.data();
				result.push({
					id: d.id,
					name: value.name,
				});
			});

			return result.sort((a, b) => {
				if (a.name < b.name) {
					return -1;
				}

				if (a.name > b.name) {
					return 1;
				}
				return 0;
			});
		},
	});
};

export default useGetCategory;
