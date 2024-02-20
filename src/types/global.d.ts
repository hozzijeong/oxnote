declare global {
	interface WindowEventMap {
		beforeinstallprompt: BeforeInstallPromptEvent;
	}
	interface ObjectConstructor {
		keys<T extends object>(o: InvariantOf<T>): Array<keyof T>;
		entries<T extends object>(o: InvariantOf<T>): Array<[keyof T, T[keyof T]]>;
		values<T extends Object>(o: InvariantOf<T>): Array<T[keyof T]>;
	}
}

export interface BeforeInstallPromptEvent extends Event {
	readonly platforms: Array<string>;
	readonly userChoice: Promise<{
		outcome: 'accepted' | 'dismissed';
		platform: string;
	}>;
	prompt(): Promise<void>;
}
