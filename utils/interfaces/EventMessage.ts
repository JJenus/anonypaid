export interface EventMessage<T> {
	event: "PAYMENT" | "WITHDRAWAL";
	message: T;
}