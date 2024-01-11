import { QuizInfo } from '@models/quiz';
import { useCallback, useContext } from 'react';
import { QuizContext } from 'src/context/QuizProvider';

const useQuizIds = () => {
	const quizContext = useContext(QuizContext);

	if (quizContext === null)
		throw new Error('QuizProvider 내부에서 사용할 수 있습니다');

	const { quizIds, updateQuizIds } = quizContext;

	const deleteQuiz = useCallback(
		(quizId: QuizInfo['id']) =>
			updateQuizIds(quizIds.filter((id) => id !== quizId)),
		[quizIds]
	);

	return {
		quizIds,
		updateQuizIds,
		deleteQuizId: deleteQuiz,
	};
};

export default useQuizIds;
