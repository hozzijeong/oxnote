import { URL_PATH } from '@constants/path';
import app from '@fireStore/Firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const auth = getAuth(app);

const Auth = () => {
	const navigate = useNavigate();
	const googleLoginHandler: React.MouseEventHandler<
		HTMLButtonElement
	> = async () => {
		const provider = new GoogleAuthProvider();

		try {
			const data = await signInWithPopup(auth, provider);
			navigate(URL_PATH.QUIZ_FILTER, { replace: true });
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
