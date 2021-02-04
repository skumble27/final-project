async function financeUnPackData(id) {
    // Checking the ID of the country after clicking the Leaflet Map

    console.log(id);

    await d3.json('http://127.0.0.1:5000/compileddata').then(function (data) {

        // Checking to see if the data has loaded
        // console.log(data);

        // Filtering by country
        let countryFilter = data.filter(nation => nation.country === id);
        console.log(countryFilter);

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
        })

        // console.log(`${broadMoneyGrowth}....${domesticCompanies}....${foreignInvestment}....${inflation}.....${stockTrade}....${totalReserves}`);

        // Creating a trace for number all y variables
        var broadMoneyTrace = {
            type: 'scatter',
            mode: 'lines',
            name: `Broad Money Growth`,
            x: year,
            y: broadMoneyGrowth,
            line: { color: '#87fffd' }
        }

        var domesticCompanyTrace = {
            type: 'scatter',
            mode: 'lines',
            name: `Number of Domestic Listed Companies`,
            x: year,
            y: domesticCompanies,
            line: { color: '#87fffd' }
        }

        var foreignInvestTrace = {
            type: 'scatter',
            mode: 'lines',
            name: `Foreign Investment`,
            x: year,
            y: foreignInvestment,
            line: { color: '#87fffd' }
        }

        var inflationTrace = {
            type: 'scatter',
            mode: 'lines',
            name: `Inflation`,
            x: year,
            y: inflation,
            line: { color: '#87fffd' }
        }

        var stockTradeTrace = {
            type: 'scatter',
            mode: 'lines',
            name: `Stock Trading`,
            x: year,
            y: stockTrade,
            line: { color: '#87fffd' }
        }

        var totalReservesTrace = {
            type: 'scatter',
            mode: 'lines',
            name: `Total Financial Reserves`,
            x: year,
            y: totalReserves,
            line: { color: '#87fffd' }
        }
        var gdpTrace = {
            type: 'scatter',
            mode: 'lines',
            name: `Gross Domestic Product`,
            x: year,
            y: gdp,
            line: { color: '#87fffd' }
        }

        var broadMoneyData = [broadMoneyTrace];
        var domesticData = [domesticCompanyTrace];
        var foreignInvestData = [foreignInvestTrace];
        var inflationData = [inflationTrace];
        var stocktradeData = [stockTradeTrace];
        var totalreservesData = [totalReservesTrace];
        var gdpData = [gdpTrace];

        var broadMoneyLayout = {
            title: `Broad Money Growth`,
            showlegend: true,
            legend: {
                y: 0.5,
                x: 1.2
            },
            font: {
                color: 'white',
                family: 'Arial'
            },
            yaxis: {
                title: `Broad Money Growth (%)`,
                titlefont: { color: 'white' },
                tickfont: { color: 'white' },
                showgrid: false,
                gridcolor: 'white',
                zerolinecolor: 'white'

            },

            xaxis: {
                autorange: true,
                range: [1961, 2018],
                rangeslider: { range: ['1961', '2018'] },
                type: 'date',
                shogrid: true,
                gridcolor: 'white',
                tickfont: { color: 'white' },
                zerolinecolor: 'white'


            },
            paper_bgcolor: 'black',
            plot_bgcolor: 'black'
        };
        Plotly.newPlot('broadmoney', broadMoneyData, broadMoneyLayout);

        var domesticCompanyLayout = {
            title: `Number of Domestic Companies`,
            showlegend: true,
            legend: {
                y: 0.5,
                x: 1.2
            },
            font: {
                color: 'white',
                family: 'Arial'
            },
            yaxis: {
                title: `Number of Domestic Companies`,
                titlefont: { color: 'white' },
                tickfont: { color: 'white' },
                showgrid: false,
                gridcolor: 'white',
                zerolinecolor: 'white'

            },

            xaxis: {
                autorange: true,
                range: [1961, 2018],
                rangeslider: { range: ['1961', '2018'] },
                type: 'date',
                shogrid: true,
                gridcolor: 'white',
                tickfont: { color: 'white' },
                zerolinecolor: 'white'


            },
            paper_bgcolor: 'black',
            plot_bgcolor: 'black'
        };
        Plotly.newPlot('domesticcompanies', domesticData, domesticCompanyLayout);

        var gdpLayout = {
            title: `Gross Domestic Product`,
            showlegend: true,
            legend: {
                y: 0.5,
                x: 1.2
            },
            font: {
                color: 'white',
                family: 'Arial'
            },
            yaxis: {
                title: `Gross Domestic Product`,
                titlefont: { color: 'white' },
                tickfont: { color: 'white' },
                showgrid: false,
                gridcolor: 'white',
                zerolinecolor: 'white'

            },

            xaxis: {
                autorange: true,
                range: [1961, 2018],
                rangeslider: { range: ['1961', '2018'] },
                type: 'date',
                shogrid: true,
                gridcolor: 'white',
                tickfont: { color: 'white' },
                zerolinecolor: 'white'


            },
            paper_bgcolor: 'black',
            plot_bgcolor: 'black'
        };
        
        Plotly.newPlot('gdp', gdpData, gdpLayout);


        var foreignInvestLayout = {
            title: `Foreign Investment`,
            showlegend: true,
            legend: {
                y: 0.5,
                x: 1.2
            },
            font: {
                color: 'white',
                family: 'Arial'
            },
            yaxis: {
                title: `Foreign Investment (% GDP)`,
                titlefont: { color: 'white' },
                tickfont: { color: 'white' },
                showgrid: false,
                gridcolor: 'white',
                zerolinecolor: 'white'

            },

            xaxis: {
                autorange: true,
                range: [1961, 2018],
                rangeslider: { range: ['1961', '2018'] },
                type: 'date',
                shogrid: true,
                gridcolor: 'white',
                tickfont: { color: 'white' },
                zerolinecolor: 'white'


            },
            paper_bgcolor: 'black',
            plot_bgcolor: 'black'
        };
        Plotly.newPlot('foreigninvestment', foreignInvestData, foreignInvestLayout);

        var inflationLayout = {
            title: `Inlfation`,
            showlegend: true,
            legend: {
                y: 0.5,
                x: 1.2
            },
            font: {
                color: 'white',
                family: 'Arial'
            },
            yaxis: {
                title: `Inflation  (%)`,
                titlefont: { color: 'white' },
                tickfont: { color: 'white' },
                showgrid: false,
                gridcolor: 'white',
                zerolinecolor: 'white'

            },

            xaxis: {
                autorange: true,
                range: [1961, 2018],
                rangeslider: { range: ['1961', '2018'] },
                type: 'date',
                shogrid: true,
                gridcolor: 'white',
                tickfont: { color: 'white' },
                zerolinecolor: 'white'


            },
            paper_bgcolor: 'black',
            plot_bgcolor: 'black'
        };
        Plotly.newPlot('inflation', inflationData, inflationLayout);

        var stocksLayout = {
            title: `Stocks Traded`,
            showlegend: true,
            legend: {
                y: 0.5,
                x: 1.2
            },
            font: {
                color: 'white',
                family: 'Arial'
            },
            yaxis: {
                title: `Stocks Traded  (% of GDP)`,
                titlefont: { color: 'white' },
                tickfont: { color: 'white' },
                showgrid: false,
                gridcolor: 'white',
                zerolinecolor: 'white'

            },

            xaxis: {
                autorange: true,
                range: [1961, 2018],
                rangeslider: { range: ['1961', '2018'] },
                type: 'date',
                shogrid: true,
                gridcolor: 'white',
                tickfont: { color: 'white' },
                zerolinecolor: 'white'


            },
            paper_bgcolor: 'black',
            plot_bgcolor: 'black'
        };
        Plotly.newPlot('stockstraded', stocktradeData, stocksLayout);

        var totalreservesLayout = {
            title: `Total Reserves`,
            showlegend: true,
            legend: {
                y: 0.5,
                x: 1.2
            },
            font: {
                color: 'white',
                family: 'Arial'
            },
            yaxis: {
                title: `Total Reserves (current USD)`,
                titlefont: { color: 'white' },
                tickfont: { color: 'white' },
                showgrid: false,
                gridcolor: 'white',
                zerolinecolor: 'white'

            },

            xaxis: {
                autorange: true,
                range: [1961, 2018],
                rangeslider: { range: ['1961', '2018'] },
                type: 'date',
                shogrid: true,
                gridcolor: 'white',
                tickfont: { color: 'white' },
                zerolinecolor: 'white'
            },
            paper_bgcolor: 'black',
            plot_bgcolor: 'black'
        };
        Plotly.newPlot('totalreserves', totalreservesData, totalreservesLayout);

        

        







    })


}