import FireStore from '@fireStore/FireStore';
import { useMutation } from '@tanstack/react-query';
import { MutateDocumentParams, MutateDocumentProps } from './useAddDocument';
import useCurrentUser from '@hooks/auth/useCurrentUser';

const useUpdateDocument = ({
	path,
	onError,
	onSuccess,
}: Omit<MutateDocumentProps<void, MutateDocumentParams>, 'lastId'>) => {
	const { user } = useCurrentUser();

	return useMutation({
		mutationKey: [`update${path}`],
		mutationFn: async ({ data }: MutateDocumentParams) => {
			console.log(`user/${user?.uid}/${path}`, data);
			await FireStore.updateDocumentData(`user/${user?.uid}/${path}`, data);
		},
		onSuccess,
		onError,
	});
};

export default useUpdateDocument;
