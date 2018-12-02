var promises = []; // pour le csv

promises.push(d3.csv("https://raw.githubusercontent.com/mohamedbayo14/projetJS/2dc11320b1e9374e4baf5d49cd93edb671103587/incidentsannee1.csv"));
//console.log(Promise.all(promises));
Promise.all(promises).then(function (values) {
    const csv = values[0];
    //console.log(values); 
    //console.log(values[0][5]); // Pour voir la 6ème ligne  

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

    //drawChart(tabCourbe); //Tracé d'une courbe par appel de la fonction

    function courbe(incidentname) {

    	var tab = []; // tableau de valeurs nombres d'accidents par type d'accident
		var annees = []; // tableau des années
		var tabCourbe = []; // tableau pour les courbes
		var a = 0, b = 0, c = 0, d = 0, e = 0;

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
    console.log(tabCourbe);
  }
  //courbe('Franchissement de signal');

/*  	function myFunction() {
    document.getElementById("demo").innerHTML = "Hello World";
}*/

/* Pie chart inspiré du code d'exemple du cours */

	function pieChart(annee){
    	const height = 600;
		const width = 600;
		
		const inner = 0;
		const outer = 150;

		var a = 0, b = 0, c = 0, d = 0, e = 0, f = 0, h = 0;

		var tabValues = [];
		var tabTitles = [];
		var tabCouple = [];

		tabTitles.push('Déraillement sans engagement de la voie principale', 'Franchissement de signal',
	'Expédition sans ordre', 'Expédition sans ordre', 'Déraillement', "Talonnage d’aiguille ou bivoie",'Autres');

		for(var i = 0; i < values[0].length; i++){
    	//console.log(values[0][i].Type);
    	if (values[0][i].Date == annee) {
    		if (values[0][i].Type == 'Déraillement sans engagement de la voie principale') {
    			a++;
    		}
    		else if (values[0][i].Type == 'Franchissement de signal') {
    			b++;
    		}
    		else if (values[0][i].Type == 'Défaillance voie') {
    			c++;
    		}
    		else if (values[0][i].Type == 'Expédition sans ordre') {
    			d++;
    		}
    		else if (values[0][i].Type == 'Déraillement') {
    			e++;
    		}
    		else if (values[0][i].Type == "Talonnage d’aiguille ou bivoie") {
    			f++;
    		}
    		else
    			h++;
    	}
    }

    	tabValues.push(a, b, c, d, e, f, h); 
		const nbData = tabValues.length;

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

		let couleurs = [];
		let couleurs2 = [];
		let delta = 360 / nbData;
		for(let i=0; i<nbData; i++) {
    		couleurs.push(d3.hsl(delta*i, 0.5, 0.6));
    		couleurs2.push(d3.hsl(delta * i, 0.9, 0.6));
		}

		let camembert = function() {
    		console.log(tabCouple);
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
            
            //courbe('Franchissement de signal');
        });

        var leg=svg.selectAll("g.legende").data(tabValues)
leg.enter()
    .append("g")
    .attr("class","legende")
    .attr("transform",function(d,i){
        return "translate(450,"+(100+30*i)+")";
        });

    	secteurs.attr('d', function (d, i) {
        	let arc = d3.arc()
            	.innerRadius(inner)
            	.outerRadius(outer)
            	.startAngle(Math.PI * 2 *dataAngle[i]/360)
            	.endAngle(Math.PI * 2 * dataAngle[i+1] / 360);
        	return arc();
    	})
    	.attr('fill', function (d, i) {
        return couleurs[i];
    })



    // Exit
        secteurs.exit().remove();
	}


	camembert(tabValues);
    }
    pieChart(2014);
});
	