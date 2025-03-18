<script setup lang="ts">
	import { ref, onMounted } from "vue";
	import { useBlockUI } from "~/composables/useBlockUI";
	import type { EventMessage } from "~/utils/interfaces/EventMessage";
	import {
		TransactionStatus,
		type Transaction,
		type TransactionResponse,
	} from "~/utils/interfaces/Transaction";

	import axios from "axios";
	import Cleave from "vue-cleave-component";
	import moment from "moment";
	import type { Bank } from "~/utils/interfaces/Bank";

	const CONFIG = useRuntimeConfig().public;
	const API = CONFIG.BE_API;

	const { getFractionalCurrency, getMoney, formatFractionalCurrency } =
		useAppSettings();

	// Form object to group all fields
	const form = ref({
		quid: "",
		accountName: "",
		accountNumber: "",
		amount: "",
		bankCode: "",
		bankName: "",
	});

	const showForm = ref(true);
	const banks = ref<Bank[]>([]);
	const transactionResponse = ref<Transaction | null>(null);

	const { toggleBlock } = useBlockUI("withdrawal-form");

	const loader = ref({
		fetchingBanks: false,
		verifyingQuid: false,
		processing: false,
	});

	// Fetch list of banks
	const fetchBanks = async () => {
		try {
			loader.value.fetchingBanks = true;
			const response = await axios.get<Bank[]>(
				`${API}/transactions/banks`
			);
			banks.value = response.data;
		} catch (error) {
			console.error("Failed to fetch banks:", error);
		} finally {
			loader.value.fetchingBanks = false;
		}
	};

	// Verify QUID
	const verifyQuid = async () => {
		if (!form.value.quid) return;

		try {
			loader.value.verifyingQuid = true;
			const response = await axios.get<Transaction>(
				`${API}/transactions/verify/${form.value.quid}`
			);
			transactionResponse.value = response.data;
			console.log(response.data);
			form.value.amount = formatFractionalCurrency(
				transactionResponse.value.amount
			);

			showForm.value = true; // Show withdrawal form after successful verification
		} catch (error) {
			console.error("Failed to verify QUID:", error);
			// alert("Invalid or expired QUID. Please try again.");
		} finally {
			loader.value.verifyingQuid = false;
		}
	};

	// Submit withdrawal request
	const submitWithdrawal = async () => {
		if (
			!form.value.accountName ||
			!form.value.accountNumber ||
			!form.value.amount ||
			!form.value.bankCode
		) {
			alert("Please fill in all required fields.");
			return;
		}

		try {
			loader.value.processing = true;
			const response = await axios.post(`${API}/withdrawal-request`, {
				quid: form.value.quid,
				accountName: form.value.accountName,
				accountNumber: form.value.accountNumber,
				amount: getFractionalCurrency(form.value.amount),
				bank: form.value.bankName,
				bankCode: form.value.bankCode,
				currency: "NGN",
			});

			if (response.status === 200) {
				console.log("Withdrawal request submitted successfully!");
				// showForm.value = false; // Hide form after successful submission
			}
		} catch (error) {
			console.error("Failed to submit withdrawal request:", error);
			alert("An error occurred. Please try again.");
		} finally {
			loader.value.processing = false;
		}
	};

	// Fetch banks on component mount
	onMounted(() => {
		fetchBanks();
	});
</script>

<template>
	<div>
		<div class="text-centeri mb-5 ps-8 ps-md-12">
			<h1 class="display-6">
				<span class="text-success">Withdraw</span> Funds
			</h1>
			<h6 class="text-muted">Transfer funds to your bank account.</h6>
		</div>

		<!--begin::Card-->
		<div
			id="withdrawal-form"
			class="card card-custom border-0 h-md-100 mb-5 mb-lg-10"
		>
			<!--begin::Body-->
			<div
				v-if="showForm"
				class="card-body d-flex align-items-center justify-content-center flex-wrap ps-xl-15 pe-0"
			>
				<!--begin::Wrapper-->
				<div class="flex-grow-1 mt-2 me-9 me-md-6 mb-8">
					<div
						class="position-relative text-gray-800 fs-2 z-index-2 fw-bold mb-5"
					>
						Withdraw Funds
					</div>

					<form @submit.prevent="submitWithdrawal" class="h-100">
						<!-- QUID Verification -->
						<div class="mb-5">
							<label
								for="quid"
								class="form-label required fw-bold"
							>
								QUID
							</label>
							<input
								type="text"
								id="quid"
								name="quid"
								v-model="form.quid"
								class="form-control form-control-solid form-control-lg"
								placeholder="Enter QUID"
								@blur="verifyQuid"
							/>
							<small class="text-muted">
								Enter your QUID to verify and proceed.
							</small>
						</div>

						<!-- Account Name -->
						<div class="mb-5">
							<label
								for="accountName"
								class="form-label required fw-bold"
							>
								Account Name
							</label>
							<input
								type="text"
								id="accountName"
								name="accountName"
								v-model="form.accountName"
								class="form-control form-control-solid form-control-lg"
								placeholder="Enter account name"
							/>
						</div>

						<!-- Account Number -->
						<div class="mb-5">
							<label
								for="accountNumber"
								class="form-label required fw-bold"
							>
								Account Number
							</label>
							<input
								type="text"
								id="accountNumber"
								name="accountNumber"
								v-model="form.accountNumber"
								class="form-control form-control-solid form-control-lg"
								placeholder="Enter account number"
							/>
						</div>

						<!-- Bank Selection -->
						<div class="mb-5">
							<label
								for="bank"
								class="form-label required fw-bold"
							>
								Bank
							</label>
							<select
								id="bank"
								name="bank"
								v-model="form.bankCode"
								class="form-control form-control-solid form-control-lg"
								@change="
									form.bankName =
										banks.find(
											(b: Bank) =>
												b.code === form.bankCode
										)?.name || 'unknown'
								"
							>
								<option value="" disabled>
									Select your bank
								</option>
								<option
									v-for="bank in banks"
									:key="bank.code"
									:value="bank.code"
								>
									{{ bank.name }}
								</option>
							</select>
						</div>

						<!-- Amount -->
						<div class="mb-5">
							<label
								for="amount"
								class="form-label required fw-bold"
							>
								Amount
							</label>
							<cleave
								disabled
								type="text"
								name="amount"
								class="form-control disabled form-control-solid form-control-lg text-center fw-bold"
								:options="{
									numeral: true,
									numeralThousandsGroupStyle: 'thousand',
									numeralDecimalMark: '.',
									numeralDecimalScale: 2,
									numeralIntegerScale: 15,
								}"
								placeholder="Enter amount"
								v-model="form.amount"
							/>
						</div>

						<!-- Submit Button -->
						<button
							:disabled="loader.processing"
							class="btn btn-primary w-100"
						>
							<span v-if="!loader.processing"> Submit </span>
							<span v-else>
								Processing...
								<span
									class="spinner-border spinner-border-sm"
								></span>
							</span>
						</button>
					</form>
				</div>
				<!--end::Wrapper-->
			</div>
			<!--end::Body-->
		</div>
		<!--end::Card-->
	</div>
</template>
