import { URL_PATH } from '@constants/path';
import { createBrowserRouter } from 'react-router-dom';
import { RootTemplate } from './pages';

const router = createBrowserRouter([
	{
		path: URL_PATH.QUIZ_FORM,
		element: <RootTemplate />,
		children: [],
	},
]);

export default router;
