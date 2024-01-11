import { QuizInfo } from '@models/quiz';
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import useQuizIds from './useQuizIds';

const useQuizNavbar = (currentId: QuizInfo['id']) => {
	const { quizIds } = useQuizIds();

	const [cursor, setCursor] = useState(
		quizIds.findIndex((id) => id === currentId)
	);

	const selectedRef = useRef<HTMLButtonElement | null>(null);

	const moveHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback(
		(event) => {
			if (!(event.target instanceof HTMLButtonElement)) return;
			const { dataset } = event.target;

			const path = dataset['path'];

			const currentId = quizIds.findIndex((curId) => curId === path);
			// 여기서 cursor를 옮김으로써 다른 컴포넌트를 나타냄
			setCursor(currentId);

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
