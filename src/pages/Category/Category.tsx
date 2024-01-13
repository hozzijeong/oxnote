import styles from './category.module.scss';
import { Fragment, useMemo } from 'react';
import CategoryInput from '@components/category/categoryInput/CategoryInput';
import { Link, generatePath } from 'react-router-dom';
import { URL_PATH } from '@constants/path';

import Folder from '@assets/folder.svg';
import { Header } from '@components/@common';
import useGetCategory from '@hooks/category/useGetCategory';

const Category = () => {
	const { data: category } = useGetCategory();

	const categories = useMemo(
		() =>
			category.map(({ id, name }) => (
				<Link
					key={id}
					className={styles['category-folder']}
					to={generatePath(URL_PATH.CATEGORY_DETAIL, { id: String(id) })}
				>
					<img src={Folder} width={72} height={72} alt={`${name} 폴더`} />
					{name}
				</Link>
			)),
		[category]
	);

	return (
		<Fragment>
			<Header title='모아보기' />
			<main className={styles.main}>
				<CategoryInput category={category} />
				<section className={styles['category-container']}>{categories}</section>
			</main>
		</Fragment>
	);
};

export default Category;
