import { URL_PATH } from '@constants/path';
import { auth } from '@fireStore/Firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styles from './auth.module.scss';
import FireStore from '@fireStore/FireStore';
import { where } from 'firebase/firestore';

const Auth = () => {
	const navigate = useNavigate();

	const googleLoginHandler: React.MouseEventHandler<
		HTMLButtonElement
	> = async () => {
		const provider = new GoogleAuthProvider();
		try {
			const result = await signInWithPopup(auth, provider);
			const { uid, displayName, email } = result.user;

			const data = await FireStore.getQuerySnapShot('user', [
				where('uid', '==', uid),
			]);

			// 데이터가 비워져 있으면 확인
			if (data.empty) {
				await FireStore.addDocumentData({
					path: 'user',
					data: { uid: uid, name: displayName, email, category: [] },
					lastId: uid,
				});
			}

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
