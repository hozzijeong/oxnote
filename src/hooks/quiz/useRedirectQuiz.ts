import { useNavigate } from 'react-router-dom';
import useLocationQueryParams from '../useLocationQueryParams';
import { useCallback, useTransition } from 'react';
import { QUIZ_PARAMS } from '@constants/quiz';
import { URL_PATH } from '@constants/path';

const useRedirectQuiz = () => {
	const navigate = useNavigate();

	const { setQueryParam, getCurrentParams } = useLocationQueryParams();

	const [_, startTransition] = useTransition();

	const redirectQuizHandler = useCallback((path: string) => {
		setQueryParam(QUIZ_PARAMS.quiz, path);
		startTransition(() => {
			navigate(`${URL_PATH.QUIZ}?${getCurrentParams()}`, {
				replace: true,
			});
		});
	}, []);

	return redirectQuizHandler;
};

export default useRedirectQuiz;
