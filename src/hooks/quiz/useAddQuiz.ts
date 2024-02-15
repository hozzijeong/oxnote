import { FIRE_STORE, URL_PATH } from '@constants/path';
import useAddDocument from '@hooks/fireStore/useAddDocument';
import useConfirm from '@hooks/useConfirm';
import { useNavigate } from 'react-router-dom';

const useAddQuiz = () => {
	const navigate = useNavigate();
	const confirm = useConfirm();

	const { mutate: addQuiz } = useAddDocument({
		path: FIRE_STORE.QUIZ,
		onSuccess: async () => {
			const answer = await confirm({
				message: '문제 등록에 성공했습니다 홈으로 이동하시겠습니까?',
			});
			if (answer) {
				navigate(URL_PATH.HOME);
			}
		},
	});
	return addQuiz;
};

export default useAddQuiz;
