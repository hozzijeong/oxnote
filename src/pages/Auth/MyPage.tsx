import { Button, Header } from '@components/@common';
import { URL_PATH } from '@constants/path';
import { auth } from '@fireStore/Firebase';
import useConfirm from '@hooks/useConfirm';
import { deleteUser } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styles from './auth.module.scss';
import FireStore from '@fireStore/FireStore';
import useCurrentUser from '@hooks/auth/useCurrentUser';

const MyPage = () => {
	const navigate = useNavigate();
	const confirm = useConfirm();

	const { user } = useCurrentUser();

	const signOutHandler = () => {
		auth.signOut();
	};

	/**
	 * TODO:
	 * 사용자 데이터 저장하는데 있어서 구조 문제가 분명히 존재한다.
	 *
	 * 따라서 기존 user > uid > Quiz > 문서
	 * user > uid > Category > 문서 이렇게 갈지,
	 * 아니면 uid[category] = {} > 이렇게 갈지 고민
	 *
	 *
	 */
	const deleteUserHandler = async () => {
		if (!user) return;

		const result = await confirm({ message: '정말 탈퇴하시겠어요?' });
		if (result) {
			await deleteUser(user);
			await FireStore.deleteDocument(`user/${user.uid}`);
			navigate(URL_PATH.LOGIN, { replace: true });
		}
	};

	return (
		<div>
			<Header title='마이 페이지' />
			<div className={styles['wrapper']}>
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
		</div>
	);
};

export default MyPage;
