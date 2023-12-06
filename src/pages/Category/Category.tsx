import useGetCategory from '@hooks/fireStore/useGetCategory';
import styles from './category.module.scss';
import { useMemo } from 'react';
import CategoryInput from '@components/category/categoryInput/CategoryInput';
import { Link, generatePath } from 'react-router-dom';
import { URL_PATH } from '@constants/path';

import Folder from '@assets/folder.svg';

const Category = () => {
	const { data: category } = useGetCategory();

	const categories = useMemo(
		() =>
			category.map((name) => (
				<Link
					className={styles['category-folder']}
					to={generatePath(URL_PATH.CATEGORY_DETAIL, { id: name })}
				>
					<img src={Folder} width={72} height={72} alt={`${name} 폴더`} />
					{name}
				</Link>
			)),
		[category]
	);

	return (
		<main className={styles.main}>
			<CategoryInput category={category} />
			<section className={styles['category-container']}>{categories}</section>
		</main>
	);
};

export default Category;
