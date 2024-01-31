import styles from './quizRegister.module.scss';
import useQuizForm from '@hooks/quiz/useQuizForm';
import QuizForm from '@components/quiz/quizForm';
import { INITIAL_QUIZ_RECORD } from '@constants/quiz';
import useAddQuiz from '@hooks/quiz/useAddQuiz';
import { useNavigate } from 'react-router-dom';
import { URL_PATH } from '@constants/path';

const QuizRegister = () => {
	const addQuiz = useAddQuiz();
	const navigate = useNavigate();

	const {
		submitHandler,
		changeHandler,
		cancelHandler,
		selectHandler,
		quizState,
	} = useQuizForm({
		initialData: INITIAL_QUIZ_RECORD,
		submitCallback: addQuiz,
		cancelCallback: () => {
			navigate(URL_PATH.HOME);
		},
	});

	return (
		<main className={styles.main} onSubmit={submitHandler}>
			<QuizForm
				type='add'
				changeHandler={changeHandler}
				cancelHandler={cancelHandler}
				quizState={quizState}
				selectHandler={selectHandler}
			/>
		</main>
	);
};

export default QuizRegister;
