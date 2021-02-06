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

        // Scaling the predictive years
        let testYearsScaled = yearScale(testYears);
        let predYearsScaled = yearScale(predYears);
        
        console.log(testYears);
        console.log(predYears);

        d3.selectAll('#healthpredict').append('h3').text("Machine Learning in progress");

        // Creating the Neural Networks
        birthtrain.add(tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', kernelInitializer: 'ones' }));
        birthtrain.add(tf.layers.dense({ units: 61, inputShape: [1] }));
        birthtrain.add(tf.layers.dense({ units: 1, inputShape: [61] }));
        birthtrain.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam() });

        // Fitting the model to the data
        await birthtrain.fit(yearTF, brithRateTF, {epochs:100});

        // Inform User that Training is Complete
        d3.selectAll('#healthpredict').append('p').text("Machine Learning Complete, forecasts are available below");

        // Test the accuracy of the predictions
        let birthTest = await birthtrain.predict(tf.tensor2d(testYearsScaled, [testYearsScaled.length, 1])).dataSync();

        // Predict for the next ten years
        let birthpredict = await birthtrain.predict(tf.tensor2d(predYearsScaled, [predYearsScaled.length, 1])).dataSync();

        // Converting Float Array back to regular array
        let birthpredictConvert = Array.from(birthpredict);

        // Reverse Scale the data
        let tenYearBirth = conversion(maxArray(brithRate), minArray(brithRate), birthpredictConvert);

        console.log(brithRate);
        console.log(tenYearBirth);

        d3.selectAll('#predtotalbirths').append('p').text(`Mean Percentage Error: ${mean(PerCentErrordif(brithRate.slice(-6),tenYearBirth))}`);
        console.log(mean(PerCentErrordif(brithRate.slice(-6),tenYearBirth)));































    })
}