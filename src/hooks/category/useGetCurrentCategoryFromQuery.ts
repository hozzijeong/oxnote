// 그냥 기존에 있던 값을 토대로 여러번 쿼리 호출하는게 나을 것 같음.

import { URL_PATH } from '@constants/path';
import { useNavigate } from 'react-router-dom';
import useGetCategory from './useGetCategory';

const useGetCurrentCategoryFromQuery = (categoryId: string) => {
	const navigate = useNavigate();

	const goToCategoryPage = () => navigate(URL_PATH.CATEGORY, { replace: true });

	const { data: categories } = useGetCategory();

	const category = categories?.find(({ id }) => id === categoryId);

	return { category, goToCategoryPage };
};

export default useGetCurrentCategoryFromQuery;
