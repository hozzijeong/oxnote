import { QUIZ_PATH, URL_PATH } from '@constants/path';
import { QuizInfo } from '@models/quiz';
import { generatePath, useNavigate } from 'react-router-dom';
import useDeleteDocument from '../fireStore/useDeleteDocument';
import { useQueryClient } from '@tanstack/react-query';
import useGetQuizListQueryKey from '@hooks/quiz/useGetQuizListQueryKey';
import useGetQuizList from '@hooks/fireStore/useGetQuizList';
import useRedirectQuiz from '@hooks/quiz/useRedirectQuiz';

const useQuizMenu = (quizId: QuizInfo['id']) => {
	const navigate = useNavigate();
	const redirectQuizHandler = useRedirectQuiz();
	const queryClient = useQueryClient();

	const queryKey = useGetQuizListQueryKey();

	const { data: quizIds } = useGetQuizList<QuizInfo['id'][]>({
		selectHandler: (data) => {
			const result: QuizInfo['id'][] = [];

			data.forEach((value) => {
				const id = value.id;

				result.push(id);
			});
			return result;
		},
	});

	const { mutate: deleteQuiz } = useDeleteDocument({
		path: `${QUIZ_PATH}/${quizId}`,
		onSuccess: () => {
			const currentIdx = quizIds.findIndex((idx) => idx === quizId);

			const path =
				currentIdx === -1
					? quizIds[0]
					: quizIds[currentIdx === 0 ? 1 : currentIdx - 1];

			redirectQuizHandler(path);
			queryClient.invalidateQueries({ queryKey: [...queryKey] });
		},
	});

	const updateClickHandler = () => {
		navigate(generatePath(URL_PATH.QUIZ_EDIT, { id: quizId }));
	};

	const deleteClickHandler = () => {
		const answer = confirm('정말 삭제하시겠습니까?');

		if (answer) {
			deleteQuiz();
		}
	};

	return {
		updateClickHandler,
		deleteClickHandler,
	};
};

export default useQuizMenu;
