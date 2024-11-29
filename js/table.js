document.getElementById('drink-to-table-btn').addEventListener('click', () => {
    const name = document.getElementById('drink-name').value;
    const capacity = parseFloat(document.getElementById('drink-capacity').value) / 100;
    const alcohol = document.getElementById('drink-alcohol').value;
    let calories = parseFloat(document.getElementById('drink-calories').value);
    const calorietype = document.getElementById('calorie-type').value;

    if (calorietype === 'per100ml') {
        calories = calories * (capacity * 10);
    }

    if (!name || isNaN(capacity) || isNaN(alcohol) || isNaN(calories)) {
        alert('Täytä kaikki tiedot')
    } else {
        const drink = {
            name: name,
            capacity: capacity,
            alcohol: alcohol,
            calories: calories,
            amount: 0
        };

        addDrinkToTable(drink);
    }
    //tähän form styling none
});

function addDrinkToTable(drink) {
    const table = document.getElementById('drink-table');
    const newRow = table.insertRow();

    // Cell1: Decrease button & edit button
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);

    cell1.className = 'drink-buttons';
    cell2.className = 'drink-info';
    cell3.className = 'drink-buttons';

    // Cell1: Decrease button & edit button
    const decreaseButton = document.createElement('button');
    const editButton = document.createElement('span');
    const saveButton = document.createElement('span');

    decreaseButton.textContent = '- ';
    decreaseButton.className = 'decrease-value-btn';
    decreaseButton.id = 'decrease-drink';
    decreaseButton.setAttribute('onclick', `decreaseDrinkAmount(this)`);

    editButton.id = 'edit-drink';
    // editButton.textContent = 'E';
    editButton.className = 'edit-btn fa-regular fa-pen-to-square';
    editButton.setAttribute('onclick', `editDrink(this)`);

    saveButton.id = 'save-drink';
    saveButton.className = 'save-input-btn fa-regular fa-square-check';
    // saveButton.textContent = 'S';
    saveButton.style.display = 'none';

    cell1.appendChild(decreaseButton);
    cell1.appendChild(editButton);
    cell1.appendChild(saveButton);

    // Cell2: Drink name, capacity, alcoholicity & amount
    const drinkNameDiv = document.createElement('div');
    const drinkHeader = document.createElement('h3');

    drinkNameDiv.className = 'drink-header';

    drinkHeader.className = 'drink-name';
    drinkHeader.textContent = drink.name;

    drinkNameDiv.appendChild(drinkHeader);
    cell2.appendChild(drinkNameDiv);

    const drinkDetailsDiv = document.createElement('div');
    drinkDetailsDiv.className = 'drink-details';

    const drinkCapacity = document.createElement('span');
    const drinkAlcohol = document.createElement('span');
    const drinkCalories = document.createElement('span');
    const drinkAmount = document.createElement('span');

    drinkCapacity.className = 'drink-cap';
    drinkAlcohol.className = 'drink-alc';
    drinkCalories.className = 'drink-cal';
    drinkAmount.className = 'drink-amount';

    drinkCapacity.textContent = `${drink.capacity} l`;
    drinkAlcohol.textContent = `${drink.alcohol}%`;
    drinkCalories.textContent = `${drink.calories.toFixed(0)} kcal`;
    drinkAmount.textContent = `${drink.amount} kpl`;
    drinkAmount.id = table.rows.length;
    
    drinkDetailsDiv.appendChild(drinkCapacity);
    drinkDetailsDiv.appendChild(drinkAlcohol);
    drinkDetailsDiv.appendChild(drinkCalories);
    drinkDetailsDiv.appendChild(drinkAmount);
    cell2.appendChild(drinkDetailsDiv);

    // Cell4: Remove drink & increase buttons
    const removeButton = document.createElement('span');
    const increaseButton = document.createElement('button');
    
    removeButton.id = 'remove-drink';
    removeButton.className = 'remove-btn fa-regular fa-trash-can'
    // removeButton.textContent = 'R';

    increaseButton.id = 'increase-drink';
    increaseButton.className = 'increase-value-btn';
    increaseButton.textContent = '+';

    increaseButton.setAttribute('onclick', `increaseDrinkAmount(this)`);

    cell3.appendChild(removeButton);
    cell3.appendChild(increaseButton);

    saveData();
    isDrinkTableEmpty();
    addDrinkFormDisplay();
    updateTotals();   
}

const isValidTextInput = (input) => {
    return !input;
}

const isValidNumberInput = (input) => {
    return isNaN(input) || !input;
}

// Delete drink function
document.getElementById('drink-table').addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-btn')) {
        const row = event.target.closest('tr');
        const drinkName = row.querySelector('.drink-name').textContent;
        if (confirm(`Poista ${drinkName}?`)) {
            row.remove();
            saveData();
            isDrinkTableEmpty();
            console.log(`${drinkName} deleted`);
        }; 
    }
    updateTotals();
});

// Edit drink function
let isEditing = false;
const editDrink = (button) => {

    const removeButtons = document.querySelectorAll('.remove-btn');
    const editButtons = document.querySelectorAll('.edit-btn');
    removeButtons.forEach((button) => {button.style.display = 'none'});
    editButtons.forEach((button) => {button.style.display = 'none'});

    const row = button.closest('tr');
    const cells = row.querySelector('.drink-info');
    const drinkName = cells.querySelector('.drink-name');
    const drinkCapacity = cells.querySelector('.drink-cap');
    const drinkAlcohol = cells.querySelector('.drink-alc');
    const drinkCalories = cells.querySelector('.drink-cal');

    const saveButton = row.querySelector('#save-drink');
    saveButton.style.display = ''; 

    if (!isEditing) { //<button id="save-input-btn">Tallenna</button>
        drinkName.innerHTML = `<input type="text" class="edit-name" id="nameInput" value="${drinkName.textContent}"></input>`;
        drinkCapacity.innerHTML = `<input type="text" class="edit-details" id="capacityInput" value="${parseFloat(drinkCapacity.textContent)}">`;
        drinkAlcohol.innerHTML = `<input type="text" class="edit-details" id="alcoholInput" value="${parseFloat(drinkAlcohol.textContent)}">`;
        drinkCalories.innerHTML = `<input type="text" class="edit-details" id="caloriesInput" value="${parseFloat(drinkCalories.textContent)}">`;
        isEditing = true;
    
        saveButton.addEventListener('click', () => {
            console.log('save pressed')
            if (isValidTextInput(`${document.getElementById('nameInput').value}`) ||
            isValidNumberInput(`${document.getElementById('capacityInput').value}`) ||
            isValidNumberInput(`${document.getElementById('alcoholInput').value}`) ||
            isValidNumberInput(`${document.getElementById('caloriesInput').value}`)) {
            alert('Täytä kaikki tiedot')
        } else {
            drinkName.innerHTML = `${document.getElementById('nameInput').value}`;
            drinkCapacity.innerHTML = `${document.getElementById('capacityInput').value} l`;
            drinkAlcohol.innerHTML = `${document.getElementById('alcoholInput').value}%`;
            drinkCalories.innerHTML = `${document.getElementById('caloriesInput').value} kcal`;
            isEditing = false;
            removeButtons.forEach((button) => {button.style.display = ''});
            editButtons.forEach((button) => {button.style.display = ''});
            saveButton.style.display = 'none'; 
            saveData();
            updateTotals();
        }
        });
    }
}