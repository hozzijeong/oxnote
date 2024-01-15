import type { Quiz, QuizInfo } from '@models/quiz';

export const INITIAL_QUIZ: Quiz = {
	quiz: '',
	answer: true,
	explain: '',
	favorite: true,
	category: -1,
};

export const INITIAL_QUIZ_RECORD: QuizInfo = {
	...INITIAL_QUIZ,
	id: '',
	wrongCount: 0,
	tryCount: 0,
};

export const QUIZ_PARAMS = {
	category: 'categoryId',
	quiz: 'quizId',
} as const;
