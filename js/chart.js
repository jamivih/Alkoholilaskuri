const generateChart = (permille, bac) => {
    const timeStart = document.getElementById('time-start').value;
    const timeEnd = document.getElementById('time-end').value;
    const burningRatePerHour = bac / 0.015;
    const legalLimit = (bac - 0.05) / 0.015;
    const timeStartDecimal = hoursToDecimal(timeStart);
    const timeEndDecimal = hoursToDecimal(timeEnd);
    let labels;

    let legalToDrive = (timeEndDecimal + legalLimit).toFixed(2);
    let alcoholBurned = (timeEndDecimal + burningRatePerHour).toFixed(2);
    if (alcoholBurned > 24) {
        alcoholBurned = alcoholBurned - 24;  
    }

    const alcoholBurnedTime = decimalToHours(alcoholBurned);
    const legalLimitTime = decimalToHours(legalToDrive);

    // 0.5 in data only if permille level goes above it
    const data = (permille < 0.5) ? [0, permille, 0] : [0, permille, 0.5, 0];
    const ctx = document.getElementById('permillesChart').getContext('2d');

    // Text content and chart labels
    if (permille <= 0) {
        labels = [timeStart, timeEnd];
        document.getElementById('permille').textContent = `Veren arvioitu alkoholipitoisuus on ${permille} promillea.`;
        // createPermilleChart(ctx, labels, data)
    } else if (permille < 0.5) {
        labels = [timeStart, timeEnd, alcoholBurnedTime];
        document.getElementById('permille').textContent = `Veren arvioitu alkoholipitoisuus on ${permille.toFixed(2)} promillea. Alkoholi on palanut noin klo ${alcoholBurnedTime} mennessä.`;
        createPermilleChart(ctx, labels, data)
    } else {
        labels = [timeStart, timeEnd, legalLimitTime, alcoholBurnedTime];
        document.getElementById('permille').textContent = `Veren arvioitu alkoholipitoisuus on ${permille.toFixed(2)} promillea. Alkoholi on palanut noin klo ${alcoholBurnedTime} mennessä.`;
        createPermilleChart(ctx, labels, data)
    }
}

const createPermilleChart = (ctx, labels, data) => {
    // If a chart instance already exists, destroy it to avoid conflicts
    if (window.lineChartInstance) {
        window.lineChartInstance.destroy();
    }
    
    // Create a new chart
    window.lineChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Promille',
                data: data,
                borderColor: '#817dff', // Line color
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2, // Line thickness
                tension: 0.3, // Curve smoothness (0 = straight lines)
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Aika'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Promille'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}