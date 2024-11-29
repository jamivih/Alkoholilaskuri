const addDrinkFormDisplay = () => {
    const addDrinkForm = document.getElementById('add-drink-form');
    const addDrinkButton = document.getElementById('add-drink-btn');
        if (addDrinkForm.style.display === 'none' || addDrinkForm.style.display === '') {
            addDrinkForm.style.display = 'block';
            addDrinkButton.style.display = 'none';
        } else {
            addDrinkForm.style.display = 'none';
            addDrinkButton.style.display = 'block';
        }
}

// Increase drink amount
const increaseDrinkAmount = (button) => {
    const row = button.closest('tr');
    const drinkAmount = row.querySelector('.drink-amount');
    drinkAmount.innerHTML = `${parseFloat(drinkAmount.textContent) + 1} kpl`;
    saveData();
    updateTotals();
}

// Decrease drink amount
const decreaseDrinkAmount = (button) => {
    const row = button.closest('tr');
    const drinkAmount = row.querySelector('.drink-amount');
    drinkAmount.innerHTML = `${Math.max(0, parseFloat(drinkAmount.textContent) - 1)} kpl`;
    saveData();
    updateTotals();
}

// Resets amounts of each drink in the table
document.getElementById('reset-btn').addEventListener('click', () => {
    const drinkAmounts = document.querySelectorAll('.drink-amount');
    drinkAmounts.forEach((amount) => amount.innerHTML = '0 kpl');
    updateTotals();
    saveData();
});


// Add drink form values
// Increase function
const increaseValue = (button) => {
    const input = button.closest('div').querySelector('.value-input');
    let value = parseFloat(input.value);
    if (isNaN(value)) {
        value = 0;
    }

    // If id is true, increment = 1, else 0.1
    const increment = (input.id === 'drink-capacity') ? 1 : 0.1;
    value += increment;

    input.value = (increment === 0.1) ? value.toFixed(1) : value;
}

// Decrease function
const decreaseValue = (button) => {
    const input = button.closest('div').querySelector('.value-input');
    let value = input.value;
    if (isNaN(value)) {
        value = 0;
    }

    const decrement = (input.id === 'drink-capacity') ? 1 : 0.1;
    console.log(decrement);
    // Value min = 0
    input.value = (decrement === 0.1) ? Math.max(0, value - decrement).toFixed(1) : Math.max(0, value - decrement);
}