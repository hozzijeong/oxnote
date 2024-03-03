import { UserContext } from '@context/UserProvider';
import { useContext } from 'react';

const useCurrentUser = () => {
	const userContext = useContext(UserContext);

	if (userContext === null) {
		throw new Error('UserProvider 내부에서 사용해주세요');
	}

	/**
	 * 문제점들
	 * 1. 새로고침 했을 때 currentUser에 NULL이 할당된다
	 * 2. 그래서 데이터를 Fetch 할 때 undefined를 반환한다
	 * 3. 그렇다면 이걸 어떻게 해야할까? onAuthStateChanged를 통해 데이터를 받아와도 그 한 순간은 null이 할당된다
	 * 4. loading이 끝나야지 useEffect가 실행되는데 그게 실행될 기미가 보이지 않는다.
	 */

	return { ...userContext };
};

export default useCurrentUser;
