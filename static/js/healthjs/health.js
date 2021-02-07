// Reading the Json object available on the server
async function healthDataUnpack(id) {

    console.log(id);

    await d3.json('http://127.0.0.1:5000/compileddata').then(function (data) {

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



        })


        // Creating a trace for number all y variables
        var birthsTrace = {
            type: 'scatter',
            mode: 'lines',
            name: `Total Births`,
            x: year,
            y: brithRate,
            line: { color: '#3483eb' }
        }

        var deathsTrace = {
            type: 'scatter',
            mode: 'lines',
            name: `Total Deaths`,
            x: year,
            y: deathRate,
            line: { color: '#3483eb' }
        }

        var dtpImmTrace = {
            type: 'scatter',
            mode: 'lines',
            name: `DTP Immunisations`,
            x: year,
            y: dtpImmunisation,
            line: { color: '#3483eb' }
        }

        var lifeTrace = {
            type: 'scatter',
            mode: 'lines',
            name: `Life Expectency`,
            x: year,
            y: lifeExpectency,
            line: { color: '#3483eb' }
        }

        var measlesTrace = {
            type: 'scatter',
            mode: 'lines',
            name: `Measles Immunisation`,
            x: year,
            y: measlesImmunisation,
            line: { color: '#3483eb' }
        }

        var cancerRatesTrace = {
            type: 'scatter',
            mode: 'lines',
            name: `Total Cancer Cases`,
            x: year,
            y: cancerCases,
            line: { color: '#3483eb' }
        }

        var cancerDeathsTrace = {
            type: 'scatter',
            mode: 'lines',
            name: `Total Cancer Deaths`,
            x: year,
            y: cancerDeaths,
            line: { color: '#3483eb' }
        }
        var obesityTrace = {
            type: 'scatter',
            mode: 'lines',
            name: `Total Obesity Numbers`,
            x: year,
            y: obesity,
            line: { color: '#3483eb' }
        }

        var populationTrace = {
            type: 'scatter',
            mode: 'lines',
            name: `Population`,
            x: year,
            y: population,
            line: { color: '#3483eb' }
        }

        var gdpTrace = {
            type: 'scatter',
            mode: 'lines',
            name: `Gross Domestic Product`,
            x: year,
            y: gdp,
            line: { color: '#3483eb' }
        }

        var obesityData = [obesityTrace];
        var cancerDeathsData = [cancerDeathsTrace];
        var cancerCasesData = [cancerRatesTrace];
        var measlesData = [measlesTrace];
        var lifeData = [lifeTrace];
        var dtpData = [dtpImmTrace];
        var birthData = [birthsTrace];
        var deathData = [deathsTrace];
        var populationData = [populationTrace];
        var gdpData = [gdpTrace];


        var birthLayout = {
            title: `Total Births`,
            showlegend: true,
            legend: {
                y: 0.5,
                x: 1.2
            },
            font: {
                color: '#3483eb',
                family: 'Arial'
            },
            yaxis: {
                title: `Total Births`,
                titlefont: { color: '#3483eb' },
                tickfont: { color: '#3483eb' },
                showgrid: false,
                gridcolor: '#3483eb',
                zerolinecolor: '#3483eb'

            },

            xaxis: {
                autorange: true,
                range: [1961, 2018],
                rangeslider: { range: ['1961', '2018'] },
                type: 'date',
                shogrid: true,
                gridcolor: '#3483eb',
                tickfont: { color: '#3483eb' },
                zerolinecolor: '#3483eb'


            },
            paper_bgcolor: '#fffafb',
            plot_bgcolor: '#fffafb'
        };
        var deathsLayout = {
            title: `Total Deaths`,
            showlegend: true,
            legend: {
                y: 0.5,
                x: 1.2
            },
            font: {
                color: '#3483eb',
                family: 'Arial'
            },
            yaxis: {
                title: `Total Deaths`,
                titlefont: { color: '#3483eb' },
                tickfont: { color: '#3483eb' },
                showgrid: false,
                gridcolor: '#3483eb',
                zerolinecolor: '#3483eb'

            },

            xaxis: {
                autorange: true,
                range: [1961, 2018],
                rangeslider: { range: ['1961', '2018'] },
                type: 'date',
                shogrid: true,
                gridcolor: '#3483eb',
                tickfont: { color: '#3483eb' },
                zerolinecolor: '#3483eb'


            },
            paper_bgcolor: '#fffafb',
            plot_bgcolor: '#fffafb'
        };

        var dtpLayout = {
            title: `DTP Immunisation`,
            showlegend: true,
            legend: {
                y: 0.5,
                x: 1.2
            },
            font: {
                color: '#3483eb',
                family: 'Arial'
            },
            yaxis: {
                title: `DTP Immunisation (% of Population)`,
                titlefont: { color: '#3483eb' },
                tickfont: { color: '#3483eb' },
                showgrid: false,
                gridcolor: '#3483eb',
                zerolinecolor: '#3483eb'

            },

            xaxis: {
                autorange: true,
                range: [1961, 2018],
                rangeslider: { range: ['1961', '2018'] },
                type: 'date',
                shogrid: true,
                gridcolor: '#3483eb',
                tickfont: { color: '#3483eb' },
                zerolinecolor: '#3483eb'


            },
            paper_bgcolor: '#fffafb',
            plot_bgcolor: '#fffafb'
        };
        var lifeLayout = {
            title: `Average Life Expectency`,
            showlegend: true,
            legend: {
                y: 0.5,
                x: 1.2
            },
            font: {
                color: '#3483eb',
                family: 'Arial'
            },
            yaxis: {
                title: `Life Expectency (Years)`,
                titlefont: { color: '#3483eb' },
                tickfont: { color: '#3483eb' },
                showgrid: false,
                gridcolor: '#3483eb',
                zerolinecolor: '#3483eb'

            },

            xaxis: {
                autorange: true,
                range: [1961, 2018],
                rangeslider: { range: ['1961', '2018'] },
                type: 'date',
                shogrid: true,
                gridcolor: '#3483eb',
                tickfont: { color: '#3483eb' },
                zerolinecolor: '#3483eb'


            },
            paper_bgcolor: '#fffafb',
            plot_bgcolor: '#fffafb'
        };

        var measlesLayout = {
            title: `Measles Immunisation`,
            showlegend: true,
            legend: {
                y: 0.5,
                x: 1.2
            },
            font: {
                color: '#3483eb',
                family: 'Arial'
            },
            yaxis: {
                title: `Measles Immunisation (% Popoulation)`,
                titlefont: { color: '#3483eb' },
                tickfont: { color: '#3483eb' },
                showgrid: false,
                gridcolor: '#3483eb',
                zerolinecolor: '#3483eb'

            },

            xaxis: {
                autorange: true,
                range: [1961, 2018],
                rangeslider: { range: ['1961', '2018'] },
                type: 'date',
                shogrid: true,
                gridcolor: '#3483eb',
                tickfont: { color: '#3483eb' },
                zerolinecolor: '#3483eb'


            },
            paper_bgcolor: '#fffafb',
            plot_bgcolor: '#fffafb'
        };
        var cancerCaseLayout = {
            title: `Total Cancer Cases`,
            showlegend: true,
            legend: {
                y: 0.5,
                x: 1.2
            },
            font: {
                color: '#3483eb',
                family: 'Arial'
            },
            yaxis: {
                title: `Total Cancer Cases`,
                titlefont: { color: '#3483eb' },
                tickfont: { color: '#3483eb' },
                showgrid: false,
                gridcolor: '#3483eb',
                zerolinecolor: '#3483eb'

            },

            xaxis: {
                autorange: true,
                range: [1961, 2018],
                rangeslider: { range: ['1961', '2018'] },
                type: 'date',
                shogrid: true,
                gridcolor: '#3483eb',
                tickfont: { color: '#3483eb' },
                zerolinecolor: '#3483eb'


            },
            paper_bgcolor: '#fffafb',
            plot_bgcolor: '#fffafb'
        };

        var cancerDeathsLayout = {
            title: `Total Cancer Deaths`,
            showlegend: true,
            legend: {
                y: 0.5,
                x: 1.2
            },
            font: {
                color: '#3483eb',
                family: 'Arial'
            },
            yaxis: {
                title: `Total Cancer Deaths`,
                titlefont: { color: '#3483eb' },
                tickfont: { color: '#3483eb' },
                showgrid: false,
                gridcolor: '#3483eb',
                zerolinecolor: '#3483eb'

            },

            xaxis: {
                autorange: true,
                range: [1961, 2018],
                rangeslider: { range: ['1961', '2018'] },
                type: 'date',
                shogrid: true,
                gridcolor: '#3483eb',
                tickfont: { color: '#3483eb' },
                zerolinecolor: '#3483eb'


            },
            paper_bgcolor: '#fffafb',
            plot_bgcolor: '#fffafb'
        };

        var obesityLayout = {
            title: `Obesity`,
            showlegend: true,
            legend: {
                y: 0.5,
                x: 1.2
            },
            font: {
                color: '#3483eb',
                family: 'Arial'
            },
            yaxis: {
                title: `Total Obesity Numbers`,
                titlefont: { color: '#3483eb' },
                tickfont: { color: '#3483eb' },
                showgrid: false,
                gridcolor: '#3483eb',
                zerolinecolor: '#3483eb'

            },

            xaxis: {
                autorange: true,
                range: [1961, 2018],
                rangeslider: { range: ['1961', '2018'] },
                type: 'date',
                shogrid: true,
                gridcolor: '#3483eb',
                tickfont: { color: '#3483eb' },
                zerolinecolor: '#3483eb'


            },
            paper_bgcolor: '#fffafb',
            plot_bgcolor: '#fffafb'
        };
        var populationLayout = {
            title: `Population`,
            showlegend: true,
            legend: {
                y: 0.5,
                x: 1.2
            },
            font: {
                color: '#3483eb',
                family: 'Arial'
            },
            yaxis: {
                title: `Population`,
                titlefont: { color: '#3483eb' },
                tickfont: { color: '#3483eb' },
                showgrid: false,
                gridcolor: '#3483eb',
                zerolinecolor: '#3483eb'

            },

            xaxis: {
                autorange: true,
                range: [1961, 2018],
                rangeslider: { range: ['1961', '2018'] },
                type: 'date',
                shogrid: true,
                gridcolor: '#3483eb',
                tickfont: { color: '#3483eb' },
                zerolinecolor: '#3483eb'


            },
            paper_bgcolor: '#fffafb',
            plot_bgcolor: '#fffafb'
        };
        var gdpLayout = {
            title: `Gross Domestic Product`,
            showlegend: true,
            legend: {
                y: 0.5,
                x: 1.2
            },
            font: {
                color: '#3483eb',
                family: 'Arial'
            },
            yaxis: {
                title: `Gross Domestic Product`,
                titlefont: { color: '#3483eb' },
                tickfont: { color: '#3483eb' },
                showgrid: false,
                gridcolor: '#3483eb',
                zerolinecolor: '#3483eb'

            },

            xaxis: {
                autorange: true,
                range: [1961, 2018],
                rangeslider: { range: ['1961', '2018'] },
                type: 'date',
                shogrid: true,
                gridcolor: '#3483eb',
                tickfont: { color: '#3483eb' },
                zerolinecolor: '#3483eb'


            },
            paper_bgcolor: '#fffafb',
            plot_bgcolor: '#fffafb'
        };
        Plotly.newPlot('gdp', gdpData, gdpLayout);
        Plotly.newPlot('population', populationData, populationLayout);
        Plotly.newPlot('obesity', obesityData, obesityLayout);
        Plotly.newPlot('cancerdeaths', cancerDeathsData, cancerDeathsLayout);
        Plotly.newPlot('cancercases', cancerCasesData, cancerCaseLayout);
        Plotly.newPlot('measles', measlesData, measlesLayout);
        Plotly.newPlot('life', lifeData, lifeLayout);
        Plotly.newPlot('dtp', dtpData, dtpLayout);
        Plotly.newPlot('totaldeaths', deathData, deathsLayout);
        Plotly.newPlot('totalbirths', birthData, birthLayout);

    })
}