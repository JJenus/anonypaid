export enum TransactionStatus {
	"PENDING" = "PENDING",
	"COMPLETED" = "COMPLETED",
	"FAILED" = "FAILED",
	"CANCELLED" = "CANCELLED",
} // Add other statuses as needed

// interface Transaction {
// 	id: number;
// 	email: string;
// 	amount: number;
// 	currency: string;
// 	quid?: string;
// 	reference: string;
// 	transactionId: string;
// 	status: TransactionStatus;
// 	blocked: boolean;
// 	createdAt: string; // ISO string format (e.g., "2025-03-16T12:34:56")
// 	updatedAt: string;
//   }

interface Transaction {
	quid: string;
	email: string;
	amount: number;
	sessionId?: string;
	authorizationUrl?: string;
	transactionId: string;
	status: TransactionStatus;
	blocked: boolean;
}

interface TransactionResponse {
	currency: string;
	amount: number;
	quid: string;
	transactionId: string;
	status: TransactionStatus;
	timestamp: string; // ISO string format
}

export type { Transaction, TransactionResponse };
