import FireStore from '@fireStore/FireStore';
import { useMutation } from '@tanstack/react-query';
import { DocumentData } from 'firebase/firestore';

export interface MutateDocumentParams {
	collectionId: string;
	data: DocumentData;
}

export interface MutateDocumentProps {
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
}: MutateDocumentProps) =>
	useMutation({
		mutationKey: [`add${path}${lastId}`],
		mutationFn: ({ collectionId, data }: MutateDocumentParams) =>
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
