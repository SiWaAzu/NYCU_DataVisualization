const csvSrc = "http://vis.lab.djosix.com:2020/data/spotify_tracks.csv";
var margin = {top:20, bottom:60, right:20, left: 50};
var width = 500-margin.left-margin.right;
var height = 400-margin.bottom-margin.top;
var barPadding = 0.2;
var genre = 'acoustic';

var tempoCnt = {'Adagio':0, 'Andante':0, 'Moderato':0, 'Allegro':0, 'Presto':0, 'Prestissimo':0};
var popularityCnt = {'level1':0, 'level2':0, 'level3':0, 'level4':0, 'level5':0};
var tempoData = [];
var popularityData = [];
var genreData = [];


// graph type: true: bar, false pie
var graphType = true;

function overallTempo ()
{
  tempoCnt = {'Adagio':0, 'Andante':0, 'Moderato':0, 'Allegro':0, 'Presto':0, 'Prestissimo':0};
  popularityCnt = {'level1':0, 'level2':0, 'level3':0, 'level4':0, 'level5':0};
  tempoData = [];
  popularityData = [];
  genreData = [];
  
  d3.csv(csvSrc, function(data){
    d3.select("#tempo").select('svg').remove();
    d3.select('#popularity').select('svg').remove();
    d3.select('#allScatter').select('svg').remove();

    data.forEach(element => {
        if (element.track_genre == genre){
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
    });
    console.log(genreData);
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
    
    if (graphType){
        var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
        var y = d3.scaleLinear()
          .range([height, 0]);
        var color = d3.scaleOrdinal()
        .domain(['Adagio','Andante','Moderato','Allegro','Presto','Prestissimo'])
        .range(['#DAF7A6','#FFC300','#FF5733','#C70039','#900C3F','#581845']);

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
        //===============================================================
        var color2 = d3.scaleOrdinal()
        .domain(['0~19','20~39','40~59','60~79','80~100'])
        .range(['#D5F5E3','#82E0AA','#2ECC71','#1D8348','#145A32']);
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
        //===============================================================

    }
    else{
        var color = d3.scaleOrdinal()
          .domain(['Adagio','Andante','Moderato','Allegro','Presto','Prestissimo'])
          .range(['#DAF7A6','#FFC300','#FF5733','#C70039','#900C3F','#581845']);
      var color2 = d3.scaleOrdinal()
          .domain(['0~19','20~39','40~59','60~79','80~100'])
          .range(['#D5F5E3','#82E0AA','#2ECC71','#1D8348','#145A32']);
          var radius = Math.min(width, height) / 2;
          var donutWidth = 75;
          var legendRectSize = 18;
          var legendSpacing = 4;
  
          var svg = d3.select('#tempo')
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

      //=================================================
      var radius = Math.min(width, height) / 2;
        var donutWidth = 75;
        var legendRectSize = 18;
        var legendSpacing = 4;

        var svg = d3.select('#popularity')
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
      
    }

    var svg = d3.select('#allScatter')
        .append("svg")
        .attr("width", width+margin.left+margin.right)
        .attr("height", height+margin.bottom+margin.top)
        .append("g")
        .attr("transform", "translate("+margin.left+","+margin.top+")");

        var x = d3.scaleLinear()
        .domain([0, 210])
        .range([ 0, width ]);
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

        var y = d3.scaleLinear()
        .domain([0, 100])
        .range([ height, 0]);
        svg.append("g")
        .call(d3.axisLeft(y));

        svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { if(d.track_genre == genre)return x(d.tempo); } )
        .attr("cy", function (d) { if(d.track_genre == genre)return y(d.popularity); } )
        .attr("r", 1.5)
        .style("fill", "#4682B4")
        .attr("opacity", 0.4)

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
        .text("popilarity");

        

});   
}

function changeType(){
  graphType = !graphType;
  overallTempo();
}

function changeGenre(){
    var newGenre = document.getElementById("inputPlace").value;
    genre = newGenre;
    var badgeChange = document.getElementById('genreb').innerHTML = 
    '<span class="badge rounded-pill text-bg-info">'+genre+'</span>';
    console.log(newGenre);
    

    overallTempo();
}


overallTempo();