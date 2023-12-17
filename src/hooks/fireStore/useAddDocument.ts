import FireStore from '@fireStore/FireStore';
import { useMutation } from '@tanstack/react-query';
import { DocumentData } from 'firebase/firestore';

interface AddQuizParams {
	collectionId: string;
	data: DocumentData;
}

interface AddCategoryParams {
	collectionId: string;
	data: string;
}

type MutationParams = AddQuizParams | AddCategoryParams;

interface AddDocumentProps {
	path: string;
	successCallback?: () => void;
	errorCallback?: () => void;
}

const useAddDocument = ({
	successCallback,
	errorCallback,
	path,
}: AddDocumentProps) =>
	useMutation({
		mutationKey: [`add${path}`],
		mutationFn: (params: MutationParams) =>
			FireStore.addDocumentData(params.collectionId, path, params.data),
		onSuccess: () => successCallback && successCallback(),
		onError: () => errorCallback && errorCallback(),
	});

export default useAddDocument;
