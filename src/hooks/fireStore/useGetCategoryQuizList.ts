import FireStore from '@fireStore/FireStore';
import type { Category, QuizListItem } from '@models/quiz';
import { useSuspenseQuery } from '@tanstack/react-query';
import { DocumentData, QuerySnapshot, where } from 'firebase/firestore';

const useGetCategoryQuizList = (collectionId: string, category: Category) =>
	useSuspenseQuery<
		QuerySnapshot<DocumentData, DocumentData>,
		Error,
		QuizListItem[]
	>({
		queryKey: [collectionId, category.id],
		queryFn: async () =>
			await FireStore.getQuerySnapShot(collectionId, 'Quiz/data', [
				where('category', '==', category.id),
			]),
		select: (data) => {
			const result: QuizListItem[] = [];

			data.forEach((value) => {
				const id = value.id;
				const data = value.data();

				const { favorite, wrongCount, tryCount, quiz } = data;

				const item = {
					id,
					favorite,
					wrongCount,
					tryCount,
					quiz,
				};

				// 정답률이 나타나는 경우
				const finalItem =
					data.correctRate && tryCount !== 0
						? {
								...item,
								correctRate: data.correctRate,
						  }
						: item;

				result.push({
					...finalItem,
				});
			});

			return result;
		},
	});

export default useGetCategoryQuizList;
