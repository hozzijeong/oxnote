import { QUIZ_PATH } from '@constants/path';
import useUpdateDocument from '@hooks/fireStore/useUpdateDocument';
import useConfirm from '@hooks/useConfirm';
import { QuizInfo } from '@models/quiz';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

interface UpdateQuizProps {
	type: 'edit' | 'favorite';
	quizId: QuizInfo['id'];
}

// TODO: 좀 더 추상화 하고 싶은데 어쩔 수 없이 명령형으로 작성이 되는 것같음. success를 전달하기 위해 너무 추상화가 되는 것 같기도 함;;

const useUpdateQuiz = ({ type, quizId }: UpdateQuizProps) => {
	const navigate = useNavigate();
	const confirm = useConfirm();
	const queryClient = useQueryClient();

	const editSuccess = async () => {
		const answer = await confirm({
			message: '문제 수정에 성공했습니다! 이전 페이지로 이동합니다',
		});

		// TODO: 카테고리 업데이트시 처리할 것
		queryClient.invalidateQueries({
			queryKey: [`get${QUIZ_PATH}/${quizId}`],
		});

		if (answer) {
			navigate(-1);
		}
	};

	const favoriteSuccess = () => {
		queryClient.invalidateQueries({
			queryKey: [`get${QUIZ_PATH}/${quizId}`],
		});
	};

	const successCallback = (type: 'edit' | 'favorite') => {
		if (type === 'edit') editSuccess();
		else if (type === 'favorite') favoriteSuccess();
	};

	const { mutate: updateQuiz } = useUpdateDocument({
		path: `${QUIZ_PATH}/${quizId}`,
		onSuccess: () => successCallback(type),
	});

	return updateQuiz;
};

export default useUpdateQuiz;
