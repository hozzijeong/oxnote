import FireStore from '@fireStore/FireStore';
import useCurrentUser from '@hooks/auth/useCurrentUser';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { DocumentData, QuerySnapshot } from 'firebase/firestore';

interface SnapshotProps<T> {
	path: string;
	selectCallback?: (data: QuerySnapshot<DocumentData, DocumentData>) => T;
}

const useGetSnapshot = <T>({ path, selectCallback }: SnapshotProps<T>) => {
	const { user } = useCurrentUser();

	return useSuspenseQuery<QuerySnapshot<DocumentData, DocumentData>, Error, T>({
		queryKey: [`get${path}`],
		queryFn: () => FireStore.getQuerySnapShot(`user/${user?.uid}/${path}`, []),
		select: selectCallback,
	});
};

export default useGetSnapshot;
