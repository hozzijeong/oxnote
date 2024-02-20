/* eslint-disable react/no-unescaped-entities */
import { useMemo } from 'react';
import useInstallApp from '@hooks/useInstallApp';
import styles from './installPrompt.module.scss';
import CloseCircle from '@assets/close_circle.svg';

const InstallPrompt = () => {
	const { installApp, ignoreInstallApp, showPrompt, closePrompt } =
		useInstallApp();

	const isIos = /iPhone|iPod|iPad/i.test(navigator.userAgent);
	const isFireFox = /Firefox/i.test(navigator.userAgent);

	const promptGuide = useMemo(() => {
		if (isIos) {
			return (
				<div className={styles['guide']}>
					<p>
						하단 탭에 있는 아이콘에서 "홈 화면에 추가"를 통해 바로가기를 설치 할
						수 있습니다.
					</p>
					<button
						className={styles['info-button']}
						type='button'
						onClick={ignoreInstallApp}
					>
						웹으로 볼게요
					</button>
				</div>
			);
		}

		if (isFireFox) {
			return (
				<div className={styles['guide']}>
					<p>
						상단 탭에 있는 더보기를 클릭한 다음 '설치' 버튼을 통해 바로가기를
						설치할 수 있습니다.
					</p>
					<button
						className={styles['info-button']}
						type='button'
						onClick={ignoreInstallApp}
					>
						웹으로 볼게요
					</button>
				</div>
			);
		}

		return (
			<div className={styles['button-wrapper']}>
				<button
					className={styles['info-button']}
					type='button'
					onClick={ignoreInstallApp}
				>
					웹으로 볼게요
				</button>
				<button
					className={styles['info-button']}
					type='button'
					onClick={installApp}
				>
					바로가기 추가
				</button>
			</div>
		);
	}, [ignoreInstallApp, installApp, isFireFox, isIos]);

	return (
		<>
			{showPrompt && (
				<div className={styles['wrapper']}>
					<div className={styles['content-wrapper']}>
						<p className={styles['guide-paragraph']}>
							바로가기를 추가하시면 앱처럼 사용이 가능합니다. 추가하시겠습니까?
						</p>
						<button onClick={closePrompt} type='button'>
							<img src={CloseCircle} alt='닫기' />
						</button>
					</div>
					{promptGuide}
				</div>
			)}
		</>
	);
};

export default InstallPrompt;
