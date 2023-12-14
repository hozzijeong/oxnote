import { useCallback, useContext, useEffect } from 'react';

import { QuizContext } from 'src/context/QuizProvider';

const useQuizInfo = () => {
	const quizContext = useContext(QuizContext);

	if (quizContext === null)
		throw new Error('QuizProvider 내부에서 사용할 수 있습니다');

	const { quizzes, updateQuiz } = quizContext;

	const getCategory = useCallback((id: string) => quizzes.get(id), [quizzes]);

	// 현재 id에 맞는 퀴즈와 퀴즈를 update할 수 있음.
	// 근데 만약에 퀴즈 페이지를 보고 있는데 새로고침을 한다면 어떻게 해야함? 데이터 캐싱이 안될텐데;

	const beforeUnLoadHandler = useCallback((event: BeforeUnloadEvent) => {
		event.preventDefault();

		return (event.returnValue = '');
	}, []);

	useEffect(() => {
		window.addEventListener('beforeunload', beforeUnLoadHandler, {
			capture: true,
		});

		return () => {
			window.removeEventListener('beforeunload', beforeUnLoadHandler, {
				capture: true,
			});
		};
	}, []);

	return {
		getCategory,
		updateQuiz,
	};
};

export default useQuizInfo;
