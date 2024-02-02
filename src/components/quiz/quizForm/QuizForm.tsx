import Button from '@components/@common/button';
import styles from './quizForm.module.scss';
import { Input, InputLabel } from '@components/@common';
import useGetCategory from '@hooks/category/useGetCategory';
import { QuizFormType, QuizInfo } from '@models/quiz';
import Selector from '@components/@common/selector/Selector';
import { useMemo } from 'react';
import { UserAnswer, YesOrNoOption } from '@constants/form';

const { YES, NO } = UserAnswer;

const FAVORITE_SELECT: YesOrNoOption = {
	[YES]: '등록할게요',
	[NO]: '등록하지 않을래요',
};

const QUIZ_ANSWER: YesOrNoOption = {
	[YES]: 'O',
	[NO]: 'X',
};

interface QuizFormProps {
	quizState: QuizInfo;
	type: QuizFormType;
	cancelHandler: React.MouseEventHandler<HTMLButtonElement>;
	changeHandler: <T extends HTMLInputElement | HTMLTextAreaElement>(
		event: React.ChangeEvent<T>
	) => void;
	selectHandler: <K>(key: string, value: K) => void;
}

const QuizForm = ({
	quizState,
	type,
	cancelHandler,
	changeHandler,
	selectHandler,
}: QuizFormProps) => {
	const { data: categories } = useGetCategory();

	const { category, quiz, answer, favorite, explain } = quizState;

	const selected = useMemo(() => {
		return categories.filter((c) => c.id === category).map((c) => c.name);
	}, [categories, category]);

	const categorySelectHandler = (val: string[]) => {
		const values = categories
			.filter((c) => val.includes(c.name))
			.map((c) => c.id);
		selectHandler('category', values[0]);
	};

	const answerHandler = (val: string[]) => {
		selectHandler('answer', QUIZ_ANSWER[YES] === val[0] ? YES : NO);
	};

	const favoriteHandler = (val: string[]) => {
		selectHandler('favorite', FAVORITE_SELECT[YES] === val[0] ? YES : NO);
	};

	return (
		<form className={styles['quiz-form']}>
			<InputLabel title='카테고리' htmlFor='category'>
				<Selector
					type='single'
					list={categories.map((d) => d.name)}
					placeholder='분류를 선택해주세요'
					selected={selected}
					onSubmit={categorySelectHandler}
				/>
			</InputLabel>

			<InputLabel title='문제' htmlFor='quiz'>
				<Input
					id='quiz'
					mode='text'
					name='quiz'
					value={quiz}
					onChange={changeHandler}
					placeholder='문제를 입력해주세요'
					required
				/>
			</InputLabel>

			<InputLabel title='답' htmlFor='answer'>
				<Selector
					type='single'
					placeholder='선택해주세요'
					list={Object.values(QUIZ_ANSWER)}
					onSubmit={answerHandler}
					selected={answer !== undefined ? [QUIZ_ANSWER[answer]] : []}
				/>
			</InputLabel>

			<InputLabel title='해설' htmlFor='explain'>
				<textarea
					id='explain'
					className={styles.explain}
					value={explain}
					onChange={changeHandler}
					name='explain'
					placeholder='해설을 입력해주세요'
					required
				/>
			</InputLabel>

			<InputLabel title='즐겨찾기 등록' htmlFor='favorite'>
				<Selector
					type='single'
					placeholder='선택해주세요'
					list={Object.values(FAVORITE_SELECT)}
					onSubmit={favoriteHandler}
					selected={favorite !== undefined ? [FAVORITE_SELECT[favorite]] : []}
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
