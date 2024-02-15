import { Category } from '@models/quiz';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import useUpdateDocument from '../fireStore/useUpdateDocument';
import useConfirm from '@hooks/useConfirm';
import useToast from '@hooks/useToast';
import { FIRE_STORE } from '@constants/path';

const useCategoryInput = (categories: Category[]) => {
	const queryClient = useQueryClient();
	const [categoryInput, setCategoryInput] = useState('');

	const { addToast } = useToast();
	const confirm = useConfirm();

	const { mutate: addCategory } = useUpdateDocument({
		path: FIRE_STORE.CATEGORY,
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: [`get${FIRE_STORE.CATEGORY}`],
			});
		},
	});

	const inputChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
		event
	) => {
		setCategoryInput(event.target.value);
	};

	const addCategoryHandler: React.MouseEventHandler<HTMLButtonElement> = async (
		event
	) => {
		event.preventDefault();

		if (categories.find((val) => val.name === categoryInput)) {
			addToast({
				type: 'info',
				message: '이미 존재하는 카테고리입니다. 다시 입력해주세요',
			});

			return;
		}

		const result = await confirm({
			title: '카테고리 추가',
			message: `${categoryInput}으로 입력하면 변경이 불가능합니다. 추가하시겠습니까?`,
		});

		if (result) {
			const date = Date.now();

			addCategory({
				data: {
					[date]: categoryInput,
				},
			});

			setCategoryInput('');
		}
	};

	return { categoryInput, inputChangeHandler, addCategoryHandler };
};

export default useCategoryInput;
