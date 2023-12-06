import { Input, InputLabel } from '@components/@common';
import styles from './quizRegister.module.scss';
import Button from '@components/@common/button';
import Radio from '@components/@common/radio';
import { useNavigate } from 'react-router-dom';
import { URL_PATH } from '@constants/path';
import { useState } from 'react';
import { Quiz } from '@models/quiz';
import { INITIAL_QUIZ } from '@constants/quiz';

const QuizRegister = () => {
	const navigate = useNavigate();

	const cancelHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
		const result = confirm(
			'여기서 취소하면 작성한 내용이 사라집니다. 취소하시겠습니까?'
		);

		if (result) {
			navigate(URL_PATH.HOME);
		}
	};

	const [quizState, setQuizState] = useState<Quiz>(INITIAL_QUIZ);

	const inputHandler = <T extends HTMLInputElement | HTMLTextAreaElement>(
		event: React.ChangeEvent<T>
	) => {
		if (!(event instanceof HTMLInputElement || HTMLTextAreaElement)) return;

		const { name, value, type } = event.target;

		setQuizState((prev) => ({
			...prev,
			[name]: type === 'radio' ? Boolean(Number(value)) : value,
		}));
	};

	const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
	};

	return (
		<main className={styles.main} onSubmit={submitHandler}>
			<form className={styles['quiz-form']}>
				<InputLabel title='문제' htmlFor='quiz'>
					<Input
						id='quiz'
						mode='text'
						name='quiz'
						value={quizState.quiz}
						onChange={inputHandler}
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
						changeHandler={inputHandler}
						required
					/>
				</InputLabel>

				<InputLabel title='해설' htmlFor='explain'>
					<textarea
						className={styles.explain}
						value={quizState.explain}
						onChange={inputHandler}
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
						changeHandler={inputHandler}
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
