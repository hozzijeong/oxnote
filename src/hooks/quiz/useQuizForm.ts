import { MutateDocumentParams } from '@hooks/fireStore/useAddDocument';
import useConfirm from '@hooks/useConfirm';
import { DocumentData } from 'firebase/firestore';
import { useState } from 'react';

const converter = (type: string, value: string) => {
	switch (type) {
		case 'radio':
			return Number(value);
		case 'select-one':
			return Number(value);
		default:
			return value;
	}
};

interface QuizFormHookProps<T> {
	initialData: T;
	submitCallback: (params: MutateDocumentParams) => void;
	cancelCallback?: () => void;
}

const useQuizForm = <T extends DocumentData>({
	initialData,
	submitCallback,
	cancelCallback,
}: QuizFormHookProps<T>) => {
	const [quizState, setQuizState] = useState<T>(initialData);
	const confirm = useConfirm();

	const cancelHandler: React.MouseEventHandler<
		HTMLButtonElement
	> = async () => {
		const answer = await confirm({
			message: '여기서 취소하면 작성한 내용이 사라집니다. 취소하시겠습니까?',
		});

		if (answer) {
			cancelCallback && cancelCallback();
			setQuizState(initialData);
		}
	};

	const changeHandler = <T extends HTMLInputElement | HTMLTextAreaElement>(
		event: React.ChangeEvent<T>
	) => {
		const { name, value, type } = event.target;
		console.log(name, value, type);
		setQuizState((prev) => ({
			...prev,
			[name]: converter(type, value),
		}));
	};

	const selectHandler = <V>(key: string, value: V) => {
		setQuizState((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();

		submitCallback({ data: quizState });
	};

	return {
		cancelHandler,
		changeHandler,
		submitHandler,
		selectHandler,
		quizState,
	};
};

export default useQuizForm;
