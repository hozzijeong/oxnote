import { FIRE_STORE, URL_PATH } from '@constants/path';
import { auth } from '@fireStore/Firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styles from './auth.module.scss';
import FireStore from '@fireStore/FireStore';

const Auth = () => {
	const navigate = useNavigate();

	const googleLoginHandler: React.MouseEventHandler<
		HTMLButtonElement
	> = async () => {
		const provider = new GoogleAuthProvider();
		try {
			const result = await signInWithPopup(auth, provider);
			const { uid, displayName, email } = result.user;

			await FireStore.addDocumentData({
				path: 'user',
				data: { uid: uid, name: displayName, email },
				lastId: 'User',
			});

			await FireStore.addDocumentData({
				path: `${result.user.email}`,
				data: {},
				lastId: FIRE_STORE.CATEGORY,
			});
			navigate(URL_PATH.QUIZ_FILTER);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<main className={styles['login-container']}>
			<section className={styles['login-content']}>
				<h1 className={styles['title']}>오답노트</h1>
				<button
					className={styles['sign-in-button']}
					onClick={googleLoginHandler}
					type='button'
				>
					구글로 시작하기/로그인하기
				</button>
			</section>
		</main>
	);
};

export default Auth;
