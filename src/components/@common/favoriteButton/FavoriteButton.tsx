import StarFill from '@assets/star_fill.svg';
import StarEmpty from '@assets/star_empty.svg';
import { ButtonHTMLAttributes } from 'react';

interface FavoriteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	isFavorite: boolean;
}

const FavoriteButton = (props: FavoriteButtonProps) => {
	const { isFavorite, onClick } = props;
	return (
		<button type='button' onClick={onClick}>
			<img
				src={isFavorite ? StarFill : StarEmpty}
				width={24}
				height={24}
				alt='즐겨찾기 등록/해제'
			/>
		</button>
	);
};

export default FavoriteButton;
