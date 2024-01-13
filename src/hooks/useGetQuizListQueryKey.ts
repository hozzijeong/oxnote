import { QUIZ_PARAMS } from '@constants/quiz';
import useLocationQueryParams from './useLocationQueryParams';

// QuizList를 호출하는데 사용하는 queryKey를 반환하는 훅.
// 이걸 훅으로 분리해도 되나 싶지만 좀 많이 사용하고, 다른 곳에서도 동시에 사용하기 때문에 한번 써봅니다...
const useGetQuizListQueryKey = () => {
	const { getURLParamValuesExceptParam } = useLocationQueryParams();

	const URLParamsExceptQuiz = getURLParamValuesExceptParam(QUIZ_PARAMS.quiz);

	const queryKey = URLParamsExceptQuiz.flatMap((val) => val.split(','));

	return queryKey;
};

export default useGetQuizListQueryKey;
