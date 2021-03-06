var promises = []; // pour le csv

promises.push(d3.csv("https://raw.githubusercontent.com/mohamedbayo14/projetJS/2dc11320b1e9374e4baf5d49cd93edb671103587/incidentsannee1.csv"));
//console.log(Promise.all(promises));
Promise.all(promises).then(function (values) {
    const csv = values[0];
    var tabIncidents = [];
    tabIncidents.push('Déraillement sans engagement de la voie principale', 'Franchissement de signal', 'Défaillance voie','Expédition sans ordre', 'Déraillement', "Talonnage d’aiguille ou bivoie",'Autres');
    //console.log(values); 
    //console.log(values[0][5]); // Pour voir la 6ème ligne  

    /* Courbes */
    /* Début fonctions pour courbes */

    //prend en parametre des couples clé/valeur => Dates/nbre d'occurences pour un incident donné + la couleur de la courbe
    function drawChart (tableau, color){

        let couleurs = [];
        let couleurs2 = [];       
        let delta = 360 / tableau.length;

        for(let i=0; i<tableau.length; i++) {
            couleurs.push(d3.hsl(delta*i, 0.5, 0.6));
            couleurs2.push(d3.hsl(delta * i, 0.9, 0.6));
        }

        //Dimentsions 
    	var svgWidth = 600, svgHeight = 400;
   		var margin = { top: 10, right: 20, bottom: 30, left: 50 };
   		var width = svgWidth - margin.left - margin.right;
   		var height = svgHeight - margin.top - margin.bottom;

        //Selection et configuration de svg
   		var svg = d3.select('svg')
     	.attr("width", svgWidth)
     	.attr("height", svgHeight);

     	var g = svg.append("g")
   		.attr("transform", 
      	"translate(" + margin.left + "," + margin.top + ")"
   		);

        //Echelle
   		var x = d3.scaleTime().rangeRound([0, width]);
		var y = d3.scaleLinear().rangeRound([height, 0]);
		
		var line = d3.line()
   		.x(function(d) { return x(d.dates)})
   		.y(function(d) { return y(d.values)})
   		x.domain(d3.extent(tableau, function(d) { return d.dates }));
   		y.domain(d3.extent(tableau, function(d) { return d.values }));

        //Axe x: Années
   		g.append("g")
   		.attr("transform", "translate(0," + height + ")")
   		.call(d3.axisBottom(x))
   		.select(".domain")
        .attr("text-anchor", "end")
        .text("Années");
   		//.remove();

        //Axe y: Nombre d'incidents
   		g.append("g")
   		.call(d3.axisLeft(y))
   		.append("text")
   		.attr("fill", "#000")
   		.attr("transform", "rotate(-90)")
   		.attr("y", 6)
   		.attr("dy", "0.71em")
   		.attr("text-anchor", "end")
   		.text("Nombres d'incidents");

        //Courbe
   		g.append("path")
		.datum(tableau)
        .attr("class", "axis")
		.attr("fill", "none")
		.attr("stroke", "steelblue")
		.attr("stroke-linejoin", "round")
		.attr("stroke-linecap", "round")
		.attr("stroke-width", 2.5)
        .style("stroke", color)
		.attr("d", line);
        
        //Titre
        g.append("text")
        .attr("x", (width / 2))             
        .attr("y", 10 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("fill", "#5a5a5a")
        .style("font-family", "Raleway")
        .style("font-weight", "300")
        .style("font-size", "24px")
        .text("Courbe d'évolution du nombre d'incidents");
    }

    //drawChart(tabCourbe); //Tracé d'une courbe par appel de la fonction

    function courbe(incidentname, color) {

    	var tab = []; // tableau de valeurs nombres d'accidents par type d'accident
		var annees = []; // tableau des années
		var tabCourbe = []; // tableau pour les courbes
        var tabTitles = [];
		var a = 0, b = 0, c = 0, d = 0, e = 0; // variables pour les nbres d'incidents

        tabTitles.push('Déraillement sans engagement de la voie principale', 'Franchissement de signal',
        'Défaillance voie','Expédition sans ordre', 'Déraillement', "Talonnage d’aiguille ou bivoie",'Autres');

        //Calcul du nombre d'occurences pour l'incident en paramètre
    	for(var i = 0; i < values[0].length; i++){
    	//console.log(values[0][i].Type);
    	if (values[0][i].Type == incidentname) {
    		if (values[0][i].Date == 2014)
    			a++;
    		else if (values[0][i].Date == 2015)
    			b++;
    		else if (values[0][i].Date == 2016)
    			c++;
    		else if (values[0][i].Date == 2017)
    			d++;
    		else
    			e++;
    	 }
        }



        tab.push(a, b, c, d, e);//tableau nbre d'incidents
        annees.push(2014, 2015, 2016, 2017, 2018);
        //var parseDate = d3.timeParse("%Y");
        console.log(tab);

        //Couples clé/valeur => années/occurences pour l'incident en paramètre
        for(var i=0; i<5; i++){
    	   tabCourbe.push(
    		{
    		    dates: annees[i],
    			values: tab[i]
    		}
    	);
        }

        drawChart(tabCourbe, color); //Tracé de la courbe
        console.log(tabCourbe);
  }

  /* Fin fonction pour les courbes */
  //courbe('Déraillement sans engagement de la voie principale');

/* Début fonction Pie chart */

function donutChart(){

    //Constantes
    const height = 600;
    const width = 1000;
    const inner = 100;
    const outer = 150;
    
    var a = 0, b = 0, c = 0, d = 0, e = 0, f = 0, k=0, l=0, m=0, h = 0;

    var tabValues = []; //pour le nbre d'occurences
    var tabTitles = []; //pour les incidents
    var tabCouple = []; //Couples clé/valeur => incident/nbre d'occurences

    tabTitles.push('Déraillement sans engagement de la voie principale', 'Franchissement de signal',

  'Défaillance voie','Expédition sans ordre', 'Déraillement', "Talonnage d’aiguille ou bivoie",
  "Porte ouverte en ligne", 'Dérive', 'Collision contre obstacle','Autres');

    // Calcul du nbre d'occurences pour les incidents de tabTitles
    for(var i = 0; i < values[0].length; i++){

      //console.log(values[0][i].Type);
        if (values[0][i].Type == 'Déraillement sans engagement de la voie principale') 
          a++;
        else if (values[0][i].Type == 'Franchissement de signal') 
          b++;
        else if (values[0][i].Type == 'Défaillance voie') 
          c++;
        else if (values[0][i].Type== 'Expédition sans ordre')
          d++;
        else if (values[0][i].Type == 'Déraillement')
          e++;
        else if (values[0][i].Type == "Talonnage d’aiguille ou bivoie")
          f++;
        else if (values[0][i].Type == "Porte ouverte en ligne")
          k++;
        else if (values[0][i].Type == 'Dérive')
          l++;
        else if (values[0][i].Type == 'Collision contre obstacle')
          m++;
        else
          h++;
    }
     
    tabValues.push(a, b, c, d, e, f, k, l, m, h); 
    const nbData = tabValues.length;//nombre d'incidents

    /* Couples incidents/nbrOccurences */
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

    //Tableau de couleurs
    let couleurs = [];
    let couleurs2 = [];
    let delta = 360 / nbData;

    //hsl
    for(let i=0; i<nbData; i++) {
        couleurs.push(d3.hsl(delta*i, 0.5, 0.6));
        couleurs2.push(d3.hsl(delta * i, 0.9, 0.6));
    }

    //Traçage
    let camembert = function(tabCouple) {

        console.log(tabCouple);

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

         let arc = d3.arc()
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
        })

        .on('click', function(d, i) {         
            let color = d3.select(this).attr('fill');
            let svg = d3.select("svg");
            svg.selectAll("*").remove();
            courbe(tabCouple[i].incidents, couleurs[i]);
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



    var leg=svg.selectAll("g").data(tabCouple);
    leg.enter() 
        .append("g")
        .attr("class","legende")
        .attr("transform",function(d,i){
        return "translate(450,"+(100+30*i)+")";

        });

    var z = 15;

    for (var j = 0; j < nbData; j++) {

    leg.append("rect")
        .attr("x", 205 + z)
        .attr('y', 12 + z)
        .attr("width",15)
        .attr("height",15)
        .attr("fill",function (d,i){
    return couleurs[j]; 
  });

  leg.append("text")
    .attr("x", 225 + z)
    .attr('y', 22 + z)
    .attr("fill","black")
    .style("font-size","12px")
    .text(function(d,i) {
        return tabCouple[j].incidents;
    });

    leg.append("text")
     .attr("x", 20)             
     .attr("y", -200)
     .attr("text-anchor", "middle")
     .style("fill", "#5a5a5a")
     .style("font-family", "Raleway")
     .style("font-weight", "300")
     .style("font-size", "20px")
     .text("Répartition du nombre total d'incidents par type");

    z = z + 15;}
    secteurs.exit().remove();
  }
  camembert(tabCouple);
}
donutChart();

});
	