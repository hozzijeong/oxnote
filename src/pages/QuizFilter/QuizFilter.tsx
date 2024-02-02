import { Button, Header, Input, InputLabel } from '@components/@common';
import useGetCategory from '@hooks/category/useGetCategory';
import styles from '@components/quiz/quizForm/quizForm.module.scss';
import quizMain from '../QuizRegister/quizRegister.module.scss';
import { INITIAL_QUIZ_FILTER } from '@constants/quiz';
import { Fragment, useMemo, useState } from 'react';
import Selector from '@components/@common/selector/Selector';
import { useNavigate } from 'react-router-dom';
import { QuizSelectFilter } from '@models/quiz';
import useToast from '@hooks/useToast';
import { ANSWER_OPTIONS, UserAnswer } from '@constants/form';

const { YES, NO } = UserAnswer;

const QuizFilter = () => {
	const { data: categories } = useGetCategory();
	const navigate = useNavigate();
	const { addToast } = useToast();

	const [quizState, setQuizState] = useState(INITIAL_QUIZ_FILTER);

	const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		let url = '';

		if (quizState.category.length === 0) {
			addToast({ type: 'warning', message: '카테고리를 선택해주세요' });

			return;
		}

		if (quizState.favorite === undefined) {
			addToast({
				type: 'warning',
				message: '즐겨찾기 등록 여부를 선택해주세요',
			});

			return;
		}

		if (quizState.isFirst === undefined) {
			addToast({ type: 'warning', message: '시도 유형을 선택해주세요' });

			return;
		}

		if (quizState.isFirst !== 1) {
			if (quizState.recentCorrect === undefined) {
				addToast({
					type: 'warning',
					message: '최근 오답 여부를 선택해주세요',
				});

				return;
			}

			if (
				quizState.correctRate &&
				(quizState.correctRate < 0 || quizState.correctRate > 100)
			) {
				addToast({
					type: 'warning',
					message: '정답률은 0 ~ 100까지의 숫자가 입력 가능합니다',
				});

				return;
			}
		}

		Object.entries(quizState).forEach(([key, val]) => {
			url += `${key}=${val}&`;
		});

		url = url.slice(0, -1);

		navigate(`/parse?${url}`);
	};

	const selectHandler = <T extends unknown>(
		key: keyof QuizSelectFilter,
		value: T
	) => {
		setQuizState((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const changeHandler = <T extends HTMLInputElement | HTMLTextAreaElement>(
		event: React.ChangeEvent<T>
	) => {
		const { name, value } = event.target;

		setQuizState((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const { category, isFirst, favorite, recentCorrect, correctRate } = quizState;

	const selectedCategories = useMemo(() => {
		return categories.filter((c) => category.includes(c.id)).map((c) => c.name);
	}, [categories, category]);

	const categorySelectHandler = (val: string[]) => {
		const values = categories
			.filter((c) => val.includes(c.name))
			.map((c) => c.id);
		selectHandler('category', values);
	};

	const userAnswerSelectHandler = (
		key: keyof QuizSelectFilter,
		val: string[]
	) => {
		const [selected] = Object.entries(ANSWER_OPTIONS).find(
			([_, value]) => val[0] === value
		) ?? [NO];

		selectHandler && selectHandler(key, Number(selected));
	};

	return (
		<Fragment>
			<Header title='문제 설정하기' />
			<main className={quizMain['main']}>
				<form className={styles['quiz-form']} onSubmit={submitHandler}>
					<InputLabel title='카테고리' htmlFor='category'>
						<Selector
							type='multi'
							placeholder='카테고리를 선택해주세요'
							list={categories.map((c) => c.name)}
							onSubmit={categorySelectHandler}
							selected={selectedCategories}
						/>
					</InputLabel>

					<InputLabel
						title='즐겨찾기 등록한 문제를 찾으시나요?'
						htmlFor='favorite'
					>
						<Selector
							type='single'
							placeholder='선택해주세요'
							list={Object.values(ANSWER_OPTIONS)}
							onSubmit={(args) => userAnswerSelectHandler('favorite', args)}
							selected={
								favorite !== undefined ? [ANSWER_OPTIONS[favorite]] : []
							}
						/>
					</InputLabel>

					<InputLabel
						title='처음 풀어보는 문제를 선택하시겠어요?'
						htmlFor='isFirst'
					>
						<Selector
							type='single'
							placeholder='선택해주세요'
							list={Object.values(ANSWER_OPTIONS)}
							onSubmit={(args) => userAnswerSelectHandler('isFirst', args)}
							selected={isFirst !== undefined ? [ANSWER_OPTIONS[isFirst]] : []}
						/>
					</InputLabel>
					{isFirst !== YES && isFirst !== undefined && (
						<Fragment>
							<InputLabel
								title='최근 틀린문제를 선택하시겠어요?'
								htmlFor='recentCorrect'
							>
								<Selector
									type='single'
									placeholder='선택해주세요'
									list={Object.values(ANSWER_OPTIONS)}
									onSubmit={(args) =>
										userAnswerSelectHandler('recentCorrect', args)
									}
									selected={
										recentCorrect !== undefined
											? [ANSWER_OPTIONS[recentCorrect]]
											: []
									}
								/>
							</InputLabel>

							<InputLabel title='정답률' htmlFor='correctRate'>
								<Input
									id='correctRate'
									placeholder='n% 이하의 문제를 보여줍니다'
									type='number'
									max={100}
									min={0}
									name='correctRate'
									value={correctRate ?? ''}
									onChange={changeHandler}
								/>
							</InputLabel>
						</Fragment>
					)}

					<Button type='submit' size='large' color='primary'>
						문제 풀기
					</Button>
				</form>
			</main>
		</Fragment>
	);
};

export default QuizFilter;
