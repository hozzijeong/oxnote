import { URL_PATH } from '@constants/path';
import { Quiz } from '@models/quiz';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { INITIAL_QUIZ } from '@constants/quiz';
import useAddQuiz from './fireStore/useAddQuiz';

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

const useQuizForm = (initialData = INITIAL_QUIZ) => {
	const navigate = useNavigate();

	const [quizState, setQuizState] = useState<Quiz>(initialData);
	const { mutate: addQuiz } = useAddQuiz({
		successCallback: () => {
			const answer = confirm(
				'문제 등록에 성공했습니다 홈으로 이동하시겠습니까?'
			);

			if (answer) navigate(URL_PATH.HOME);

			setQuizState(initialData);
		},
	});

	const cancelHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
		const answer = confirm(
			'여기서 취소하면 작성한 내용이 사라집니다. 취소하시겠습니까?'
		);

		if (answer) {
			navigate(URL_PATH.HOME);
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

		addQuiz({
			collectionId: 'yerim',
			data: {
				...quizState,
				recentCorrect: false, // 최근 문제 시도
				correctCount: 0, // 맞힌 문제
				wrongCount: 0, // 틀린 문제
			},
		});
	};

	return { cancelHandler, changeHandler, submitHandler, quizState };
};

export default useQuizForm;
