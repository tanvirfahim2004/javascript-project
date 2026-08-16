const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// =============================
// DATA
// =============================

let accounts = [];


// =============================
// CREATE ACCOUNT
// =============================

function createAccount() {

    console.log("\n===== CREATE ACCOUNT =====");

    rl.question("Enter name: ", function(name) {

        rl.question("Enter age: ", function(age) {

            rl.question("Enter address: ", function(address) {

                rl.question("Enter initial deposit: ", function(amount) {

                    let deposit = Number(amount);

                    if (name === "" || address === "") {
                        console.log("Name and address cannot be empty.");
                        return mainMenu();
                    }

                    if (Number(age) <= 0 || isNaN(Number(age))) {
                        console.log("Invalid age.");
                        return mainMenu();
                    }

                    if (isNaN(deposit) || deposit < 0) {
                        console.log("Invalid deposit amount.");
                        return mainMenu();
                    }

                    let accountNumber = 1001 + accounts.length;

                    let account = {
                        accountNumber: accountNumber,
                        name: name,
                        age: Number(age),
                        address: address,
                        balance: deposit,
                        transactions: [
                            "Account created with deposit: " + deposit
                        ]
                    };

                    accounts.push(account);

                    console.log("\nAccount created successfully!");
                    console.log("Your account number is:", accountNumber);

                    mainMenu();
                });
            });
        });
    });
}


// =============================
// VIEW ALL ACCOUNTS
// =============================

function viewAccounts() {

    console.log("\n===== ALL ACCOUNTS =====");

    if (accounts.length === 0) {
        console.log("No accounts available.");
        return mainMenu();
    }

    accounts.forEach(function(account) {

        console.log("----------------------------");
        console.log("Account Number:", account.accountNumber);
        console.log("Name:", account.name);
        console.log("Age:", account.age);
        console.log("Address:", account.address);
        console.log("Balance:", account.balance);
    });

    console.log("----------------------------");

    mainMenu();
}


// =============================
// SEARCH ACCOUNT
// =============================

function searchAccount() {

    console.log("\n===== SEARCH ACCOUNT =====");

    rl.question("Enter account number: ", function(number) {

        let accountNumber = Number(number);

        let account = accounts.find(function(account) {
            return account.accountNumber === accountNumber;
        });

        if (!account) {
            console.log("Account not found.");
            return mainMenu();
        }

        console.log("\nAccount found!");
        console.log("----------------------------");
        console.log("Account Number:", account.accountNumber);
        console.log("Name:", account.name);
        console.log("Age:", account.age);
        console.log("Address:", account.address);
        console.log("Balance:", account.balance);
        console.log("----------------------------");

        mainMenu();
    });
}


// =============================
// DEPOSIT MONEY
// =============================

function depositMoney() {

    console.log("\n===== DEPOSIT MONEY =====");

    rl.question("Enter account number: ", function(number) {

        let accountNumber = Number(number);

        let account = accounts.find(function(account) {
            return account.accountNumber === accountNumber;
        });

        if (!account) {
            console.log("Account not found.");
            return mainMenu();
        }

        rl.question("Enter deposit amount: ", function(amount) {

            let money = Number(amount);

            if (isNaN(money) || money <= 0) {
                console.log("Invalid amount.");
                return mainMenu();
            }

            account.balance = account.balance + money;

            account.transactions.push(
                "Deposited: " + money
            );

            console.log("\nDeposit successful!");
            console.log("New balance:", account.balance);

            mainMenu();
        });
    });
}


// =============================
// WITHDRAW MONEY
// =============================

function withdrawMoney() {

    console.log("\n===== WITHDRAW MONEY =====");

    rl.question("Enter account number: ", function(number) {

        let accountNumber = Number(number);

        let account = accounts.find(function(account) {
            return account.accountNumber === accountNumber;
        });

        if (!account) {
            console.log("Account not found.");
            return mainMenu();
        }

        rl.question("Enter withdrawal amount: ", function(amount) {

            let money = Number(amount);

            if (isNaN(money) || money <= 0) {
                console.log("Invalid amount.");
                return mainMenu();
            }

            if (money > account.balance) {
                console.log("Insufficient balance.");
                return mainMenu();
            }

            account.balance = account.balance - money;

            account.transactions.push(
                "Withdrawn: " + money
            );

            console.log("\nWithdrawal successful!");
            console.log("Remaining balance:", account.balance);

            mainMenu();
        });
    });
}


// =============================
// TRANSFER MONEY
// =============================

function transferMoney() {

    console.log("\n===== TRANSFER MONEY =====");

    rl.question("Enter sender account number: ", function(senderNumber) {

        let sender = accounts.find(function(account) {
            return account.accountNumber === Number(senderNumber);
        });

        if (!sender) {
            console.log("Sender account not found.");
            return mainMenu();
        }

        rl.question("Enter receiver account number: ", function(receiverNumber) {

            let receiver = accounts.find(function(account) {
                return account.accountNumber === Number(receiverNumber);
            });

            if (!receiver) {
                console.log("Receiver account not found.");
                return mainMenu();
            }

            if (sender.accountNumber === receiver.accountNumber) {
                console.log("Cannot transfer to the same account.");
                return mainMenu();
            }

            rl.question("Enter transfer amount: ", function(amount) {

                let money = Number(amount);

                if (isNaN(money) || money <= 0) {
                    console.log("Invalid amount.");
                    return mainMenu();
                }

                if (money > sender.balance) {
                    console.log("Insufficient balance.");
                    return mainMenu();
                }

                sender.balance = sender.balance - money;
                receiver.balance = receiver.balance + money;

                sender.transactions.push(
                    "Transferred " + money +
                    " to account " + receiver.accountNumber
                );

                receiver.transactions.push(
                    "Received " + money +
                    " from account " + sender.accountNumber
                );

                console.log("\nTransfer successful!");

                console.log(
                    "Sender new balance:",
                    sender.balance
                );

                mainMenu();
            });
        });
    });
}



// =============================
// MAIN MENU
// =============================

function mainMenu() {

    console.log("\n");
    console.log("==================================");
    console.log("       BANK MANAGEMENT SYSTEM");
    console.log("==================================");

    console.log("1. Create Account");
    console.log("2. View All Accounts");
    console.log("3. Search Account");
    console.log("4. Deposit Money");
    console.log("5. Withdraw Money");
   console.log("6. Transfer Money");
    
    console.log("9. Exit");

    console.log("==================================");

    rl.question("Enter your choice: ", function(choice) {

        switch (choice) {

            case "1":
                createAccount();
                break;

            case "2":
                viewAccounts();
                break;

            case "3":
                searchAccount();
                break;

            case "4":
                depositMoney();
                break;

            case "5":
                withdrawMoney();
                break;
            case "6":
                transferMoney();
                break;
            case "9":
                console.log("\nThank you for using the Bank Management System!");
                rl.close();
                break;

            default:
                console.log("Invalid choice. Please try again.");
                mainMenu();
        }
    });
}


// =============================
// START PROGRAM
// =============================

console.log("\nWelcome to Bank Management System!");

mainMenu();
