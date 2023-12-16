import type { Quiz, QuizInfo } from '@models/quiz';

export const INITIAL_QUIZ: Quiz = {
	quiz: '',
	answer: false,
	explain: '',
	favorite: false,
	category: -1,
};

export const INITIAL_QUIZ_RECORD: QuizInfo = {
	...INITIAL_QUIZ,
	id: '',
	recentCorrect: false,
	correctCount: 0,
	wrongCount: 0,
};
