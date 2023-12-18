import type { QuizInfo } from '@models/quiz';
import { PropsWithChildren, createContext, useCallback, useState } from 'react';

export const QuizContext = createContext<{
	updateQuiz: (quizzes: QuizInfo['id'][]) => void;
	quizzes: QuizInfo['id'][];
} | null>(null);

export const QuizProvider = ({ children }: PropsWithChildren) => {
	// quizId를 매핑 내가 접근한 퀴즈 id를 저장하고 이 값들을 기반으로 다음, 이전으로 넘어감.
	const [quizMap, setQuizMap] = useState<QuizInfo['id'][]>([]);

	// 퀴즈에 값을 입력하는 역할
	const updateQuiz = useCallback(
		(quizIds: QuizInfo['id'][]) => setQuizMap(quizIds),
		[]
	);

	return (
		<QuizContext.Provider
			value={{
				quizzes: quizMap,
				updateQuiz,
			}}
		>
			{children}
		</QuizContext.Provider>
	);
};
