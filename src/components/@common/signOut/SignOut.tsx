import { auth } from '@fireStore/Firebase';
import { Button } from '..';
import styles from './signout.module.scss';

const SignOut = () => {
	const signOutHandler = () => {
		auth.signOut();
	};
	return (
		<Button className={styles['button']} onClick={signOutHandler} type='button'>
			로그아웃
		</Button>
	);
};

export default SignOut;
