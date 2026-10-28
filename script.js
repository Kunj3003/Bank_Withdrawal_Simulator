"use strict";

// Educational-only simulation. No actual account, bank, or payment system is used.
const INITIAL_BALANCE_PAISE = 2500000; // ₹25,000.00
const MAX_WITHDRAWAL_PAISE = 1000000; // ₹10,000.00
let balancePaise = INITIAL_BALANCE_PAISE;

// Custom exceptions demonstrate JavaScript's exception handling concepts.
class WithdrawalError extends Error {
  constructor(message) {
    super(message);
    this.name = "WithdrawalError";
  }
}
class InvalidAmountError extends WithdrawalError {
  constructor(message) { super(message); this.name = "InvalidAmountError"; }
}
class InsufficientBalanceError extends WithdrawalError {
  constructor(message) { super(message); this.name = "InsufficientBalanceError"; }
}
class WithdrawalLimitError extends WithdrawalError {
  constructor(message) { super(message); this.name = "WithdrawalLimitError"; }
}

const balanceEl = document.getElementById("balance");
const inputEl = document.getElementById("amount");
const feedbackEl = document.getElementById("feedback");
const tableBodyEl = document.getElementById("transactions");
const money = (paise) => "₹" + (paise / 100).toLocaleString("en-IN", {minimumFractionDigits: 2, maximumFractionDigits: 2});
const updateBalance = () => { balanceEl.textContent = money(balancePaise); };

function validateAmount(rawInput) {
  const value = String(rawInput).trim();
  if (value === "") throw new InvalidAmountError("Please enter a withdrawal amount.");
  // No exponent notation, hexadecimal, signs, or >2 decimal places.
  if (!/^\d+(?:\.\d{1,2})?$/.test(value)) {
    throw new InvalidAmountError("Enter a valid amount with at most two decimal places.");
  }
  const amount = Number(value);
  if (!Number.isFinite(amount) || !Number.isSafeInteger(Math.round(amount * 100))) {
    throw new InvalidAmountError("The entered amount is not valid.");
  }
  const paise = Math.round(amount * 100);
  if (paise < 100) throw new InvalidAmountError("Minimum withdrawal amount is ₹1.00.");
  if (paise > MAX_WITHDRAWAL_PAISE) {
    throw new WithdrawalLimitError("Withdrawal limit exceeded. Maximum is ₹10,000.00 per transaction.");
  }
  if (paise > balancePaise) {
    throw new InsufficientBalanceError("Insufficient balance. Your available balance is " + money(balancePaise) + ".");
  }
  return paise;
}

function showFeedback(message, isSuccess) {
  feedbackEl.textContent = (isSuccess ? "✓ " : "⚠ ") + message;
  feedbackEl.className = "feedback " + (isSuccess ? "success" : "error");
}

function addHistory(amountText, isSuccess, detail) {
  const empty = document.getElementById("empty-history");
  if (empty) empty.remove();
  const tr = document.createElement("tr");
  const time = document.createElement("td");
  const transaction = document.createElement("td");
  const amount = document.createElement("td");
  const status = document.createElement("td");
  const statusBadge = document.createElement("span");
  time.textContent = new Date().toLocaleTimeString("en-IN", {hour: "2-digit", minute: "2-digit", second: "2-digit"});
  transaction.textContent = isSuccess ? "Cash withdrawal" : detail;
  amount.textContent = amountText;
  statusBadge.className = "status " + (isSuccess ? "success" : "error");
  statusBadge.textContent = isSuccess ? "Successful" : "Failed";
  status.appendChild(statusBadge);
  tr.append(time, transaction, amount, status);
  tableBodyEl.prepend(tr);
}

document.getElementById("withdraw-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const raw = inputEl.value;
  try {
    const paise = validateAmount(raw);
    balancePaise -= paise;
    updateBalance();
    showFeedback(money(paise) + " withdrawn successfully. Remaining balance: " + money(balancePaise) + ".", true);
    addHistory(money(paise), true, "Cash withdrawal");
    inputEl.value = "";
  } catch (error) {
    if (error instanceof WithdrawalError) {
      showFeedback(error.message, false);
      addHistory(raw.trim() ? "₹" + raw.trim() : "—", false, error.name);
    } else {
      // Unexpected faults are not mistaken for business-rule errors.
      console.error("Unexpected withdrawal failure", error);
      showFeedback("An unexpected error occurred. Please reset the demo and try again.", false);
    }
  } finally {
    // Runs whether the transaction succeeds or a validation exception is caught.
    console.info("Withdrawal attempt completed");
  }
});

document.querySelectorAll(".quick").forEach((button) => {
  button.addEventListener("click", () => { inputEl.value = button.dataset.amount; inputEl.focus(); });
});

document.getElementById("reset").addEventListener("click", () => {
  balancePaise = INITIAL_BALANCE_PAISE;
  inputEl.value = "";
  feedbackEl.className = "feedback hidden";
  feedbackEl.textContent = "";
  tableBodyEl.replaceChildren();
  const empty = document.createElement("tr");
  empty.id = "empty-history";
  const cell = document.createElement("td");
  cell.colSpan = 4;
  cell.className = "empty-state";
  cell.textContent = "No transactions yet. Try a withdrawal above.";
  empty.appendChild(cell);
  tableBodyEl.appendChild(empty);
  updateBalance();
});
updateBalance();
