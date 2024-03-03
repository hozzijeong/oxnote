import FireStore from '@fireStore/FireStore';
import useCurrentUser from '@hooks/auth/useCurrentUser';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { DocumentData } from 'firebase/firestore';

interface DocumentProps<T> {
	path: string;
	selectCallback?: (data: DocumentData) => T;
}

const useGetDocument = <T>({ path, selectCallback }: DocumentProps<T>) => {
	const { user } = useCurrentUser();

	return useSuspenseQuery<DocumentData, Error, T>({
		queryKey: [`get${path}`],
		queryFn: () => FireStore.getDocumentInfos(`user/${user?.uid}/${path}`),
		select: selectCallback,
	});
};

export default useGetDocument;
