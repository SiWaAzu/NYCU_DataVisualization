

var artistName = 'Gen Hoshino';
var songName = 'Comedy';


const csvSrc = "http://vis.lab.djosix.com:2020/data/spotify_tracks.csv";
var margin = {top:50, bottom:60, right:50, left: 50};
var width = 500-margin.left-margin.right;
var height = 400-margin.bottom-margin.top;
var barPadding = 0.2;

var color = d3.scaleOrdinal()
        .domain(['Adagio','Andante','Moderato','Allegro','Presto','Prestissimo'])
        .range(['#DAF7A6','#FFC300','#FF5733','#C70039','#900C3F','#581845']);

var color2 = d3.scaleOrdinal()
        .domain(['0~19','20~39','40~59','60~79','80~100'])
        .range(['#D5F5E3','#82E0AA','#2ECC71','#1D8348','#145A32']);

var color3 = d3.scaleOrdinal(d3.schemeCategory20);

var tempoCnt = {'Adagio':0, 'Andante':0, 'Moderato':0, 'Allegro':0, 'Presto':0, 'Prestissimo':0};
var popularityCnt = {'level1':0, 'level2':0, 'level3':0, 'level4':0, 'level5':0};
var genreCnt ={};
var genreKey = [];
var tempoData = [];
var popularityData = [];
var genreData = [];

// graph type: true: bar, false pie
var graphType = true;

function overAllInfo(){
    d3.select("#tempo").select('svg').remove();
    d3.select('#popularity').select('svg').remove();
    d3.select('#genre').select('svg').remove();

    tempoCnt = {'Adagio':0, 'Andante':0, 'Moderato':0, 'Allegro':0, 'Presto':0, 'Prestissimo':0};
    popularityCnt = {'level1':0, 'level2':0, 'level3':0, 'level4':0, 'level5':0};
    tempoData = [];
    popularityData = [];
    genreData = [];
    genreCnt ={};
    genreKey = [];

    d3.csv(csvSrc, function(data){
        data.forEach(element=>{
            if(element.artists == artistName){
                if(Object.keys(genreCnt).some(key => key === element.track_genre)){
                    genreCnt[element.track_genre]++;
                    
                    
                }
                else{
                    genreCnt[element.track_genre] =1;
                    genreKey.push(element.track_genre);
                }
                //===============
                // tempoCnt
                if (element.tempo < 76) tempoCnt['Adagio']++;
                else if (element.tempo <108) tempoCnt['Andante']++;
                else if (element.tempo <120) tempoCnt['Moderato']++;
                else if (element.tempo <168) tempoCnt['Allegro']++;
                else if (element.tempo <200) tempoCnt['Presto']++;
                else if (element.tempo >=200) tempoCnt['Prestissimo']++;
                //popularity
                if (element.popularity <20) popularityCnt['level1']++;
                else if (element.popularity <40) popularityCnt['level2']++;
                else if (element.popularity <60) popularityCnt['level3']++;
                else if (element.popularity <80) popularityCnt['level4']++;
                else if (element.popularity <=100) popularityCnt['level5']++;

            }
        })
        
        tempoData = [
            {tempoType:'Adagio', count:tempoCnt['Adagio']},
            {tempoType:'Andante', count:tempoCnt['Andante']},
            {tempoType:'Moderato', count:tempoCnt['Moderato']},
            {tempoType:'Allegro', count:tempoCnt['Allegro']},
            {tempoType:'Presto', count:tempoCnt['Presto']},
            {tempoType:'Prestissimo', count:tempoCnt['Prestissimo']}
        ]
        
        popularityData =[
            {level:'0~19', count:popularityCnt['level1']},
            {level:'20~39', count:popularityCnt['level2']},
            {level:'40~59', count:popularityCnt['level3']},
            {level:'60~79', count:popularityCnt['level4']},
            {level:'80~100', count:popularityCnt['level5']}
        ]

        for (i=0;i<genreKey.length;i++){
            genreData.push({genre: genreKey[i], count:genreCnt[genreKey[i]]});
        }

        console.log(genreData);


        if (graphType){
            //bar
            //tempo data
            var x = d3.scaleBand()
                .range([0, width])
                .padding(0.1);
            var y = d3.scaleLinear()
                .range([height, 0]);
            
            var svg = d3.select("#tempo").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform", 
                      "translate(" + margin.left + "," + margin.top + ")");
            x.domain(tempoData.map(function(d) { return d.tempoType; }));
            y.domain([0, d3.max(tempoData, function(d) { return d.count; })]);

            svg.selectAll(".bar")
            .data(tempoData)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.tempoType); })
            .attr("width", x.bandwidth())
            .attr("y", function(d) { return y(d.count); })
            .attr("height", function(d) { return height - y(d.count); })
            .style('fill', function(d){return color(d.tempoType)});

            svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

            svg.append("g")
            .call(d3.axisLeft(y));

            svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width)
            .attr("y", height+30)
            .text("tempo");

            svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", 6)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text("songs");
            //==== popularity
            var svg = d3.select("#popularity").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", 
                "translate(" + margin.left + "," + margin.top + ")");
            x.domain(popularityData.map(function(d) { return d.level; }));
            y.domain([0, d3.max(popularityData, function(d) { return d.count; })]);
            
            svg.selectAll(".bar")
            .data(popularityData)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.level); })
            .attr("width", x.bandwidth())
            .attr("y", function(d) { return y(d.count); })
            .attr("height", function(d) { return height - y(d.count); })
            .style('fill', function(d){return color2(d.level)});
            svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

            svg.append("g")
            .call(d3.axisLeft(y));

            svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width)
            .attr("y", height+30)
            .text("popularity");

            svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", 6)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text("songs");
            //==========genre
            var svg = d3.select("#genre").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", 
                "translate(" + margin.left + "," + margin.top + ")");
            x.domain(genreData.map(function(d) { return d.genre; }));
            y.domain([0, d3.max(genreData, function(d) { return d.count; })]);
            
            svg.selectAll(".bar")
            .data(genreData)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.genre); })
            .attr("width", x.bandwidth())
            .attr("y", function(d) { return y(d.count); })
            .attr("height", function(d) { return height - y(d.count); })
            .style('fill', function(d){return color3(d.genre)});
            svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

            svg.append("g")
            .call(d3.axisLeft(y));

            svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width)
            .attr("y", height+30)
            .text("genre");

            svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", 6)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text("songs");


        }
        else{

            var radius = Math.min(width, height) / 2;
            var donutWidth = 75;
            var legendRectSize = 18;
            var legendSpacing = 4;

            var svg = d3.select('#tempo')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');
  
            var arc = d3.arc()
            .innerRadius(radius - donutWidth)
            .outerRadius(radius);
  
            var pie = d3.pie()
            .value(function(d) { return d.count; })
            .sort(null);
  
            var path = svg.selectAll('path')
            .data(pie(tempoData))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', function(d, i) { 
              return color(d.data.tempoType); 
            });
  
            var legend = svg.selectAll('.legend')
            .data(color.domain())
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', function(d, i) {
                var height = legendRectSize + legendSpacing;
                var offset =  height * color.domain().length / 2;
                var horz = -2 * legendRectSize;
                var vert = i * height - offset;
                return 'translate(' + horz + ',' + vert + ')';
            });
  
            legend.append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)                                   
            .style('fill', color)
            .style('stroke', color);
          
            legend.append('text')
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .text(function(d) { return d; });
            //===================================
            var svg = d3.select('#popularity')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

            var arc = d3.arc()
            .innerRadius(radius - donutWidth)
            .outerRadius(radius);

            var pie = d3.pie()
            .value(function(d) { return d.count; })
            .sort(null);

            var path = svg.selectAll('path')
            .data(pie(popularityData))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', function(d, i) { 
                return color2(d.data.level); 
            });

            var legend = svg.selectAll('.legend')
            .data(color2.domain())
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', function(d, i) {
                var height = legendRectSize + legendSpacing;
                var offset =  height * color2.domain().length / 2;
                var horz = -2 * legendRectSize;
                var vert = i * height - offset;
                return 'translate(' + horz + ',' + vert + ')';
            });

            legend.append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)                                   
            .style('fill', color2)
            .style('stroke', color2);
        
            legend.append('text')
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .text(function(d) { return d; });
            //========================
            var svg = d3.select('#genre')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + (width / 2) + 
            ',' + (height / 2) + ')');

            var arc = d3.arc()
            .innerRadius(radius - donutWidth)
            .outerRadius(radius);

            var pie = d3.pie()
            .value(function(d) { return d.count; })
            .sort(null);

            var path = svg.selectAll('path')
            .data(pie(genreData))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', function(d, i) { 
                return color3(d.data.genre); 
            });

            var legend = svg.selectAll('.legend')
            .data(color3.domain())
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', function(d, i) {
                var height = legendRectSize + legendSpacing;
                var offset =  height * color3.domain().length / 2;
                var horz = -2 * legendRectSize;
                var vert = i * height - offset;
                return 'translate(' + horz + ',' + vert + ')';
            });

            legend.append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)                                   
            .style('fill', color3)
            .style('stroke', color3);
        
            legend.append('text')
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .text(function(d) { return d; });

        }
    })

}

/////////////////////////////////////////////////////////
/////////////// The Radar Chart Function ////////////////
/// mthh - 2017 /////////////////////////////////////////
// Inspired by the code of alangrafu and Nadieh Bremer //
// (VisualCinnamon.com) and modified for d3 v4 //////////
/////////////////////////////////////////////////////////

const max = Math.max;
const sin = Math.sin;
const cos = Math.cos;
const HALF_PI = Math.PI / 2;

const RadarChart = function RadarChart(parent_selector, data, options) {
	//Wraps SVG text - Taken from http://bl.ocks.org/mbostock/7555321
    d3.select("#chart").select('svg').remove();
	const wrap = (text, width) => {
	  text.each(function() {
			var text = d3.select(this),
				words = text.text().split(/\s+/).reverse(),
				word,
				line = [],
				lineNumber = 0,
				lineHeight = 1.4, // ems
				y = text.attr("y"),
				x = text.attr("x"),
				dy = parseFloat(text.attr("dy")),
				tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

			while (word = words.pop()) {
			  line.push(word);
			  tspan.text(line.join(" "));
			  if (tspan.node().getComputedTextLength() > width) {
					line.pop();
					tspan.text(line.join(" "));
					line = [word];
					tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
			  }
			}
	  });
	}//wrap

	const cfg = {
	 w: 600,				//Width of the circle
	 h: 600,				//Height of the circle
	 margin: {top: 20, right: 20, bottom: 20, left: 20}, //The margins of the SVG
	 levels: 3,				//How many levels or inner circles should there be drawn
	 maxValue: 0, 			//What is the value that the biggest circle will represent
	 labelFactor: 1.25, 	//How much farther than the radius of the outer circle should the labels be placed
	 wrapWidth: 60, 		//The number of pixels after which a label needs to be given a new line
	 opacityArea: 0.35, 	//The opacity of the area of the blob
	 dotRadius: 4, 			//The size of the colored circles of each blog
	 opacityCircles: 0.1, 	//The opacity of the circles of each blob
	 strokeWidth: 2, 		//The width of the stroke around each blob
	 roundStrokes: false,	//If true the area and stroke will follow a round path (cardinal-closed)
	 color: d3.scaleOrdinal(d3.schemeCategory10),	//Color function,
	 format: '.2%',
	 unit: '',
	 legend: false
	};

	//Put all of the options into a variable called cfg
	if('undefined' !== typeof options){
	  for(var i in options){
		if('undefined' !== typeof options[i]){ cfg[i] = options[i]; }
	  }//for i
	}//if

	//If the supplied maxValue is smaller than the actual one, replace by the max in the data
	// var maxValue = max(cfg.maxValue, d3.max(data, function(i){return d3.max(i.map(function(o){return o.value;}))}));
	let maxValue = 0;
	for (let j=0; j < data.length; j++) {
		for (let i = 0; i < data[j].axes.length; i++) {
			data[j].axes[i]['id'] = data[j].name;
			if (data[j].axes[i]['value'] > maxValue) {
				maxValue = data[j].axes[i]['value'];
			}
		}
	}
	maxValue = max(cfg.maxValue, maxValue);

	const allAxis = data[0].axes.map((i, j) => i.axis),	//Names of each axis
		total = allAxis.length,					//The number of different axes
		radius = Math.min(cfg.w/2, cfg.h/2), 	//Radius of the outermost circle
		Format = d3.format(cfg.format),			 	//Formatting
		angleSlice = Math.PI * 2 / total;		//The width in radians of each "slice"

	//Scale for the radius
	const rScale = d3.scaleLinear()
		.range([0, radius])
		.domain([0, maxValue]);

	/////////////////////////////////////////////////////////
	//////////// Create the container SVG and g /////////////
	/////////////////////////////////////////////////////////
	const parent = d3.select(parent_selector);

	//Remove whatever chart with the same id/class was present before
	parent.select("svg").remove();

	//Initiate the radar chart SVG
	let svg = parent.append("svg")
			.attr("width",  cfg.w + cfg.margin.left + cfg.margin.right)
			.attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
			.attr("class", "radar");

	//Append a g element
	let g = svg.append("g")
			.attr("transform", "translate(" + (cfg.w/2 + cfg.margin.left) + "," + (cfg.h/2 + cfg.margin.top) + ")");

	/////////////////////////////////////////////////////////
	////////// Glow filter for some extra pizzazz ///////////
	/////////////////////////////////////////////////////////

	//Filter for the outside glow
	let filter = g.append('defs').append('filter').attr('id','glow'),
		feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur'),
		feMerge = filter.append('feMerge'),
		feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
		feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');

	/////////////////////////////////////////////////////////
	/////////////// Draw the Circular grid //////////////////
	/////////////////////////////////////////////////////////

	//Wrapper for the grid & axes
	let axisGrid = g.append("g").attr("class", "axisWrapper");

	//Draw the background circles
	axisGrid.selectAll(".levels")
	   .data(d3.range(1,(cfg.levels+1)).reverse())
	   .enter()
		.append("circle")
		.attr("class", "gridCircle")
		.attr("r", d => radius / cfg.levels * d)
		.style("fill", "#CDCDCD")
		.style("stroke", "#CDCDCD")
		.style("fill-opacity", cfg.opacityCircles)
		.style("filter" , "url(#glow)");

	//Text indicating at what % each level is
	axisGrid.selectAll(".axisLabel")
	   .data(d3.range(1,(cfg.levels+1)).reverse())
	   .enter().append("text")
	   .attr("class", "axisLabel")
	   .attr("x", 4)
	   .attr("y", d => -d * radius / cfg.levels)
	   .attr("dy", "0.4em")
	   .style("font-size", "10px")
	   .attr("fill", "#737373")
	   .text(d => Format(maxValue * d / cfg.levels) + cfg.unit);

	/////////////////////////////////////////////////////////
	//////////////////// Draw the axes //////////////////////
	/////////////////////////////////////////////////////////

	//Create the straight lines radiating outward from the center
	var axis = axisGrid.selectAll(".axis")
		.data(allAxis)
		.enter()
		.append("g")
		.attr("class", "axis");
	//Append the lines
	axis.append("line")
		.attr("x1", 0)
		.attr("y1", 0)
		.attr("x2", (d, i) => rScale(maxValue *1.1) * cos(angleSlice * i - HALF_PI))
		.attr("y2", (d, i) => rScale(maxValue* 1.1) * sin(angleSlice * i - HALF_PI))
		.attr("class", "line")
		.style("stroke", "white")
		.style("stroke-width", "2px");

	//Append the labels at each axis
	axis.append("text")
		.attr("class", "legend")
		.style("font-size", "11px")
		.attr("text-anchor", "middle")
		.attr("dy", "0.35em")
		.attr("x", (d,i) => rScale(maxValue * cfg.labelFactor) * cos(angleSlice * i - HALF_PI))
		.attr("y", (d,i) => rScale(maxValue * cfg.labelFactor) * sin(angleSlice * i - HALF_PI))
		.text(d => d)
		.call(wrap, cfg.wrapWidth);

	/////////////////////////////////////////////////////////
	///////////// Draw the radar chart blobs ////////////////
	/////////////////////////////////////////////////////////

	//The radial line function
	const radarLine = d3.radialLine()
		.curve(d3.curveLinearClosed)
		.radius(d => rScale(d.value))
		.angle((d,i) => i * angleSlice);

	if(cfg.roundStrokes) {
		radarLine.curve(d3.curveCardinalClosed)
	}

	//Create a wrapper for the blobs
	const blobWrapper = g.selectAll(".radarWrapper")
		.data(data)
		.enter().append("g")
		.attr("class", "radarWrapper");

	//Append the backgrounds
	blobWrapper
		.append("path")
		.attr("class", "radarArea")
		.attr("d", d => radarLine(d.axes))
		.style("fill", (d,i) => cfg.color(i))
		.style("fill-opacity", cfg.opacityArea)
		.on('mouseover', function(d, i) {
			//Dim all blobs
			parent.selectAll(".radarArea")
				.transition().duration(200)
				.style("fill-opacity", 0.1);
			//Bring back the hovered over blob
			d3.select(this)
				.transition().duration(200)
				.style("fill-opacity", 0.7);
		})
		.on('mouseout', () => {
			//Bring back all blobs
			parent.selectAll(".radarArea")
				.transition().duration(200)
				.style("fill-opacity", cfg.opacityArea);
		});

	//Create the outlines
	blobWrapper.append("path")
		.attr("class", "radarStroke")
		.attr("d", function(d,i) { return radarLine(d.axes); })
		.style("stroke-width", cfg.strokeWidth + "px")
		.style("stroke", (d,i) => cfg.color(i))
		.style("fill", "none")
		.style("filter" , "url(#glow)");

	//Append the circles
	blobWrapper.selectAll(".radarCircle")
		.data(d => d.axes)
		.enter()
		.append("circle")
		.attr("class", "radarCircle")
		.attr("r", cfg.dotRadius)
		.attr("cx", (d,i) => rScale(d.value) * cos(angleSlice * i - HALF_PI))
		.attr("cy", (d,i) => rScale(d.value) * sin(angleSlice * i - HALF_PI))
		.style("fill", (d) => cfg.color(d.id))
		.style("fill-opacity", 0.8);

	/////////////////////////////////////////////////////////
	//////// Append invisible circles for tooltip ///////////
	/////////////////////////////////////////////////////////

	//Wrapper for the invisible circles on top
	const blobCircleWrapper = g.selectAll(".radarCircleWrapper")
		.data(data)
		.enter().append("g")
		.attr("class", "radarCircleWrapper");

	//Append a set of invisible circles on top for the mouseover pop-up
	blobCircleWrapper.selectAll(".radarInvisibleCircle")
		.data(d => d.axes)
		.enter().append("circle")
		.attr("class", "radarInvisibleCircle")
		.attr("r", cfg.dotRadius * 1.5)
		.attr("cx", (d,i) => rScale(d.value) * cos(angleSlice*i - HALF_PI))
		.attr("cy", (d,i) => rScale(d.value) * sin(angleSlice*i - HALF_PI))
		.style("fill", "none")
		.style("pointer-events", "all")
		.on("mouseover", function(d,i) {
			tooltip
				.attr('x', this.cx.baseVal.value - 10)
				.attr('y', this.cy.baseVal.value - 10)
				.transition()
				.style('display', 'block')
				.text(Format(d.value) + cfg.unit);
		})
		.on("mouseout", function(){
			tooltip.transition()
				.style('display', 'none').text('');
		});

	const tooltip = g.append("text")
		.attr("class", "tooltip")
		.attr('x', 0)
		.attr('y', 0)
		.style("font-size", "12px")
		.style('display', 'none')
		.attr("text-anchor", "middle")
		.attr("dy", "0.35em");

	if (cfg.legend !== false && typeof cfg.legend === "object") {
		let legendZone = svg.append('g');
		let names = data.map(el => el.name);
		if (cfg.legend.title) {
			let title = legendZone.append("text")
				.attr("class", "title")
				.attr('transform', `translate(${cfg.legend.translateX},${cfg.legend.translateY})`)
				.attr("x", cfg.w - 70)
				.attr("y", 10)
				.attr("font-size", "12px")
				.attr("fill", "#404040")
				.text(cfg.legend.title);
		}
		let legend = legendZone.append("g")
			.attr("class", "legend")
			.attr("height", 100)
			.attr("width", 200)
			.attr('transform', `translate(${cfg.legend.translateX},${cfg.legend.translateY + 20})`);
		// Create rectangles markers
		legend.selectAll('rect')
		  .data(names)
		  .enter()
		  .append("rect")
		  .attr("x", cfg.w - 65)
		  .attr("y", (d,i) => i * 20)
		  .attr("width", 10)
		  .attr("height", 10)
		  .style("fill", (d,i) => cfg.color(i));
		// Create labels
		legend.selectAll('text')
		  .data(names)
		  .enter()
		  .append("text")
		  .attr("x", cfg.w - 52)
		  .attr("y", (d,i) => i * 20 + 9)
		  .attr("font-size", "11px")
		  .attr("fill", "#737373")
		  .text(d => d);
	}
	return svg;
}

function songInfo(){
  
    d3.csv(csvSrc, function(data1){
 

        var songInfoData ;

        data1.forEach(element=>{
            if(element.artists == artistName && element.track_name == songName){
                songInfoData=[ {name: 'song feature',
                                axes:[
                                    {axis: 'danceability', value:element.danceability},
                                    {axis: 'speechiness', value:element.speechiness},
                                    {axis: 'acousticness', value:element.acousticness},
                                    {axis: 'liveness', value:element.liveness},
                                    {axis: 'valence', value:element.valence},
                                    {axis: 'energy', value:element.energy}
                                ]              
                    }
                ];
                
                return;
            }
        })

        console.log(songInfoData);
        
    
         var radarChartOptions = {
            w: 250,
            h: 250,
            margin: margin,
            levels: 5,
            roundStrokes: true,
              color: d3.scaleOrdinal().range(["#26AF32"]),
              format: '.0f'
          };

          
          
          var svg =RadarChart("#chart", songInfoData, radarChartOptions);
    })
    
}

function changeArtist(){
    var newArtist = document.getElementById("inputPlace").value;
    artistName = newArtist;

    d3.csv(csvSrc,function(data){
        data.forEach(element=>{
            if (element.artists == artistName){
                songName = element.track_name;
                return;
            }
        })
        document.getElementById('songName').innerHTML = 
        '<span class="badge rounded-pill text-bg-light">'+songName+'</span>';
        document.getElementById('artistName').innerHTML = '<span class="badge rounded-pill text-bg-info">'+artistName+'</span>';
        document.getElementById('chart').innerHTML = '';
        d3.select("#chart").select('svg').remove();

        overAllInfo();
        songInfo();
    })

    
}

function changeSong(){
    var newSong = document.getElementById("inputPlaceM").value;
    songName = newSong;
    document.getElementById('songName').innerHTML = 
        '<span class="badge rounded-pill text-bg-light">'+songName+'</span>';
    document.getElementById('chart').innerHTML = '';
    d3.select("#chart").select('svg').remove();

    songInfo();
}

overAllInfo();
songInfo();