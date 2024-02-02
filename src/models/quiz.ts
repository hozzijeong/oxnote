import { UserAnswer, YesOrNo } from '@constants/form';

// TODO QUIZ 문제 발생하는지 확인하기
export interface Quiz {
	quiz: string;
	explain: string;
	answer?: YesOrNo;
	favorite?: YesOrNo;
	category: Category['id']; // 여기의 카테고리는 좀 애매한 느낌임
}

export interface QuizInfo extends Quiz {
	id: string;
	recentCorrect?: number; // 아예 문제를 푼 시도가 없는 경우에는 값을 할당하지 않음
	tryCount: number;
	wrongCount: number;
	correctRate?: number; // 정답률 역시 아예 문제를 푼 사도가 없으면 값을 할당하지 않음
}

export type QuizSelectFilter = Pick<QuizInfo, 'correctRate'> & {
	category: number[];
	isFirst?: UserAnswer;
	favorite?: UserAnswer;
	recentCorrect?: UserAnswer;
};

export type Category = {
	id: number;
	name: string;
};

export type QuizListItem = Omit<
	QuizInfo,
	'category' | 'answer' | 'explain' | 'recentCorrect'
>;

export type QuizFormType = 'edit' | 'add';
