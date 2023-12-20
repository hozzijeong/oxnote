import FireStore from '@fireStore/FireStore';
import { useMutation } from '@tanstack/react-query';
import { MutateDocumentParams, MutateDocumentProps } from './useAddDocument';

const useUpdateDocument = ({
	path,
	successCallback,
	errorCallback,
}: Omit<MutateDocumentProps, 'lastId'>) =>
	useMutation({
		mutationKey: [`update${path}`],
		mutationFn: async ({ collectionId, data }: MutateDocumentParams) =>
			await FireStore.updateDocumentData(collectionId, path, data),
		onSuccess: () => successCallback && successCallback(),
		onError: () => errorCallback && errorCallback(),
	});

export default useUpdateDocument;
