async function agriDataUnpack(id){
    console.log(id);

    await d3.json('http://127.0.0.1:5000/agriculture').then(function(data){

    console.log(data);


    })
}