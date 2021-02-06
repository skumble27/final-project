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

        // Converting the arrays to tensorflow arrays
        let p25airpolTF = tf.tensor2d(MinMaxScaler(p25airpol), [p25airpol.length,1]);
        let populationTF = tf.tensor2d(MinMaxScaler(population), [population.length,1]);
        let electricAccessTF = tf.tensor2d(MinMaxScaler(electricityacess), [electricityacess.length,1]);
        let renewableTF = tf.tensor2d(MinMaxScaler(renewable),[renewable.length,1]);
        let urbanpopTF = tf.tensor2d(MinMaxScaler(urbanpop),[urbanpop.length,1]);
        let electricityUseTF = tf.tensor2d(MinMaxScaler(electricUse),[electricUse.length,1]);
        let yearTF = tf.tensor2d(MinMaxScaler(intYear),[intYear.length,1]);

        console.log("Done");

        // Scaling the predictive years
        let yearsScaled = yearScale(predYears);
        console.log(MinMaxScaler(intYear));
        console.log(yearsScaled);

        d3.selectAll('#environmentpredict').append('h3').text("Machine Learning in progress");

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
        await p25airpolTrain.fit(yearTF, p25airpolTF, {epochs:100});
        await populationTrain.fit(yearTF, populationTF, {epochs:100});
        await electricityAccessTrain.fit(yearTF, electricAccessTF, {epochs:100});
        await renewableTrain.fit(yearTF, renewableTF, {epochs:100});
        await urbanPopTrain.fit(yearTF, urbanpopTF, {epochs:100});
        await electricUseTrain.fit(yearTF, electricityUseTF, {epochs:100});





    })




}