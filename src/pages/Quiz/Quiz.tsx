import useGetQuiz from '@hooks/fireStore/useGetQuiz';
import { useParams } from 'react-router-dom';

const Quiz = () => {
	const param = useParams();
	const { id, category } = param;

	// 카테고리도 가지고 있어야 하는데 카테고리가 없음. 이게 좀 큰 문제임;;
	// 문제를 설정할 때 카테고리랑 매핑을 해야하나? 그걸 상태로 갖고 있어야 하나? 그게 맞나?

	console.log(param, id, category);
	if (id === undefined || category === undefined)
		throw new Error('잘못된 접근입니다');

	const { data } = useGetQuiz({
		collectionId: 'yerim',
		category: category,
		quizId: id,
	});

	console.log(data, 'data');

	return <main></main>;
};

export default Quiz;
