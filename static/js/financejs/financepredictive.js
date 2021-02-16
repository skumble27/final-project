async function financePredict(id) {
    console.log(id);

    d3.csv('cleaned_data/financesector_data/finance_data.csv').then(function (data) {

        console.log(data)

        let countryFilter = data.filter(nation => nation.country === id);
        console.log(countryFilter);

        // Creating a list of empty arrays to later append
        let broadMoneyGrowth = [];
        let broadMoneyGrowthLow = [];
        let broadMoneyGrowthHigh = [];
        let broadMoneyGrowthPred = [];

        let domesticCompanies = [];
        let domesticCompaniesLow = [];
        let domesticCompaniesHigh = [];
        let domesticCompaniesPred = [];

        let foreignInvestment = [];
        let foreignInvestmentLow = [];
        let foreignInvestmentHigh = [];
        let foreignInvestmentPred = [];

        let inflation = [];
        let inflationLow = [];
        let inflationHigh = [];
        let inflationPred = [];

        let stockTrade = [];
        let stockTradeLow = [];
        let stockTradeHigh = [];
        let stockTradePred = [];

        let totalReserves = [];
        let totalReservesLow = [];
        let totalReservesHigh = [];
        let totalReservesPred = [];

        let gdp = [];
        let gdpLow = [];
        let gdpHigh = [];
        let gdpPred = [];

        // Creating the x-axis 
        let year = [];

        // Iterating through the filtered Dataset of Objects
        Object.keys(countryFilter).forEach(function (key) {
            // Access to money in each country
            broadMoneyGrowth.push(countryFilter[key].broad_money_growth_pct);
            broadMoneyGrowthLow.push(countryFilter[key].broad_money_growth_pct_low);
            broadMoneyGrowthHigh.push(countryFilter[key].broad_money_growth_pct_high);
            broadMoneyGrowthPred.push(countryFilter[key].broad_money_growth_pct_pred);

            domesticCompanies.push(countryFilter[key].listed_domestic_companies);
            domesticCompaniesLow.push(countryFilter[key].listed_domestic_companies_low);
            domesticCompaniesHigh.push(countryFilter[key].listed_domestic_companies_high);
            domesticCompaniesPred.push(countryFilter[key].listed_domestic_companies_pred);


            foreignInvestment.push(countryFilter[key].foreign_investment_gdp);
            foreignInvestmentLow.push(countryFilter[key].foreign_investment_gdp_low);
            foreignInvestmentHigh.push(countryFilter[key].foreign_investment_gdp_high);
            foreignInvestmentPred.push(countryFilter[key].foreign_investment_gdp_pred);


            inflation.push(countryFilter[key].inflation_pct);
            inflationLow.push(countryFilter[key].foreign_investment_gdp_low);
            inflationHigh.push(countryFilter[key].foreign_investment_gdp_high);
            inflationPred.push(countryFilter[key].foreign_investment_gdp_pred);

            stockTrade.push(countryFilter[key].stocks_traded_pct_gdp);
            stockTradeLow.push(countryFilter[key].stocks_traded_pct_gdp_low);
            stockTradeHigh.push(countryFilter[key].stocks_traded_pct_gdp_high);
            stockTradePred.push(countryFilter[key].stocks_traded_pct_gdp_pred);

            totalReserves.push(countryFilter[key].total_reserves);
            totalReservesLow.push(countryFilter[key].total_reserves_low);
            totalReservesHigh.push(countryFilter[key].total_reserves_high);
            totalReservesPred.push(countryFilter[key].total_reserves_pred);

            year.push(countryFilter[key]._year);
            gdp.push(countryFilter[key].gdp_current_usd);
            gdpLow.push(countryFilter[key].gdp_lower);
            gdpHigh.push(countryFilter[key].gdp_higher);
            gdpPred.push(countryFilter[key].gdp_pred);
        })

        console.log(stockTradePred)


        var broad = document.getElementById("broadmoney").getContext('2d');
        var BroadChart = new Chart(broad, {
            type: 'line',
            data: {
                labels: year,
                datasets: [{
                    label: 'Predicted',
                    data: broadMoneyGrowthPred,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 3
                }, {
                    label: 'Actual Broad Money Growth',
                    data: broadMoneyGrowth.slice(0, 60),
                    fill: false,
                    pointRadius: 5,
                    backgroundColor: "rgba(0, 0, 0)",
                    borderColor: "rgba(0, 0, 0)",
                    borderWidth: 3
                },
                {
                    label: 'Upper Limit',
                    data: broadMoneyGrowthHigh,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderColor: 'red',
                    borderWidth: 3
                },
                {
                    label: 'Lower Limit',
                    data: broadMoneyGrowthLow,
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
                            labelString: 'Broad Money Growth'
                        },
                        gridLines: {
                            display: true,
                            color: "black"
                        },
                    }],
                    xAxes: [{
                        gridLines: {
                            display: true,
                            color: "black"
                        },
                    }]

                },
                title: {
                    display: true,
                    text: 'Broad Money Growth',
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

        d3.selectAll('#mpebroadmoney').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(broadMoneyGrowth.slice(0,60),broadMoneyGrowthPred.slice(0,60)))}%`);


        var domestic = document.getElementById("domesticcompanies").getContext('2d');
        var DomesticChart = new Chart(domestic, {
            type: 'line',
            data: {
                labels: year,
                datasets: [{
                    label: 'Predicted',
                    data: domesticCompaniesPred,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 3
                }, {
                    label: 'Actual No. Listed Domestic Companies',
                    data: domesticCompanies.slice(0, 60),
                    fill: false,
                    pointRadius: 5,
                    backgroundColor: "rgba(0, 0, 0)",
                    borderColor: "rgba(0, 0, 0)",
                    borderWidth: 3
                },
                {
                    label: 'Upper Limit',
                    data: domesticCompaniesHigh,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderColor: 'red',
                    borderWidth: 3
                },
                {
                    label: 'Lower Limit',
                    data: domesticCompaniesLow,
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
                            labelString: 'Domestic Companies'
                        },
                        gridLines: {
                            display: true,
                            color: "black"
                        },
                    }],
                    xAxes: [{
                        gridLines: {
                            display: true,
                            color: "black"
                        },
                    }]

                },
                title: {
                    display: true,
                    text: 'Domestic Companies',
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

        d3.selectAll('#mpedomesctic').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(domesticCompanies.slice(0,60),domesticCompaniesPred.slice(0,60)))}%`);

        var foreign = document.getElementById("foreigninvestment").getContext('2d');
        var ForeignChart = new Chart(foreign, {
            type: 'line',
            data: {
                labels: year,
                datasets: [{
                    label: 'Predicted',
                    data: foreignInvestmentPred,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 3
                }, {
                    label: 'Actual Foreign Investment Values',
                    data: foreignInvestment.slice(0, 60),
                    fill: false,
                    pointRadius: 5,
                    backgroundColor: "rgba(0, 0, 0)",
                    borderColor: "rgba(0, 0, 0)",
                    borderWidth: 3
                },
                {
                    label: 'Upper Limit',
                    data: foreignInvestmentHigh,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderColor: 'red',
                    borderWidth: 3
                },
                {
                    label: 'Lower Limit',
                    data: foreignInvestmentLow,
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
                            labelString: 'Foreign Investment'
                        },
                        gridLines: {
                            display: true,
                            color: "black"
                        },
                    }],
                    xAxes: [{
                        gridLines: {
                            display: true,
                            color: "black"
                        },
                    }]

                },
                title: {
                    display: true,
                    text: 'Foreign Investment',
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

        d3.selectAll('#mpeforeign').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(foreignInvestment.slice(0,60),foreignInvestmentPred.slice(0,60)))}%`);

        var inflations = document.getElementById("inflation").getContext('2d');
        var InflationChart = new Chart(inflations, {
            type: 'line',
            data: {
                labels: year,
                datasets: [{
                    label: 'Predicted',
                    data: inflationPred,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 3
                }, {
                    label: 'Actual Foreign Investment Values',
                    data: inflation.slice(0, 60),
                    fill: false,
                    pointRadius: 5,
                    backgroundColor: "rgba(0, 0, 0)",
                    borderColor: "rgba(0, 0, 0)",
                    borderWidth: 3
                },
                {
                    label: 'Upper Limit',
                    data: inflationHigh,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderColor: 'red',
                    borderWidth: 3
                },
                {
                    label: 'Lower Limit',
                    data: inflationLow,
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
                            labelString: 'Inflation'
                        },
                        gridLines: {
                            display: true,
                            color: "black"
                        },
                    }],
                    xAxes: [{
                        gridLines: {
                            display: true,
                            color: "black"
                        },
                    }]

                },
                title: {
                    display: true,
                    text: 'Inlfation',
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

        d3.selectAll('#mpeinflation').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(inflation.slice(0,60),inflationPred.slice(0,60)))}%`);

        var stocks = document.getElementById("stockstraded").getContext('2d');
        var StocksChart = new Chart(stocks, {
            type: 'line',
            data: {
                labels: year,
                datasets: [{
                    label: 'Predicted',
                    data: stockTradePred,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 3
                }, {
                    label: 'Actual Stocks Traded',
                    data: stockTrade.slice(0, 60),
                    fill: false,
                    pointRadius: 5,
                    backgroundColor: "rgba(0, 0, 0)",
                    borderColor: "rgba(0, 0, 0)",
                    borderWidth: 3
                },
                {
                    label: 'Upper Limit',
                    data: stockTradeHigh,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderColor: 'red',
                    borderWidth: 3
                },
                {
                    label: 'Lower Limit',
                    data: stockTradeLow,
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
                            labelString: 'Stocks Traded'
                        },
                        gridLines: {
                            display: true,
                            color: "black"
                        },
                    }],
                    xAxes: [{
                        gridLines: {
                            display: true,
                            color: "black"
                        },
                    }]

                },
                title: {
                    display: true,
                    text: 'Stocks Traded',
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

        d3.selectAll('#mpestockstraded').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(stockTrade.slice(0,60),stockTradePred.slice(0,60)))}%`);

        var reserves = document.getElementById("totalreserves").getContext('2d');
        var ReservesChart = new Chart(reserves, {
            type: 'line',
            data: {
                labels: year,
                datasets: [{
                    label: 'Predicted',
                    data: totalReservesPred,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 3
                }, {
                    label: 'Actual Total Reserves',
                    data: totalReserves.slice(0, 60),
                    fill: false,
                    pointRadius: 5,
                    backgroundColor: "rgba(0, 0, 0)",
                    borderColor: "rgba(0, 0, 0)",
                    borderWidth: 3
                },
                {
                    label: 'Upper Limit',
                    data: totalReservesHigh,
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0,
                    backgroundColor: "red",
                    borderColor: 'red',
                    borderWidth: 3
                },
                {
                    label: 'Lower Limit',
                    data: totalReservesLow,
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
                            labelString: 'Total Reserves'
                        },
                        gridLines: {
                            display: true,
                            color: "black"
                        },
                    }],
                    xAxes: [{
                        gridLines: {
                            display: true,
                            color: "black"
                        },
                    }]

                },
                title: {
                    display: true,
                    text: 'Total Reserves',
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

        d3.selectAll('#mpetotalreserves').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(totalReserves.slice(0,60),totalReservesPred.slice(0,60)))}%`);


    })
}