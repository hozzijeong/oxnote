declare global {
	export interface ObjectConstructor {
		keys<T extends object>(o: InvariantOf<T>): Array<keyof T>;
		entries<T extends object>(o: InvariantOf<T>): Array<[keyof T, T[keyof T]]>;
		values<T extends Object>(o: InvariantOf<T>): Array<T[keyof T]>;
	}
}

declare module '*.scss' {
	const content: { [className: string]: string };
	export = content;
}

export {};
