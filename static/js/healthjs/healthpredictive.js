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
        let testYears = [2015, 2016, 2017, 2018, 2019, 2020];

        // Converting Arrays to Tensorflow arrays
        let brithRateTF = tf.tensor2d(MinMaxScaler(brithRate.slice(-6)), [brithRate.slice(-6).length, 1]);
        yearTF = tf.tensor2d(MinMaxScaler(intYear.slice(-6)), [intYear.slice(-6).length, 1]);
        let deathRateTF = tf.tensor2d(MinMaxScaler(deathRate.slice(-6)), [deathRate.slice(-6).length, 1]);
        let dtpRateTF = tf.tensor2d(MinMaxScaler(dtpImmunisation.slice(-6)), [dtpImmunisation.slice(-6).length, 1]);
        let lifeRateTF = tf.tensor2d(MinMaxScaler(lifeExpectency.slice(-6)), [lifeExpectency.slice(-6).length, 1]);
        let measlesImmRateTF = tf.tensor2d(MinMaxScaler(measlesImmunisation.slice(-6)), [measlesImmunisation.slice(-6).length, 1]);
        let cancerRateTF = tf.tensor2d(MinMaxScaler(cancerCases.slice(-6)), [cancerCases.slice(-6).length, 1]);
        let cancerdeathRateTF = tf.tensor2d(MinMaxScaler(cancerDeaths.slice(-6)), [cancerDeaths.slice(-6).length, 1]);
        let obesityRateTF = tf.tensor2d(MinMaxScaler(obesity.slice(-6)), [obesity.slice(-6).length, 1]);
        let populationRateTF = tf.tensor2d(MinMaxScaler(population.slice(-6)), [population.slice(-6).length, 1]);
        let gdpRateTF = tf.tensor2d(MinMaxScaler(gdp.slice(-6)), [gdp.slice(-6).length, 1]);

        // Scaling the predictive years
        let testYearsScaled = yearScale(testYears);
        let predYearsScaled = yearScale(predYears);
        
        console.log(testYearsScaled);
        console.log(predYearsScaled);

        d3.selectAll('#healthpredict').append('h2').text("Machine Learning in progress");

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


        // Fitting the model to the data
        await birthtrain.fit(yearTF, brithRateTF, {epochs:100});
        await deathtrain.fit(yearTF, deathRateTF, {epochs:100});
        await dtptrain.fit(yearTF, dtpRateTF, {epochs:100});
        await lifetrain.fit(yearTF, lifeRateTF, {epochs:100});
        await measlestrain.fit(yearTF, measlesImmRateTF, {epochs:100});
        await cancercasetrain.fit(yearTF, cancerRateTF, {epochs:100});
        await cancerdeathtrain.fit(yearTF, cancerdeathRateTF, {epochs:100});
        await obesitytrain.fit(yearTF, obesityRateTF, {epochs:100});
        await populationtrain.fit(yearTF, populationRateTF, {epochs:100});
        await gdptrain.fit(yearTF, gdpRateTF, {epochs:100});

        d3.selectAll('#healthpredict').append('h3').text("Validating Predictive Models (Returning Mean Percentage Error)");


        // Test the accuracy of the predictions
        let birthTest = await birthtrain.predict(tf.tensor2d(testYearsScaled, [testYearsScaled.length, 1])).dataSync();
        let deathTest = await deathtrain.predict(tf.tensor2d(testYearsScaled, [testYearsScaled.length, 1])).dataSync();
        let dtpTest = await dtptrain.predict(tf.tensor2d(testYearsScaled, [testYearsScaled.length, 1])).dataSync();
        let lifeTest = await lifetrain.predict(tf.tensor2d(testYearsScaled, [testYearsScaled.length, 1])).dataSync();
        let measlesImmTest = await measlestrain.predict(tf.tensor2d(testYearsScaled, [testYearsScaled.length, 1])).dataSync();
        let cancercaseTest = await cancercasetrain.predict(tf.tensor2d(testYearsScaled, [testYearsScaled.length, 1])).dataSync();
        let cancerdeathTest = await cancerdeathtrain.predict(tf.tensor2d(testYearsScaled, [testYearsScaled.length, 1])).dataSync();
        let obesityTest = await obesitytrain.predict(tf.tensor2d(testYearsScaled, [testYearsScaled.length, 1])).dataSync();
        let populationTest = await populationtrain.predict(tf.tensor2d(testYearsScaled, [testYearsScaled.length, 1])).dataSync();
        let gdpTest = await gdptrain.predict(tf.tensor2d(testYearsScaled, [testYearsScaled.length, 1])).dataSync();

        // Predict for the next ten years
        let birthpredict = await birthtrain.predict(tf.tensor2d(predYearsScaled, [predYearsScaled.length, 1])).dataSync();
        let deathpredict = await deathtrain.predict(tf.tensor2d(predYearsScaled, [predYearsScaled.length, 1])).dataSync();
        let dtppredict = await dtptrain.predict(tf.tensor2d(predYearsScaled, [predYearsScaled.length, 1])).dataSync();
        let lifepredict = await lifetrain.predict(tf.tensor2d(predYearsScaled, [predYearsScaled.length, 1])).dataSync();
        let measlesImmpredict = await measlestrain.predict(tf.tensor2d(predYearsScaled, [predYearsScaled.length, 1])).dataSync();
        let cancercasepredict = await cancercasetrain.predict(tf.tensor2d(predYearsScaled, [predYearsScaled.length, 1])).dataSync();
        let cancerdeathpredict = await cancerdeathtrain.predict(tf.tensor2d(predYearsScaled, [predYearsScaled.length, 1])).dataSync();
        let obesitypredict = await obesitytrain.predict(tf.tensor2d(predYearsScaled, [predYearsScaled.length, 1])).dataSync();
        let populationpredict = await populationtrain.predict(tf.tensor2d(predYearsScaled, [predYearsScaled.length, 1])).dataSync();
        let gdppredict = await gdptrain.predict(tf.tensor2d(predYearsScaled, [predYearsScaled.length, 1])).dataSync();
        

        // Converting Float Array back to regular array
        let birthtestConvert = Array.from(birthTest);
        let birthpredictConvert = Array.from(birthpredict);
        let deathtestConvert = Array.from(deathTest);
        let deathpredictConvert = Array.from(deathpredict);
        let dtpConvert = Array.from(dtpTest);
        let dtppredictConvert = Array.from(dtppredict);
        let lifeConvert = Array.from(lifeTest);
        let lifepredictConvert = Array.from(lifepredict);
        let measlesImmConvert = Array.from(measlesImmTest);
        let measlesImmpredictConvert = Array.from(measlesImmpredict);
        let cancercaseConvert = Array.from(cancercaseTest);
        let cancercasepredictConvert = Array.from(cancercasepredict);
        let cancerdeathConvert = Array.from(cancerdeathTest);
        let cancerdeathpredictConvert = Array.from(cancerdeathpredict);
        let obesityConvert = Array.from(obesityTest);
        let obesitypredictConvert = Array.from(obesitypredict);
        let populationConvert = Array.from(populationTest);
        let populationpredictConvert = Array.from(populationpredict);
        let gdpConvert = Array.from(gdpTest);
        let gdppredictConvert = Array.from(gdppredict);


        // Reverse Scale the data
        let tenYearBirth = conversion(maxArray(brithRate), minArray(brithRate), birthpredictConvert);
        let tenYearBirthTest = conversion(maxArray(brithRate), minArray(brithRate), birthtestConvert);
        let tenYearDeath = conversion(maxArray(deathRate), minArray(deathRate), deathpredictConvert);
        let tenYearDeathTest = conversion(maxArray(deathRate), minArray(deathRate), deathtestConvert);
        let tenYeardtp = conversion(maxArray(dtpImmunisation), minArray(dtpImmunisation), dtppredictConvert);
        let tenYeardtpTest = conversion(maxArray(dtpImmunisation), minArray(dtpImmunisation), dtpConvert);
        let tenYearlife = conversion(maxArray(lifeExpectency), minArray(lifeExpectency), lifepredictConvert);
        let tenYearlifeTest = conversion(maxArray(lifeExpectency), minArray(lifeExpectency), lifeConvert);
        let tenYearmeaslesImm = conversion(maxArray(measlesImmunisation), minArray(measlesImmunisation), measlesImmpredictConvert);
        let tenYearmeaslesImmTest = conversion(maxArray(measlesImmunisation), minArray(measlesImmunisation), measlesImmConvert);
        let tenYearCancerCase = conversion(maxArray(cancerCases), minArray(cancerCases), cancercasepredictConvert);
        let tenYearCancerCaseTest = conversion(maxArray(cancerCases), minArray(cancerCases), cancercaseConvert);
        let tenYearCancerDeaths = conversion(maxArray(cancerDeaths), minArray(cancerDeaths), cancerdeathpredictConvert);
        let tenYearCancerDeathsTest = conversion(maxArray(cancerDeaths), minArray(cancerDeaths), cancerdeathConvert);
        let tenYearObesity = conversion(maxArray(obesity), minArray(obesity), obesitypredictConvert);
        let tenYearObesityTest = conversion(maxArray(obesity), minArray(obesity), obesityConvert);
        let tenYearPopulation = conversion(maxArray(population), minArray(population), populationpredictConvert);
        let tenYearpopulationTest = conversion(maxArray(population), minArray(population), populationConvert);
        let tenYeargdp = conversion(maxArray(gdp), minArray(gdp), gdppredictConvert);
        let tenYeargdpTest = conversion(maxArray(gdp), minArray(gdp), gdpConvert);

        // Inform User that Training is Complete
        d3.selectAll('#healthpredict').append('p').text("Machine Learning Complete, forecasts are available below");

        d3.selectAll('#birthtag').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(brithRate.slice(-6),tenYearBirthTest))}%`);
        d3.selectAll('#deathtag').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(deathRate.slice(-6),tenYearDeathTest))}%`);
        d3.selectAll('#dtptag').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(dtpImmunisation.slice(-6),tenYeardtpTest))}%`);
        d3.selectAll('#lifetag').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(lifeExpectency.slice(-6),tenYearlifeTest))}%`);
        d3.selectAll('#measlestag').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(measlesImmunisation.slice(-6),tenYearmeaslesImmTest))}%`);
        d3.selectAll('#cancercasetag').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(cancerCases.slice(-6),tenYearCancerCaseTest))}%`);
        d3.selectAll('#cancerdeathtag').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(cancerDeaths.slice(-6),tenYearCancerDeathsTest))}%`);
        d3.selectAll('#obesitytag').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(obesity.slice(-6),tenYearObesityTest))}%`);
        d3.selectAll('#populationtag').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(population.slice(-6),tenYearpopulationTest))}%`);
        d3.selectAll('#gdptag').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(gdp.slice(-6),tenYeargdpTest))}%`);
        
        // console.log(mean(PerCentErrordif(brithRate.slice(-6),tenYearBirthTest)));

        // Creating a plot and table
        var layout = {
            title: `${id}`,
            font: {
                color: 'black',
                family: 'Arial',
                size: 16
            },
            paper_bgcolor: '#fffafb',
            plot_bgcolor: '#fffafb'
        };
        var birthValues = [predYears,tenYearBirth]

        var birthdata = [{
            type: 'table',
            header: {
                values: [["<b>2021-2030</b>"], ["<b>Predicted Births</b>"]],
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

        var deathValues = [predYears,tenYearDeath]

        var deathdata = [{
            type: 'table',
            header: {
                values: [["<b>2021-2030</b>"], ["<b>Predicted Deaths</b>"]],
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

        var dtpValues = [predYears,tenYeardtp]

        var dtpdata = [{
            type: 'table',
            header: {
                values: [["<b>2021-2030</b>"], ["<b>Predicted DTP Immunisation Rates</b>"]],
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

        var lifeValues = [predYears,tenYearlife]

        var lifedata = [{
            type: 'table',
            header: {
                values: [["<b>2021-2030</b>"], ["<b>Predicted Life Expectency</b>"]],
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

        var measlesValues = [predYears,tenYearmeaslesImm]

        var measlesdata = [{
            type: 'table',
            header: {
                values: [["<b>2021-2030</b>"], ["<b>Predicted Measles Immunisation Rates</b>"]],
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

        var cancerCaseValues = [predYears,tenYearCancerCase]

        var CancerCasedata = [{
            type: 'table',
            header: {
                values: [["<b>2021-2030</b>"], ["<b>Predicted Cancer Cases</b>"]],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "#d91657" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: cancerCaseValues,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }]

        Plotly.newPlot('predcancercases', CancerCasedata, layout);

        var CancerDeathValues = [predYears,tenYearCancerDeaths]

        var CancerDeathdata = [{
            type: 'table',
            header: {
                values: [["<b>2021-2030</b>"], ["<b>Predicted Cancer Deaths</b>"]],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "#d91657" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: CancerDeathValues,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }]

        Plotly.newPlot('predcancerdeaths', CancerDeathdata, layout);

        var ObesityValues = [predYears,tenYearObesity]

        var ObesityData = [{
            type: 'table',
            header: {
                values: [["<b>2021-2030</b>"], ["<b>Predicted Obesity Rates</b>"]],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "#d91657" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: ObesityValues,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }]

        Plotly.newPlot('predobesity', ObesityData, layout);

        var PopulationValues = [predYears,tenYearPopulation]

        var PopulationData = [{
            type: 'table',
            header: {
                values: [["<b>2021-2030</b>"], ["<b>Predicted Population</b>"]],
                align: "center",
                line: { width: 1, color: 'black' },
                fill: { color: "#d91657" },
                font: { family: "Arial", size: 12, color: "white" }
            },
            cells: {
                values: PopulationValues,
                align: "center",
                line: { color: "black", width: 1 },
                font: { family: "Arial", size: 11, color: ["black"] }
            }
        }]

        Plotly.newPlot('predpopulation', PopulationData, layout);

        var gdpValues = [predYears,tenYeargdp]

        var gdpData = [{
            type: 'table',
            header: {
                values: [["<b>2021-2030</b>"], ["<b>Predicted Gross Domestic Product</b>"]],
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

        Plotly.newPlot('predgdp', gdpData, layout);

        


        

































    })
}