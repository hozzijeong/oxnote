import FireStore from '@fireStore/FireStore';
import type { QuizListItem } from '@models/quiz';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { DocumentData, QuerySnapshot } from 'firebase/firestore';

const useGetCategoryList = (collectionId = 'yerim', categoryId: number) =>
	useSuspenseQuery<
		QuerySnapshot<DocumentData, DocumentData>,
		Error,
		QuizListItem[]
	>({
		queryKey: ['categoryList', categoryId],
		queryFn: async () =>
			await FireStore.getCategoryQuizList(collectionId, categoryId),
		select: (data) => {
			const result: QuizListItem[] = [];

			data.forEach((value) => {
				const { quiz, favorite, id, correctCount, wrongCount } = value.data();
				const tryCount = correctCount + wrongCount;
				const wrongPercent =
					tryCount === 0 ? '0' : ((wrongCount / tryCount) * 100).toFixed(2);

				result.push({
					quiz,
					favorite,
					id,
					correctCount,
					wrongCount,
					wrongPercent: `${wrongPercent}%`,
				});
			});

			return result;
		},
	});

export default useGetCategoryList;
