async function agriPredict(id) {

    console.log(id);

    await d3.json('http://127.0.0.1:5000/compileddata').then(async function (data) {

        // Checking to see if the data has loaded
        // console.log(data);

        // Filtering by country
        let countryFilter = data.filter(nation => nation.country === id);
        // console.log(countryFilter);

        // Creating a list of empty arrays in which append
        let landArea = [];
        let agriLand = [];
        let forestLand = [];
        let cerealYield = [];
        let cashCropYield = [];
        let employmentAg = [];
        let liveStockProd = [];
        let population = [];
        let gdp = [];

        // Creating a time parse for date
        var parseTime = d3.timeParse('%d/%m/%Y');

        // Creating the x-axis 
        let year = [];
        let rawYear = [];

        let intYear = [];

        // Iterating through the filtered dataset objects
        Object.keys(countryFilter).forEach(function (key) {
            landArea.push(countryFilter[key].land_area_ha);
            agriLand.push(countryFilter[key].agri_land_pct);
            forestLand.push(countryFilter[key].forest_area_pct);
            cerealYield.push(countryFilter[key].cereal_yield_kg_ha);
            cashCropYield.push(countryFilter[key].cash_crop_yield_kg_ha);
            employmentAg.push(countryFilter[key].employment_agri_pct);
            liveStockProd.push(countryFilter[key].livestock_production_100_index);
            year.push(parseTime(countryFilter[key]._year));
            population.push(countryFilter[key].population);
            gdp.push(countryFilter[key].gdp_current_usd);
            rawYear.push(countryFilter[key]._year);
        })
        // console.log(liveStockProd);

        // Creating an integer of years
        for (var i = 0; i < rawYear.length; i++) {
            // console.log(new Date(rawYear[i]).getFullYear());
            intYear.push(new Date(rawYear[i]).getFullYear());
        }
        console.log(intYear);




        // Creating Machine Learning Algorithms for each data
        const agriTrain = tf.sequential();
        const foresrTrain = tf.sequential();
        const cerealTrain = tf.sequential();
        const cashCropTrain = tf.sequential();
        const employmentTrain = tf.sequential();
        const populationTrain = tf.sequential();
        const gdpTrain = tf.sequential();
        const livestockTrain = tf.sequential();

        // Creating a 10 year forecast
        let predYears = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
        let testYears = [2015, 2016, 2017, 2018, 2019, 2020];

        // Converting JavaScript arrays to Tensorflow Arrays
        let agriTF = tf.tensor2d(MinMaxScaler(agriLand.slice(-6)), [agriLand.slice(-6).length, 1]);
        let forestTF = tf.tensor2d(MinMaxScaler(forestLand.slice(-6)), [forestLand.slice(-6).length, 1]);
        let cerealTF = tf.tensor2d(MinMaxScaler(cerealYield.slice(-6)), [cerealYield.slice(-6).length, 1]);
        let cashCropTF = tf.tensor2d(MinMaxScaler(cashCropYield.slice(-6)), [cashCropYield.slice(-6).length, 1]);
        let empTF = tf.tensor2d(MinMaxScaler(employmentAg.slice(-6)), [employmentAg.slice(-6).length, 1]);
        let populationTF = tf.tensor2d(MinMaxScaler(population.slice(-6)), [population.slice(-6).length, 1]);
        let gdpTF = tf.tensor2d(MinMaxScaler(gdp.slice(-6)), [gdp.slice(-6).length, 1]);
        let livestockTF = tf.tensor2d(MinMaxScaler(liveStockProd.slice(-6)), [liveStockProd.slice(-6).length, 1]);
        let yearTF = tf.tensor2d(MinMaxScaler(intYear.slice(-6)), [intYear.slice(-6).length, 1]);

        
        // Scaling the predictive years
        let testYearsScaled = yearScale(testYears);
        let predYearsScaled = yearScale(predYears);
        
        console.log(testYearsScaled);
        console.log(predYearsScaled);


        d3.selectAll('#agripredict').append('h2').text("Machine Learning in progress");

        // Creating the Neural Networks for Each Variable
        agriTrain.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', kernelInitializer: 'ones' }));
        agriTrain.add(tf.layers.dense({ units: 61, inputShape: [1] }));
        agriTrain.add(tf.layers.dense({ units: 1, inputShape: [61] }));
        agriTrain.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam() });


        foresrTrain.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', kernelInitializer: 'ones' }));
        foresrTrain.add(tf.layers.dense({ units: 61, inputShape: [1] }));
        foresrTrain.add(tf.layers.dense({ units: 1, inputShape: [61] }));
        foresrTrain.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam() });

        cerealTrain.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', kernelInitializer: 'ones' }));
        cerealTrain.add(tf.layers.dense({ units: 61, inputShape: [1] }));
        cerealTrain.add(tf.layers.dense({ units: 1, inputShape: [61] }));
        cerealTrain.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam() });

        cashCropTrain.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', kernelInitializer: 'ones' }));
        cashCropTrain.add(tf.layers.dense({ units: 61, inputShape: [1] }));
        cashCropTrain.add(tf.layers.dense({ units: 1, inputShape: [61] }));
        cashCropTrain.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam() });

        employmentTrain.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', kernelInitializer: 'ones' }));
        employmentTrain.add(tf.layers.dense({ units: 61, inputShape: [1] }));
        employmentTrain.add(tf.layers.dense({ units: 1, inputShape: [61] }));
        employmentTrain.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam() });

        populationTrain.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', kernelInitializer: 'ones' }));
        populationTrain.add(tf.layers.dense({ units: 61, inputShape: [1] }));
        populationTrain.add(tf.layers.dense({ units: 1, inputShape: [61] }));
        populationTrain.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam() });

        gdpTrain.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', kernelInitializer: 'ones' }));
        gdpTrain.add(tf.layers.dense({ units: 61, inputShape: [1] }));
        gdpTrain.add(tf.layers.dense({ units: 1, inputShape: [61] }));
        gdpTrain.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam() });

        livestockTrain.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', kernelInitializer: 'ones' }));
        livestockTrain.add(tf.layers.dense({ units: 61, inputShape: [1] }));
        livestockTrain.add(tf.layers.dense({ units: 1, inputShape: [61] }));
        livestockTrain.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam() });

        // Making a prediction on the data for Births
        await agriTrain.fit(yearTF, agriTF, { epochs: 100 });
        await foresrTrain.fit(yearTF, forestTF, { epochs: 100 });
        await cerealTrain.fit(yearTF, cerealTF, { epochs: 100 });
        await cashCropTrain.fit(yearTF, cashCropTF, { epochs: 100 });
        await employmentTrain.fit(yearTF, empTF, { epochs: 100 });
        await populationTrain.fit(yearTF, populationTF, { epochs: 100 });
        await gdpTrain.fit(yearTF, gdpTF, { epochs: 100 });
        await livestockTrain.fit(yearTF, livestockTF, { epochs: 100 });

        // Announce that training is complete
        d3.selectAll('#agripredict').append('h3').text("Validating Predictive Models (Returning Mean Percentage Error)");

        // Test Accuracy of the predictions
        let agriTest = await agriTrain.predict(tf.tensor2d(testYearsScaled, [testYearsScaled.length, 1])).dataSync();
        let forestTest = await foresrTrain.predict(tf.tensor2d(testYearsScaled, [testYearsScaled.length, 1])).dataSync();
        let cerealTest = await cerealTrain.predict(tf.tensor2d(testYearsScaled, [testYearsScaled.length, 1])).dataSync();
        let cashTest = await cashCropTrain.predict(tf.tensor2d(testYearsScaled, [testYearsScaled.length, 1])).dataSync();
        let empTest = await employmentTrain.predict(tf.tensor2d(testYearsScaled, [testYearsScaled.length, 1])).dataSync();
        let populationTest = await populationTrain.predict(tf.tensor2d(testYearsScaled, [testYearsScaled.length, 1])).dataSync();
        let gdpTest = await gdpTrain.predict(tf.tensor2d(testYearsScaled, [testYearsScaled.length, 1])).dataSync();
        let livestockTest = await livestockTrain.predict(tf.tensor2d(testYearsScaled, [testYearsScaled.length, 1])).dataSync();

        // Predict the next ten years
        let agriPredict = await agriTrain.predict(tf.tensor2d(predYearsScaled, [predYearsScaled.length, 1])).dataSync();
        let forestPredict = await foresrTrain.predict(tf.tensor2d(predYearsScaled, [predYearsScaled.length, 1])).dataSync();
        let cerealPredict = await cerealTrain.predict(tf.tensor2d(predYearsScaled, [predYearsScaled.length, 1])).dataSync();
        let cashPredict = await cashCropTrain.predict(tf.tensor2d(predYearsScaled, [predYearsScaled.length, 1])).dataSync();
        let empPredict = await employmentTrain.predict(tf.tensor2d(predYearsScaled, [predYearsScaled.length, 1])).dataSync();
        let populationPredict = await populationTrain.predict(tf.tensor2d(predYearsScaled, [predYearsScaled.length, 1])).dataSync();
        let gdpPredict = await gdpTrain.predict(tf.tensor2d(predYearsScaled, [predYearsScaled.length, 1])).dataSync();
        let livestockpredict = await livestockTrain.predict(tf.tensor2d(predYearsScaled, [predYearsScaled.length, 1])).dataSync();

        // Converting tensor objects back to arrays
        let agriPredScaled = Array.from(agriPredict);
        let agriTestScaled = Array.from(agriTest);
        let forPredScaled = Array.from(forestPredict);
        let forTestScaled = Array.from(forestTest);
        let cerealPredScaled = Array.from(cerealPredict);
        let cerealTestScaled = Array.from(cerealTest);
        let cashPredScaled = Array.from(cashPredict);
        let cashTestScaled = Array.from(cashTest);
        let empPredScaled = Array.from(empPredict);
        let empTestScaled = Array.from(empTest);
        let popPredScaled = Array.from(populationPredict);
        let popTestScaled = Array.from(populationTest);
        let gdpPredScaled = Array.from(gdpPredict);
        let gdpTestScaled = Array.from(gdpTest);
        let livePredScaled = Array.from(livestockpredict);
        let liveTestScaled = Array.from(livestockTest);

        // Rescaling the data back to their original values
        let tenYearAgri = conversion(maxArray(agriLand), minArray(agriLand), agriPredScaled);
        let tenYearAgriTest = conversion(maxArray(agriLand), minArray(agriLand), agriTestScaled);
        let tenYearfor = conversion(maxArray(forestLand), minArray(forestLand), forPredScaled);
        let tenYearforTest = conversion(maxArray(forestLand), minArray(forestLand), forTestScaled); 
        let tenYearCereal = conversion(maxArray(cerealYield), minArray(cerealYield), cerealPredScaled);
        let tenYearCerealTest = conversion(maxArray(cerealYield), minArray(cerealYield), cerealTestScaled);
        let tenYearCash = conversion(maxArray(cashCropYield), minArray(cashCropYield), cashPredScaled);
        let tenYearCashTest = conversion(maxArray(cashCropYield), minArray(cashCropYield), cashTestScaled);
        let tenYearEmp = conversion(maxArray(employmentAg), minArray(employmentAg), empPredScaled);
        let tenYearEmpTest = conversion(maxArray(employmentAg), minArray(employmentAg), empTestScaled);      
        let tenYearPop = conversion(maxArray(population), minArray(population), popPredScaled);
        let tenYearPopTest = conversion(maxArray(population), minArray(population), popTestScaled);
        let tenYearGdp = conversion(maxArray(gdp), minArray(gdp), gdpPredScaled);
        let tenYearGdpTest = conversion(maxArray(gdp), minArray(gdp), gdpTestScaled);
        let tenYearLive = conversion(maxArray(liveStockProd), minArray(liveStockProd), livePredScaled);
        let tenYearLiveTest = conversion(maxArray(liveStockProd), minArray(liveStockProd), liveTestScaled);

        // Inform the user that training is complete

        d3.selectAll('#agripredict').append('p').text("Machine Learning Complete, forecasts are available below");

        d3.selectAll('#agritag').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(agriLand.slice(-6),tenYearAgriTest))}%`);
        d3.selectAll('#fortag').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(forestLand.slice(-6),tenYearforTest))}%`);
        d3.selectAll('#cerealtag').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(cerealYield.slice(-6),tenYearCerealTest))}%`);
        d3.selectAll('#cashcroptag').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(cashCropYield.slice(-6),tenYearCashTest))}%`);
        d3.selectAll('#emptag').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(employmentAg.slice(-6),tenYearEmpTest))}%`);
        d3.selectAll('#livestocktag').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(liveStockProd.slice(-6),tenYearLiveTest))}%`);


        // Creating Plots to compare the forecast between different parameters
        var agrlayout = {
            title: `${id}`,
            font: {
                color: 'black',
                family: 'Arial',
                size: 16
            },
            paper_bgcolor: '#fff9e9',
            plot_bgcolor: '#fff9e9'
        };
        var agrValues = [predYears, tenYearAgri]

        var agridata = [{
            type: 'table',
            header: {
                values: [["<b>Year</b>"], ["<b>Predicted Agricultural Land Area (ha)</b>"]],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "#44429e" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: agrValues,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }

        }]


        Plotly.newPlot('predagri', agridata, agrlayout);

        var forlayout = {
            title: `${id}`,
            font: {
                color: 'black',
                family: 'Arial',
                size: 16
            },
            paper_bgcolor: '#fff9e9',
            plot_bgcolor: '#fff9e9'
        };
        var forValues = [predYears, tenYearfor]

        var fordata = [{
            type: 'table',
            header: {
                values: [["<b>Year</b>"], ["<b>Predicted Forest Land Area (ha)</b>"]],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "#44429e" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: forValues,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }

        }]

        Plotly.newPlot('predfor', fordata, forlayout);

        var cerealLayout = {
            title: `${id}`,
            font: {
                color: 'black',
                family: 'Arial',
                size: 16
            },
            paper_bgcolor: '#fff9e9',
            plot_bgcolor: '#fff9e9'
        };
        var ceralValues = [predYears, tenYearCereal]

        var cerealdata = [{
            type: 'table',
            header: {
                values: [["<b>Year</b>"], ["<b>Predicted Cereal Crop Yield (kg/ha)</b>"]],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "#44429e" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: ceralValues,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }

        }]

        Plotly.newPlot('predcereal', cerealdata, cerealLayout);

        var cashLayout = {
            title: `${id}`,
            font: {
                color: 'black',
                family: 'Arial',
                size: 16
            },
            paper_bgcolor: '#fff9e9',
            plot_bgcolor: '#fff9e9'
        };
        var cashValues = [predYears, tenYearCash]

        var cashdata = [{
            type: 'table',
            header: {
                values: [["<b>Year</b>"], ["<b>Predicted Cash Crop Yield (kg/ha)</b>"]],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "#44429e" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: cashValues,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }

        }]

        Plotly.newPlot('predcash', cashdata, cashLayout);

        var empLayout = {
            title: `${id}`,
            font: {
                color: 'black',
                family: 'Arial',
                size: 16
            },
            paper_bgcolor: '#fff9e9',
            plot_bgcolor: '#fff9e9'
        };
        var empValues = [predYears, tenYearEmp]

        var empdata = [{
            type: 'table',
            header: {
                values: [["<b>Year</b>"], ["<b>Predicted Employment in Agriculture (%)</b>"]],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "#44429e" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: empValues,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }

        }]

        Plotly.newPlot('predemp', empdata, empLayout);

        var liveLayout = {
            title: `${id}`,
            font: {
                color: 'black',
                family: 'Arial',
                size: 16
            },
            paper_bgcolor: '#fff9e9',
            plot_bgcolor: '#fff9e9'
        };
        var liveValues = [predYears, tenYearLive]

        var livedata = [{
            type: 'table',
            header: {
                values: [["<b>Year</b>"], ["<b>Predicted Livestock Production (2004-2006 index=100)</b>"]],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "#44429e" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: liveValues,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }

        }]

        Plotly.newPlot('predlive', livedata, liveLayout);



    })
}