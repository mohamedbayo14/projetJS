// https://d3js.org v5.7.0 Copyright 2018 Mike Bostock




var promises = [];
promises.push(d3.csv("https://raw.githubusercontent.com/mohamedbayo14/projetJS/2dc11320b1e9374e4baf5d49cd93edb671103587/incidentsannee1.csv"));
Promise.all(promises).then(function (values) {
    const csv = values[1];
    //console.log(values[0]); 
    console.log(values[0][5]); /* Pour voir la 6ème ligne */ 
});
