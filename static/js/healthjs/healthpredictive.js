async function healthPredict(id) {

    console.log(id);

    await d3.json('http://127.0.0.1:5000/compileddata').then(async function (data) {

        // Checking to see if the dataset has been read
        // console.log(data);

        // Filtering by country
        let countryFilter = data.filter(nation => nation.country === id);
        console.log(countryFilter);

        // Creating a list of empty arrays for later appendage

        let brithRate = [];
        let deathRate = [];
        let dtpImmunisation = [];
        let gdp = [];
        let lifeExpectency = [];
        let measlesImmunisation = [];
        let population = [];
        let cancerCases = [];
        let cancerDeaths = [];
        let obesity = [];



        // Creating a time parse for date
        var parseTime = d3.timeParse('%d/%m/%Y');

        // Creating the x-axis 
        let year = [];
        let rawYear = [];

        let intYear = [];

        // Iterating through the filtered dataset objects
        Object.keys(countryFilter).forEach(function (key) {
            brithRate.push(countryFilter[key].birth_rate);
            deathRate.push(countryFilter[key].death_rate);
            dtpImmunisation.push(countryFilter[key].dtp_immunisation);
            gdp.push(countryFilter[key].gdp_current_usd);
            lifeExpectency.push(countryFilter[key].life_expectency);
            measlesImmunisation.push(countryFilter[key].measles_immunisation);
            population.push(countryFilter[key].population);
            cancerCases.push(countryFilter[key].total_cancer_cases);
            cancerDeaths.push(countryFilter[key].total_cancer_deaths);
            obesity.push(countryFilter[key].total_obesity_numbers);
            year.push(parseTime(countryFilter[key]._year));
            rawYear.push(countryFilter[key]._year);


        })

        // Creating an integer of years
        for (var i = 0; i < rawYear.length; i++) {
            // console.log(new Date(rawYear[i]).getFullYear());
            intYear.push(new Date(rawYear[i]).getFullYear());
        }
        console.log(intYear);

        // console.log(intYear);

        // Creating the Machine Learning Algorithm for reach data
        const birthtrain = tf.sequential();
        const deathtrain = tf.sequential();
        const dtptrain = tf.sequential();
        const lifetrain = tf.sequential();
        const measlestrain = tf.sequential();
        const cancercasetrain = tf.sequential();
        const cancerdeathtrain = tf.sequential();
        const obesitytrain = tf.sequential();
        const populationtrain = tf.sequential();
        const gdptrain = tf.sequential();

        // Creating a 10 year forecast
        let predYears = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];



        // Converting arrays to tensorflow arrays
        let brithRateTF = tf.tensor2d(MinMaxScaler(brithRate), [brithRate.length, 1]);
        let yearTF = tf.tensor2d(MinMaxScaler(intYear), [intYear.length, 1]);
        let deathRateTF = tf.tensor2d(MinMaxScaler(deathRate), [deathRate.length, 1]);
        let dtpImmunisationTF = tf.tensor2d(MinMaxScaler(dtpImmunisation), [dtpImmunisation.length, 1]);
        let lifeExpectencyTF = tf.tensor2d(MinMaxScaler(lifeExpectency), [lifeExpectency.length, 1]);
        let measlesImmunisationTF = tf.tensor2d(MinMaxScaler(measlesImmunisation), [measlesImmunisation.length, 1]);
        let cancerCasesTF = tf.tensor2d(MinMaxScaler(cancerCases), [cancerCases.length, 1]);
        let cancerDeathsTF = tf.tensor2d(MinMaxScaler(cancerDeaths), [cancerDeaths.length, 1]);
        let obesityTF = tf.tensor2d(MinMaxScaler(obesity), [obesity.length, 1]);
        let populationTF = tf.tensor2d(MinMaxScaler(population), [population.length, 1]);
        let gdpTF = tf.tensor2d(MinMaxScaler(gdp), [gdp.length, 1]);

        // Scaling the predictive years
        let yearsScaled = yearScale(predYears);
        console.log(MinMaxScaler(intYear));
        console.log(yearsScaled);

        d3.selectAll('#healthpredict').append('h3').text("Machine Learning in progress");




        // Creating the Neural Networks
        birthtrain.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', kernelInitializer: 'ones' }));
        birthtrain.add(tf.layers.dense({ units: 61, inputShape: [1] }));
        birthtrain.add(tf.layers.dense({ units: 1, inputShape: [61] }));
        birthtrain.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam() });

        deathtrain.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', kernelInitializer: 'ones' }));
        deathtrain.add(tf.layers.dense({ units: 61, inputShape: [1] }));
        deathtrain.add(tf.layers.dense({ units: 1, inputShape: [61] }));
        deathtrain.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam() });

        dtptrain.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', kernelInitializer: 'ones' }));
        dtptrain.add(tf.layers.dense({ units: 61, inputShape: [1] }));
        dtptrain.add(tf.layers.dense({ units: 1, inputShape: [61] }));
        dtptrain.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam() });

        lifetrain.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', kernelInitializer: 'ones' }));
        lifetrain.add(tf.layers.dense({ units: 61, inputShape: [1] }));
        lifetrain.add(tf.layers.dense({ units: 1, inputShape: [61] }));
        lifetrain.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam() });

        measlestrain.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', kernelInitializer: 'ones' }));
        measlestrain.add(tf.layers.dense({ units: 61, inputShape: [1] }));
        measlestrain.add(tf.layers.dense({ units: 1, inputShape: [61] }));
        measlestrain.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam() });

        cancercasetrain.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', kernelInitializer: 'ones' }));
        cancercasetrain.add(tf.layers.dense({ units: 61, inputShape: [1] }));
        cancercasetrain.add(tf.layers.dense({ units: 1, inputShape: [61] }));
        cancercasetrain.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam() });

        cancerdeathtrain.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', kernelInitializer: 'ones' }));
        cancerdeathtrain.add(tf.layers.dense({ units: 61, inputShape: [1] }));
        cancerdeathtrain.add(tf.layers.dense({ units: 1, inputShape: [61] }));
        cancerdeathtrain.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam() });

        obesitytrain.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', kernelInitializer: 'ones' }));
        obesitytrain.add(tf.layers.dense({ units: 61, inputShape: [1] }));
        obesitytrain.add(tf.layers.dense({ units: 1, inputShape: [61] }));
        obesitytrain.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam() });

        populationtrain.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', kernelInitializer: 'ones' }));
        populationtrain.add(tf.layers.dense({ units: 61, inputShape: [1] }));
        populationtrain.add(tf.layers.dense({ units: 1, inputShape: [61] }));
        populationtrain.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam() });

        gdptrain.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', kernelInitializer: 'ones' }));
        gdptrain.add(tf.layers.dense({ units: 61, inputShape: [1] }));
        gdptrain.add(tf.layers.dense({ units: 1, inputShape: [61] }));
        gdptrain.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam() });


        // Making a prediction on the data for Births
        await birthtrain.fit(yearTF, brithRateTF, {epochs:100});
        await deathtrain.fit(yearTF, deathRateTF, {epochs:100});
        await dtptrain.fit(yearTF, dtpImmunisationTF, {epochs:100});
        await lifetrain.fit(yearTF, lifeExpectencyTF, {epochs:100});
        await measlestrain.fit(yearTF, measlesImmunisationTF, {epochs:100});
        await cancercasetrain.fit(yearTF, cancerCasesTF, {epochs:100});
        await cancerdeathtrain.fit(yearTF, cancerDeathsTF, {epochs:100});
        await obesitytrain.fit(yearTF, obesityTF, {epochs:100});
        await populationtrain.fit(yearTF, obesityTF, {epochs:100});
        await gdptrain.fit(yearTF, obesityTF, {epochs:100});

        // Announce to the user that the training is complete


        d3.selectAll('#healthpredict').append('p').text("Machine Learning Complete, forecasts are available below");

        let birthpredict = await birthtrain.predict(tf.tensor2d(yearsScaled, [yearsScaled.length, 1])).dataSync();
        let deathpredict = await deathtrain.predict(tf.tensor2d(yearsScaled, [yearsScaled.length, 1])).dataSync();
        let dtppredict = await dtptrain.predict(tf.tensor2d(yearsScaled, [yearsScaled.length, 1])).dataSync();
        let lifepredict = await lifetrain.predict(tf.tensor2d(yearsScaled, [yearsScaled.length, 1])).dataSync();
        let measlespredict = await measlestrain.predict(tf.tensor2d(yearsScaled, [yearsScaled.length, 1])).dataSync();
        let cancercasepredict = await cancercasetrain.predict(tf.tensor2d(yearsScaled, [yearsScaled.length, 1])).dataSync();
        let cancerdeathpredict = await cancerdeathtrain.predict(tf.tensor2d(yearsScaled, [yearsScaled.length, 1])).dataSync();
        let obesitypredict = await obesitytrain.predict(tf.tensor2d(yearsScaled, [yearsScaled.length, 1])).dataSync();
        let populationpredict = await populationtrain.predict(tf.tensor2d(yearsScaled, [yearsScaled.length, 1])).dataSync();
        let gdppredict = await gdptrain.predict(tf.tensor2d(yearsScaled, [yearsScaled.length, 1])).dataSync();


        // Converting the Tensor objects back to arrays
        let birthpredictScaled = Array.from(birthpredict);
        let deathpredictScaled = Array.from(deathpredict);
        let dtppredictScaled = Array.from(dtppredict);
        let lifepredictScaled = Array.from(lifepredict);
        let measlespredictScaled = Array.from(measlespredict);
        let cancercasepredictScaled = Array.from(cancercasepredict);
        let cancerdeathpredictScaled = Array.from(cancerdeathpredict);
        let obesitypredictScaled = Array.from(obesitypredict);
        let populationpredictScaled = Array.from(populationpredict);
        let gdppredictScaled = Array.from(gdppredict);



        let tenYearBirth = conversion(maxArray(brithRate), minArray(brithRate), birthpredictScaled);
        let tenYearDeath = conversion(maxArray(deathRate), minArray(deathRate), deathpredictScaled);
        let tenYearDtp = conversion(maxArray(dtpImmunisation), minArray(dtpImmunisation), dtppredictScaled);
        let tenYearLife = conversion(maxArray(lifeExpectency), minArray(lifeExpectency), lifepredictScaled);
        let tenYearMeasles = conversion(maxArray(measlesImmunisation), minArray(measlesImmunisation), measlespredictScaled);
        let tenYearCancerCase = conversion(maxArray(cancerCases), minArray(cancerCases), cancercasepredictScaled);
        let tenYearCancerDeaths = conversion(maxArray(cancerDeaths), minArray(cancerDeaths), cancerdeathpredictScaled);
        let tenYearObesity = conversion(maxArray(obesity), minArray(obesity), obesitypredictScaled);
        let tenYearPopulation = conversion(maxArray(population), minArray(population), populationpredictScaled);
        let tenYeargdp = conversion(maxArray(gdp), minArray(gdp), gdppredictScaled);


        console.log(tenYearBirth);

        // Creating a table for Prediction
        var layout = {
            title: `${id}`,
            font: {
                color: 'black',
                family: 'Arial',
                size: 16
            }
        };
        var birthValues = [predYears, tenYearBirth]

        var birthdata = [{
            type: 'table',
            header: {
                values: [["<b>Year</b>"], ["<b>Predicted Births</b>"]],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "#d91657" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: birthValues,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }]

        Plotly.newPlot('predtotalbirths', birthdata, layout);

        var deathValues = [predYears, tenYearDeath]

        var deathdata = [{
            type: 'table',
            header: {
                values: [["<b>Year</b>"], ["<b>Predicted Deaths</b>"]],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "#d91657" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: deathValues,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }]

        Plotly.newPlot('predtotaldeaths', deathdata, layout);

        var dtpValues = [predYears, tenYearDtp]

        var dtpdata = [{
            type: 'table',
            header: {
                values: [["<b>Year</b>"], ["<b>Predicted DTP Immunisation</b>"]],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "#d91657" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: dtpValues,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }]

        Plotly.newPlot('preddtp', dtpdata, layout);

        var lifeValues = [predYears, tenYearLife]

        var lifedata = [{
            type: 'table',
            header: {
                values: [["<b>Year</b>"], ["<b>Predicted Life Expectency</b>"]],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "#d91657" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: lifeValues,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }]

        Plotly.newPlot('predlife', lifedata, layout);

        var measlesValues = [predYears, tenYearMeasles]

        var measlesdata = [{
            type: 'table',
            header: {
                values: [["<b>Year</b>"], ["<b>Predicted Measles Vaccination</b>"]],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "#d91657" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: measlesValues,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }]

        Plotly.newPlot('predmeasles', measlesdata, layout);

        var cancerValues = [predYears, tenYearCancerCase]

        var cancerdata = [{
            type: 'table',
            header: {
                values: [["<b>Year</b>"], ["<b>Predicted Cancer Cases</b>"]],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "#d91657" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: cancerValues,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }]

        Plotly.newPlot('predcancercases', cancerdata, layout);

        var cancerDeathsValues = [predYears, tenYearCancerDeaths]

        var cancerDeathsdata = [{
            type: 'table',
            header: {
                values: [["<b>Year</b>"], ["<b>Predicted Cancer Deaths</b>"]],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "#d91657" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: cancerDeathsValues,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }]

        Plotly.newPlot('predcancerdeaths', cancerDeathsdata, layout);

        var obesityValues = [predYears, tenYearObesity]

        var obesitydata = [{
            type: 'table',
            header: {
                values: [["<b>Year</b>"], ["<b>Predicted Number of Obese people</b>"]],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "#d91657" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: obesityValues,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }]

        Plotly.newPlot('predobesity', obesitydata, layout);

        var populationValues = [predYears, tenYearPopulation]

        var populationdata = [{
            type: 'table',
            header: {
                values: [["<b>Year</b>"], ["<b>Predicted Population</b>"]],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "#d91657" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: populationValues,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }]

        Plotly.newPlot('predpopulation', populationdata, layout);

        var gdpValues = [predYears, tenYeargdp]

        var gdpdata = [{
            type: 'table',
            header: {
                values: [["<b>Year</b>"], ["<b>Predicted Gross Domestic Product</b>"]],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "#d91657" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: gdpValues,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }]

        Plotly.newPlot('predgdp', gdpdata, layout);





    })
}