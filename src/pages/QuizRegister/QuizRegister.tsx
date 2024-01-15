import styles from './quizRegister.module.scss';
import useQuizForm from '@hooks/quiz/useQuizForm';
import QuizForm from '@components/quiz/quizForm';
import { INITIAL_QUIZ_RECORD } from '@constants/quiz';

const QuizRegister = () => {
	const { submitHandler, changeHandler, cancelHandler, quizState } =
		useQuizForm({
			type: 'add',
			initialData: INITIAL_QUIZ_RECORD,
		});

	return (
		<main className={styles.main} onSubmit={submitHandler}>
			<QuizForm
				type='add'
				changeHandler={changeHandler}
				cancelHandler={cancelHandler}
				quizState={quizState}
			/>
		</main>
	);
};

export default QuizRegister;
