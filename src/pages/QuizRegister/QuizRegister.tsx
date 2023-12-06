import { Input, InputLabel } from '@components/@common';
import styles from './quizRegister.module.scss';
import Button from '@components/@common/button';
import Radio from '@components/@common/radio';
import useGetCategory from '@hooks/fireStore/useGetCategory';
import useQuizForm from '@hooks/useQuizForm';

const QuizRegister = () => {
	const { data: category } = useGetCategory();

	const { submitHandler, changeHandler, cancelHandler, quizState } =
		useQuizForm();

	return (
		<main className={styles.main} onSubmit={submitHandler}>
			<form className={styles['quiz-form']}>
				<InputLabel title='카테고리' htmlFor='category'>
					<select onChange={changeHandler} name='category' required>
						{category.map((value) => (
							<option key={value}>{value}</option>
						))}
					</select>
				</InputLabel>

				<InputLabel title='문제' htmlFor='quiz'>
					<Input
						id='quiz'
						mode='text'
						name='quiz'
						value={quizState.quiz}
						onChange={changeHandler}
						required
					/>
				</InputLabel>

				<InputLabel title='답' htmlFor='answer'>
					<Radio
						options={[
							{ title: 'O', value: 1 },
							{ title: 'X', value: 0 },
						]}
						name='answer'
						changeHandler={changeHandler}
						required
					/>
				</InputLabel>

				<InputLabel title='해설' htmlFor='explain'>
					<textarea
						className={styles.explain}
						value={quizState.explain}
						onChange={changeHandler}
						name='explain'
						required
					/>
				</InputLabel>

				<InputLabel title='즐겨찾기 등록' htmlFor='favorite'>
					<Radio
						options={[
							{ title: '등록하기', value: 1 },
							{ title: '등록안함', value: 0 },
						]}
						name='favorite'
						changeHandler={changeHandler}
						required
					/>
				</InputLabel>

				<div className={styles['button-container']}>
					<Button type='button' size='small' onClick={cancelHandler}>
						취소하기
					</Button>
					<Button type='submit' size='small' color='primary'>
						등록하기
					</Button>
				</div>
			</form>
		</main>
	);
};

export default QuizRegister;
