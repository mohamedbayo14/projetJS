// https://d3js.org v5.7.0 Copyright 2018 Mike Bostock

var promises = []; // pour le csv
var tab = []; // tableau de valeurs nombres d'accidents par type d'accident
var annees = []; // tableau des années
var tabCourbe = []; // tableau pour les courbes
var tabHist = []; //tableau pour les histogramme
var a = 0, b = 0, c = 0, d = 0, e = 0;
var nb2014 = 0; nb2015 = 0, nb2016 = 0, nb2017 = 0; //Variable contenant les nombre d'accidents
var tot[]; // Tableau contenant les nombres d'accidents





promises.push(d3.csv("https://raw.githubusercontent.com/mohamedbayo14/projetJS/2dc11320b1e9374e4baf5d49cd93edb671103587/incidentsannee1.csv"));
Promise.all(promises).then(function (values) {
    const csv = values[0];
    //console.log(values[0]); 
    //console.log(values[0][5]); // Pour voir la 6ème ligne  

    for(var i = 0; i < values[0].length; i++){
    	//console.log(values[0][i].Type);
    	if (values[0][i].Type == "Déraillement sans engagement de la voie principale") {
    		if (values[0][i].Date == 2014) {
    			a++;
    		}
    		else if (values[0][i].Date == 2015) {
    			b++;
    		}
    		else if (values[0][i].Date == 2016) {
    			c++;
    		}
    		else if (values[0][i].Date == 2017) {
    			d++;
    		}
    		else
    			e++;
    	}
    }

    //Comptage du nombre total d'accidents chaque année
    for ( var i = 0; i < values[0].length; i++ ){

      if ( values[0][i].Date == 2014 ){
        nb2014++;
      }

      if ( values[0][i].Date == 2015 ){
        nb2015++;
      }

      if ( values[0][i].Date == 2016 ){
        nb2016++;
      }

      if ( values[0][i].Date == 2017 ){
        nb2017++;
      }

    }
    tot.push(nb2014, nb2015, nb2016, nb2017);

    //Mise en place des bordure
    var margin = {top: 80, right: 80, bottom: 80, left: 80},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    //Définition abscisses et des ordonnees

    var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

    var y0 = d3.scale.linear().domain([300, 1100]).range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("class", "graph")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    //console.log(a+","+b+","+c+","+d+","+e);
    tab.push(a, b, c, d, e);
    annees.push(2014, 2015, 2016, 2017, 2018);
    //console.log(tab[2]);

    for(var i=0; i<5; i++){
    	tabCourbe.push(
    		{
    			dates: annees[i],
    			values: tab[i]
    		}
    	);
    }	
    //console.log(tabCourbe);

    /* Courbes */
    /* fonction pour courbes */
    function drawChart (tableau){
    	var svgWidth = 600, svgHeight = 400;
   		var margin = { top: 20, right: 20, bottom: 30, left: 50 };
   		var width = svgWidth - margin.left - margin.right;
   		var height = svgHeight - margin.top - margin.bottom;
   		var svg = d3.select('svg')
     	.attr("width", svgWidth)
     	.attr("height", svgHeight);

     	var g = svg.append("g")
   		.attr("transform", 
      	"translate(" + margin.left + "," + margin.top + ")"
   		);

   		var x = d3.scaleTime().rangeRound([0, width]);
		var y = d3.scaleLinear().rangeRound([height, 0]);

		var line = d3.line()
   		.x(function(d) { return x(d.dates)})
   		.y(function(d) { return y(d.values)})
   		x.domain(d3.extent(tableau, function(d) { return d.dates }));
   		y.domain(d3.extent(tableau, function(d) { return d.values }));

   		g.append("g")
   		.attr("transform", "translate(0," + height + ")")
   		.call(d3.axisBottom(x))
   		.select(".domain")
   		.remove();

   		g.append("g")
   		.call(d3.axisLeft(y))
   		.append("text")
   		.attr("fill", "#000")
   		.attr("transform", "rotate(-90)")
   		.attr("y", 6)
   		.attr("dy", "0.71em")
   		.attr("text-anchor", "end")
   		.text("Nombres d'incidents");

   		g.append("path")
		.datum(tableau)
		.attr("fill", "none")
		.attr("stroke", "steelblue")
		.attr("stroke-linejoin", "round")
		.attr("stroke-linecap", "round")
		.attr("stroke-width", 1.5)
		.attr("d", line);
    }

    drawChart(tabCourbe); //Tracé d'une courbe par appel de la fonction

    /*function classe(evt, incidentname) {
    	for(var i = 0; i < values[0].length; i++){
    	//console.log(values[0][i].Type);
    	if (values[0][i].Type == incidentname) {
    		if (values[0][i].Date == 2014) {
    			a++;
    		}
    		else if (values[0][i].Date == 2015) {
    			b++;
    		}
    		else if (values[0][i].Date == 2016) {
    			c++;
    		}
    		else if (values[0][i].Date == 2017) {
    			d++;
    		}
    		else
    			e++;
    	}
    }
    tab.push(a, b, c, d, e);
    annees.push(2014, 2015, 2016, 2017, 2018);
    console.log(tab);

    for(var i=0; i<5; i++){
    	tabCourbe.push(
    		{
    			dates: annees[i],
    			values: tab[i]
    		}
    	);
    }
    drawChart(tabCourbe);	
  }*/
});
	