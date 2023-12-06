import useGetCategory from '@hooks/fireStore/useGetCategory';
import styles from './category.module.scss';
import { useMemo } from 'react';
import CategoryInput from '@components/category/categoryInput/CategoryInput';

const Category = () => {
	const { data: category } = useGetCategory();

	const categories = useMemo(
		() => category.map((name) => <div>{name}</div>),
		[category]
	);

	return (
		<main className={styles.main}>
			<CategoryInput category={category} />
			<section>{categories}</section>
		</main>
	);
};

export default Category;
