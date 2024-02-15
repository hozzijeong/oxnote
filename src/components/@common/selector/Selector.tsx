import React, {
	useCallback,
	useEffect,
	useId,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import styles from './selector.module.scss';
import { Button, Input, Menu } from '../index';

type Props = {
	type: 'single' | 'multi';
	list: string[];
	placeholder: string;
	selected: string[];
	searchOption?: boolean;
	onSubmit(arg: string[]): void;
};

const Selector = ({
	type,
	list,
	placeholder,
	selected,
	onSubmit,
	searchOption = false,
}: Props) => {
	const [selectedOption, setSelectedOption] = useState<typeof list>([]);
	const [menuOpen, setMenuOpen] = useState(false);

	const [search, setSearch] = useState('');

	const searchChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
		event
	) => {
		setSearch(event.target.value);
	};

	const searchInputRef = useRef<HTMLInputElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);

	const selectorToggle = useCallback(() => {
		setMenuOpen((prev) => !prev);
	}, []);

	const submitHandler = useCallback(
		(values?: string[]) => {
			const selectedSet = new Set(values ? [...values] : [...selectedOption]);
			onSubmit([...selectedSet]);
			setSearch('');
			setMenuOpen(false);
		},
		[selectedOption]
	);

	const optionClickHandler: React.MouseEventHandler<HTMLButtonElement> =
		useCallback((event) => {
			const { innerText } = event.currentTarget;

			setSelectedOption((prev) => {
				if (type === 'single') {
					return [innerText];
				}
				if (prev.includes(innerText)) {
					return prev.filter((val) => val !== innerText);
				}

				return [...prev, innerText];
			});

			if (type === 'single') {
				submitHandler([innerText]);
			}
		}, []);

	const id = useId();

	const options = useMemo(() => {
		const filtered = list.filter((item) =>
			search.trim().length
				? item.toLowerCase().includes(search.toLowerCase())
				: true
		);

		if (filtered.length === 0) {
			return (
				<li className={styles['options']}>
					<Menu.Item itemType='default'>등록된 값이 없습니다.</Menu.Item>
				</li>
			);
		}

		return filtered.map((item) => (
			<li className={styles['options']} key={item + id}>
				<Menu.Item
					onClick={optionClickHandler}
					itemType='checkBox'
					checked={selectedOption.includes(item)}
				>
					{item}
				</Menu.Item>
			</li>
		));
	}, [id, list, optionClickHandler, search, selectedOption]);

	const clickMenuOutside = useCallback(
		(event: MouseEvent) => {
			if (!menuRef.current) return;

			const menu = menuRef.current.getBoundingClientRect();

			const isClickInsideMenu =
				menu.top - 32 <= event.clientY &&
				event.clientY <= menu.top + 32 + menu.height &&
				menu.left <= event.clientX &&
				event.clientX <= menu.left + menu.width;

			if (!isClickInsideMenu) {
				submitHandler();
			}
		},
		[onSubmit, selectedOption]
	);

	useEffect(() => {
		if (menuOpen && menuRef.current) {
			window.addEventListener('click', clickMenuOutside);
		}

		return () => {
			window.removeEventListener('click', clickMenuOutside);
		};
	}, [clickMenuOutside, menuOpen]);

	useLayoutEffect(() => {
		if (menuOpen) {
			searchInputRef.current?.focus();
		}
	}, [menuOpen]);

	return (
		<div className={styles['wrapper']}>
			<Button
				className={styles['selector-button']}
				onClick={selectorToggle}
				type='button'
			>
				{selected.length === 0 ? (
					<span className={styles['placeholder']}>{placeholder}</span>
				) : (
					selected.join(', ')
				)}
			</Button>
			{menuOpen && (
				<Menu className={styles['menu-container']} ref={menuRef}>
					{searchOption && (
						<div className={styles['input-container']}>
							<Input
								ref={searchInputRef}
								placeholder='검색'
								onChange={searchChangeHandler}
								value={search}
							/>
						</div>
					)}
					{search.trim().length !== 0 && (
						<span className={styles['search-guide']}>검색 결과</span>
					)}
					<ul>{options}</ul>
				</Menu>
			)}
		</div>
	);
};

export default Selector;
