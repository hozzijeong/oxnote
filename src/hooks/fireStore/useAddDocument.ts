import FireStore from '@fireStore/FireStore';
import { MutationOptions, useMutation } from '@tanstack/react-query';
import { DocumentData } from 'firebase/firestore';

export interface MutateDocumentParams {
	data: DocumentData;
}

export interface MutateDocumentProps<TData, TVariable>
	extends MutationOptions<TData, Error, TVariable> {
	path: string;
	lastId?: string;
}

const useAddDocument = ({
	onSuccess,
	onError,
	path,
	lastId = '',
}: MutateDocumentProps<void, MutateDocumentParams>) =>
	useMutation<void, Error, MutateDocumentParams>({
		mutationKey: [`add${path}${lastId}`],
		mutationFn: ({ data }: MutateDocumentParams) =>
			FireStore.addDocumentData({
				path,
				lastId,
				data,
			}),
		onSuccess,
		onError,
	});

export default useAddDocument;
