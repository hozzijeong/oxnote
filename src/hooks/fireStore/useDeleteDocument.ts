import { useMutation } from '@tanstack/react-query';
import { MutateDocumentProps } from './useAddDocument';
import FireStore from '@fireStore/FireStore';

const useDeleteDocument = ({
	path,
	onSuccess,
	onError,
	onMutate,
	onSettled,
}: Omit<MutateDocumentProps<void, void>, 'lastId'>) =>
	useMutation({
		mutationKey: [`delete${path}`],
		mutationFn: async () => await FireStore.deleteDocument(path),
		onMutate,
		onSettled,
		onSuccess,
		onError,
	});

export default useDeleteDocument;
