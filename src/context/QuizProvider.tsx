import { PropsWithChildren, createContext, useCallback, useState } from 'react';

export const QuizContext = createContext<{
	updateQuiz: (quizzes: Map<string, string>) => void;
	quizzes: Map<string, string>;
} | null>(null);

export const QuizProvider = ({ children }: PropsWithChildren) => {
	// 카테고리 id: 카테고리 이름으로 매핑 되어 있음
	const [quizMap, setQuizMap] = useState<Map<string, string>>(new Map());

	// 퀴즈에 값을 입력하는 역할
	const updateQuiz = (quizzes: Map<string, string>) =>
		useCallback(() => setQuizMap(quizzes), []);

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
