import Button from '@components/@common/button';
import styles from './quizForm.module.scss';
import { Input, InputLabel } from '@components/@common';
import Radio from '@components/@common/radio';
import { INITIAL_QUIZ } from '@constants/quiz';
import useGetCategory from '@hooks/category/useGetCategory';
import { QuizFormType, QuizInfo } from '@models/quiz';

interface QuizFormProps {
	quizState: QuizInfo;
	type: QuizFormType;
	cancelHandler: React.MouseEventHandler<HTMLButtonElement>;
	changeHandler: <
		T extends HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
	>(
		event: React.ChangeEvent<T>
	) => void;
}

const QuizForm = ({
	quizState,
	type,
	cancelHandler,
	changeHandler,
}: QuizFormProps) => {
	const { data: category } = useGetCategory();

	return (
		<form className={styles['quiz-form']}>
			<InputLabel title='카테고리' htmlFor='category'>
				<select
					id='category'
					className={styles.category}
					onChange={changeHandler}
					name='category'
					value={quizState.category}
					required
				>
					{type === 'add' && (
						<option hidden disabled value={INITIAL_QUIZ.category}>
							분류를 선택해주세용
						</option>
					)}
					{category.map(({ id, name }) => (
						<option key={id} value={id}>
							{name}
						</option>
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
					placeholder='문제를 입력해주세요'
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
					checkedValue={Number(quizState.answer)}
					required
				/>
			</InputLabel>

			<InputLabel title='해설' htmlFor='explain'>
				<textarea
					id='explain'
					className={styles.explain}
					value={quizState.explain}
					onChange={changeHandler}
					name='explain'
					placeholder='해설을 입력해주세요'
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
					checkedValue={Number(quizState.favorite)}
					required
				/>
			</InputLabel>

			<div className={styles['button-container']}>
				<Button type='button' size='small' onClick={cancelHandler}>
					취소하기
				</Button>
				<Button type='submit' size='small' color='primary'>
					{type === 'add' ? '등록하기' : '수정하기'}
				</Button>
			</div>
		</form>
	);
};

export default QuizForm;
