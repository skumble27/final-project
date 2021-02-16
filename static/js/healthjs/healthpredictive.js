async function healthPredict(id) {
    console.log(id);

    d3.csv('cleaned_data/healthsector_data/healthsector.csv').then(function (data) {

        console.log(data);

        let countryFilter = data.filter(nation => nation.country === id);
        console.log(countryFilter);

        // Creating a list of empty arrays for later appendage

        let brithRate = [];
        let brithRateLow = [];
        let brithRateHigh = [];
        let brithRatePred = [];

        let deathRate = [];
        let deathRateLow = [];
        let deathRateHigh = [];
        let deathRatePred = [];

        let dtpImmunisation = [];
        let dtpImmunisationLow = [];
        let dtpImmunisationHigh = [];
        let dtpImmunisationPred = [];

        let gdp = [];
        let gdpLow = [];
        let gdpHigh = [];
        let gdpPred = [];

        let lifeExpectency = [];
        let lifeExpectencyLow = [];
        let lifeExpectencyHigh = [];
        let lifeExpectencyPred = [];

        let measlesImmunisation = [];
        let measlesImmunisationLow = [];
        let measlesImmunisationHigh = [];
        let measlesImmunisationPred = [];

        let population = [];
        let populationLow = [];
        let populationHigh = [];
        let populationPred = [];

        let cancerCases = [];
        let cancerCasesLow = [];
        let cancerCasesHigh = [];
        let cancerCasesPred = [];

        let cancerDeaths = [];
        let cancerDeathsLow = [];
        let cancerDeathsHigh = [];
        let cancerDeathsPred = [];
        let obesity = [];
        let obesityLow = [];
        let obesityHigh = [];
        let obesityPred = [];


        // Creating a time parse for date
        var parseTime = d3.timeParse('%d/%m/%Y');

        // Creating the x-axis 
        let year = [];


        // Iterating through the filtered dataset objects
        Object.keys(countryFilter).forEach(function (key) {
            brithRate.push(countryFilter[key].birth_rate);
            brithRateLow.push(countryFilter[key].birth_rate_low);
            brithRateHigh.push(countryFilter[key].birth_rate_high);
            brithRatePred.push(countryFilter[key].birth_rate_pred);

            deathRate.push(countryFilter[key].death_rate);
            deathRateLow.push(countryFilter[key].death_rate_low);
            deathRateHigh.push(countryFilter[key].death_rate_high);
            deathRatePred.push(countryFilter[key].death_rate_pred);

            dtpImmunisation.push(countryFilter[key].dtp_immunisation);
            dtpImmunisationLow.push(countryFilter[key].dtp_immunisation_low);
            dtpImmunisationHigh.push(countryFilter[key].dtp_immunisation_high);
            dtpImmunisationPred.push(countryFilter[key].dtp_immunisation_pred);

            gdp.push(countryFilter[key].gdp_current_usd);
            gdpLow.push(countryFilter[key].gdp_lower);
            gdpHigh.push(countryFilter[key].gdp_higher);
            gdpPred.push(countryFilter[key].gdp_pred);

            lifeExpectency.push(countryFilter[key].life_expectency);
            lifeExpectencyLow.push(countryFilter[key].life_expectency_low);
            lifeExpectencyHigh.push(countryFilter[key].life_expectency_high);
            lifeExpectencyPred.push(countryFilter[key].life_expectency_pred);

            measlesImmunisation.push(countryFilter[key].measles_immunisation);
            measlesImmunisationLow.push(countryFilter[key].measles_immunisation_low);
            measlesImmunisationHigh.push(countryFilter[key].measles_immunisation_high);
            measlesImmunisationPred.push(countryFilter[key].measles_immunisation_pred);

            population.push(countryFilter[key].population);
            populationLow.push(countryFilter[key].pop_lower);
            populationHigh.push(countryFilter[key].pop_higher);
            populationPred.push(countryFilter[key].pop_pred);

            cancerCases.push(countryFilter[key].total_cancer_cases);
            cancerCasesLow.push(countryFilter[key].cancer_case_lower);
            cancerCasesHigh.push(countryFilter[key].cancer_case_higher);
            cancerCasesPred.push(countryFilter[key].cancer_case_pred);

            cancerDeaths.push(countryFilter[key].total_cancer_deaths);
            cancerDeathsLow.push(countryFilter[key].total_cancer_deaths_err_low);
            cancerDeathsHigh.push(countryFilter[key].total_cancer_deaths_err_high);
            cancerDeathsPred.push(countryFilter[key].total_cancer_deaths_pred);

            obesity.push(countryFilter[key].total_obesity_numbers);
            obesityLow.push(countryFilter[key].total_obesity_numbers_low);
            obesityHigh.push(countryFilter[key].total_obesity_numbers_high);
            obesityPred.push(countryFilter[key].total_obesity_numbers_pred);

            year.push(countryFilter[key]._year);

        })

        var births = document.getElementById("totalbirths").getContext('2d');
        var BirthChart = new Chart(births, {
            type: 'line',
            data: {
                labels: year,
                datasets: [{
                    label: 'Predicted',
                    data: brithRatePred,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 3
                }, {
                    label: 'Actual Birth Rate',
                    data: brithRate.slice(0, 60),
                    fill: false,
                    pointRadius: 5,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderColor: "rgba(0, 0, 0, 0.0)",
                    borderWidth: 3
                },
                {
                    label: 'Upper Limit',
                    data: brithRateHigh,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderColor: 'red',
                    borderWidth: 3
                },
                {
                    label: 'Lower Limit',
                    data: brithRateLow,
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
                            labelString: 'Total Births'
                        }
                    }],

                },
                title: {
                    display: true,
                    text: 'Total Number of Births',
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
        
        d3.selectAll('#mpebirths').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(brithRate.slice(0,60),brithRatePred.slice(0,60)))}%`);





        var deaths = document.getElementById("totaldeaths").getContext('2d');
        var DeathChart = new Chart(deaths, {
            type: 'line',
            data: {
                labels: year,
                datasets: [{
                    label: 'Predicted',
                    data: deathRatePred,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 3
                }, {
                    label: 'Actual Death Rate',
                    data: deathRate.slice(0, 60),
                    fill: false,
                    pointRadius: 5,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderColor: "rgba(0, 0, 0, 0.0)",
                    borderWidth: 3
                },
                {
                    label: 'Upper Limit',
                    data: deathRateHigh,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderColor: 'red',
                    borderWidth: 3
                },
                {
                    label: 'Lower Limit',
                    data: deathRateLow,
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
                            labelString: 'Total Deaths'
                        }
                    }],

                },
                title: {
                    display: true,
                    text: 'Total Number of Deaths',
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

        d3.selectAll('#mpedeaths').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(deathRate.slice(0,60),deathRatePred.slice(0,60)))}%`);

        var DTP = document.getElementById("dtp").getContext('2d');
        var DTPChart = new Chart(DTP, {
            type: 'line',
            data: {
                labels: year.slice(-47),
                datasets: [{
                    label: 'Predicted',
                    data: dtpImmunisationPred.slice(-47),
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 3
                }, {
                    label: 'Actual DTP Immunisation',
                    data: dtpImmunisation.slice(23,61),
                    fill: false,
                    pointRadius: 5,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderColor: "rgba(0, 0, 0, 0.0)",
                    borderWidth: 1
                },
                {
                    label: 'Upper Limit',
                    data: dtpImmunisationHigh.slice(-47),
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderColor: 'red',
                    borderWidth: 3
                },
                {
                    label: 'Lower Limit',
                    data: dtpImmunisationLow.slice(-47),
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
                            labelString: 'DTP Immunisations'
                        }
                    }],

                },
                title: {
                    display: true,
                    text: 'DTP Immunisations',
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

        d3.selectAll('#mpedtp').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(dtpImmunisation.slice(23,61),dtpImmunisationPred.slice(23,61)))}%`);

        var measles = document.getElementById("measles").getContext('2d');
        var MeaslesChart = new Chart(measles, {
            type: 'line',
            data: {
                labels: year.slice(-47),
                datasets: [{
                    label: 'Predicted',
                    data: measlesImmunisationPred.slice(-47),
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 3
                }, {
                    label: 'Actual Measles Immunisation',
                    data: measlesImmunisation.slice(23, 61),
                    fill: false,
                    pointRadius: 5,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderColor: "rgba(0, 0, 0, 0.0)",
                    borderWidth: 1
                },
                {
                    label: 'Upper Limit',
                    data: measlesImmunisationHigh.slice(-47),
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderColor: 'red',
                    borderWidth: 3
                },
                {
                    label: 'Lower Limit',
                    data: measlesImmunisationLow.slice(-47),
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
                            labelString: 'Measles Immunisation'
                        }
                    }],

                },
                title: {
                    display: true,
                    text: 'Total Number of Measles Immunisations',
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
        d3.selectAll('#mpemeasles').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(measlesImmunisation.slice(23,61),measlesImmunisationPred.slice(23,61)))}%`);
        var cancercase = document.getElementById("cancercases").getContext('2d');
        var CancerCaseChart = new Chart(cancercase, {
            type: 'line',
            data: {
                labels: year,
                datasets: [{
                    label: 'Predicted',
                    data: cancerCasesPred,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 3
                }, {
                    label: 'Actual Cancer Cases',
                    data: cancerCases.slice(0, 60),
                    fill: false,
                    pointRadius: 5,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderColor: "rgba(0, 0, 0, 0.0)",
                    borderWidth: 1
                },
                {
                    label: 'Upper Limit',
                    data: cancerCasesHigh,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderColor: 'red',
                    borderWidth: 3
                },
                {
                    label: 'Lower Limit',
                    data: cancerCasesLow,
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
                            labelString: 'Cancer Cases'
                        }
                    }],

                },
                title: {
                    display: true,
                    text: 'Total Number of Cancer Cases',
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
        
        d3.selectAll('#mpecancercase').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(cancerCases.slice(0,60),cancerCasesPred.slice(0,60)))}%`);
        
        var cancerdeath = document.getElementById("cancerdeaths").getContext('2d');
        var CancerDeathChart = new Chart(cancerdeath, {
            type: 'line',
            data: {
                labels: year,
                datasets: [{
                    label: 'Predicted',
                    data: cancerDeathsPred,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 3
                }, {
                    label: 'Actual Cancer Deaths',
                    data: cancerDeaths.slice(0, 60),
                    fill: false,
                    pointRadius: 5,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderColor: "rgba(0, 0, 0, 0.0)",
                    borderWidth: 1
                },
                {
                    label: 'Upper Limit',
                    data: cancerDeathsHigh,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderColor: 'red',
                    borderWidth: 3
                },
                {
                    label: 'Lower Limit',
                    data: cancerDeathsLow,
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
                            labelString: 'Total Cancer Deaths'
                        }
                    }],

                },
                title: {
                    display: true,
                    text: 'Total Number of Cancer Deaths',
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

        d3.selectAll('#mpecancerdeaths').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(cancerDeaths.slice(0,60),cancerDeathsPred.slice(0,60)))}%`);


        var obesityctx = document.getElementById("obesity").getContext('2d');
        var ObesityChart = new Chart(obesityctx, {
            type: 'line',
            
            data: {
                labels: year,
                datasets: [{
                    label: 'Predicted',
                    data: obesityPred,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 3
                }, {
                    label: 'Actual Obesity Rate',
                    data: obesity.slice(0, 60),
                    fill: false,
                    pointRadius: 5,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderColor: "rgba(0, 0, 0, 0.0)",
                    borderWidth: 1
                },
                {
                    label: 'Upper Limit',
                    data: obesityHigh,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderColor: 'red',
                    borderWidth: 3
                },
                {
                    label: 'Lower Limit',
                    data: obesityLow,
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
                            labelString: 'Total Obesity Numbers'
                        },
                        // gridLines: {
                        //     display: true ,
                        //     color: "white"
                        //   },
                    }],
                    xAxes: [{
                          scaleLabel: {
                            display: true,
                            labelString: 'Year'
                        },
                    }]

                },
                title: {
                    display: true,
                    text: 'Total Number of Obese People',
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

        d3.selectAll('#mpeobesity').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(obesity.slice(0,60),obesityPred.slice(0,60)))}%`);
        var life = document.getElementById("life").getContext('2d');
        var LifeChart = new Chart(life, {
            type: 'line',
            data: {
                labels: year,
                datasets: [{
                    label: 'Predicted',
                    data: lifeExpectencyPred,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 3
                }, {
                    label: 'Actual Life Expectency Age',
                    data: lifeExpectency.slice(0, 60),
                    fill: false,
                    pointRadius: 5,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderColor: "rgba(0, 0, 0, 0.0)",
                    borderWidth: 1
                },
                {
                    label: 'Upper Limit',
                    data: lifeExpectencyHigh,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderColor: 'red',
                    borderWidth: 3
                },
                {
                    label: 'Lower Limit',
                    data: lifeExpectencyLow,
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
                            labelString: 'Life Expectency Age'
                        }
                    }],

                },
                title: {
                    display: true,
                    text: 'Life Expectency',
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
        
        d3.selectAll('#mpelife').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(lifeExpectency.slice(0,60),lifeExpectencyPred.slice(0,60)))}%`);
        
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
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: 'rgba(54, 162, 235, 1)',
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
        
        var gdpctx = document.getElementById("gdp").getContext('2d');
        var GdpChart = new Chart(gdpctx, {
            type: 'line',
            data: {
                labels: year,
                datasets: [{
                    label: 'Predicted',
                    data: gdpPred,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 3
                }, {
                    label: `Actual Nation's GDP`,
                    data: gdp.slice(0, 60),
                    fill: false,
                    pointRadius: 5,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderColor: "rgba(0, 0, 0, 0.0)",
                    borderWidth: 1
                },
                {
                    label: 'Upper Limit',
                    data: gdpHigh,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderColor: 'red',
                    borderWidth: 3
                },
                {
                    label: 'Lower Limit',
                    data: gdpLow,
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
                            labelString: 'Gross Domestic Product'
                        }
                    }],

                },
                title: {
                    display: true,
                    text: `Gross Domestic Product for ${id}`,
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
        d3.selectAll('#mpegdp').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(gdp.slice(0,60),gdpPred.slice(0,60)))}%`);


    })

}