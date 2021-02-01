async function healthPredict(id){

    console.log(id);

    await d3.json('http://127.0.0.1:5000/health').then(function(data){

    // Checking to see if the dataset has been read
    // console.log(data);

    // Filtering by country
    let countryFilter = data.filter(nation => nation.country === id);
    // console.log(countryFilter);

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
        console.log(new Date(rawYear[i]).getFullYear());
        intYear.push(new Date(rawYear[i]).getFullYear());
    }

    console.log(intYear);

    // Creating the Machine Learning Algorithm
    const model = tf.sequential();

    let predYears = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

     

    // Converting arrays to tensorflow arrays
    let brithRateTF = tf.tensor2d(MinMaxScaler(brithRate),[brithRate.length,1]);
    let yearTF = tf.tensor2d(MinMaxScaler(intYear),[intYear.length,1]);
    let deathRateTF = tf.tensor2d(MinMaxScaler(deathRate),[deathRate.length,1]);
    let dtpImmunisationTF = tf.tensor2d(MinMaxScaler(dtpImmunisation),[dtpImmunisation.length, 1]);
    let lifeExpectencyTF = tf.tensor2d(MinMaxScaler(lifeExpectency),[lifeExpectency.length,1]);
    let measlesImmunisationTF = tf.tensor2d(MinMaxScaler(measlesImmunisation),[measlesImmunisation.length,1]);
    let cancerCasesTF = tf.tensor2d(MinMaxScaler(cancerCases),[cancerCases.length,1]);
    let cancerDeathsTF = tf.tensor2d(MinMaxScaler(cancerDeaths),[cancerDeaths.length,1]);
    let obesityTF = tf.tensor2d(MinMaxScaler(obesity),[obesity.length,1]);

    // Creating the Neural Networks
    model.add(tf.layers.dense({units:1, inputShape:[1],activation: 'relu', kernelInitializer:'ones'}));

    model.compile({loss:'meanSquaredError', optimizer: tf.train.sgd(0.0001)});

    // Making a prediction on the data
    await model.fit(yearTF,brithRateTF, {epochs:2000});











    })
}