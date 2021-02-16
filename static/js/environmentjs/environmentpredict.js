async function environmentPredict(id) {

    console.log(id);

    d3.csv('cleaned_data/apec_countries_data.csv').then(function (data) {

        // Checking to see if the dataset has been read
        console.log(data);

        // Filtering by country
        let countryFilter = data.filter(nation => nation.country === id);
        console.log(countryFilter);

        // Creating a list of empty arrays for later appendage

        let p25airpol = [];
        let p25airpolLow = [];
        let p25airpolhigh = [];
        let p25airpolPred = [];

        let population = [];
        let populationLow = [];
        let populationHigh = [];
        let populationPred = [];

        let electricityacess = [];
        let electricityacessLow = [];
        let electricityacessHigh = [];
        let electricityacessPred = [];

        let renewable = [];
        let renewableLow = [];
        let renewableHigh = [];
        let renewablePred = [];

        let urbanpop = [];
        let urbanpopLow = [];
        let urbanpopHigh = [];
        let urbanpopPred = [];

        let electricUse = [];
        let electricUseLow = [];
        let electricUseHigh = [];
        let electricUsePred = [];


        // Creating the x-axis 
        let year = [];

        Object.keys(countryFilter).forEach(function (key) {
            p25airpol.push(countryFilter[key].pm2_5_air_pollution);
            p25airpolLow.push(countryFilter[key].pm2_5_air_pollution_low);
            p25airpolhigh.push(countryFilter[key].pm2_5_air_pollution_high);
            p25airpolPred.push(countryFilter[key].pm2_5_air_pollution_pred);

            population.push(countryFilter[key].population);
            populationLow.push(countryFilter[key].pop_lower);
            populationHigh.push(countryFilter[key].pop_higher);
            populationPred.push(countryFilter[key].pop_pred);


            electricityacess.push(countryFilter[key].access_to_electricity_pct);
            electricityacessLow.push(countryFilter[key].access_to_electricity_pct_low);
            electricityacessHigh.push(countryFilter[key].access_to_electricity_pct_high);
            electricityacessPred.push(countryFilter[key].access_to_electricity_pct_pred);

            renewable.push(countryFilter[key].renewable_electricity_pct);
            renewableLow.push(countryFilter[key].renewable_electricity_pct_low);
            renewableHigh.push(countryFilter[key].renewable_electricity_pct_high);
            renewablePred.push(countryFilter[key].renewable_electricity_pct_pred);

            
            urbanpop.push(countryFilter[key].urban_population_pct);
            urbanpopLow.push(countryFilter[key].urban_population_pct_low);
            urbanpopHigh.push(countryFilter[key].urban_population_pct_high);
            urbanpopPred.push(countryFilter[key].urban_population_pct_pred);

            electricUse.push(countryFilter[key].electricity_consumption_kwh);
            electricUseLow.push(countryFilter[key].electricity_consumption_kwh_low);
            electricUseHigh.push(countryFilter[key].electricity_consumption_kwh_high);
            electricUsePred.push(countryFilter[key].electricity_consumption_kwh_pred);

            year.push(countryFilter[key]._year);

        })

        var p25 = document.getElementById("p25airpoll").getContext('2d');
        var p25Chart = new Chart(p25, {
            type: 'line',
            data: {
                labels: year,
                datasets: [{
                    label: 'Predicted',
                    data: p25airpolPred,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "rgba(50, 168, 82)",
                    borderColor: 'rgba(50, 168, 82)',
                    borderWidth: 3
                }, {
                    label: 'Actual Air Pollution Rates',
                    data: p25airpol.slice(0, 60),
                    fill: false,
                    pointRadius: 5,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderColor: "rgba(0, 0, 0, 0.0)",
                    borderWidth: 3
                },
                {
                    label: 'Upper Limit',
                    data: p25airpolhigh,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderColor: 'red',
                    borderWidth: 3
                },
                {
                    label: 'Lower Limit',
                    data: p25airpolLow,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderColor: 'red',
                    borderWidth: 3
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'pm25 particulate air pollution'
                        }
                    }],

                },
                title: {
                    display: true,
                    text: 'Air Pollution pm25 particulate',
                    fontSize: 20
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            var label = data.datasets[tooltipItem.datasetIndex].label || '';

                            if (label) {
                                label += ': ';
                            }
                            label += Math.round(tooltipItem.yLabel * 100) / 100;
                            return label;
                        }
                    }
                }
            }
        });
        
        d3.selectAll('#mpep25airpoll').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(p25airpol.slice(0,60),p25airpolPred.slice(0,60)))}%`);
        
        
        var electricity = document.getElementById("electricity").getContext('2d');
        var electricChart = new Chart(electricity, {
            type: 'line',
            data: {
                labels: year,
                datasets: [{
                    label: 'Predicted',
                    data: electricityacessPred,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "rgba(50, 168, 82)",
                    borderColor: 'rgba(50, 168, 82)',
                    borderWidth: 3
                }, {
                    label: 'Electricity Access',
                    data: electricityacess.slice(0, 60),
                    fill: false,
                    pointRadius: 5,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderColor: "rgba(0, 0, 0, 0.0)",
                    borderWidth: 3
                },
                {
                    label: 'Upper Limit',
                    data: electricityacessHigh,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderColor: 'red',
                    borderWidth: 3
                },
                {
                    label: 'Lower Limit',
                    data: electricityacessLow,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderColor: 'red',
                    borderWidth: 3
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Electricity Access(%)'
                        }
                    }],

                },
                title: {
                    display: true,
                    text: 'Access to Electricity',
                    fontSize: 20
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            var label = data.datasets[tooltipItem.datasetIndex].label || '';

                            if (label) {
                                label += ': ';
                            }
                            label += Math.round(tooltipItem.yLabel * 100) / 100;
                            return label;
                        }
                    }
                }
            }
        });

        d3.selectAll('#mpeelectric').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(electricityacess.slice(0,60),electricityacessPred.slice(0,60)))}%`);

        var renewableEnergy = document.getElementById("renewable").getContext('2d');
        var renewableChart = new Chart(renewableEnergy, {
            type: 'line',
            data: {
                labels: year,
                datasets: [{
                    label: 'Predicted',
                    data: renewablePred,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "rgba(50, 168, 82)",
                    borderColor: 'rgba(50, 168, 82)',
                    borderWidth: 3
                }, {
                    label: 'Actual Use of Renewable Energy',
                    data: renewable.slice(0, 60),
                    fill: false,
                    pointRadius: 5,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderColor: "rgba(0, 0, 0, 0.0)",
                    borderWidth: 3
                },
                {
                    label: 'Upper Limit',
                    data: renewableHigh,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderColor: 'red',
                    borderWidth: 3
                },
                {
                    label: 'Lower Limit',
                    data: renewableLow,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderColor: 'red',
                    borderWidth: 3
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Usage of Renewable Energy(%)'
                        }
                    }],

                },
                title: {
                    display: true,
                    text: 'Renewable Energy Use',
                    fontSize: 20
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            var label = data.datasets[tooltipItem.datasetIndex].label || '';

                            if (label) {
                                label += ': ';
                            }
                            label += Math.round(tooltipItem.yLabel * 100) / 100;
                            return label;
                        }
                    }
                }
            }
        });

        d3.selectAll('#mperenewable').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(renewable.slice(0,60),renewablePred.slice(0,60)))}%`);


        var pop = document.getElementById("population").getContext('2d');
        var PopulationChart = new Chart(pop, {
            type: 'line',
            data: {
                labels: year,
                datasets: [{
                    label: 'Predicted',
                    data: populationPred,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "rgba(50, 168, 82)",
                    borderColor: 'rgba(50, 168, 82)',
                    borderWidth: 3
                }, {
                    label: 'Actual Population Numbers',
                    data: population.slice(0, 60),
                    fill: false,
                    pointRadius: 5,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderColor: "rgba(0, 0, 0, 0.0)",
                    borderWidth: 1
                },
                {
                    label: 'Upper Limit',
                    data: populationHigh,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderColor: 'red',
                    borderWidth: 3
                },
                {
                    label: 'Lower Limit',
                    data: populationLow,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderColor: 'red',
                    borderWidth: 3
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Population'
                        }
                    }],

                },
                title: {
                    display: true,
                    text: 'Population',
                    fontSize: 20
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            var label = data.datasets[tooltipItem.datasetIndex].label || '';

                            if (label) {
                                label += ': ';
                            }
                            label += Math.round(tooltipItem.yLabel * 100) / 100;
                            return label;
                        }
                    }
                }
            }
        });

        d3.selectAll('#mpepopulation').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(population.slice(0,60),populationPred.slice(0,60)))}%`);

        var urbanpopulation = document.getElementById("urbanpopulation").getContext('2d');
        var UrbanPopChart = new Chart(urbanpopulation, {
            type: 'line',
            data: {
                labels: year,
                datasets: [{
                    label: 'Predicted',
                    data: urbanpopPred,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "rgba(50, 168, 82)",
                    borderColor: 'rgba(50, 168, 82)',
                    borderWidth: 3
                }, {
                    label: 'Actual Urban Population Numbers',
                    data: urbanpop.slice(0, 60),
                    fill: false,
                    pointRadius: 5,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderColor: "rgba(0, 0, 0, 0.0)",
                    borderWidth: 1
                },
                {
                    label: 'Upper Limit',
                    data: urbanpopHigh,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderColor: 'red',
                    borderWidth: 3
                },
                {
                    label: 'Lower Limit',
                    data: urbanpopLow,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderColor: 'red',
                    borderWidth: 3
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Urban Population(%)'
                        }
                    }],

                },
                title: {
                    display: true,
                    text: 'Urban Population',
                    fontSize: 20
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            var label = data.datasets[tooltipItem.datasetIndex].label || '';

                            if (label) {
                                label += ': ';
                            }
                            label += Math.round(tooltipItem.yLabel * 100) / 100;
                            return label;
                        }
                    }
                }
            }
        });

        d3.selectAll('#mpeurban').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(urbanpop.slice(0,60),urbanpopPred.slice(0,60)))}%`);

        var electricconsumpt = document.getElementById("electricityconsumption").getContext('2d');
        var electricConsumpChart = new Chart(electricconsumpt, {
            type: 'line',
            data: {
                labels: year,
                datasets: [{
                    label: 'Predicted',
                    data: electricUsePred,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "rgba(50, 168, 82)",
                    borderColor: 'rgba(50, 168, 82)',
                    borderWidth: 3
                }, {
                    label: 'Actual Use of Electricity',
                    data: electricUse.slice(0, 60),
                    fill: false,
                    pointRadius: 5,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderColor: "rgba(0, 0, 0, 0.0)",
                    borderWidth: 1
                },
                {
                    label: 'Upper Limit',
                    data: electricUseHigh,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderColor: 'red',
                    borderWidth: 3
                },
                {
                    label: 'Lower Limit',
                    data: electricUseLow,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderColor: 'red',
                    borderWidth: 3
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Electricity Usage (kw/h)'
                        }
                    }],

                },
                title: {
                    display: true,
                    text: 'Electricity Usage',
                    fontSize: 20
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            var label = data.datasets[tooltipItem.datasetIndex].label || '';

                            if (label) {
                                label += ': ';
                            }
                            label += Math.round(tooltipItem.yLabel * 100) / 100;
                            return label;
                        }
                    }
                }
            }
        });
        d3.selectAll('#mpeelectricconsumption').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(electricUse.slice(0,60),electricUsePred.slice(0,60)))}%`);

    })
}