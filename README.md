# Bank Withdrawal Simulator (Exception Handling)

**Subject:** Web Development  
**Mini-project topic:** Bank Withdrawal Simulator (Exception Handling)  
**Team:** Aadi Manseta (12402120601002), Neel Parikh (12402120601056), Kunj Lakhmani (12502120603003)

## Technology used
- HTML5: page structure, form, table, accessibility
- CSS3: responsive layout, gradient, hover effects, media query
- JavaScript: event handling, DOM updates, classes, validation, `try`/`catch`/`finally`, custom exceptions

No framework, PHP, database, libraries, internet, or installation is needed.

## Run
1. Extract the ZIP.
2. Open `Bank_Withdrawal_Simulator/index.html` in Chrome, Edge, Firefox, or Safari.
3. Enter an amount or click a quick-amount button.
4. Select **Withdraw Amount**. Review the balance, feedback, and transaction history.
5. Use **Reset Demo** to restore the initial balance.

## Rules
- Initial simulated balance: ₹25,000.00.
- Minimum withdrawal: ₹1.00.
- Maximum per withdrawal: ₹10,000.00.
- Supports up to 2 decimal places; balance is maintained in paise to avoid floating-point inaccuracies.
- Failed attempts do not change the balance.
- Reloading the page resets the demo; history is in memory only.

## Test scenarios
| Input | Expected result |
|---|---|
| `1000` | Success; balance ₹24,000 |
| `0` | InvalidAmountError |
| `-500` | InvalidAmountError |
| blank input | InvalidAmountError |
| `100.123` | InvalidAmountError |
| `11000` | WithdrawalLimitError |
| Withdraw ₹10,000 twice and ₹6,000 | InsufficientBalanceError on third attempt |
| Click Reset Demo | Balance ₹25,000 and empty history |

## Where exception handling is implemented
`script.js` creates three custom Error subclasses: `InvalidAmountError`, `WithdrawalLimitError`, and `InsufficientBalanceError`. `validateAmount()` throws exceptions for invalid business conditions. The form submit listener uses `try`, `catch`, and `finally` to handle them gracefully.

## Scope
This is a front-end educational simulator, **not a real bank app**. It has no login, server, database, money transfer, or persistent data. All numbers and transactions are simulated.

## Demonstration questions
- **Why exception handling?** To prevent an invalid transaction from modifying the account balance and to display a meaningful error.
- **Why HTML/CSS/JS?** They are the central technologies in the provided Web Development syllabus.
- **Why not PHP?** The topic is fully demonstrable in JavaScript, so a server is unnecessary for this mini-project.
