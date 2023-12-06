import { URL_PATH } from '@constants/path';
import { createBrowserRouter } from 'react-router-dom';
import { Category, QuizRegister, RootTemplate } from './pages';

const router = createBrowserRouter([
	{
		path: URL_PATH.HOME,
		element: <RootTemplate />,
		errorElement: <div>에러입니다</div>,
		children: [
			{
				path: URL_PATH.QUIZ_FORM,
				element: <QuizRegister />,
			},
			{
				path: URL_PATH.CATEGORY,
				element: <Category />,
			},
		],
	},
]);

export default router;
