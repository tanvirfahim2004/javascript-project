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
// MAIN MENU
// =============================

function mainMenu() {

    console.log("\n");
    console.log("==================================");
    console.log("       BANK MANAGEMENT SYSTEM");
    console.log("==================================");

    console.log("1. Create Account");
    console.log("2. View All Accounts");

    console.log("3. Exit");

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