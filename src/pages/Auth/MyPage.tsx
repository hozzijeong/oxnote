import { Button, Header } from '@components/@common';
import { URL_PATH } from '@constants/path';
import { auth } from '@fireStore/Firebase';
import useConfirm from '@hooks/useConfirm';
import { deleteUser } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styles from './auth.module.scss';

const MyPage = () => {
	const navigate = useNavigate();
	const confirm = useConfirm();

	const signOutHandler = () => {
		auth.signOut();
	};

	const deleteUserHandler = async () => {
		if (!auth.currentUser) return;
		const result = await confirm({ message: '정말 탈퇴하시겠어요?' });

		if (result) {
			await deleteUser(auth.currentUser);
			navigate(URL_PATH.LOGIN, { replace: true });
		}
	};

	return (
		<div>
			<Header title='마이 페이지' />
			<div className={styles['button-container']}>
				<Button
					className={styles['button']}
					onClick={signOutHandler}
					type='button'
				>
					로그아웃
				</Button>
				<Button
					className={`${styles['button']} ${styles['delete']}`}
					onClick={deleteUserHandler}
					type='button'
				>
					회원탈퇴
				</Button>
			</div>
		</div>
	);
};

export default MyPage;
