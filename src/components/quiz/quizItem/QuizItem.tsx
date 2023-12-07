import type { QuizListItem } from '@models/quiz';
import styles from './quizItem.module.scss';
import { Link, generatePath } from 'react-router-dom';
import { URL_PATH } from '@constants/path';
import StarFill from '@assets/star_fill.svg';
import StarEmpty from '@assets/star_empty.svg';

interface QuizItemProps {
	item: QuizListItem;
}
// TODO: 즐겨찾기 등록/해제 기능 구현
const QuizItem = ({ item }: QuizItemProps) => {
	return (
		<li className={styles.item} key={item.id}>
			<Link to={generatePath(URL_PATH.QUIZ, { id: item.id })}>
				<p>{item.quiz}</p>
			</Link>
			<div className={styles['info-container']}>
				<span>{item.wrongPercent}</span>
				<button type='button' onClick={() => console.log('즐겨찾기 등록/해제')}>
					<img
						src={item.favorite ? StarFill : StarEmpty}
						width={24}
						height={24}
						alt='즐겨찾기 등록/해제'
					/>
				</button>
			</div>
		</li>
	);
};

export default QuizItem;
