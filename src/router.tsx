import { URL_PATH } from '@constants/path';
import { createBrowserRouter } from 'react-router-dom';
import { QuizRegister, RootTemplate } from './pages';

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
		],
	},
]);

export default router;
