import FireStore from '@fireStore/FireStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { DocumentData } from 'firebase/firestore';

const useQuizUpdate = (
	collectionId = 'yerim',
	category: string,
	quizId: string
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: [collectionId, category, quizId],
		mutationFn: async (updateData: DocumentData) =>
			await FireStore.updateQuizData(
				collectionId,
				category,
				quizId,
				updateData
			),

		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [collectionId, category] });
		},
	});
};

export default useQuizUpdate;
