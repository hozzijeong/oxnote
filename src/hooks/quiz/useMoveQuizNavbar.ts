import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

import { QuizInfo } from '@models/quiz';
import useRedirectQuiz from '@hooks/useRedirectQuiz';

const useMoveQuizNavbar = ({
	currentId,
	quizIds,
}: {
	currentId: QuizInfo['id'];
	quizIds: QuizInfo['id'][];
}) => {
	const redirectQuizHandler = useRedirectQuiz();

	const cursor = quizIds.findIndex((id) => id === currentId);

	const selectedRef = useRef<HTMLButtonElement | null>(null);

	const moveHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback(
		(event) => {
			if (!(event.target instanceof HTMLButtonElement)) return;
			const { dataset } = event.target;
			const path = dataset['path'];

			if (path === undefined) return;

			redirectQuizHandler(path);

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
		cursor: cursor === -1 ? 0 : cursor,
		moveHandler,
	};
};

export default useMoveQuizNavbar;
