export enum UserAnswer {
	NO,
	YES,
	NONE,
}

export type UserAnswerOption = {
	[key in UserAnswer]: string;
};

export const ANSWER_OPTIONS: UserAnswerOption = {
	[UserAnswer.YES]: '예',
	[UserAnswer.NO]: '아니오',
	[UserAnswer.NONE]: '상관 없어요',
};

export type YesOrNo = Exclude<UserAnswer, UserAnswer.NONE>;

export type YesOrNoOption = {
	[key in YesOrNo]: string;
};
