import QuizForm from '@components/quiz/quizForm';
import styles from '../QuizRegister/quizRegister.module.scss';
import useGetDocument from '@hooks/fireStore/useGetDocument';
import useQuizForm from '@hooks/quiz/useQuizForm';
import { QuizInfo } from '@models/quiz';
import { QUIZ_PATH } from '@constants/path';
import { useParams } from 'react-router-dom';

const QuizEdit = () => {
	const params = useParams();

	const quizId = params.id;

	if (quizId === undefined) {
		throw new Error('잘못된 경로입니다');
	}

	const { data: quiz } = useGetDocument<QuizInfo>({
		path: `${QUIZ_PATH}/${quizId}`,
	});

	const { submitHandler, changeHandler, cancelHandler, quizState } =
		useQuizForm({
			type: 'edit',
			initialData: quiz,
		});

	return (
		<main className={styles.main} onSubmit={submitHandler}>
			<QuizForm
				type='edit'
				changeHandler={changeHandler}
				cancelHandler={cancelHandler}
				quizState={quizState}
			/>
		</main>
	);
};

export default QuizEdit;
