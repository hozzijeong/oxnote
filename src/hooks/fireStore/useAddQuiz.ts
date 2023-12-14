import FireStore from '@fireStore/FireStore';
import { useMutation } from '@tanstack/react-query';
import { DocumentData } from 'firebase/firestore';

interface AddQuizParams {
	collectionId: string;
	category: string;
	data: DocumentData;
}

interface AddQuizProps {
	successCallback?: () => void;
	errorCallback?: () => void;
}

const useAddQuiz = ({ successCallback, errorCallback }: AddQuizProps = {}) =>
	useMutation({
		mutationKey: ['addQuiz'],
		mutationFn: (params: AddQuizParams) =>
			FireStore.addData(params.collectionId, params.category, params.data),
		onSuccess: () => successCallback && successCallback(),
		onError: () => errorCallback && errorCallback(),
	});

export default useAddQuiz;
