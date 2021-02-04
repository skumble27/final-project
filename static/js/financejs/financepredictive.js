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

        // Converting arrays to tensorflow arrays
        let broadMoneyTF = tf.tensor2d(MinMaxScaler(broadMoneyGrowth), [broadMoneyGrowth.length,1]);
        let domesticCompanyTF = tf.tensor2d(MinMaxScaler(domesticCompanies),[domesticCompanies.length,1]);
        let foreignTF = tf.tensor2d(MinMaxScaler(foreignInvestment),[foreignInvestment.length,1]);
        let inflationTF = tf.tensor2d(MinMaxScaler(inflation),[inflation.length,1]);
        let stockTF = tf.tensor2d(MinMaxScaler(stockTrade),[stockTrade.length,1]);
        let totalReserveTF = tf.tensor2d(MinMaxScaler(totalReserves), [totalReserves.length,1]);
        let gdpTF = tf.tensor2d(MinMaxScaler(gdp),[gdp.length,1]);
        let yearTF = tf.tensor2d(MinMaxScaler(intYear), [intYear.length, 1]);

        // Scaling the predictive years
        let yearsScaled = yearScale(predYears);
        console.log(intYear);
        console.log(yearsScaled);

        
        d3.selectAll('#financepredict').append('h3').text("Machine Learning in progress");
        
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

        // Training the Neural Networks
        await broadMoneyTrain.fit(yearTF, broadMoneyTF, {epochs:100});
        await domesticTrain.fit(yearTF, domesticCompanyTF, {epochs:100});
        await foreignTrain.fit(yearTF, foreignTF, {epochs:100});
        await inflationTrain.fit(yearTF, inflationTF, {epochs:100});
        await stockTrain.fit(yearTF, stockTF, {epochs:100});
        await totalReservesTrain.fit(yearTF, totalReserveTF, {epochs:100});
        await gdpTrain.fit(yearTF, gdpTF, {epochs:100});

        // Announce to the user the training is complete

        d3.selectAll('#financepredict').append('p').text("Machine Learning Complete, forecasts are available below");

        // Making the prediction

        let broadMoneyPredict = broadMoneyTrain.predict(tf.tensor2d(yearsScaled,[yearsScaled.length,1])).dataSync();
        let domesticPredict = domesticTrain.predict(tf.tensor2d(yearsScaled,[yearsScaled.length,1])).dataSync();
        let foreignPredict = foreignTrain.predict(tf.tensor2d(yearsScaled,[yearsScaled.length,1])).dataSync();
        let inflationPredict = inflationTrain.predict(tf.tensor2d(yearsScaled,[yearsScaled.length,1])).dataSync();








        
        








    })
}