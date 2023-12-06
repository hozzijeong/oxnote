export interface Quiz {
	quiz: string;
	explain: string;
	answer: boolean;
	favorite: boolean;
	category: string;
}

export interface QuizInfo extends Quiz {
	id: string;
	recentCorrect: boolean;
	correctCount: number;
	wrongCount: number;
}
