import type { Quiz, QuizInfo, QuizSelectFilter } from '@models/quiz';

export const INITIAL_QUIZ: Quiz = {
	quiz: '',
	answer: true,
	explain: '',
	favorite: 1,
	category: -1,
};

export const INITIAL_QUIZ_RECORD: QuizInfo = {
	...INITIAL_QUIZ,
	id: '',
	wrongCount: 0,
	tryCount: 0,
};

export const INITIAL_QUIZ_FILTER: QuizSelectFilter = {
	category: -1,
	correctRate: 0,
};

export const QUIZ_PARAMS = {
	category: 'categoryId',
	quiz: 'quizId',
} as const;
