import { QuizInfo } from '@models/quiz';
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useTransition,
} from 'react';
import { QuizNavbarProps } from '@components/quiz/quizNavbar/QuizNavbar';
import useGetQuizList from '@hooks/fireStore/useGetQuizList';
import { useLocation, useNavigate } from 'react-router-dom';
import { URL_PATH } from '@constants/path';

const useQuizNavbar = ({ currentId, categoryId }: QuizNavbarProps) => {
	const navigate = useNavigate();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const [_, startTransition] = useTransition();

	const { data: quizIds } = useGetQuizList<QuizInfo['id'][]>({
		filter: {
			category: [categoryId],
		},
		selectHandler: (data) => {
			const result: QuizInfo['id'][] = [];

			data.forEach((value) => {
				const id = value.id;

				result.push(id);
			});
			return result;
		},
	});

	const cursor = quizIds.findIndex((id) => id === currentId);

	const selectedRef = useRef<HTMLButtonElement | null>(null);

	const moveHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback(
		(event) => {
			if (!(event.target instanceof HTMLButtonElement)) return;
			const { dataset } = event.target;
			const path = dataset['path'];

			if (path === undefined) return;
			queryParams.set('quizId', path);

			startTransition(() => {
				navigate(`${URL_PATH.QUIZ}?${queryParams.toString()}`, {
					replace: true,
				});
			});

			selectedRef.current = event.target;
			selectedRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'center',
			});
		},
		[quizIds, currentId]
	);

	const beforeUnLoadHandler = useCallback((event: BeforeUnloadEvent) => {
		event.preventDefault();

		return (event.returnValue = '');
	}, []);

	// 초반에 가운데로 이동하도록 설정
	useLayoutEffect(() => {
		selectedRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'nearest',
			inline: 'center',
		});
	}, []);

	useEffect(() => {
		window.addEventListener('beforeunload', beforeUnLoadHandler, {
			capture: true,
		});

		return () => {
			window.removeEventListener('beforeunload', beforeUnLoadHandler, {
				capture: true,
			});
		};
	}, []);

	return {
		quizIds,
		cursor,
		moveHandler,
	};
};

export default useQuizNavbar;
