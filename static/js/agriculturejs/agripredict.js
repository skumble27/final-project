async function agriPredict(id) {

    console.log(id);

    d3.csv('cleaned_data/agriculturesector_data/agriculture_data.csv').then(function (data) {


        // Checking to see if the datasets load
        // console.log(data);

        // Filtering by country
        let countryFilter = data.filter(nation => nation.country === id);
        console.log(countryFilter);

        // Creating a list of empty arrays in which append
        let landArea = [];
        let landAreaLow = [];
        let landAreaHigh = [];
        let landAreaPred = [];

        let agriLand = [];
        let agriLandLow = [];
        let agriLandHigh = [];
        let agriLandPred = [];

        let forestLand = [];
        let forestLandLow = [];
        let forestLandHigh = [];
        let forestLandPred = [];

        let cerealYield = [];
        let cerealYieldLow = [];
        let cerealYieldHigh = [];
        let cerealYieldPred = [];

        let cashCropYield = [];
        let cashCropYieldLow = [];
        let cashCropYieldHigh = [];
        let cashCropYieldPred = [];

        let employmentAg = [];
        let employmentAgLow = [];
        let employmentAgHigh = [];
        let employmentAgPred = [];

        let liveStockProd = [];
        let liveStockProdLow = [];
        let liveStockProdHigh = [];
        let liveStockProdPred = [];

        let population = [];
        let populationLow = [];
        let populationHigh = [];
        let populationPred = [];

        let gdp = [];
        let gdpLow = [];
        let gdpHigh = [];
        let gdpPred = [];



        // Creating the x-axis 
        let year = [];

        // Iterating through the filtered dataset objects
        Object.keys(countryFilter).forEach(function (key) {

            agriLand.push(countryFilter[key].agri_land_pct);
            agriLandLow.push(countryFilter[key].agri_land_pct_low);
            agriLandHigh.push(countryFilter[key].agri_land_pct_high);
            agriLandPred.push(countryFilter[key].agri_land_pct_pred);

            forestLand.push(countryFilter[key].forest_area_pct);
            forestLandLow.push(countryFilter[key].forest_area_pct_low);
            forestLandHigh.push(countryFilter[key].forest_area_pct_high);
            forestLandPred.push(countryFilter[key].forest_area_pct_pred);

            cerealYield.push(countryFilter[key].cereal_yield_kg_ha);
            cerealYieldLow.push(countryFilter[key].cereal_yield_kg_ha_low);
            cerealYieldHigh.push(countryFilter[key].cereal_yield_kg_ha_high);
            cerealYieldPred.push(countryFilter[key].cereal_yield_kg_ha_pred);


            cashCropYield.push(countryFilter[key].cash_crop_yield_kg_ha);
            cashCropYieldLow.push(countryFilter[key].cash_crop_yield_kg_ha_low);
            cashCropYieldHigh.push(countryFilter[key].cash_crop_yield_kg_ha_high);
            cashCropYieldPred.push(countryFilter[key].cash_crop_yield_kg_ha_pred);

            employmentAg.push(countryFilter[key].employment_agri_pct);
            employmentAgLow.push(countryFilter[key].employment_agri_pct_low);
            employmentAgHigh.push(countryFilter[key].employment_agri_pct_high);
            employmentAgPred.push(countryFilter[key].employment_agri_pct_pred);

            liveStockProd.push(countryFilter[key].livestock_production_100_index);
            liveStockProdLow.push(countryFilter[key].livestock_production_100_index_low);
            liveStockProdHigh.push(countryFilter[key].livestock_production_100_index_high);
            liveStockProdPred.push(countryFilter[key].livestock_production_100_index_pred);

            population.push(countryFilter[key].population);
            populationLow.push(countryFilter[key].pop_lower);
            populationHigh.push(countryFilter[key].pop_higher);
            populationPred.push(countryFilter[key].pop_pred);

            gdp.push(countryFilter[key].gdp_current_usd);
            gdpLow.push(countryFilter[key].gdp_lower);
            gdpHigh.push(countryFilter[key].gdp_higher);
            gdpPred.push(countryFilter[key].gdp_pred);

            year.push(countryFilter[key]._year);

        })

        console.log(cerealYield);
        console.log(cerealYieldPred);
        console.log(cerealYieldLow);
        console.log(cerealYieldHigh);
        
        var agri = document.getElementById("agriland").getContext('2d');
        var AgriChart = new Chart(agri, {
            type: 'line',
            data: {
                labels: year,
                datasets: [{
                    label: 'Predicted',
                    data: agriLandPred,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "rgba(0, 255, 25, 0.66)",
                    borderColor: 'rgb(0, 255, 25)',
                    borderWidth: 3
                }, {
                    label: 'Actual Land Area',
                    data: agriLand.slice(0, 60),
                    fill: false,
                    pointRadius: 5,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderColor: "rgba(0, 0, 0, 0.0)",
                    borderWidth: 3
                },
                {
                    label: 'Upper Limit',
                    data: agriLandHigh,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderColor: 'red',
                    borderWidth: 3
                },
                {
                    label: 'Lower Limit',
                    data: agriLandLow,
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
                            labelString: 'Land Area (ha)'
                        }
                    }],

                },
                title: {
                    display: true,
                    text: 'Agricultural Land Area',
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
        d3.selectAll('#mpeagri').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(agriLand.slice(0,60),agriLandPred.slice(0,60)))}%`);

        var forest = document.getElementById("forestland").getContext('2d');
        var ForestChart = new Chart(forest, {
            type: 'line',
            data: {
                labels: year,
                datasets: [{
                    label: 'Predicted',
                    data: forestLandPred,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "rgba(0, 255, 25, 0.66)",
                    borderColor: 'rgb(0, 255, 25)',
                    borderWidth: 3
                }, {
                    label: 'Actual Forest Land Area',
                    data: forestLand.slice(0, 60),
                    fill: false,
                    pointRadius: 5,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderColor: "rgba(0, 0, 0, 0.0)",
                    borderWidth: 3
                },
                {
                    label: 'Upper Limit',
                    data: forestLandHigh,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderColor: 'red',
                    borderWidth: 3
                },
                {
                    label: 'Lower Limit',
                    data: forestLandLow,
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
                            labelString: 'Land Area (ha)'
                        }
                    }],

                },
                title: {
                    display: true,
                    text: 'Forest Land Area',
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
        d3.selectAll('#mpeforest').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(forestLand.slice(0,60),forestLandPred.slice(0,60)))}%`);

        var cereal = document.getElementById("cereal").getContext('2d');
        var CerealChart = new Chart(cereal, {
            type: 'line',
            data: {
                labels: year,
                datasets: [{
                    label: 'Predicted',
                    data: cerealYieldPred,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "rgba(0, 255, 25, 0.66)",
                    borderColor: 'rgb(0, 255, 25)',
                    borderWidth: 3
                }, {
                    label: 'Actual Cereal Crop Yield',
                    data: cerealYield.slice(0, 60),
                    fill: false,
                    pointRadius: 5,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderColor: "rgba(0, 0, 0, 0.0)",
                    borderWidth: 3
                },
                {
                    label: 'Upper Limit',
                    data: cerealYieldHigh,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderColor: 'red',
                    borderWidth: 3
                },
                {
                    label: 'Lower Limit',
                    data: cerealYieldLow,
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
                            labelString: 'Cereal Crop Yield (kg/ha)'
                        }
                    }],

                },
                title: {
                    display: true,
                    text: 'Cereal Crop Yield',
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

        d3.selectAll('#mpecereal').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(cerealYield.slice(0,60),cerealYieldPred.slice(0,60)))}%`);

        var cash = document.getElementById("cashcrop").getContext('2d');
        var CashChart = new Chart(cash, {
            type: 'line',
            data: {
                labels: year,
                datasets: [{
                    label: 'Predicted',
                    data: cashCropYieldPred,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "rgba(0, 255, 25, 0.66)",
                    borderColor: 'rgb(0, 255, 25)',
                    borderWidth: 3
                }, {
                    label: 'Actual Cash Crop Yield',
                    data: cashCropYield.slice(0, 60),
                    fill: false,
                    pointRadius: 5,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderColor: "rgba(0, 0, 0, 0.0)",
                    borderWidth: 3
                },
                {
                    label: 'Upper Limit',
                    data: cashCropYieldHigh,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderColor: 'red',
                    borderWidth: 3
                },
                {
                    label: 'Lower Limit',
                    data: cashCropYieldLow,
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
                            labelString: 'Cash Crop Yield (kg/ha)'
                        }
                    }],

                },
                title: {
                    display: true,
                    text: 'Cash Crop Yield',
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

        d3.selectAll('#mpecash').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(cashCropYield.slice(0,60),cashCropYieldPred.slice(0,60)))}%`);

        var employment = document.getElementById("employmentag").getContext('2d');
        var EmploymentChart = new Chart(employment, {
            type: 'line',
            data: {
                labels: year,
                datasets: [{
                    label: 'Predicted',
                    data: employmentAgPred,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "rgba(0, 255, 25, 0.66)",
                    borderColor: 'rgb(0, 255, 25)',
                    borderWidth: 3
                }, {
                    label: 'Actual Employment in Agriculture',
                    data: employmentAg.slice(0, 60),
                    fill: false,
                    pointRadius: 5,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderColor: "rgba(0, 0, 0, 0.0)",
                    borderWidth: 3
                },
                {
                    label: 'Upper Limit',
                    data: employmentAgHigh,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderColor: 'red',
                    borderWidth: 3
                },
                {
                    label: 'Lower Limit',
                    data: employmentAgLow,
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
                            labelString: 'Employment in Agriculutre'
                        }
                    }],

                },
                title: {
                    display: true,
                    text: 'Employment in Agriculture',
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

        d3.selectAll('#mpeemp').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(employmentAg.slice(0,60),employmentAgPred.slice(0,60)))}%`);
        
        var livestock = document.getElementById("livestock").getContext('2d');
        var LivestockChart = new Chart(livestock, {
            type: 'line',
            data: {
                labels: year.slice(-47),
                datasets: [{
                    label: 'Predicted',
                    data: liveStockProdPred.slice(-47),
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "rgba(0, 255, 25, 0.66)",
                    borderColor: 'rgb(0, 255, 25)',
                    borderWidth: 3
                }, {
                    label: 'Actual Livestock Production',
                    data: liveStockProd.slice(23, 61),
                    fill: false,
                    pointRadius: 5,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderColor: "rgba(0, 0, 0, 0.0)",
                    borderWidth: 3
                },
                {
                    label: 'Upper Limit',
                    data: liveStockProdHigh.slice(-47),
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderColor: 'red',
                    borderWidth: 3
                },
                {
                    label: 'Lower Limit',
                    data: liveStockProdLow.slice(-47),
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
                            labelString: 'Livestock Production (index 2004-2006 = 100)'
                        }
                    }],

                },
                title: {
                    display: true,
                    text: 'Livestock Production',
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

        d3.selectAll('#mpelivestock').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(liveStockProd.slice(23,61),liveStockProdPred.slice(23,61)))}%`);
        


    })
}