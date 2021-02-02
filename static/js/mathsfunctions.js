function MinMaxScaler(array){
    let min = Math.min.apply(Math,array);
    let max = Math.max.apply(Math,array);
    let scaledArray = [];

    for (var i=0; i < array.length; i++){
        
        let scaled = (array[i] - min)/(max - min);
        scaledArray.push(scaled);
    }
    return scaledArray;
    
}

function yearScale(array){

    let scaledArray = []

    for (var i=0; i< array.length; i++){
        let scaled = (array[i] - 1960)/(2020 - 1960);
        scaledArray.push(scaled);
    }
    return scaledArray;
}

function conversion(max, min, array){

    let scaledArray = []

    for (var i=0; i< array.length; i++){
        let scaled = (array[i] * (max-min))+(min);
        scaledArray.push(scaled);
    }
    return scaledArray;
}

function maxArray(array){
    let max = Math.max.apply(Math, array);
    return max;
}

function minArray(array){
    let min = Math.min.apply(Math, array);
    return min;
}
