const registerPwaServiceWorker = async (workerPath: string) => {
	let registration = await navigator.serviceWorker.getRegistration();

	const oldScriptUrl = registration?.active?.scriptURL;

	if (!oldScriptUrl) {
		registration = await navigator.serviceWorker.register(workerPath);
	} else {
		const oldScriptPath = new URL(oldScriptUrl).pathname;

		if (!registration || oldScriptPath !== workerPath) {
			registration = await navigator.serviceWorker.register(workerPath);
		}
	}
};

export default registerPwaServiceWorker;
