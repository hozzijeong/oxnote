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

			// TODO: 아예 덮어 씌워져 버린다... 초기에 값이 없으면 만들고 있으면 안만들어야 하는데 흐음...
			await FireStore.addDocumentData({
				path: `${result.user.email}`,
				data: {},
				lastId: FIRE_STORE.CATEGORY,
				merge: true,
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
				<div className={styles['login-button-container']}>
					<button
						className={styles['sign-in-button']}
						onClick={googleLoginHandler}
						type='button'
					>
						구글로 시작하기/로그인하기
					</button>
				</div>
			</section>
		</main>
	);
};

export default Auth;
