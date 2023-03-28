const csvSrc = "http://vis.lab.djosix.com:2020/data/iris.csv";
//graph's dimension
var margin = {top:20, bottom:50, right:50, left: 50};
var width = 800-margin.left-margin.right;
var height = 600-margin.bottom-margin.top;
//
const sl1 = document.getElementById("sl1");
const sw1 = document.getElementById("sw1");
const pl1 = document.getElementById("pl1");
const pw1 = document.getElementById("pw1");

const sl2 = document.getElementById("sl2");
const sw2 = document.getElementById("sw2");
const pl2 = document.getElementById("pl2");
const pw2 = document.getElementById("pw2");

const sl3 = document.getElementById("sl3");
const sw3 = document.getElementById("sw3");
const pl3 = document.getElementById("pl3");
const pw3 = document.getElementById("pw3");

const sl4 = document.getElementById("sl4");
const sw4 = document.getElementById("sw4");
const pl4 = document.getElementById("pl4");
const pw4 = document.getElementById("pw4");

const axis1 = document.getElementById("axis1");
const axis2 = document.getElementById("axis2");
const axis3 = document.getElementById("axis3");
const axis4 = document.getElementById("axis4");

const axises = [axis1, axis2, axis3, axis4];

// axis choice

var dimensions = ["sepal length", "sepal width", "petal length", "petal width"];

//label show
function colorLabel(){
    var species = ["Iris-setosa", "Iris-versicolor", "Iris-virginica"]
    var svg = d3.select('#colorLabel')
    var color = d3.scaleOrdinal()
        .domain(species)
        .range(["#FF9797", "#66B3FF", "#73BF00"]);
        //svg.append("circle").attr("cx",10).attr("cy",10).attr("r", 6).style("fill", "#69b3a2")
    
    svg.selectAll("mydots")
    .data(species)
    .enter()
    .append("circle")
    .attr("cx", function(d,i){ return 75 + i*150})
    .attr("cy", 10)
    .attr("r", 6)
    .style("fill", function(d){ return color(d)})

    svg.selectAll("mylabels")
    .data(species)
    .enter()
    .append("text")
    .attr("x", function(d,i){ return 90 + i*150})
    .attr("y", 10) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", function(d){ return color(d)})
    .text(function(d){ return d})
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")

}

//draw graph
function createGraph(){
    //console.log(axis[0]);
    d3.select('#diagram').select('svg').remove();    //remove old
    var svg = d3.select('#diagram')
    .append("svg")
    .attr("width", width+margin.left+margin.right)
    .attr("height", height+margin.bottom+margin.top)
    .append("g")
    .attr("transform", "translate("+margin.left+","+margin.right+")");

    d3.csv(csvSrc, function(data){
        //coloring
        var color = d3.scaleOrdinal()
        .domain(["Iris-setosa", "Iris-versicolor", "Iris-virginica"])
        .range(["#FF9797", "#66B3FF", "#73BF00"]);
        //dimension
        
        //scaling
        var y ={};
        for (i in dimensions){
            var name = dimensions[i];
            y[name] = d3.scaleLinear()
            .domain([0,8])
            .range([height,0]);
        }

        var x =d3.scalePoint()
        .range([0,width])
        .domain(dimensions);

        function path (d) {
            return d3.line()(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
        }

        svg
        .selectAll("myPath")
        .data(data)
        .enter()
        .append("path")
        .attr("class", function (d) { return "line " + d.class } ) 
        .attr("d",  path)
        .style("fill", "none" )
        .style("stroke", function(d){ return( color(d.class))} )
        .style("opacity", 0.8)


        svg.selectAll("myAxis")
        .data(dimensions)
        .enter()
        .append("g")
        .attr("class","axis")
        .attr("transform", function(d){ return "translate("+ x(d) +")";})
        .each(function(d){ d3.select(this).call(d3.axisLeft().ticks(5).scale(y[d]));})
        .append("text")
        .style("text-anchor","middle")
        .attr("y",-9)
        .text(function(d){ return d;})
        .style("fill","black");
    })
}

createGraph();
colorLabel();

sl1.addEventListener("mousedown",e=>{
    var tmp =dimensions[0];
    for(i=0;i<4;i++)  {
        if(dimensions[i]=='sepal length') {
            dimensions[i]=tmp;
            console.log(i);
            axises[i].innerHTML = tmp;
        }
    }
    dimensions[0] = 'sepal length';
    axis1.innerHTML = "sepal length";
    createGraph();
})
sw1.addEventListener("mousedown",e=>{
    var tmp =dimensions[0];
    for(i=0;i<4;i++)  {
        if(dimensions[i]=='sepal width') {
            dimensions[i]=tmp;
            axises[i].innerHTML = tmp;
        }
    }
    dimensions[0] = 'sepal width';
    axis1.innerHTML = "sepal width";
    createGraph();
})
pl1.addEventListener("mousedown",e=>{
    var tmp =dimensions[0];
    for(i=0;i<4;i++)  {
        if(dimensions[i]=='petal length') {
            dimensions[i]=tmp;
            axises[i].innerHTML = tmp;
        }
    }
    dimensions[0] = 'petal length';
    axis1.innerHTML = "petal length";
    createGraph();
})
pw1.addEventListener("mousedown",e=>{
    var tmp =dimensions[0];
    for(i=0;i<4;i++)  {
        if(dimensions[i]=='petal width') {
            dimensions[i]=tmp;
            axises[i].innerHTML = tmp;
        }
    }
    dimensions[0] = 'petal width';
    axis1.innerHTML = "petal width";
    createGraph();
})


sl2.addEventListener("mousedown",e=>{
    var tmp =dimensions[1];
    for(i=0;i<4;i++)  {
        if(dimensions[i]=='sepal length') {
            dimensions[i]=tmp;
            console.log(i);
            axises[i].innerHTML = tmp;
        }
    }
    dimensions[1] = 'sepal length';
    axis2.innerHTML = "sepal length";
    createGraph();
})
sw2.addEventListener("mousedown",e=>{
    var tmp =dimensions[1];
    for(i=0;i<4;i++)  {
        if(dimensions[i]=='sepal width') {
            dimensions[i]=tmp;
            axises[i].innerHTML = tmp;
        }
    }
    dimensions[1] = 'sepal width';
    axis2.innerHTML = "sepal width";
    createGraph();
})
pl2.addEventListener("mousedown",e=>{
    var tmp =dimensions[1];
    for(i=0;i<4;i++)  {
        if(dimensions[i]=='petal length') {
            dimensions[i]=tmp;
            axises[i].innerHTML = tmp;
        }
    }
    dimensions[1] = 'petal length';
    axis2.innerHTML = "petal length";
    createGraph();
})
pw2.addEventListener("mousedown",e=>{
    var tmp =dimensions[1];
    for(i=0;i<4;i++)  {
        if(dimensions[i]=='petal width') {
            dimensions[i]=tmp;
            axises[i].innerHTML = tmp;
        }
    }
    dimensions[1] = 'petal width';
    axis2.innerHTML = "petal width";
    createGraph();
})

sl3.addEventListener("mousedown",e=>{
    var tmp =dimensions[2];
    for(i=0;i<4;i++)  {
        if(dimensions[i]=='sepal length') {
            dimensions[i]=tmp;
            console.log(i);
            axises[i].innerHTML = tmp;
        }
    }
    dimensions[2] = 'sepal length';
    axis3.innerHTML = "sepal length";
    createGraph();
})
sw3.addEventListener("mousedown",e=>{
    var tmp =dimensions[2];
    for(i=0;i<4;i++)  {
        if(dimensions[i]=='sepal width') {
            dimensions[i]=tmp;
            axises[i].innerHTML = tmp;
        }
    }
    dimensions[2] = 'sepal width';
    axis3.innerHTML = "sepal width";
    createGraph();
})
pl3.addEventListener("mousedown",e=>{
    var tmp =dimensions[2];
    for(i=0;i<4;i++)  {
        if(dimensions[i]=='petal length') {
            dimensions[i]=tmp;
            axises[i].innerHTML = tmp;
        }
    }
    dimensions[2] = 'petal length';
    axis3.innerHTML = "petal length";
    createGraph();
})
pw3.addEventListener("mousedown",e=>{
    var tmp =dimensions[2];
    for(i=0;i<4;i++)  {
        if(dimensions[i]=='petal width') {
            dimensions[i]=tmp;
            axises[i].innerHTML = tmp;
        }
    }
    dimensions[2] = 'petal width';
    axis3.innerHTML = "petal width";
    createGraph();
})

sl4.addEventListener("mousedown",e=>{
    var tmp =dimensions[3];
    for(i=0;i<4;i++)  {
        if(dimensions[i]=='sepal length') {
            dimensions[i]=tmp;
            console.log(i);
            axises[i].innerHTML = tmp;
        }
    }
    dimensions[3] = 'sepal length';
    axis4.innerHTML = "sepal length";
    createGraph();
})
sw4.addEventListener("mousedown",e=>{
    var tmp =dimensions[3];
    for(i=0;i<4;i++)  {
        if(dimensions[i]=='sepal width') {
            dimensions[i]=tmp;
            axises[i].innerHTML = tmp;
        }
    }
    dimensions[3] = 'sepal width';
    axis4.innerHTML = "sepal width";
    createGraph();
})
pl4.addEventListener("mousedown",e=>{
    var tmp =dimensions[3];
    for(i=0;i<4;i++)  {
        if(dimensions[i]=='petal length') {
            dimensions[i]=tmp;
            axises[i].innerHTML = tmp;
        }
    }
    dimensions[3] = 'petal length';
    axis4.innerHTML = "petal length";
    createGraph();
})
pw4.addEventListener("mousedown",e=>{
    var tmp =dimensions[3];
    for(i=0;i<4;i++)  {
        if(dimensions[i]=='petal width') {
            dimensions[i]=tmp;
            axises[i].innerHTML = tmp;
        }
    }
    dimensions[3] = 'petal width';
    axis4.innerHTML = "petal width";
    createGraph();
})