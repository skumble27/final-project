async function agriDataUnpack(id) {
    console.log(id);

    await d3.json('http://127.0.0.1:5000/compileddata').then(function (data) {

        // Checking to see if the datasets load
        // console.log(data);

        // Filtering by country
        let countryFilter = data.filter(nation => nation.country === id);
        // console.log(countryFilter);

        // Creating a list of empty arrays in which append
        let landArea = [];
        let agriLand = [];
        let forestLand = [];
        let cerealYield = [];
        let cashCropYield = [];
        let employmentAg = [];
        let liveStockProd = [];
        let population = [];
        let gdp = [];

        // Creating a time parse for date
        var parseTime = d3.timeParse('%d/%m/%Y');

        // Creating the x-axis 
        let year = [];

        // Iterating through the filtered dataset objects
        Object.keys(countryFilter).forEach(function (key) {
            landArea.push(countryFilter[key].land_area_ha);
            agriLand.push(countryFilter[key].agri_land_pct);
            forestLand.push(countryFilter[key].forest_area_pct);
            cerealYield.push(countryFilter[key].cereal_yield_kg_ha);
            cashCropYield.push(countryFilter[key].cash_crop_yield_kg_ha);
            employmentAg.push(countryFilter[key].employment_agri_pct);
            liveStockProd.push(countryFilter[key].livestock_production_100_index);
            year.push(parseTime(countryFilter[key]._year));
            population.push(countryFilter[key].population);
            gdp.push(countryFilter[key].gdp_current_usd);
        })
        // console.log(liveStockProd);


        // Creating a trace to plot the data
        var agriTrace = {
            type: 'scatter',
            mode: 'lines',
            name: 'Agricultural Land Area',
            x: year,
            y: agriLand,
            line: {
                color: '#429e8f',
                width: 3
            }
        }

        var forestTrace = {
            type: 'scatter',
            mode: 'lines',
            name: 'Forest Land Area',
            x: year,
            y: forestLand,
            line: {
                color: '#429e8f',
                width: 3
            }
        }

        var cerealTrace = {
            type: 'scatter',
            mode: 'lines',
            name: 'Cereal Yield',
            x: year,
            y: cerealYield,
            line: {
                color: '#429e8f',
                width: 3
            }
        }

        var cashCropTrace = {
            type: 'scatter',
            mode: 'lines',
            name: 'Cash Crop Yield',
            x: year,
            y: cashCropYield,
            line: {
                color: '#429e8f',
                width: 3
            }
        }

        var employmentAgTrace = {
            type: 'scatter',
            mode: 'lines',
            name: 'Employment in Agriculture',
            x: year,
            y: employmentAg,
            line: {
                color: '#429e8f',
                width: 3
            }
        }

        var liveStockTrace = {
            type: 'scatter',
            mode: 'lines',
            name: 'Live Stock Production',
            x: year,
            y: liveStockProd,
            line: {
                color: '#429e8f',
                width: 3
            }
        }

        var agriData = [agriTrace];
        var forestData = [forestTrace];
        var cerealData = [cerealTrace];
        var cashCropData = [cashCropTrace];
        var employmentData = [employmentAgTrace];
        var liveStockData = [liveStockTrace];

        // Creating a Layout for the plots
        var agriLayout = {
            title: `Agricultural Land Area`,
            showlegend: true,
            legend: {
                y: 0.5,
                x: 1.2
            },
            font: {
                color: 'black',
                family: 'Arial'
            },
            yaxis: {
                title: `Agricultural Land Area (ha)`,
                titlefont: { color: 'black' },
                tickfont: { color: 'black' },
                showgrid: false,
                gridcolor: 'black',
                zerolinecolor: 'black'

            },

            xaxis: {
                autorange: true,
                range: [1961, 2018],
                rangeslider: { range: ['1961', '2018'] },
                type: 'date',
                shogrid: true,
                gridcolor: 'black',
                tickfont: { color: 'black' },
                zerolinecolor: 'black'


            },
            paper_bgcolor: '#fff9e9',
            plot_bgcolor: '#fff9e9'
        };


        Plotly.newPlot('agriland', agriData, agriLayout);

        var forestLayout = {
            title: `Forest Land Area`,
            showlegend: true,
            legend: {
                y: 0.5,
                x: 1.2
            },
            font: {
                color: 'black',
                family: 'Arial'
            },
            yaxis: {
                title: `Forest Land Area (ha)`,
                titlefont: { color: 'black' },
                tickfont: { color: 'black' },
                showgrid: false,
                gridcolor: 'black',
                zerolinecolor: 'black'

            },

            xaxis: {
                autorange: true,
                range: [1961, 2018],
                rangeslider: { range: ['1961', '2018'] },
                type: 'date',
                shogrid: true,
                gridcolor: 'black',
                tickfont: { color: 'black' },
                zerolinecolor: 'black'


            },
            paper_bgcolor: '#fff9e9',
            plot_bgcolor: '#fff9e9'
        };


        Plotly.newPlot('forestland', forestData, forestLayout);

        var cerealLayout = {
            title: `Cereal Crop Yield`,
            showlegend: true,
            legend: {
                y: 0.5,
                x: 1.2
            },
            font: {
                color: 'black',
                family: 'Arial'
            },
            yaxis: {
                title: `Cereal Crop Yield (kg/ha)`,
                titlefont: { color: 'black' },
                tickfont: { color: 'black' },
                showgrid: false,
                gridcolor: 'black',
                zerolinecolor: 'black'

            },

            xaxis: {
                autorange: true,
                range: [1961, 2018],
                rangeslider: { range: ['1961', '2018'] },
                type: 'date',
                shogrid: true,
                gridcolor: 'black',
                tickfont: { color: 'black' },
                zerolinecolor: 'black'


            },
            paper_bgcolor: '#fff9e9',
            plot_bgcolor: '#fff9e9'
        };


        Plotly.newPlot('cereal', cerealData, cerealLayout);

        var cashCropLayout = {
            title: `Cash Crop Yield`,
            showlegend: true,
            legend: {
                y: 0.5,
                x: 1.2
            },
            font: {
                color: 'black',
                family: 'Arial'
            },
            yaxis: {
                title: `Cash Crop Yield (kg/ha)`,
                titlefont: { color: 'black' },
                tickfont: { color: 'black' },
                showgrid: false,
                gridcolor: 'black',
                zerolinecolor: 'black'

            },

            xaxis: {
                autorange: true,
                range: [1961, 2018],
                rangeslider: { range: ['1961', '2018'] },
                type: 'date',
                shogrid: true,
                gridcolor: 'black',
                tickfont: { color: 'black' },
                zerolinecolor: 'black'


            },
            paper_bgcolor: '#fff9e9',
            plot_bgcolor: '#fff9e9'
        };


        Plotly.newPlot('cashcrop', cashCropData, cashCropLayout);

        var empLayout = {
            title: `Employment in Agriculture`,
            showlegend: true,
            legend: {
                y: 0.5,
                x: 1.2
            },
            font: {
                color: 'black',
                family: 'Arial'
            },
            yaxis: {
                title: `Employment in Agriculture (%)`,
                titlefont: { color: 'black' },
                tickfont: { color: 'black' },
                showgrid: false,
                gridcolor: 'black',
                zerolinecolor: 'black'

            },

            xaxis: {
                autorange: true,
                range: [1961, 2018],
                rangeslider: { range: ['1961', '2018'] },
                type: 'date',
                shogrid: true,
                gridcolor: 'black',
                tickfont: { color: 'black' },
                zerolinecolor: 'black'


            },
            paper_bgcolor: '#fff9e9',
            plot_bgcolor: '#fff9e9'
        };

        Plotly.newPlot('employmentag', employmentData, empLayout);

        var LiveStockLayout = {
            title: `Livestock Production`,
            showlegend: true,
            legend: {
                y: 0.5,
                x: 1.2
            },
            font: {
                color: 'black',
                family: 'Arial'
            },
            yaxis: {
                title: `Livestock Production (2004-2006 index=100)`,
                titlefont: { color: 'black' },
                tickfont: { color: 'black' },
                showgrid: false,
                gridcolor: 'black',
                zerolinecolor: 'black'

            },

            xaxis: {
                autorange: true,
                range: [1961, 2018],
                rangeslider: { range: ['1961', '2018'] },
                type: 'date',
                shogrid: true,
                gridcolor: 'black',
                tickfont: { color: 'black' },
                zerolinecolor: 'black'
            },
            paper_bgcolor: '#fff9e9',
            plot_bgcolor: '#fff9e9'
        };

        Plotly.newPlot('livestock', liveStockData, LiveStockLayout);

    })
}