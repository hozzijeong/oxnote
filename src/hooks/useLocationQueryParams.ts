import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// TODO: params값이 추론이 될 수 있으면 더 좋을 것 같은데... 그 방법을 잘 모르겠음 ㅠㅠ

const useLocationQueryParams = () => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);

	useEffect(() => queryParams.sort(), []);

	const getQueryParam = (param: string) => {
		const value = queryParams.get(param);
		if (value === null) {
			throw new Error('잘못된 경로입니다');
		}

		return value;
	};

	const setQueryParam = (param: string, value: string) => {
		queryParams.set(param, value);
	};

	const getCurrentParams = () => queryParams.toString();

	const getWholeURLParams = (): { [key: string]: string } =>
		[...queryParams.entries()].reduce(
			(acc, [key, value]) => ({ ...acc, [key]: value }),
			{}
		);

	// 특정 값을 제외하고 나머지 값들을 반환하는 메서드. queryKey를 등록할 때 사용함
	const getURLParamValuesExceptParam = (param: string[] | string) => {
		return [...queryParams.entries()]
			.filter(([key]) => !param.includes(key))
			.map(([_, value]) => value);
	};

	return {
		getQueryParam,
		setQueryParam,
		getCurrentParams,
		getURLParamValuesExceptParam,
		getWholeURLParams,
	};
};

export default useLocationQueryParams;
