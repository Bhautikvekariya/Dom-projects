document.addEventListener("DOMContentLoaded", () => {
    let expenseForm = document.getElementById("expense-form");
    let expenseNameInput = document.getElementById("expense-name");
    let expenseAmountInput = document.getElementById("expense-amount");
    let expenseList = document.getElementById("expense-list");
    let totalAmountDisplay = document.getElementById("total-amount");

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let totalAmount = calculateTotal();

    renderExpenses();
    updateTotal();

    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value.trim());

        if (name !== "" && !isNaN(amount) && amount > 0) {
            const newExpense = {
                id: Date.now(),
                name: name,
                amount: amount,
            };
            expenses.push(newExpense);
            saveExpensesToLocal();
            updateTotal();
            renderExpenses();

            // clear inputs
            expenseNameInput.value = "";
            expenseAmountInput.value = "";
        }
    });

    expenseList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const expenseId = parseInt(e.target.getAttribute("data-id"));
            expenses = expenses.filter((expense) => expense.id !== expenseId);
            saveExpensesToLocal();
            updateTotal();
            renderExpenses();
        }
    });

    function renderExpenses() {
        expenseList.innerHTML = "";
        expenses.forEach((expense) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${expense.name} - $${expense.amount.toFixed(2)}
                <button data-id="${expense.id}">Delete</button>
            `;
            expenseList.appendChild(li);
        });
    }

    function calculateTotal() {
        return expenses.reduce((sum, expense) => sum + expense.amount, 0);
    }

    function saveExpensesToLocal() {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    function updateTotal() {
        totalAmount = calculateTotal();
        totalAmountDisplay.textContent = totalAmount.toFixed(2);
    }
});
