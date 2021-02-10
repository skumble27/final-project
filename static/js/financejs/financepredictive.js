async function financePredict(id) {
    console.log(id);

    await d3.json('http://127.0.0.1:5000/compileddata').then(async function (data) {

        // Checking to see if the dataset can be read
        // console.log(data);

        // Filtering by country

        let countryFilter = data.filter(nation => nation.country === id);
        // console.log(countryFilter);

        // Creating a list of empty arrays to later append
        let broadMoneyGrowth = [];
        let domesticCompanies = []
        let foreignInvestment = [];
        let inflation = [];
        let stockTrade = [];
        let totalReserves = [];
        let gdp = [];

        // Creating a time parse for date
        var parseTime = d3.timeParse('%d/%m/%Y');

        // Creating the x-axis 
        let year = [];
        let rawYear = [];

        let intYear = [];

        // Iterating through the filtered Dataset of Objects
        Object.keys(countryFilter).forEach(function (key) {
            // Access to money in each country
            broadMoneyGrowth.push(countryFilter[key].broad_money_growth_pct);
            domesticCompanies.push(countryFilter[key].listed_domestic_companies);
            foreignInvestment.push(countryFilter[key].foreign_investment_gdp);
            inflation.push(countryFilter[key].inflation_pct);
            stockTrade.push(countryFilter[key].stocks_traded_pct_gdp)
            totalReserves.push(countryFilter[key].total_reserves);
            year.push(parseTime(countryFilter[key]._year));
            gdp.push(countryFilter[key].gdp_current_usd);
            rawYear.push(countryFilter[key]._year);
        })

        // Creating an integer of years
        for (var i = 0; i < rawYear.length; i++) {
            // console.log(new Date(rawYear[i]).getFullYear());
            intYear.push(new Date(rawYear[i]).getFullYear());
        }
        // console.log(intYear);

        const broadMoneyTrain = tf.sequential();
        const domesticTrain = tf.sequential();
        const foreignTrain = tf.sequential();
        const inflationTrain = tf.sequential();
        const stockTrain = tf.sequential();
        const totalReservesTrain = tf.sequential();
        const gdpTrain = tf.sequential();

        // Creating a 10 year forecast
        let predYears = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
        let testYears = [2015, 2016, 2017, 2018, 2019, 2020];

        console.log(SimpleMovingAverage(broadMoneyGrowth,20));

        // Converting arrays to tensorflow arrays
        let broadMoneyTF = tf.tensor2d((MinMaxScaler(SimpleMovingAverage(broadMoneyGrowth,3)).slice(-6)),[(SimpleMovingAverage(broadMoneyGrowth,3)).slice(-6).length,1]);
        let domesticCompanyTF = tf.tensor2d((MinMaxScaler(SimpleMovingAverage(domesticCompanies,3).slice(-6))),[(SimpleMovingAverage(domesticCompanies,3)).slice(-6).length,1]);
        let foreignTF = tf.tensor2d((MinMaxScaler(SimpleMovingAverage(foreignInvestment,3)).slice(-6)),[(SimpleMovingAverage(foreignInvestment,3)).slice(-6).length,1]);
        let inflationTF = tf.tensor2d((MinMaxScaler(SimpleMovingAverage(inflation,3).slice(-6))),[(SimpleMovingAverage(inflation,3)).slice(-6).length,1]);
        let stockTF = tf.tensor2d((MinMaxScaler(SimpleMovingAverage(stockTrade,3).slice(-6))),[(SimpleMovingAverage(stockTrade,3)).slice(-6).length,1]);
        let totalReserveTF = tf.tensor2d((MinMaxScaler(SimpleMovingAverage(totalReserves,3).slice(-6))),[(SimpleMovingAverage(totalReserves,3)).slice(-6).length,1]);
        let gdpTF = tf.tensor2d((MinMaxScaler(SimpleMovingAverage(gdp,3).slice(-6))),[(SimpleMovingAverage(gdp,3)).slice(-6).length,1]);
        let yearTF = tf.tensor2d(MinMaxScaler(intYear.slice(-6)), [intYear.slice(-6).length, 1]);


        // Scaling the predictive years
        let testYearsScaled = yearScale(testYears);
        let predYearsScaled = yearScale(predYears);

        console.log(testYearsScaled);
        console.log(predYearsScaled);

        d3.selectAll('#financepredict').append('h2').text("Machine Learning in progress");

        // Creating the Neural Networks
        broadMoneyTrain.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', kernelInitializer: 'ones' }));
        broadMoneyTrain.add(tf.layers.dense({ units: 61, inputShape: [1] }));
        broadMoneyTrain.add(tf.layers.dense({ units: 1, inputShape: [61] }));
        broadMoneyTrain.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam() });

        domesticTrain.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', kernelInitializer: 'ones' }));
        domesticTrain.add(tf.layers.dense({ units: 61, inputShape: [1] }));
        domesticTrain.add(tf.layers.dense({ units: 1, inputShape: [61] }));
        domesticTrain.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam() });

        foreignTrain.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', kernelInitializer: 'ones' }));
        foreignTrain.add(tf.layers.dense({ units: 61, inputShape: [1] }));
        foreignTrain.add(tf.layers.dense({ units: 1, inputShape: [61] }));
        foreignTrain.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam() });

        inflationTrain.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', kernelInitializer: 'ones' }));
        inflationTrain.add(tf.layers.dense({ units: 61, inputShape: [1] }));
        inflationTrain.add(tf.layers.dense({ units: 1, inputShape: [61] }));
        inflationTrain.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam() });

        stockTrain.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', kernelInitializer: 'ones' }));
        stockTrain.add(tf.layers.dense({ units: 61, inputShape: [1] }));
        stockTrain.add(tf.layers.dense({ units: 1, inputShape: [61] }));
        stockTrain.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam() });

        totalReservesTrain.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', kernelInitializer: 'ones' }));
        totalReservesTrain.add(tf.layers.dense({ units: 61, inputShape: [1] }));
        totalReservesTrain.add(tf.layers.dense({ units: 1, inputShape: [61] }));
        totalReservesTrain.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam() });

        gdpTrain.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', kernelInitializer: 'ones' }));
        gdpTrain.add(tf.layers.dense({ units: 61, inputShape: [1] }));
        gdpTrain.add(tf.layers.dense({ units: 1, inputShape: [61] }));
        gdpTrain.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam() });

        d3.selectAll('#validate').append('h2').text("Initiated Machine Learning Process");

        // Training the Neural Networks
        await broadMoneyTrain.fit(yearTF, broadMoneyTF, { epochs: 500, callbacks: {onEpochEnd: async (epoch, logs)=> d3.selectAll('#broadmoneylog').append('p').text(`Broad Money Growth Data - Epochs: ${epoch}, loss: ${JSON.stringify(logs)}`)} });
        d3.selectAll('#broadmoneylog').html('');
        await domesticTrain.fit(yearTF, domesticCompanyTF, { epochs: 500, callbacks: {onEpochEnd: async (epoch, logs)=> d3.selectAll('#domesticcomplog').append('p').text(`List of Domestic Companies Data - Epochs: ${epoch}, loss: ${JSON.stringify(logs)}`)} });
        d3.selectAll('#domesticcomplog').html('');
        await foreignTrain.fit(yearTF, foreignTF, { epochs: 500, callbacks: {onEpochEnd: async (epoch, logs)=> d3.selectAll('#foreignlog').append('p').text(`Foreign Investment Data - Epochs: ${epoch}, loss: ${JSON.stringify(logs)}`)} });
        d3.selectAll('#foreignlog').html('');
        await inflationTrain.fit(yearTF, inflationTF, { epochs: 500, callbacks: {onEpochEnd: async (epoch, logs)=> d3.selectAll('#inflationlog').append('p').text(`Inflation Data - Epochs: ${epoch}, loss: ${JSON.stringify(logs)}`)} });
        d3.selectAll('#inflationlog').html('');
        await stockTrain.fit(yearTF, stockTF, { epochs: 500, callbacks: {onEpochEnd: async (epoch, logs)=> d3.selectAll('#stockslog').append('p').text(`Stocks Traded Data - Epochs: ${epoch}, loss: ${JSON.stringify(logs)}`)} });
        d3.selectAll('#stockslog').html('');
        await totalReservesTrain.fit(yearTF, totalReserveTF, { epochs: 500, callbacks: {onEpochEnd: async (epoch, logs)=> d3.selectAll('#stockslog').append('p').text(`Cash Reserves Data - Epochs: ${epoch}, loss: ${JSON.stringify(logs)}`)} });
        d3.selectAll('#stockslog').html('');
        await gdpTrain.fit(yearTF, gdpTF, { epochs: 500, callbacks: {onEpochEnd: async (epoch, logs)=> d3.selectAll('#cashreserveslog').append('p').text(`GDP Data - Epochs: ${epoch}, loss: ${JSON.stringify(logs)}`)} });
        d3.selectAll('#cashreserveslog').html('');


        d3.selectAll('#financepredict').append('h3').text("Validating Predictive Models (Returning Mean Percentage Error)");
        d3.selectAll('#validate').html('');


        // Testing the accuracy of the predictions
        let broadMoneyTest = await broadMoneyTrain.predict(tf.tensor2d(testYearsScaled, [testYearsScaled.length, 1])).dataSync();
        let domesticTest = await domesticTrain.predict(tf.tensor2d(testYearsScaled, [testYearsScaled.length, 1])).dataSync();
        let foreignTest = await foreignTrain.predict(tf.tensor2d(testYearsScaled, [testYearsScaled.length, 1])).dataSync();
        let inflationTest = await inflationTrain.predict(tf.tensor2d(testYearsScaled, [testYearsScaled.length, 1])).dataSync();
        let stockTest = await stockTrain.predict(tf.tensor2d(testYearsScaled, [testYearsScaled.length, 1])).dataSync();
        let totalReservesTest = await totalReservesTrain.predict(tf.tensor2d(testYearsScaled, [testYearsScaled.length, 1])).dataSync();
        let gdpTest = await gdpTrain.predict(tf.tensor2d(testYearsScaled, [testYearsScaled.length, 1])).dataSync();


        // Making the prediction

        let broadMoneyPredict = await broadMoneyTrain.predict(tf.tensor2d(predYearsScaled, [predYearsScaled.length, 1])).dataSync();
        let domesticPredict = await domesticTrain.predict(tf.tensor2d(predYearsScaled, [predYearsScaled.length, 1])).dataSync();
        let foreignPredict = await foreignTrain.predict(tf.tensor2d(predYearsScaled, [predYearsScaled.length, 1])).dataSync();
        let inflationPredict = await inflationTrain.predict(tf.tensor2d(predYearsScaled, [predYearsScaled.length, 1])).dataSync();
        let stockPredict = await stockTrain.predict(tf.tensor2d(predYearsScaled, [predYearsScaled.length, 1])).dataSync();
        let totalReservesPredict = await totalReservesTrain.predict(tf.tensor2d(predYearsScaled, [predYearsScaled.length, 1])).dataSync();
        let gdpPredict = await gdpTrain.predict(tf.tensor2d(predYearsScaled, [predYearsScaled.length, 1])).dataSync();

        // Converting the tensor objects back to arrays
        let broadMoneyPredictScaled = Array.from(broadMoneyPredict);
        let domesticPredictScaled = Array.from(domesticPredict);
        let foreignPredictScaled = Array.from(foreignPredict);
        let inflationPredictScaled = Array.from(inflationPredict);
        let stockPredictScaled = Array.from(stockPredict);
        let totalReservesPredictScaled = Array.from(totalReservesPredict);
        let gdpPredictScaled = Array.from(gdpPredict);

        let broadMoneyTestScaled = Array.from(broadMoneyTest);
        let domesticTestScaled = Array.from(domesticTest);
        let foreignTestScaled = Array.from(foreignTest);
        let inflationTestScaled = Array.from(inflationTest);
        let stockTestScaled = Array.from(stockTest);
        let totalReservesTestScaled = Array.from(totalReservesTest);
        let gdpTestScaled = Array.from(gdpTest);

        // Ten Year Forecast
        let tenYearBroadMoney = conversion(maxArray(broadMoneyGrowth), minArray(broadMoneyGrowth), broadMoneyPredictScaled);
        let tenYearDomestic = conversion(maxArray(domesticCompanies), minArray(domesticCompanies), domesticPredictScaled);
        let tenYearForeign = conversion(maxArray(foreignInvestment), minArray(foreignInvestment), foreignPredictScaled);
        let tenYearInflation = conversion(maxArray(inflation), minArray(inflation), inflationPredictScaled);
        let tenYearStock = conversion(maxArray(stockTrade), minArray(stockTrade), stockPredictScaled);
        let tenYearReserves = conversion(maxArray(totalReserves), minArray(totalReserves), totalReservesPredictScaled);
        let tenYearGdp = conversion(maxArray(gdp), minArray(gdp), gdpPredictScaled);

        let tenYearBroadMoneyTest = conversion(maxArray(broadMoneyGrowth), minArray(broadMoneyGrowth), broadMoneyTestScaled);
        let tenYearDomesticTest = conversion(maxArray(domesticCompanies), minArray(domesticCompanies), domesticTestScaled);
        let tenYearForeignTest = conversion(maxArray(foreignInvestment), minArray(foreignInvestment), foreignTestScaled);
        let tenYearInflationTest = conversion(maxArray(inflation), minArray(inflation), inflationTestScaled);
        let tenYearStockTest = conversion(maxArray(stockTrade), minArray(stockTrade), stockTestScaled);
        let tenYearReservesTest = conversion(maxArray(totalReserves), minArray(totalReserves), totalReservesTestScaled);
        let tenYearGdpTest = conversion(maxArray(gdp), minArray(gdp), gdpTestScaled);

        // Inform User that Training is Complete
        d3.selectAll('#financepredict').append('p').text("Machine Learning Complete, forecasts are available below");

        d3.selectAll('#broadmoneytag').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(broadMoneyGrowth.slice(-6), tenYearBroadMoneyTest))}%`);
        d3.selectAll('#domesticcomptag').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(domesticCompanies.slice(-6), tenYearDomesticTest))}%`);
        d3.selectAll('#gdptag').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(gdp.slice(-6), tenYearGdpTest))}%`);
        d3.selectAll('#foreigntag').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(foreignInvestment.slice(-6), tenYearForeignTest))}%`);
        d3.selectAll('#inflationtag').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(inflation.slice(-6), tenYearInflationTest))}%`);
        d3.selectAll('#stockstag').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(stockTrade.slice(-6), tenYearStockTest))}%`);
        d3.selectAll('#cashreservetag').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(totalReserves.slice(-6), tenYearReservesTest))}%`);

        // Creating a table to show the ML Predictions
        var Broadlayout = {
            title: `${id}`,
            font: {
                color: 'white',
                family: 'Arial',
                size: 16
            },
            paper_bgcolor: 'black',
            plot_bgcolor: 'black'
        };
        var broadValues = [predYears, tenYearBroadMoney]

        var broaddata = [{
            type: 'table',
            header: {
                values: [["<b>Year</b>"], ["<b>Broad Money Growth (%)</b>"]],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "#595959" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: broadValues,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }]

        Plotly.newPlot('predbroadmoney', broaddata, Broadlayout);

        var domesticCompanylayout = {
            title: `${id}`,
            font: {
                color: 'white',
                family: 'Arial',
                size: 16
            },
            paper_bgcolor: 'black',
            plot_bgcolor: 'black'
        };
        var domesticCompanyValues = [predYears, tenYearDomestic]

        var domesticCompanydata = [{
            type: 'table',
            header: {
                values: [["<b>Year</b>"], ["<b>Number of Domestic Companies"]],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "#595959" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: domesticCompanyValues,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }]

        Plotly.newPlot('preddomesticcompanies', domesticCompanydata, domesticCompanylayout);

        var gdplayout = {
            title: `${id}`,
            font: {
                color: 'white',
                family: 'Arial',
                size: 16
            },
            paper_bgcolor: 'black',
            plot_bgcolor: 'black'
        };
        var gdpValues = [predYears, tenYearGdp]

        var gdpdata = [{
            type: 'table',
            header: {
                values: [["<b>Year</b>"], ["<b>Gross Domestic Product"]],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "#595959" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: gdpValues,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }]

        Plotly.newPlot('predgdp', gdpdata, gdplayout);

        var foreignInvestlayout = {
            title: `${id}`,
            font: {
                color: 'white',
                family: 'Arial',
                size: 16
            },
            paper_bgcolor: 'black',
            plot_bgcolor: 'black'
        };
        var foreignValues = [predYears, tenYearForeign]

        var foreigndata = [{
            type: 'table',
            header: {
                values: [["<b>Year</b>"], ["<b>Foreign Investment (% GDP)"]],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "#595959" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: foreignValues,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }]

        Plotly.newPlot('predforeigninvestment', foreigndata, foreignInvestlayout);

        var inflationlayout = {
            title: `${id}`,
            font: {
                color: 'white',
                family: 'Arial',
                size: 16
            },
            paper_bgcolor: 'black',
            plot_bgcolor: 'black'
        };
        var inflationValues = [predYears, tenYearInflation]

        var inflationdata = [{
            type: 'table',
            header: {
                values: [["<b>Year</b>"], ["<b>Inflation"]],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "#595959" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: inflationValues,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }]

        Plotly.newPlot('predinflation', inflationdata, inflationlayout);

        var stockslayout = {
            title: `${id}`,
            font: {
                color: 'white',
                family: 'Arial',
                size: 16
            },
            paper_bgcolor: 'black',
            plot_bgcolor: 'black'
        };
        var stocksValues = [predYears, tenYearStock]

        var stockdata = [{
            type: 'table',
            header: {
                values: [["<b>Year</b>"], ["<b>Stocks Traded (% of GDP)"]],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "#595959" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: stocksValues,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }]

        Plotly.newPlot('predstockstraded', stockdata, stockslayout);

        var reserveslayout = {
            title: `${id}`,
            font: {
                color: 'white',
                family: 'Arial',
                size: 16
            },
            paper_bgcolor: 'black',
            plot_bgcolor: 'black'
        };
        var reservesValues = [predYears, tenYearReserves]

        var reservesdata = [{
            type: 'table',
            header: {
                values: [["<b>Year</b>"], ["<b>Total Reserves (USD)"]],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "#595959" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: reservesValues,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }]

        Plotly.newPlot('predtotalreserves', reservesdata, reserveslayout);

    })
}