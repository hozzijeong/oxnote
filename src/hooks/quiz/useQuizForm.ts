import { QUIZ_PATH, URL_PATH } from '@constants/path';
import type { QuizFormType, QuizInfo } from '@models/quiz';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAddDocument from '../fireStore/useAddDocument';

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
				movePrevPage(type);
			}
			setQuizState(initialData);
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

		if (type === 'add') {
			const { id, ...exceptQuizId } = { ...quizState };

			addQuiz({
				data: {
					...exceptQuizId,
				},
			});
		} else if (type === 'edit') {
			// editQuiz
			console.log('edit');
		}
	};

	return { cancelHandler, changeHandler, submitHandler, quizState };
};

export default useQuizForm;
