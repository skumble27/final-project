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


