async function environmentDataUnpack(id) {

    console.log(id);

    await d3.json('http://127.0.0.1:5000/compileddata').then(function (data) {

        // Checking to see if the dataset has been read
        // console.log(data);

        // Filtering by country
        let countryFilter = data.filter(nation => nation.country === id);
        // console.log(countryFilter);

        // Creating a list of empty arrays for later appendage

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

        // Iterating through the filtered dataset objects
        Object.keys(countryFilter).forEach(function(key){
            p25airpol.push(countryFilter[key].pm2_5_air_pollution);
            population.push(countryFilter[key].population);
            electricityacess.push(countryFilter[key].access_to_electricity_pct);
            renewable.push(countryFilter[key].renewable_electricity_pct);
            urbanpop.push(countryFilter[key].urban_population_pct);
            electricUse.push(countryFilter[key].electricity_consumption_kwh);
            year.push(parseTime(countryFilter[key]._year));
            
        })

        // Creating a trace for all the y variables
        var pm25Trace = {
            type: 'scatter',
            mode: 'lines',
            name: `pm 2.5 Air Pollution`,
            x: year,
            y: p25airpol,
            line: { color: '#ff00ff' }
        }

        var populationTrace = {
            type: 'scatter',
            mode: 'lines',
            name: `Population`,
            x: year,
            y: population,
            line: { color: '#ff00ff' }
        }

        var electricAccessTrace = {
            type: 'scatter',
            mode: 'lines',
            name: `Access to Electricity`,
            x: year,
            y: electricityacess,
            line: { color: '#ff00ff' }
        }

        var renewableTrace = {
            type: 'scatter',
            mode: 'lines',
            name: `Renewable Energy Use`,
            x: year,
            y: renewable,
            line: { color: '#ff00ff' }
        }

        var UrbanPopTrace = {
            type: 'scatter',
            mode: 'lines',
            name: `Urban Population`,
            x: year,
            y: urbanpop,
            line: { color: '#ff00ff' }
        }

        var electricityUseTrace = {
            type: 'scatter',
            mode: 'lines',
            name: `Electricity Usage kw/h`,
            x: year,
            y: p25airpol,
            line: { color: '#ff00ff' }
        }

        var pm25Data = [pm25Trace];
        var PopoulationData = [populationTrace];
        var electricityAccessData = [electricAccessTrace];
        var renewableData = [renewableTrace];
        var urbanpopData = [UrbanPopTrace];
        var eletricUseData = [electricityUseTrace];

        var pm25Layout = {
            title: `Particulate Matter Air Pollution`,
            showlegend: true,
            legend: {
                y: 0.5,
                x: 1.2
            },
            font: {
                color: '#000000',
                family: 'Arial'
            },
            yaxis: {
                title: `pm2.5 Air Pollution`,
                titlefont: { color: '#000000' },
                tickfont: { color: '#000000' },
                showgrid: false,
                gridcolor: '#000000',
                zerolinecolor: '#000000'

            },

            xaxis: {
                autorange: true,
                range: [1961, 2018],
                rangeslider: { range: ['1961', '2018'] },
                type: 'date',
                shogrid: true,
                gridcolor: '#000000',
                tickfont: { color: '#000000' },
                zerolinecolor: '#000000'


            },
            paper_bgcolor: '#d7ffe8',
            plot_bgcolor: '#d7ffe8'
        };

        Plotly.newPlot('p25airpoll', pm25Data,pm25Layout);

        var popLayout = {
            title: `Population`,
            showlegend: true,
            legend: {
                y: 0.5,
                x: 1.2
            },
            font: {
                color: '#000000',
                family: 'Arial'
            },
            yaxis: {
                title: `Population`,
                titlefont: { color: '#000000' },
                tickfont: { color: '#000000' },
                showgrid: false,
                gridcolor: '#000000',
                zerolinecolor: '#000000'

            },

            xaxis: {
                autorange: true,
                range: [1961, 2018],
                rangeslider: { range: ['1961', '2018'] },
                type: 'date',
                shogrid: true,
                gridcolor: '#000000',
                tickfont: { color: '#000000' },
                zerolinecolor: '#000000'


            },
            paper_bgcolor: '#d7ffe8',
            plot_bgcolor: '#d7ffe8'
        };

        Plotly.newPlot('population', PopoulationData,popLayout);

        var electricityLayout = {
            title: `Access to Electricity (%)`,
            showlegend: true,
            legend: {
                y: 0.5,
                x: 1.2
            },
            font: {
                color: '#000000',
                family: 'Arial'
            },
            yaxis: {
                title: `Access to Electricity (%)`,
                titlefont: { color: '#000000' },
                tickfont: { color: '#000000' },
                showgrid: false,
                gridcolor: '#000000',
                zerolinecolor: '#000000'

            },

            xaxis: {
                autorange: true,
                range: [1961, 2018],
                rangeslider: { range: ['1961', '2018'] },
                type: 'date',
                shogrid: true,
                gridcolor: '#000000',
                tickfont: { color: '#000000' },
                zerolinecolor: '#000000'


            },
            paper_bgcolor: '#d7ffe8',
            plot_bgcolor: '#d7ffe8'
        };

        Plotly.newPlot('electricity', electricityAccessData,electricityLayout);

        var renewableLayout = {
            title: `Renewable Electricity Production`,
            showlegend: true,
            legend: {
                y: 0.5,
                x: 1.2
            },
            font: {
                color: '#000000',
                family: 'Arial'
            },
            yaxis: {
                title: `Use of Renewable Resources (%)`,
                titlefont: { color: '#000000' },
                tickfont: { color: '#000000' },
                showgrid: false,
                gridcolor: '#000000',
                zerolinecolor: '#000000'

            },

            xaxis: {
                autorange: true,
                range: [1961, 2018],
                rangeslider: { range: ['1961', '2018'] },
                type: 'date',
                shogrid: true,
                gridcolor: '#000000',
                tickfont: { color: '#000000' },
                zerolinecolor: '#000000'


            },
            paper_bgcolor: '#d7ffe8',
            plot_bgcolor: '#d7ffe8'
        };

        Plotly.newPlot('renewable', renewableData,renewableLayout);

        
        var urbanPopLayout = {
            title: `Urban Population`,
            showlegend: true,
            legend: {
                y: 0.5,
                x: 1.2
            },
            font: {
                color: '#000000',
                family: 'Arial'
            },
            yaxis: {
                title: `Urban Population (%)`,
                titlefont: { color: '#000000' },
                tickfont: { color: '#000000' },
                showgrid: false,
                gridcolor: '#000000',
                zerolinecolor: '#000000'

            },

            xaxis: {
                autorange: true,
                range: [1961, 2018],
                rangeslider: { range: ['1961', '2018'] },
                type: 'date',
                shogrid: true,
                gridcolor: '#000000',
                tickfont: { color: '#000000' },
                zerolinecolor: '#000000'


            },
            paper_bgcolor: '#d7ffe8',
            plot_bgcolor: '#d7ffe8'
        };

        Plotly.newPlot('urbanpopulation', urbanpopData,urbanPopLayout);

        var electricUseLayout = {
            title: `Electricity Consumption`,
            showlegend: true,
            legend: {
                y: 0.5,
                x: 1.2
            },
            font: {
                color: '#000000',
                family: 'Arial'
            },
            yaxis: {
                title: `Electricity Consumption (kw/h)`,
                titlefont: { color: '#000000' },
                tickfont: { color: '#000000' },
                showgrid: false,
                gridcolor: '#000000',
                zerolinecolor: '#000000'

            },

            xaxis: {
                autorange: true,
                range: [1961, 2018],
                rangeslider: { range: ['1961', '2018'] },
                type: 'date',
                shogrid: true,
                gridcolor: '#000000',
                tickfont: { color: '#000000' },
                zerolinecolor: '#000000'


            },
            paper_bgcolor: '#d7ffe8',
            plot_bgcolor: '#d7ffe8'
        };

        Plotly.newPlot('electricityconsumption', eletricUseData,electricUseLayout);



        
        
        


        
        
        




    })
}