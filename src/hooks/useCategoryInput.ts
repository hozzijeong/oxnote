import FireStore from '@fireStore/FireStore';
import { Category } from '@models/quiz';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const useCategoryInput = (categories: Category[]) => {
	const queryClient = useQueryClient();
	const [categoryInput, setCategoryInput] = useState('');

	const inputChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
		event
	) => {
		setCategoryInput(event.target.value);
	};

	const addCategoryHandler: React.MouseEventHandler<HTMLButtonElement> = (
		event
	) => {
		event.preventDefault();

		if (categories.find((val) => val.name === categoryInput)) {
			alert('이미 존재하는 카테고리입니다. 다시 입력해주세요');
			return;
		}

		const result = confirm(
			`${categoryInput}으로 입력하면 변경이 불가능합니다. 추가하시겠습니까?`
		);

		if (result) {
			FireStore.addCategory('yerim', categoryInput);
			queryClient.invalidateQueries({ queryKey: ['category'] });
			setCategoryInput('');
		}
	};

	return { categoryInput, inputChangeHandler, addCategoryHandler };
};

export default useCategoryInput;
