import { URL_PATH } from '@constants/path';
import { QuizInfo } from '@models/quiz';
import {
	useCallback,
	useContext,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { QuizContext } from 'src/context/QuizProvider';

const useQuizNavbar = (currentId: QuizInfo['id']) => {
	const quizContext = useContext(QuizContext);

	const navigate = useNavigate();

	if (quizContext === null)
		throw new Error('QuizProvider 내부에서 사용할 수 있습니다');

	const { quizzes } = quizContext;

	const [cursor, setCursor] = useState(
		quizzes.findIndex((id) => id === currentId)
	);

	const selectedRef = useRef<HTMLButtonElement | null>(null);

	const moveHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback(
		(event) => {
			if (!(event.target instanceof HTMLButtonElement)) return;
			const { dataset } = event.target;

			const path = dataset['path'];

			const currentId = quizzes.findIndex((curId) => curId === path);
			setCursor(currentId);

			selectedRef.current = event.target;

			selectedRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'center',
			});

			navigate(generatePath(URL_PATH.QUIZ, { id: path }));
		},
		[quizzes, currentId]
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
		quizzes,
		cursor,
		moveHandler,
	};
};

export default useQuizNavbar;
