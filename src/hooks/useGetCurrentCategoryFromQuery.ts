// categoryId를 통해 카테고리를 찾는 메서드. 단, 기존에 카테고리를 요청한게 있어야함 없으면 category로 되돌아가도록 설정
// 새로고침하면 문제가 생김... 이거는 특단의 조치가 나타나야 할듯

import { URL_PATH } from '@constants/path';
import { useNavigate } from 'react-router-dom';
import useGetCategory from './fireStore/useGetCategory';

const useGetCurrentCategoryFromQuery = (categoryId: number) => {
	const navigate = useNavigate();

	const goToCategoryPage = () => navigate(URL_PATH.CATEGORY, { replace: true });

	const { data: categories } = useGetCategory();

	const category = categories?.find(({ id }) => id === categoryId);

	return { category, goToCategoryPage };
};

export default useGetCurrentCategoryFromQuery;
