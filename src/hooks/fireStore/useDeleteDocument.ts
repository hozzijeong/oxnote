import { useMutation } from '@tanstack/react-query';
import { MutateDocumentProps } from './useAddDocument';
import FireStore from '@fireStore/FireStore';

const useDeleteDocument = ({
	path,
	successCallback,
	errorCallback,
}: Omit<MutateDocumentProps, 'lastId'>) =>
	useMutation({
		mutationKey: [`delete${path}`],
		mutationFn: async (collectionId: string) =>
			await FireStore.deleteDocument(collectionId, path),
		onSuccess: () => successCallback && successCallback(),
		onError: () => errorCallback && errorCallback(),
	});

export default useDeleteDocument;
