import { URL_PATH } from '@constants/path';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import {
	Category,
	QuizRegister,
	RootTemplate,
	CategoryDetail,
	Quiz,
	QuizEdit,
	QuizFilter,
	FilterParse,
	Auth,
} from './pages';

const router = createBrowserRouter([
	{
		element: <RootTemplate />,
		errorElement: <div>에러입니다</div>,
		children: [
			{
				path: URL_PATH.HOME,
				element: <Navigate to={URL_PATH.QUIZ_FILTER} />,
			},
			{
				path: URL_PATH.QUIZ_FILTER,
				element: <QuizFilter />,
			},
			{
				path: URL_PATH.QUIZ_FORM,
				element: <QuizRegister />,
			},
			{
				path: URL_PATH.CATEGORY,
				element: <Category />,
			},
			{
				path: URL_PATH.CATEGORY_DETAIL,
				element: <CategoryDetail />,
			},
			{
				path: URL_PATH.QUIZ,
				element: <Quiz />,
			},
			{
				path: URL_PATH.QUIZ_EDIT,
				element: <QuizEdit />,
			},
			{
				path: `/parse`,
				element: <FilterParse />,
			},
		],
	},
	{
		children: [
			{
				path: URL_PATH.AUTH,
				element: <Auth />,
			},
		],
	},
]);

export default router;
