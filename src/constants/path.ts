export const URL_PATH = {
	HOME: '/',
	QUIZ_FORM: '/quiz-form',
	QUIZ: '/quiz/:id', // quiz 번호를 의미함
	QUIZ_EDIT: '/quiz/edit/:id',
	CATEGORY: '/category',
	CATEGORY_DETAIL: '/category/:id', // 여기서 id는 카테고리를 의미함
};

export const NAVBAR_PAGE = [
	URL_PATH.HOME,
	URL_PATH.CATEGORY,
	URL_PATH.CATEGORY_DETAIL,
];
