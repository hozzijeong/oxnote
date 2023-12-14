import FireStore from '@fireStore/FireStore';
import type { QuizInfo } from '@models/quiz';
import { useSuspenseQuery } from '@tanstack/react-query';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

interface QuizProps {
	collectionId: string;
	category: string;
	quizId: string;
}

const useGetQuiz = ({ collectionId, category, quizId }: QuizProps) =>
	useSuspenseQuery<
		QueryDocumentSnapshot<DocumentData, DocumentData>,
		Error,
		QuizInfo
	>({
		queryKey: [collectionId, category, quizId],
		queryFn: async () =>
			await FireStore.getQuizDoc(collectionId, category, quizId),
	});

export default useGetQuiz;
