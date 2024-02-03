import { URL_PATH } from '@constants/path';
import { auth } from '@fireStore/Firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
	const navigate = useNavigate();

	const googleLoginHandler: React.MouseEventHandler<
		HTMLButtonElement
	> = async () => {
		const provider = new GoogleAuthProvider();
		try {
			await signInWithPopup(auth, provider);
			navigate(URL_PATH.QUIZ_FILTER);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div>
			<h1>Welcome to My Awesome App</h1>
			<button onClick={googleLoginHandler}>구글로 로그인하기</button>
		</div>
	);
};

export default Auth;
