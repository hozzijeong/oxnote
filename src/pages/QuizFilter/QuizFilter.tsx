import { Button, Header, Input, InputLabel, Radio } from '@components/@common';
import useGetCategory from '@hooks/category/useGetCategory';
import styles from '@components/quiz/quizForm/quizForm.module.scss';
import quizMain from '../QuizRegister/quizRegister.module.scss';
import useQuizForm from '@hooks/quiz/useQuizForm';
import { INITIAL_QUIZ_FILTER } from '@constants/quiz';
import { Fragment, useMemo } from 'react';
import { NO, NONE, YES } from '@constants/form';
import Selector from '@components/@common/selector/Selector';
import { MutateDocumentParams } from '@hooks/fireStore/useAddDocument';
import { useNavigate } from 'react-router-dom';
import { QuizSelectFilter } from '@models/quiz';
import useToast from '@hooks/useToast';

const QuizFilter = () => {
	const { data: categories } = useGetCategory();
	const navigate = useNavigate();
	const { addToast } = useToast();

	const { submitHandler, changeHandler, quizState, selectHandler } =
		useQuizForm({
			initialData: INITIAL_QUIZ_FILTER,
			submitCallback: ({ data }: MutateDocumentParams) => {
				let url = '';

				const obj: QuizSelectFilter = Object.assign(data);

				if (obj.category.length === 0) {
					addToast({ type: 'warning', message: '카테고리를 선택해주세요' });

					return;
				}

				if (obj.favorite === undefined) {
					addToast({
						type: 'warning',
						message: '즐겨찾기 등록 여부를 선택해주세요',
					});

					return;
				}

				if (obj.isFirst === undefined) {
					addToast({ type: 'warning', message: '시도 유형을 선택해주세요' });

					return;
				}

				if (obj.isFirst !== YES) {
					if (obj.recentCorrect === undefined) {
						addToast({
							type: 'warning',
							message: '최근 오답 여부를 선택해주세요',
						});

						return;
					}

					if (
						obj.correctRate &&
						(obj.correctRate < 0 || obj.correctRate > 100)
					) {
						addToast({
							type: 'warning',
							message: '정답률은 0 ~ 100까지의 숫자가 입력 가능합니다',
						});

						return;
					}
				}

				Object.entries(obj).forEach(([key, val]) => {
					url += `${key}=${val}&`;
				});

				url = url.slice(0, -1);
				navigate(`/parse?${url}`);
			},
		});

	const { category, isFirst, favorite, recentCorrect, correctRate } = quizState;

	const selected = useMemo(() => {
		return categories.filter((c) => category.includes(c.id)).map((c) => c.name);
	}, [categories, category]);

	const categorySelectHandler = (val: string[]) => {
		const values = categories
			.filter((c) => val.includes(c.name))
			.map((c) => c.id);
		selectHandler && selectHandler('category', values);
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
							list={categories.map((d) => d.name)}
							onSubmit={categorySelectHandler}
							selected={selected}
						/>
					</InputLabel>

					<InputLabel title='즐겨찾기 등록 여부' htmlFor='favorite'>
						<Radio
							options={[
								{ title: '등록하기', value: YES },
								{ title: '등록안함', value: NO },
								{ title: '상관 없음', value: NONE },
							]}
							name='favorite'
							changeHandler={changeHandler}
							checkedValue={Number(favorite)}
						/>
					</InputLabel>

					<InputLabel title='시도 유형' htmlFor='isFirst'>
						<Radio
							options={[
								{ title: '한번도 안풀어봄', value: YES },
								{ title: '한번 이상 풀어봄', value: NO },
								{ title: '상관 없음', value: NONE },
							]}
							name='isFirst'
							changeHandler={changeHandler}
							checkedValue={Number(isFirst)}
						/>
					</InputLabel>
					{isFirst !== YES && isFirst !== undefined && (
						<Fragment>
							<InputLabel title='최근 틀린 문제' htmlFor='recentCorrect'>
								<Radio
									options={[
										{ title: '최근 틀리지 않음', value: YES },
										{ title: '최근 틀림', value: NO },
										{ title: '상관 없음', value: NONE },
									]}
									name='recentCorrect'
									changeHandler={changeHandler}
									checkedValue={Number(recentCorrect)}
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
