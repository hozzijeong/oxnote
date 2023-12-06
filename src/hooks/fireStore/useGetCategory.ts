import FireStore from '@fireStore/FireStore';
import { useSuspenseQuery } from '@tanstack/react-query';

const useGetCategory = () =>
	useSuspenseQuery({
		queryKey: ['category'],
		queryFn: () => FireStore.getCategories('yerim'),
	});

export default useGetCategory;
