export interface Quiz {
	quiz: string;
	explain: string;
	answer: boolean;
	favorite: boolean;
	category: Category;
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
