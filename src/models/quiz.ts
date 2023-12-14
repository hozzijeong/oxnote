// TODO QUIZ 문제 발생하는지 확인하기
export interface Quiz {
	quiz: string;
	explain: string;
	answer: boolean;
	favorite: boolean;
	category: Category['name']; // 여기의 카테고리는 좀 애매한 느낌임
}

export interface QuizInfo extends Quiz {
	id: string;
	recentCorrect: boolean;
	correctCount: number;
	wrongCount: number;
}

export interface Category {
	name: string;
	id: number;
}

export interface QuizListItem
	extends Omit<
		QuizInfo,
		'category' | 'answer' | 'explain' | 'recentCorrect' | 'answer'
	> {
	wrongPercent: `${string}%`;
}
