// https://d3js.org v5.7.0 Copyright 2018 Mike Bostock

var promises = []; // pour le csv
var tab = []; // tableau de valeurs nombres d'accidents par type d'accident
var annees = []; // tableau des années
var tabCourbe = []; // tableau pour les courbes
var tabHist = []; //tableau pour les histogramme
var a = 0, b = 0, c = 0, d = 0, e = 0;
var nb2014 = 0; nb2015 = 0, nb2016 = 0, nb2017 = 0, nb2018 = 0; //Variable contenant les nombre d'accidents
var tot = []; // Tableau contenant les nombres d'accidents
var body = d3.select("body");




//promises.push(d3.csv("https://raw.githubusercontent.com/mohamedbayo14/projetJS/2dc11320b1e9374e4baf5d49cd93edb671103587/incidentsannee1.csv"));

d3.csv("https://raw.githubusercontent.com/mohamedbayo14/projetJS/2dc11320b1e9374e4baf5d49cd93edb671103587/incidentsannee1.csv", 
  function(data){


  console.log(data);

    data.forEach(function(d){

      if ( d.Date == 2014 ){
        nb2014++;
      }

      if ( d.Date == 2015 ){
        nb2015++;
      }

      if ( d.Date == 2016 ){
        nb2016++;
      }

      if ( d.Date == 2017 ){
        nb2017++;
      }
      if ( d.Date == 2018 ){
        nb2018++;
      }
    });

  /*console.log(nb2014);
  console.log(nb2015);
  console.log(nb2016);
  console.log(nb2017);*/


    tot.push(nb2014, nb2015, nb2016, nb2017, nb2018);
    annees.push(2014, 2015, 2016, 2017, 2018);
    console.log(tot);
    for(var i=0; i<5; i++){
      tabHist.push(
        {
          dates: annees[i],
          values: tot[i]
        }
      );
    }
    console.log(tabHist);

  function histogramme(tabHist){

    //Mise en place des bordure
    var margin = {top: 80, right: 80, bottom: 80, left: 80},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    //Définition abscisses et des ordonnees

    var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

    var y0 = d3.scale.linear().domain([Math.min(nb2014, nb2015, nb2016, nb2017, nb2018), Math.max(nb2014, nb2015, nb2016, nb2017, nb2018)]).range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxisLeft = d3.svg.axis().scale(y0).ticks(4).orient("left");

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("class", "graph")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  x.domain(tabHist.map(function(d) { return d.dates; }));
  y0.domain([0, d3.max(tabHist, function(d) { return d.values; })]);


    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis axisLeft")
        .attr("transform", "translate(0,0)")
        .call(yAxisLeft)
      .append("text")
        .attr("y", 6)
        .attr("dy", "-2em")
        .style("text-anchor", "end")
        .style("text-anchor", "end")
        .text("Nombre d'accidents");

    bars = svg.selectAll(".bar").data(tabHist).enter();


    bars.append("rect")
        .attr("class", "bar1")
        .attr("x", function(d) { return x(d.dates); })
        .attr("width", x.rangeBand()/2)
        .attr("y", function(d) { return y0(d.values); })
          .attr("height", function(d,i,j) { return height - y0(d.values); });

  }

  histogramme(tabHist);

});