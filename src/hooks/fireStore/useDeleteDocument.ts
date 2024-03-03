import { useMutation } from '@tanstack/react-query';
import { MutateDocumentProps } from './useAddDocument';
import FireStore from '@fireStore/FireStore';
import useCurrentUser from '@hooks/auth/useCurrentUser';

const useDeleteDocument = ({
	path,
	onSuccess,
	onError,
	onMutate,
	onSettled,
}: Omit<MutateDocumentProps<void, void>, 'lastId'>) => {
	const { user } = useCurrentUser();

	return useMutation({
		mutationKey: [`delete${path}`],
		mutationFn: async () =>
			await FireStore.deleteDocument(`user/${user?.uid}/${path}`),
		onMutate,
		onSettled,
		onSuccess,
		onError,
	});
};

export default useDeleteDocument;
