import { URL_PATH } from '@constants/path';
import { QuizInfo } from '@models/quiz';
import { generatePath, useNavigate } from 'react-router-dom';
import useDeleteDocument from '../fireStore/useDeleteDocument';
import useQuizIds from './useQuizIds';

const useQuizMenu = (quizId: QuizInfo['id']) => {
	const navigate = useNavigate();

	const { deleteQuizId } = useQuizIds();

	const { mutate: deleteQuiz } = useDeleteDocument({
		path: `Quiz/data/${quizId}`,
		onSuccess: () => {
			// TODO: 현재 문제 리스트를 한번 초기화 해야 함.
			// 카테고리에서 접근했을 때는 문제를 따로 푸는 형식이 아니게끔 할까?
			// 데이터 업데이트를 어떻게 해야할까?
			// 이거 기준을 쿼리로 필터링 기준을 날리자.
			deleteQuizId(quizId);
		},
	});

	const updateClickHandler = () => {
		// 이거는 이동이 맞음.
		navigate(generatePath(URL_PATH.QUIZ_EDIT, { id: quizId }));
	};

	const deleteClickHandler = () => {
		const answer = confirm('정말 삭제하시겠습니까?');

		if (answer) {
			deleteQuiz('yerim');
		}
	};

	return {
		updateClickHandler,
		deleteClickHandler,
	};
};

export default useQuizMenu;
