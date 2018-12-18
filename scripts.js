var tabHist = []; //tableau pour les histogramme
var nb2014 = 0; nb2015 = 0, nb2016 = 0, nb2017 = 0, nb2018 = 0; //Variable contenant les nombre d'accidents
var tot = []; // Tableau contenant les nombres d'accidents
var annees = []; // tableau des années

d3.csv("https://raw.githubusercontent.com/mohamedbayo14/projetJS/2dc11320b1e9374e4baf5d49cd93edb671103587/incidentsannee1.csv", 
  function(data){

/* Pie chart inspiré du code d'exemple du cours */
  function pieChart(annee){

    //Déclaration  
    const height = 600;
    const width = 1050;
    const inner = 0;
    const outer = 150;

    var a = 0, b = 0, c = 0, d = 0, e = 0, f = 0, k=0, l=0, m=0, h = 0;

    var tabValues = [];
    var tabTitles = [];
    var tabCouple = [];

    tabTitles.push('Déraillement sans engagement de la voie principale', 'Franchissement de signal',

  'Défaillance voie','Expédition sans ordre', 'Déraillement', "Talonnage d’aiguille ou bivoie",
  "Porte ouverte en ligne", 'Dérive', 'Collision contre obstacle','Autres');

    for(var i = 0; i < data.length; i++){

      console.log(data.Type);

      if (data[i].Date == annee) {

        if (data[i].Type == 'Déraillement sans engagement de la voie principale')
          a++;
        else if (data[i].Type == 'Franchissement de signal')
          b++;
        else if (data[i].Type == 'Défaillance voie')
          c++;
        else if (data[i].Type == 'Expédition sans ordre')
          d++;
        else if (data[i].Type == 'Déraillement')
          e++;
        else if (data[i].Type == "Talonnage d’aiguille ou bivoie")
          f++;
        else if (data[i].Type == "Porte ouverte en ligne")
          k++;
        else if (data[i].Type == 'Dérive')
          l++;
        else if (data[i].Type == 'Collision contre obstacle')
          m++;
        else
          h++;

      }

    }
    //tableau nbre d'occurence pour chaque incident aucours de l'année en paramètre
    tabValues.push(a, b, c, d, e, f, k, l, m, h); 

    const nbData = tabValues.length;

    /* Couples clé/valeur => incidents/nbrOccurences */

    for(var i=0; i<nbData; i++){

      tabCouple.push(

        {
          incidents: tabTitles[i],
          valeurs: tabValues[i]
        }

      );
      }


    let svg = d3.select('body')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    let g = svg
        .append('g')
        .attr('transform', `translate(${width/2}, ${height/2})`);

    //Configuration des couleurs avec hsl      
    let couleurs = [];
    let couleurs2 = [];
    let delta = 360 / nbData;

    for(let i=0; i<nbData; i++) {
        couleurs.push(d3.hsl(delta*i, 0.5, 0.6));
        couleurs2.push(d3.hsl(delta * i, 0.9, 0.6));
    }

    //Tracé du camembert  
    let camembert = function() {

        console.log(tabCouple);
        //Configuration des marges
        var margin = { top: 10, right: 20, bottom: 30, left: 50 };

        //Calcul des angles
        const sum = d3.sum(tabValues);
        const nb = tabValues.length;
        let dataAngle = [];
        let angle = 0;

        for(let i=0; i<nb; i++) {
            dataAngle.push(angle);
            angle += tabValues[i]*360/sum;
        }
        dataAngle.push(angle);

        let secteurs = g.selectAll('path')
            .data(tabValues);

        secteurs.enter()
            .append('path')
            .attr('d', function(d, i) {

        let arc = d3.svg.arc()
            .innerRadius(inner)
            .outerRadius(outer)
            .startAngle(Math.PI * 2 * dataAngle[i] / 360)
            .endAngle(Math.PI * 2 * dataAngle[i + 1] / 360);
            return arc();
        })
        .attr('fill', function(d, i) {
            return couleurs[i];
        })
        .on('mouseover', function(d, i){
            d3.select(this)
              .attr('fill', couleurs2[i]);
        })
        .on('mouseout', function (d, i) {
            d3.select(this)
              .attr('fill', couleurs[i]);
        });

      secteurs.attr('d', function (d, i) {
          let arc = d3.svg.arc()
              .innerRadius(inner)
              .outerRadius(outer)
              .startAngle(Math.PI * 2 *dataAngle[i]/360)
              .endAngle(Math.PI * 2 * dataAngle[i+1] / 360);
          return arc();
      })
      .attr('fill', function (d, i) {
        return couleurs[i];
    })

    /* Légende*/    
    var leg=svg.selectAll("g").data(tabCouple);

    leg.enter() 
       .append("g")
       .attr("class","legende")
       .attr("transform",function(d,i){
        return "translate(450,"+(100+30*i)+")";
        });
    var z = 25;

    //Petits rectangles pour la légende  
    leg.append("rect")
       .attr("x", 205 + z)
       .attr('y', 12 + z)
       .attr("width",15)
       .attr("height",15)
       .attr("fill",function (d,i){
        return couleurs[i];

        });

    //Texts associés aux rectangles
    leg.append("text")
       .attr("x", 225 + z)
       .attr('y', 22 + z)
       .attr("fill","black")
       .style("font-size","12px")
       .text(function(d,i) {
        return tabCouple[i].incidents;
        });

    g.append("text")
     .attr("x", 20)             
     .attr("y", -200)
     .attr("text-anchor", "middle")
     .style("fill", "#5a5a5a")
     .style("font-family", "Raleway")
     .style("font-weight", "300")
     .style("font-size", "20px")
     .text("Répartition des incidents par type");

    z = z + 15;
    secteurs.exit().remove();
  }
  camembert(tabValues);

}
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

        var margin = {top: 40, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

        var formatPercent = d3.format(".0%");

        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1);

        var y = d3.scale.linear()
            .domain([Math.min(nb2014, nb2015, nb2016, nb2017, nb2018), Math.max(nb2014, nb2015, nb2016, nb2017, nb2018)])
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            //.tickFormat(formatPercent);


        var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        //svg.call(tip);

        x.domain(tabHist.map(function(d) { return d.dates; }));
        y.domain([0, d3.max(tabHist, function(d) { return d.values; })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Nombre d'accidents");

        svg.selectAll(".bar")
            .data(tabHist)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.dates); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.values); })
            .attr("height", function(d) { return height - y(d.values); })
            .on('click', function(d,i){
              let color = d3.select(this).attr('fill');
              let svg = d3.select("svg");
              svg.selectAll("*").remove();
              pieChart(tabHist[i].dates);
            })
            /*.on('mouseover', tip.show)
            .on('mouseout', tip.hide)*/

        }

  histogramme(tabHist);

});
