export const URL_PATH = {
	HOME: '/',
	QUIZ_FORM: '/quiz-form',
	QUIZ: '/quiz', // quiz 번호를 의미함 여기에 ?로 쿼리 조건문이 붙음. 그래서 데이터를 가져옴
	QUIZ_EDIT: '/quiz/edit/:id',
	QUIZ_FILTER: '/quiz/filter',
	CATEGORY: '/category',
	CATEGORY_DETAIL: '/category/:id', // 여기서 id는 카테고리를 의미함
	AUTH: '/auth',
};

export const NAVBAR_PAGE = [
	URL_PATH.QUIZ_FILTER,
	URL_PATH.CATEGORY,
	URL_PATH.CATEGORY_DETAIL,
];

// TODO 처음 설정되는 COLLECT_ID 값을 잘 처리하기.
export const FIRE_STORE = {
	QUIZ: 'Quiz/data',
	CATEGORY: 'Category',
	COLLECT_ID: import.meta.env.VITE_COLLECTION_ID,
} as const;

export const QUIZ_PATH = `${FIRE_STORE.COLLECT_ID}/${FIRE_STORE.QUIZ}`;
export const CATEGORY_PATH = `${FIRE_STORE.COLLECT_ID}/${FIRE_STORE.CATEGORY}`;
