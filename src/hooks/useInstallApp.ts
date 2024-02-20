import { useCallback, useEffect, useState } from 'react';
import { getCookie, setCookie } from '@utils/cookie';
import type { BeforeInstallPromptEvent } from 'src/types/global';
import { URL_PATH } from '@constants/path';
import useCurrentUser from './auth/useCurrentUser';

let deferredPrompt: BeforeInstallPromptEvent | null = null;

const useInstallApp = () => {
	const { user } = useCurrentUser();

	const [showPrompt, setShowPrompt] = useState(
		JSON.parse(getCookie('PromptVisible') ?? 'true')
	);

	const installApp = async () => {
		if (!deferredPrompt) {
			closePrompt();
			return;
		}
		await deferredPrompt.prompt();

		await deferredPrompt.userChoice;

		deferredPrompt = null;
		setShowPrompt(false);
	};

	const ignoreInstallApp = () => {
		setCookie({
			key: 'PromptVisible',
			value: 'false',
			path: URL_PATH.QUIZ_FILTER,
		});
		deferredPrompt = null;
		setShowPrompt(false);
	};

	const closePrompt = () => {
		deferredPrompt = null;
		setShowPrompt(false);
	};

	const beforeInstallPromptHandler = useCallback(
		(event: BeforeInstallPromptEvent) => {
			event.preventDefault();
			if (!showPrompt) return;

			deferredPrompt = event;
		},
		[showPrompt]
	);

	useEffect(() => {
		window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);

		return () => {
			window.removeEventListener(
				'beforeinstallprompt',
				beforeInstallPromptHandler
			);
		};
	}, [beforeInstallPromptHandler]);

	return {
		showPrompt: showPrompt && user,
		installApp,
		ignoreInstallApp,
		closePrompt,
	};
};

export default useInstallApp;
