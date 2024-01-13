import useCategoryInput from '@hooks/category/useCategoryInput';
import styles from './categoryInput.module.scss';
import type { Category } from '@models/quiz';

interface CategoryInputProps {
	category: Category[];
}

const CategoryInput = ({ category }: CategoryInputProps) => {
	const { categoryInput, inputChangeHandler, addCategoryHandler } =
		useCategoryInput(category);

	return (
		<div className={styles['add-category-container']}>
			<input
				className={styles['add-input']}
				placeholder='추가할 카테고리를 입력하세요'
				value={categoryInput}
				onChange={inputChangeHandler}
			/>
			<button
				className={styles['add-button']}
				type='submit'
				onClick={addCategoryHandler}
			>
				추가하기
			</button>
		</div>
	);
};

export default CategoryInput;
