import FireStore from '@fireStore/FireStore';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { DocumentData } from 'firebase/firestore';

interface DocumentProps<T> {
	path: string;
	selectCallback?: (data: DocumentData) => T;
}

const useGetDocument = <T>({ path, selectCallback }: DocumentProps<T>) =>
	useSuspenseQuery<DocumentData, Error, T>({
		queryKey: [`get${path}`],
		queryFn: () => FireStore.getDocumentInfos(path),
		select: selectCallback,
	});

export default useGetDocument;
