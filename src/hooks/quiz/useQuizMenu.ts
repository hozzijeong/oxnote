import { QUIZ_PATH, URL_PATH } from '@constants/path';
import { generatePath, useNavigate } from 'react-router-dom';
import useDeleteDocument from '../fireStore/useDeleteDocument';
import { useQueryClient } from '@tanstack/react-query';
import useGetQuizListQueryKey from '@hooks/quiz/useGetQuizListQueryKey';
import useRedirectQuiz from '@hooks/quiz/useRedirectQuiz';
import { QuizNavbarProps } from '@components/quiz/quizNavbar/QuizNavbar';

const useQuizMenu = ({ quizIds, currentId }: QuizNavbarProps) => {
	const navigate = useNavigate();
	const redirectQuizHandler = useRedirectQuiz();
	const queryClient = useQueryClient();

	const queryKey = useGetQuizListQueryKey();

	const { mutate: deleteQuiz } = useDeleteDocument({
		path: `${QUIZ_PATH}/${currentId}`,
		onSuccess: () => {
			const currentIdx = quizIds.findIndex((idx) => idx === currentId);

			const path =
				currentIdx === -1
					? quizIds[0]
					: quizIds[currentIdx === 0 ? 1 : currentIdx - 1];

			redirectQuizHandler(path);
			queryClient.invalidateQueries({ queryKey: [...queryKey] });
		},
	});

	const updateClickHandler = () => {
		navigate(generatePath(URL_PATH.QUIZ_EDIT, { id: currentId }));
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
