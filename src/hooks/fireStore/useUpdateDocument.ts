import FireStore from '@fireStore/FireStore';
import { useMutation } from '@tanstack/react-query';
import { MutateDocumentParams, MutateDocumentProps } from './useAddDocument';

const useUpdateDocument = ({
	path,
	onError,
	onSuccess,
}: Omit<MutateDocumentProps<void, MutateDocumentParams>, 'lastId'>) =>
	useMutation({
		mutationKey: [`update${path}`],
		mutationFn: async ({ data }: MutateDocumentParams) =>
			await FireStore.updateDocumentData(path, data),
		onSuccess,
		onError,
	});

export default useUpdateDocument;
