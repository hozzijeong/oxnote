declare const tag: unique symbol;

declare interface InvariantBrand<T> {
	readonly [tag]: (args: T) => T;
}

declare type InvariantOf<T> = T & InvariantBrand<T>;
