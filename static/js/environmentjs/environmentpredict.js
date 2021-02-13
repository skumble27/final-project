async function environmentPredict(id) {

    console.log(id);

    await d3.csv('cleaned_data/apec_countries_data.csv').then(async function (data) {

        console.log(data);

    })
}