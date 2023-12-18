import FireStore from '@fireStore/FireStore';
import { useMutation } from '@tanstack/react-query';
import { DocumentData } from 'firebase/firestore';

interface AddDocumentParams {
	collectionId: string;
	data: DocumentData;
}

interface AddDocumentProps {
	path: string;
	lastId?: string;
	successCallback?: () => void;
	errorCallback?: () => void;
}

const useAddDocument = ({
	successCallback,
	errorCallback,
	path,
	lastId = '',
}: AddDocumentProps) =>
	useMutation({
		mutationKey: [`add${path}${lastId}`],
		mutationFn: ({ collectionId, data }: AddDocumentParams) =>
			FireStore.addDocumentData({
				collectionId,
				path,
				lastId,
				data,
			}),
		onSuccess: () => successCallback && successCallback(),
		onError: () => errorCallback && errorCallback(),
	});

export default useAddDocument;
