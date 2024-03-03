import type { Quiz, QuizInfo, QuizSelectFilter } from '@models/quiz';

export const INITIAL_QUIZ: Quiz = {
	quiz: '',
	explain: '',
	category: '',
};

export const INITIAL_QUIZ_RECORD: QuizInfo = {
	...INITIAL_QUIZ,
	id: '',
	wrongCount: 0,
	tryCount: 0,
};

/**
 * 카테고리 즐겨찾기 여부, 정답률, 최근 틀린 문제,
 * 문제 시도가 없는 경우 = trycount === 0
 *
 */
export const INITIAL_QUIZ_FILTER: QuizSelectFilter = {
	category: [],
};

export const QUIZ_PARAMS = {
	category: 'categoryId',
	quiz: 'quizId',
} as const;
