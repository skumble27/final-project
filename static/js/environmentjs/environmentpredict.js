async function environmentPredict(id) {

    console.log(id);

    await d3.json('http://127.0.0.1:5000/compileddata').then(async function (data) {

        // Checking to see if the dataset has been read
        // console.log(data);

        // Filter by country
        let countryFilter = data.filter(nation => nation.country === id);
        // console.log(countryFilter);

        // Creating a list of emtpy arrays for appending data
        let p25airpol = [];
        let population = [];
        let electricityacess = [];
        let renewable = [];
        let urbanpop = [];
        let electricUse = [];


        // Creating a time parse for date
        var parseTime = d3.timeParse('%d/%m/%Y');

        // Creating the x-axis 
        let year = [];
        let rawYear = [];

        let intYear = [];

        // Itering through the Json Objects to append the data to the empty arrays
        Object.keys(countryFilter).forEach(function (key) {
            p25airpol.push(countryFilter[key].pm2_5_air_pollution);
            population.push(countryFilter[key].population);
            electricityacess.push(countryFilter[key].access_to_electricity_pct);
            renewable.push(countryFilter[key].renewable_electricity_pct);
            urbanpop.push(countryFilter[key].urban_population_pct);
            electricUse.push(countryFilter[key].electricity_consumption_kwh);
            year.push(parseTime(countryFilter[key]._year));
            rawYear.push(countryFilter[key]._year);

        })

        // Creating an integer of years
        for (var i = 0; i < rawYear.length; i++) {
            // console.log(new Date(rawYear[i]).getFullYear());
            intYear.push(new Date(rawYear[i]).getFullYear());
        }

        console.log(intYear);

        // Creating the Neural NEtworks for reach array of data
        const p25airpolTrain = tf.sequential();
        const populationTrain = tf.sequential();
        const electricityAccessTrain = tf.sequential();
        const renewableTrain = tf.sequential();
        const urbanPopTrain = tf.sequential();
        const electricUseTrain = tf.sequential();

        // Creating a 10 year forecast
        let predYears = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
        let testYears = [2015, 2016, 2017, 2018, 2019, 2020];

        // Converting the arrays to tensorflow arrays
        let p25airpolTF = tf.tensor2d(MinMaxScaler(p25airpol.slice(-6)), [p25airpol.slice(-6).length, 1]);
        let populationTF = tf.tensor2d(MinMaxScaler(population.slice(-6)), [population.slice(-6).length, 1]);
        let electricAccessTF = tf.tensor2d(MinMaxScaler(electricityacess.slice(-6)), [electricityacess.slice(-6).length, 1]);
        let renewableTF = tf.tensor2d(MinMaxScaler(renewable.slice(-6)), [renewable.slice(-6).length, 1]);
        let urbanpopTF = tf.tensor2d(MinMaxScaler(urbanpop.slice(-6)), [urbanpop.slice(-6).length, 1]);
        let electricityUseTF = tf.tensor2d(MinMaxScaler(electricUse.slice(-6)), [electricUse.slice(-6).length, 1]);
        let yearTF = tf.tensor2d(MinMaxScaler(intYear.slice(-6)), [intYear.slice(-6).length, 1]);

        // Scaling the predictive years
        // Scaling the predictive years
        let testYearsScaled = yearScale(testYears);
        let predYearsScaled = yearScale(predYears);

        console.log(testYearsScaled);
        console.log(predYearsScaled);

        d3.selectAll('#environmentpredict').append('h2').text("Machine Learning in progress");

        // Creating the Neural Networks to train on the tensorflow arrays

        p25airpolTrain.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', kernelInitializer: 'ones' }));
        p25airpolTrain.add(tf.layers.dense({ units: 61, inputShape: [1] }));
        p25airpolTrain.add(tf.layers.dense({ units: 1, inputShape: [61] }));
        p25airpolTrain.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam() });

        populationTrain.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', kernelInitializer: 'ones' }));
        populationTrain.add(tf.layers.dense({ units: 61, inputShape: [1] }));
        populationTrain.add(tf.layers.dense({ units: 1, inputShape: [61] }));
        populationTrain.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam() });

        electricityAccessTrain.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', kernelInitializer: 'ones' }));
        electricityAccessTrain.add(tf.layers.dense({ units: 61, inputShape: [1] }));
        electricityAccessTrain.add(tf.layers.dense({ units: 1, inputShape: [61] }));
        electricityAccessTrain.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam() });

        renewableTrain.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', kernelInitializer: 'ones' }));
        renewableTrain.add(tf.layers.dense({ units: 61, inputShape: [1] }));
        renewableTrain.add(tf.layers.dense({ units: 1, inputShape: [61] }));
        renewableTrain.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam() });

        urbanPopTrain.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', kernelInitializer: 'ones' }));
        urbanPopTrain.add(tf.layers.dense({ units: 61, inputShape: [1] }));
        urbanPopTrain.add(tf.layers.dense({ units: 1, inputShape: [61] }));
        urbanPopTrain.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam() });

        electricUseTrain.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', kernelInitializer: 'ones' }));
        electricUseTrain.add(tf.layers.dense({ units: 61, inputShape: [1] }));
        electricUseTrain.add(tf.layers.dense({ units: 1, inputShape: [61] }));
        electricUseTrain.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam() });

        // Fitting the model to the Tensorflow 2d arrays
        await p25airpolTrain.fit(yearTF, p25airpolTF, { epochs: 100 });
        await populationTrain.fit(yearTF, populationTF, { epochs: 100 });
        await electricityAccessTrain.fit(yearTF, electricAccessTF, { epochs: 100 });
        await renewableTrain.fit(yearTF, renewableTF, { epochs: 100 });
        await urbanPopTrain.fit(yearTF, urbanpopTF, { epochs: 100 });
        await electricUseTrain.fit(yearTF, electricityUseTF, { epochs: 100 });

        d3.selectAll('#environmentpredict').append('h3').text("Validating Predictive Models (Returning Mean Percentage Error)");

        // Test the accuracy of the predictions
        let p25airpolTest = await p25airpolTrain.predict(tf.tensor2d(testYearsScaled, [testYearsScaled.length, 1])).dataSync();
        let populationTest = await populationTrain.predict(tf.tensor2d(testYearsScaled, [testYearsScaled.length, 1])).dataSync();
        let electricityAccessTest = await electricityAccessTrain.predict(tf.tensor2d(testYearsScaled, [testYearsScaled.length, 1])).dataSync();
        let renewableTest = await renewableTrain.predict(tf.tensor2d(testYearsScaled, [testYearsScaled.length, 1])).dataSync();
        let urbanPopTest = await urbanPopTrain.predict(tf.tensor2d(testYearsScaled, [testYearsScaled.length, 1])).dataSync();
        let electricUseTest = await electricUseTrain.predict(tf.tensor2d(testYearsScaled, [testYearsScaled.length, 1])).dataSync();

        // Predict the next ten years
        let p25airpolPredict = await p25airpolTrain.predict(tf.tensor2d(predYearsScaled, [predYearsScaled.length, 1])).dataSync();
        let populationPredict = await populationTrain.predict(tf.tensor2d(predYearsScaled, [predYearsScaled.length, 1])).dataSync();
        let electricityAccessPredict = await electricityAccessTrain.predict(tf.tensor2d(predYearsScaled, [predYearsScaled.length, 1])).dataSync();
        let renewablePredict = await renewableTrain.predict(tf.tensor2d(predYearsScaled, [predYearsScaled.length, 1])).dataSync();
        let urbanPopPredict = await urbanPopTrain.predict(tf.tensor2d(predYearsScaled, [predYearsScaled.length, 1])).dataSync();
        let electricUsePredict = await electricUseTrain.predict(tf.tensor2d(predYearsScaled, [predYearsScaled.length, 1])).dataSync();

        // Converting float arrays back to regular arrays
        let p25airpolTestScaled = Array.from(p25airpolTest);
        let populationTestScaled = Array.from(populationTest);
        let electricityAccessTestScaled = Array.from(electricityAccessTest);
        let renewableTestScaled = Array.from(renewableTest);
        let urbanPopTestScaled = Array.from(urbanPopTest);
        let electricUseTestScaled = Array.from(electricUseTest);

        let p25airpolPredictScaled = Array.from(p25airpolPredict);
        let populationPredictScaled = Array.from(populationPredict);
        let electricityAccessPredictScaled = Array.from(electricityAccessPredict);
        let renewablePredictScaled = Array.from(renewablePredict);
        let urbanPopPredictScaled = Array.from(urbanPopPredict);
        let electricUsePredictScaled = Array.from(electricUsePredict);

        // Reverse Scale the Data
        let tenYearp25airpolTest = conversion(maxArray(p25airpol), minArray(p25airpol), p25airpolTestScaled);
        let tenYearPopulationTest = conversion(maxArray(population), minArray(population), populationTestScaled);
        let tenYearElectricityAccessTest = conversion(maxArray(electricityacess), minArray(electricityacess), electricityAccessTestScaled);
        let tenYearRenewableTest = conversion(maxArray(renewable), minArray(renewable), renewableTestScaled);
        let tenYearurbanPopTest = conversion(maxArray(urbanpop), minArray(urbanpop), urbanPopTestScaled);
        let tenYearelectricUseTest = conversion(maxArray(electricUse), minArray(electricUse), electricUseTestScaled);

        let tenYearp25airpolPredict = conversion(maxArray(p25airpol), minArray(p25airpol), p25airpolPredictScaled);
        let tenYearPopulationPredict = conversion(maxArray(population), minArray(population), populationPredictScaled);
        let tenYearElectricityAccessPredict = conversion(maxArray(electricityacess), minArray(electricityacess), electricityAccessPredictScaled);
        let tenYearRenewablePredict = conversion(maxArray(renewable), minArray(renewable), renewablePredictScaled);
        let tenYearurbanPopPredict = conversion(maxArray(urbanpop), minArray(urbanpop), urbanPopPredictScaled);
        let tenYearelectricUsePredict = conversion(maxArray(electricUse), minArray(electricUse), electricUsePredictScaled);

        // Inform User that Training is Complete
        d3.selectAll('#environmentpredict').append('p').text("Machine Learning Complete, forecasts are available below");

        d3.selectAll('#airpoltag').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(p25airpol.slice(-6), tenYearp25airpolTest))}%`);
        d3.selectAll('#poptag').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(population.slice(-6), tenYearPopulationTest))}%`);
        d3.selectAll('#electrictag').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(electricityacess.slice(-6), tenYearElectricityAccessTest))}%`);
        d3.selectAll('#renewabletag').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(renewable.slice(-6), tenYearRenewableTest))}%`);
        d3.selectAll('#urbanpoptag').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(urbanpop.slice(-6), tenYearurbanPopTest))}%`);
        d3.selectAll('#electricusetag').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(electricUse.slice(-6), tenYearelectricUseTest))}%`);

        // Creating a plot and table
        var layout = {
            title: `${id}`,
            font: {
                color: 'black',
                family: 'Arial',
                size: 16
            },
            paper_bgcolor: '#d7ffe8',
            plot_bgcolor: '#d7ffe8'
        };

        var p25airpolValues = [predYears, tenYearp25airpolPredict]

        var p25airpolData = [{
            type: 'table',
            header: {
                values: [["<b>2021-2030</b>"], ["<b>Predicted Air Pollution Levels</b>"]],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "#007734" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: p25airpolValues,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }]

        Plotly.newPlot('predp25airpoll', p25airpolData, layout);

        var populationValues = [predYears, tenYearPopulationPredict]

        var populationData = [{
            type: 'table',
            header: {
                values: [["<b>2021-2030</b>"], ["<b>Predicted Population</b>"]],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "#007734" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: populationValues,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }]

        Plotly.newPlot('predpopulation', populationData, layout);

        var electricAccessValues = [predYears, tenYearElectricityAccessPredict]

        var electricityAccessData = [{
            type: 'table',
            header: {
                values: [["<b>2021-2030</b>"], ["<b>Predicted Access to Electricity</b>"]],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "#007734" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: electricAccessValues,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }]

        Plotly.newPlot('predelectricity', electricityAccessData, layout);

        var renewableValues = [predYears, tenYearRenewablePredict]

        var renewableData = [{
            type: 'table',
            header: {
                values: [["<b>2021-2030</b>"], ["<b>Predicted growth of Renewable Energy Use</b>"]],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "#007734" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: renewableValues,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }]

        Plotly.newPlot('predrenewable', renewableData, layout);

        var urbanPopValues = [predYears, tenYearurbanPopPredict]

        var urbanPopData = [{
            type: 'table',
            header: {
                values: [["<b>2021-2030</b>"], ["<b>Predicted Urban Population Growth</b>"]],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "#007734" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: urbanPopValues,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }]

        Plotly.newPlot('predurbanpopulation', urbanPopData, layout);

        var electricUseValues = [predYears, tenYearelectricUsePredict]

        var electricityuseData = [{
            type: 'table',
            header: {
                values: [["<b>2021-2030</b>"], ["<b>Predicted use of Electricity (kwh)</b>"]],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "#007734" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: electricUseValues,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }]

        Plotly.newPlot('predelectricityconsumption', electricityuseData, layout);

    })
}