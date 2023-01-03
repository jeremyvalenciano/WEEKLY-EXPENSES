//Selectors
const form = document.querySelector('#form-budget'),
  expensesList = document.querySelector('#expenses'),
  addForm = document.querySelector('#add-expense'),
  amount = document.querySelector('#amount');

//events

eventListeners();
function eventListeners() {
  form.addEventListener('submit', askBudget);
  addForm.addEventListener('submit', addExpenses);
}
//Class

class Budget {
  constructor(amount) {
    this.budget = amount;
    this.remaining = amount;
    this.expenses = [];
  }
  newExpense(exp) {
    this.expenses = [...this.expenses, exp];
    this.calculateRemaining();
  }

  calculateRemaining() {
    const expensed = this.expenses.reduce((total, exp) => total + exp.amountOfExpense, 0);
    this.remaining = this.budget - expensed;
  }
  deleteExpense(id) {
    this.expenses = this.expenses.filter(exp => exp.id !== id);
    this.calculateRemaining();
  }

}
class UI {
  insertBudget(theBudget) {
    //destructuring values of the object
    const { budget, remaining } = theBudget;
    //insert the values in the UI
    document.querySelector('#initial-budget').textContent = budget;
    document.querySelector('#remaining-budget').textContent = remaining;
    document.querySelector('#total-balance').textContent = remaining;
  }

  printAlert(message, type) {
    const divMessage = document.createElement('div');
    divMessage.classList.add('text-center');
    if (type === 'error') {
      divMessage.classList.add('error-alert');
    } else if (type === 'success') {
      divMessage.classList.add('success-alert');
    }
    //we add the message
    divMessage.textContent = message;
    //insert in the html
    addForm.insertBefore(divMessage, document.querySelector('#submit-button'));
    //remove
    setTimeout(() => {
      divMessage.remove();
    }, 3000);
  }

  insertExpensesList(expenses) {
    this.cleanHTML();
    expenses.forEach(element => {
      //destructuring of expense
      const { nameOfExpense, amountOfExpense, id } = element;
      //create the li
      const newExpense = document.createElement('li'),
        newName = document.createElement('span'),
        newAmount = document.createElement('span');
      newExpense.className = 'p-6 my-8 rounded-2xl bg-slate-300 flex justify-between md:text-xl';
      newExpense.dataset.id = id;
      newName.textContent = nameOfExpense;
      newName.className = 'my-auto';
      newAmount.innerHTML = `$${amountOfExpense}`;
      newAmount.className = 'my-auto';
      newExpense.appendChild(newName);
      newExpense.appendChild(newAmount);
      //delete btn
      const dltBtn = document.createElement('button');
      dltBtn.className = 'bg-red-500 text-white px-6 py-4 rounded-xl';
      dltBtn.innerHTML = 'Delete &times';
      dltBtn.onclick = () => {
        deleteExpense(id);
      }
      newExpense.appendChild(dltBtn);
      //add expense
      expensesList.appendChild(newExpense);
    });


  }
  cleanHTML() {
    expensesList.innerHTML = '';
  }
  updateRemaining(remaining) {
    document.querySelector('#remaining-budget').textContent = remaining;
    document.querySelector('#total-balance').textContent = remaining;
  }
}

let myBudget;
const ui = new UI();



//functions

function askBudget() {
  const userBudget = Number(amount.value);
  form.reset();
  myBudget = new Budget(userBudget);
  ui.insertBudget(myBudget);
}

function addExpenses(e) {
  e.preventDefault();
  //read data from form
  let amountOfExpense = document.querySelector('#amount-expense').value;
  const nameOfExpense = document.querySelector('#name-expense').value;
  if (amountOfExpense === '' || nameOfExpense === '') {
    ui.printAlert('Both fields are requiered!', 'error');
    return;
  }
  amountOfExpense = Number(amountOfExpense);

  //Object Literal
  const expense = { nameOfExpense, amountOfExpense, id: Date.now() };
  //add the expense to the object
  myBudget.newExpense(expense);
  //success message
  ui.printAlert('Expenditure correctly added', 'success');
  //reset the form
  addForm.reset();
  //print the expenses in the html
  const { expenses, remaining } = myBudget;
  ui.updateRemaining(remaining);
  ui.insertExpensesList(expenses);


}

function deleteExpense(id) {
  //delete form the class
  myBudget.deleteExpense(id);
  //delete from the HTML
  const { expenses, remaining } = myBudget;
  ui.insertExpensesList(expenses);
  ui.updateRemaining(remaining);
}

