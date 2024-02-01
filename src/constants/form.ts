export enum UserAnswer {
	NO,
	YES,
	NONE,
}

export type UserAnswerOption = {
	[key in UserAnswer]: string;
};

export const ANSWER_OPTIONS: UserAnswerOption = {
	1: '예',
	0: '아니오',
	2: '상관 없어요',
};
