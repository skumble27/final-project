function MinMaxScaler(array) {
    let min = Math.min.apply(Math, array);
    let max = Math.max.apply(Math, array);
    let scaledArray = [];

    for (var i = 0; i < array.length; i++) {

        let scaled = (array[i] - min) / (max - min);
        scaledArray.push(scaled);
    }
    return scaledArray;

}

function yearScale(array) {

    let scaledArray = []

    for (var i = 0; i < array.length; i++) {
        let scaled = (array[i] - 1960) / (2020 - 1960);
        scaledArray.push(scaled);
    }
    return scaledArray;
}

function conversion(max, min, array) {

    let scaledArray = []

    for (var i = 0; i < array.length; i++) {
        let scaled = (array[i] * (max - min)) + (min);
        scaledArray.push(scaled);
    }
    return scaledArray;
}

function maxArray(array) {
    let max = Math.max.apply(Math, array);
    return max;
}

function minArray(array) {
    let min = Math.min.apply(Math, array);
    return min;
}

function PerCentErrordif(array, arrayI) {
    let percentdiff = [];
    array.forEach((element, elementI) => {

        let num2 = arrayI[elementI];

        let diff = ((element - num2) / (element)) * 100;

        percentdiff.push(Math.abs(diff));

    });

    return percentdiff;
}

function mean(array) {

    var total = 0;
    for (var i = 0; i < array.length; i++) {
        total += array[i];
    }
    var meanValue = total / array.length;

    return meanValue.toFixed(4);

}

function average(numbers) {
    return _.reduce(numbers, (a, b) => a + b, 0) / (numbers.length || 1);
  }


 
function SimpleMovingAverage(array,window){

    var SAM = [];
    for (var i=1; i <array.length -1; i++){
        var mean = (array[i] + array[i-1] + array[i+1])/window;
        SAM.push(mean);

    }
    return SAM;

};

function MeanSquaredError(array, arrayI) {
    let percentdiff = [];
    array.forEach((element, elementI) => {

        let num2 = arrayI[elementI];

        let diff = Math.pow((element-num2),2)

        percentdiff.push(diff);

    });

    return percentdiff;
}