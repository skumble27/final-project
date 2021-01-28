// Reading the Json object available on the server
async function health(id){

    console.log(id);
    
    await d3.json('http://127.0.0.1:5000/health').then(function(data){

        // Checking to see if the dataset has been read
        console.log(data);

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
        var parseTime = d3.timeParse('%Y');
        
        // Creating the x-axis 
        let year = [];

        // Iterating through the filtered dataset objects
        Object.keys(countryFilter).forEach(function(key){
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

        })

        console.log(brithRate);
        console.log(deathRate);
        console.log(dtpImmunisation);
        console.log(gdp);
        console.log(lifeExpectency);
        console.log(measlesImmunisation);
        console.log(population);
        console.log(cancerCases);
        console.log(cancerDeaths);
        console.log(obesity);
        console.log(year);








    })
}
let id = 'United States';
health(id);