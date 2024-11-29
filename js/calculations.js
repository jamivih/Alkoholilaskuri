const countBAC = () => {
    const drinkTable = document.getElementById('drink-table');
    const rows = drinkTable.getElementsByTagName('tr');

    const gender = document.querySelector('input[name="gender"]:checked').value;
    const weight = document.getElementById('weight').value;
    const startTime = parseTime(document.getElementById('time-start').value);
    const endTime = parseTime(document.getElementById('time-end').value);
    const timeDifference = calculateTimeDifference(startTime, endTime);

    let totalAlcoholCapacity = 0;
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].querySelector('.drink-details');
        const capacity = parseFloat(cells.querySelector('.drink-cap').textContent);
        const volume = parseFloat(cells.querySelector('.drink-alc').textContent);
        const amount = parseFloat(cells.querySelector('.drink-amount').textContent);

        const totalCapacity = capacity * amount;
        const totalVolume = totalCapacity * volume * 0.01;
        
        totalAlcoholCapacity += totalVolume;
    }
    let bac = 0;
    const alcDensity = 0.789;
    const burningRate = 0.013;
    const hourlyBurningRate = burningRate * timeDifference;
    const rMale = 0.68;
    const rFemale = 0.55;
    const A = totalAlcoholCapacity * alcDensity;

    bac = (gender === 'male') ? (A * 100) / (weight * rMale) - hourlyBurningRate : (A * 100) / (weight * rFemale) - hourlyBurningRate;
    console.log('hourlyBurningRate ', hourlyBurningRate);
    console.log('bac ', bac);

    // Convert BAC to permille
    let permille = bac * 10;
    if (permille <= 0) {
        permille = 0;
    }

    document.getElementById('permille').innerHTML = `Veren arvioitu alkoholipitoisuus on ${permille.toFixed(2)} promillea.`
    generateChart(permille, bac);
}

const parseTime = (time) => {
    // Convert the time string (hh:mm) to Date objects
    const parsedTime = new Date(`1970-01-01T${time}:00`);
    return parsedTime;
}

const calculateTimeDifference = (start, end) => {
    // If end time is less than start time, add 24 hours to the end time
    if (end < start) {
        end = new Date(end.getTime() + 24 * 60 * 60 * 1000); // Add 24 hours
    }

     // Calculate the difference in milliseconds
     const diffInMilliseconds = end - start;
     console.log('diff in mill',diffInMilliseconds);

     // Convert milliseconds to hours (1 hour = 3600000 ms)
    const diffInHours = diffInMilliseconds / 3600000;
    console.log('diff in hours',diffInHours);

    return diffInHours;
    
}

const hoursToDecimal = (time) => {
    // Convert the time to a string to manipulate it
    const timeString = time.toString();

    // Split the time into hours and minutes
    const parts = timeString.split(':');

    // Get hours from the first part
    const hours = parseInt(parts[0], 10);
    
    // Get minutes from the second part (if exists)
    const minutes = parts[1] ? parseInt(parts[1], 10) : 0;

    // Convert minutes to decimal hours
    const decimalMinutes = minutes / 60;

    // Return the total in decimal form
    return hours + decimalMinutes;
}

const decimalToHours = (decimal) => {
    // Get the whole number part for the hours
    const hours = Math.floor(decimal);
    
    // Get the decimal part, and convert it to minutes
    const minutes = Math.round((decimal - hours) * 60);

    // Return the result in "hours.minutes" format (e.g., 2.30 for 2 hours 30 minutes)
    return `${hours}.${minutes < 10 ? '0' : ''}${minutes}`;
}
