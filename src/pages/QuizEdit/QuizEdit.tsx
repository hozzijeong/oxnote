import QuizForm from '@components/quiz/quizForm';
import styles from '../QuizRegister/quizRegister.module.scss';
import useGetDocument from '@hooks/fireStore/useGetDocument';
import useQuizForm from '@hooks/quiz/useQuizForm';
import { QuizInfo } from '@models/quiz';
import { FIRE_STORE } from '@constants/path';
import { useNavigate, useParams } from 'react-router-dom';
import useUpdateQuiz from '@hooks/quiz/useUpdateQuiz';

const QuizEdit = () => {
	const params = useParams();
	const navigate = useNavigate();

	const quizId = params.id;

	if (quizId === undefined) {
		throw new Error('잘못된 경로입니다');
	}

	const { data: quiz } = useGetDocument<QuizInfo>({
		path: `${FIRE_STORE.QUIZ}/${quizId}`,
	});

	const updateQuiz = useUpdateQuiz({ quizId: quizId, type: 'edit' });

	const {
		submitHandler,
		changeHandler,
		cancelHandler,
		quizState,
		selectHandler,
	} = useQuizForm({
		initialData: quiz,
		submitCallback: updateQuiz,
		cancelCallback: () => {
			navigate(-1);
		},
	});

	return (
		<main className={styles.main} onSubmit={submitHandler}>
			<QuizForm
				type='edit'
				changeHandler={changeHandler}
				cancelHandler={cancelHandler}
				quizState={quizState}
				selectHandler={selectHandler}
			/>
		</main>
	);
};

export default QuizEdit;
