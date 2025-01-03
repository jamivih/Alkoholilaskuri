// Toggle between dark and light mode
// Check for saved theme preference in localStorage
document.getElementById('theme-toggle').addEventListener('click', () => {
    const darkMode = localStorage.getItem('darkmode');
    darkMode !== 'active' ? enableDarkmode() : disableDarkmode();
});

const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
    document.getElementById('moon').style.display = 'none';
    document.getElementById('lightbulb').style.display = '';
}

const disableDarkmode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', null);
    document.getElementById('lightbulb').style.display = 'none';
    document.getElementById('moon').style.display = '';
}

// On page load, check saved preference
document.addEventListener('DOMContentLoaded', () => {
    const darkMode = localStorage.getItem('darkmode');
    const themeToggle = document.getElementById('theme-toggle');
    if (darkMode === 'active') {
        enableDarkmode();
        themeToggle.checked = true
        document.getElementById('moon').style.display = 'none';
        document.getElementById('lightbulb').style.display = '';
    } else {
        disableDarkmode();
        themeToggle.checked = false
        document.getElementById('lightbulb').style.display = 'none';
        document.getElementById('moon').style.display = '';
    }
});

const saveData = () => {
    localStorage.setItem('table-data', document.getElementById('drink-table').innerHTML);
    // localStorage.setItem('total-data', document.getElementById('total-table').innerHTML);
}

const loadData = () => {
    document.getElementById('drink-table').innerHTML = localStorage.getItem('table-data');
    // document.getElementById('total-table').innerHTML = localStorage.getItem('total-data');
}

const saveUserDrinkingInfo = () => {
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const weight = document.getElementById("weight").value;
    const timeStart = document.getElementById("time-start").value;
    const timeEnd = document.getElementById("time-end").value;

    const inputValues = {
        gender: gender,
        weight: weight,
        timeStart: timeStart,
        timeEnd: timeEnd
    };

    localStorage.setItem('data', JSON.stringify(inputValues));
    console.log('data saved locally');
}

const loadUserDrinkingInfo = () => {
    const savedValues = localStorage.getItem('data');

    if (savedValues) {
        const { gender, weight, timeStart, timeEnd } = JSON.parse(savedValues);
        document.getElementById(`gender-${gender}`).checked = true;
        document.getElementById("weight").value = weight;
        console.log(weight)
        document.getElementById("time-start").value = timeStart;
        document.getElementById("time-end").value = timeEnd;
    }
}

const isDrinkTableEmpty = () => {
    if (document.getElementById('drink-table').rows.length < 1) {
        document.getElementById('reset-btn').style.display = 'none';
        // document.getElementById('total-table').style.visibility = 'hidden';
        document.getElementById('total-table').style.display = 'none';
        document.querySelector('.border-line').style.display = 'none';
    } else {
        document.getElementById('reset-btn').style.display = 'block';
        // document.getElementById('total-table').style.visibility = 'visible';
        document.getElementById('total-table').style.display = '';
        document.querySelector('.border-line').style.display = 'block';
    }
}

const updateTotals = () => {
    const drinkCap= document.querySelectorAll('.drink-cap');
    const drinkAlc = document.querySelectorAll('.drink-alc');
    const drinkCal = document.querySelectorAll('.drink-cal');
    const drinkAmount = document.querySelectorAll('.drink-amount');

    let totalCap = 0;
    let totalAlc = 0;
    let avgAlc = 0;
    let totalCal = 0;
    let totalAmount = 0;

    drinkAmount.forEach((drink, index) => {
        
        if (drinkCap[index] && drinkAlc[index] && drinkCal[index]) {
            const capacity = parseFloat(drinkCap[index].textContent) || 0;
            const alcohol = parseFloat(drinkAlc[index].textContent) || 0;
            const calories = parseFloat(drinkCal[index].textContent) || 0;
            const quantity = parseFloat(drink.textContent) || 0;
            
            totalCap += capacity * quantity;
            totalAlc += alcohol * quantity;
            totalCal += calories * quantity;
            totalAmount += quantity;

            avgAlc = totalAmount > 0 ? totalAlc / totalAmount : 0;
        } else {
            console.error(`drinkCap[${index}] or related data is undefined.`);
        }
    });

    document.getElementById('total-cap').textContent = `${totalCap.toFixed(2)} l`;
    document.getElementById('total-alc').textContent = `${avgAlc.toFixed(1)} %`;
    document.getElementById('total-kcal').textContent = `${totalCal} kcal`;
    document.getElementById('total-amount').textContent = `${totalAmount} kpl`;

    saveData();
};

document.addEventListener("DOMContentLoaded", loadUserDrinkingInfo);
document.addEventListener("DOMContentLoaded", loadData);
document.addEventListener("DOMContentLoaded", isDrinkTableEmpty);
document.addEventListener("DOMContentLoaded", updateTotals);
