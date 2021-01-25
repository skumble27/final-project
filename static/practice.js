const k = [1960,	1961,	1962,	1963,	1964,	1965,	1966,	1967,	1968,	1969,	1970,	1971,	1972,	1973,	1974,	1975,	1976,	1977,	1978,	1979,	1980,	1981,	1982,	1983,	1984,	1985,	1986,	1987,	1988,	1989,	1990,	1991,	1992,	1993,	1994,	1995,	1996,	1997,	1998,	1999,	2000,	2001,	2002,	2003,	2004,	2005,	2006,	2007,	2008,	2009,	2010,	2011,	2012,	2013,	2014,	2015,	2016,	2017,	2018,	2019,	2020];
const l = [8996973,	9169410,	9351441,	9543205,	9744781,	9956320,	10174836,	10399926,	10637063,	10893776,	11173642,	11475445,	11791215,	12108963,	12412950,	12689160,	12943093,	13171306,	13341198,	13411056,	13356511,	13171673,	12882528,	12537730,	12204292,	11938208,	11736179,	11604534,	11618005,	11868877,	12412308,	13299017,	14485546,	15816603,	17075727,	18110657,	18853437,	19357126,	19737765,	20170844,	20779953,	21606988,	22600770,	23680871,	24726684,	25654277,	26433049,	27100536,	27722276,	28394813,	29185507,	30117413,	31161376,	32269589,	33370794,	34413603,	35383128,	36296400,	37172386,	38041754,	0];

// console.log(Math.min.apply(Math, k));

// let min = Math.min.apply(Math,k);
// let max = Math.max.apply(Math, k);

// let diff = max - min;
// console.log(diff);


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

// let t = MinMaxScaler(k);
// console.log(t);