import { QUIZ_PATH, URL_PATH } from '@constants/path';
import type { QuizFormType, QuizInfo } from '@models/quiz';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAddDocument from '../fireStore/useAddDocument';
import useUpdateDocument from '@hooks/fireStore/useUpdateDocument';
import { useQueryClient } from '@tanstack/react-query';

const converter = (type: string, value: string) => {
	switch (type) {
		case 'radio':
			return Boolean(Number(value));
		case 'select-one':
			return Number(value);
		default:
			return value;
	}
};

interface QuizFormHookProps {
	type: QuizFormType;
	initialData: QuizInfo;
}

const useQuizForm = ({ type, initialData }: QuizFormHookProps) => {
	const navigate = useNavigate();

	const [quizState, setQuizState] = useState<QuizInfo>(initialData);

	const queryClient = useQueryClient();

	const movePrevPage = (type: QuizFormType) => {
		if (type === 'add') {
			navigate(URL_PATH.HOME);
		} else if (type === 'edit') {
			navigate(-1);
		}
	};

	const { mutate: addQuiz } = useAddDocument({
		path: QUIZ_PATH,
		onSuccess: () => {
			const answer = confirm(
				'문제 등록에 성공했습니다 홈으로 이동하시겠습니까?'
			);
			if (answer) {
				navigate(URL_PATH.HOME);
			}
			setQuizState(initialData);
		},
	});

	const { mutate: updateQuiz } = useUpdateDocument({
		path: `${QUIZ_PATH}/${quizState.id}`,
		onSuccess: () => {
			const answer = confirm('문제 수정에 성공했습니다!');

			// 여기서 queryInvalidate 해줌. 문제는 category가 변경되면 어떡하냐... 이거임;;
			// category가 변경되면 해당 카테고리에 이 quizId는 존재하지 않는게 되어버림.
			// 그렇다면 업데이트를 하고나서 따로 변경을 해야하나?
			queryClient.invalidateQueries({
				queryKey: [`get${QUIZ_PATH}/${quizState.id}`],
			});

			if (answer) {
				navigate(-1);
			}
		},
	});

	const cancelHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
		const answer = confirm(
			'여기서 취소하면 작성한 내용이 사라집니다. 취소하시겠습니까?'
		);

		if (answer) {
			movePrevPage(type);
		}

		setQuizState(initialData);
	};

	const changeHandler = <
		T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
	>(
		event: React.ChangeEvent<T>
	) => {
		const { name, value, type } = event.target;

		setQuizState((prev) => ({
			...prev,
			[name]: converter(type, value),
		}));
	};

	const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		const { id, ...exceptQuizId } = { ...quizState };

		if (type === 'add') {
			addQuiz({
				data: {
					...exceptQuizId,
				},
			});
		} else if (type === 'edit') {
			updateQuiz({
				data: {
					...exceptQuizId,
				},
			});
		}
	};

	return { cancelHandler, changeHandler, submitHandler, quizState };
};

export default useQuizForm;
