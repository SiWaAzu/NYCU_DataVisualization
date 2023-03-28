const kindAll = document.getElementById("all");
const kindSetosa = document.getElementById("setosa");
const kindVersicolor = document.getElementById("versicolor");
const kindVirginica = document.getElementById("virginica");

let yVal = 'petal length';
let xVal = 'petal width';
let kind = 'all';

const xsl = document.getElementById("xsl");
const xsw = document.getElementById("xsw");
const xpl = document.getElementById('xpl');
const xpw = document.getElementById('xpw');

const ysl = document.getElementById("ysl");
const ysw = document.getElementById("ysw");
const ypl = document.getElementById('ypl');
const ypw = document.getElementById('ypw');

//csv load
const sourceUrl = "http://vis.lab.djosix.com:2020/data/iris.csv";
let dataset = "";
//d3.csv(sourceUrl).then(data => console.log('data', data))

var margin = {top: 10, right: 30, bottom: 70, left: 60},
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;


function createSVG(){
    //svg append
    d3.select('#diagram').select('svg').remove();
    var svg = d3.select("#diagram")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height - 6)
    .text(xVal);

    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text(yVal);

    svg.append("text") 
    .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom - 30) +")")
    .style("text-anchor", "middle")
    .text(kind);

    svg.append("text") 
    .attr("transform", "translate(" + (width / 5) + " ," + (height + margin.bottom-5 ) +")")
    .style("text-anchor", "middle")
    .text("setosa")
    .style("fill","#69b3a2");

    svg.append("text") 
    .attr("transform", "translate(" + (width / 5*2.5) + " ," + (height + margin.bottom-5 ) +")")
    .style("text-anchor", "middle")
    .text("versicolor")
    .style("fill","#FF9797");

    svg.append("text") 
    .attr("transform", "translate(" + (width / 5*4) + " ," + (height + margin.bottom-5 ) +")")
    .style("text-anchor", "middle")
    .text("virginica")
    .style("fill","#84C1FF");

    d3.csv(sourceUrl,function(data){
        //console.log('data', data) //debug
        // Add X axis
        var x = d3.scaleLinear()
        .domain([0, 10])
        .range([ 0, width ]);
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

        // Add Y axis
         var y = d3.scaleLinear()
        .domain([0, 10])
        .range([ height, 0]);
        svg.append("g")
        .call(d3.axisLeft(y));
        
        //console.log(dataset[xVal]);

        if (kind=='all'){
            svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { if (d.class=='Iris-setosa')return x(d[xVal]); } )
            .attr("cy", function (d) { if (d.class=='Iris-setosa')return y(d[yVal]); } )
            .attr("r", 1.5)
            .style("fill", "#69b3a2");

            svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { if (d.class=='Iris-versicolor')return x(d[xVal]); } )
            .attr("cy", function (d) { if (d.class=='Iris-versicolor')return y(d[yVal]); } )
            .attr("r", 1.5)
            .style("fill", "#FF9797");

            svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { if (d.class=='Iris-virginica')return x(d[xVal]); } )
            .attr("cy", function (d) { if (d.class=='Iris-virginica')return y(d[yVal]); } )
            .attr("r", 1.5)
            .style("fill", "#84C1FF");
        }
        else if (kind=='setosa'){
            svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { if (d.class=='Iris-setosa')return x(d[xVal]); } )
            .attr("cy", function (d) { if (d.class=='Iris-setosa')return y(d[yVal]); } )
            .attr("r", 1.5)
            .style("fill", "#69b3a2");
        }
        else if (kind=='versicolor'){
            svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { if (d.class=='Iris-versicolor')return x(d[xVal]); } )
            .attr("cy", function (d) { if (d.class=='Iris-versicolor')return y(d[yVal]); } )
            .attr("r", 1.5)
            .style("fill", "#FF9797");
        }
        else if (kind=='virginica'){
            svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { if (d.class=='Iris-virginica')return x(d[xVal]); } )
            .attr("cy", function (d) { if (d.class=='Iris-virginica')return y(d[yVal]); } )
            .attr("r", 1.5)
            .style("fill", "#84C1FF");
        }

      /*  svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d[xVal]); } )
        .attr("cy", function (d) { return y(d[yVal]); } )
        .attr("r", 1.5)
        .style("fill", "#69b3a2");*/
    });
}
createSVG();

//choice chainging
kindAll.addEventListener('mousedown',e=>{
    kind = 'all';
    console.log(kind);
    createSVG();
});
kindSetosa.addEventListener('mousedown',e=>{
    kind='setosa';
    console.log(kind);
    createSVG();
});
kindVersicolor.addEventListener('mousedown',e=>{
    kind = 'versicolor';
    console.log(kind);
    createSVG();
});
kindVirginica.addEventListener('mousedown',e=>{
    kind = 'virginica';
    console.log(kind);
    createSVG();
});
//x decide
xsl.addEventListener('mousedown',e=>{
    xVal = 'sepal length';
    console.log(xVal);
    createSVG();
});
xsw.addEventListener('mousedown',e=>{
    xVal = 'sepal width';
    console.log(xVal);
    createSVG();
});
xpl.addEventListener('mousedown',e=>{
    xVal = 'petal length';
    console.log(xVal);
    createSVG();
});
xpw.addEventListener('mousedown',e=>{
    xVal = 'petal width';
    console.log(xVal);
    createSVG();
});
// y decide
ysl.addEventListener('mousedown',e=>{
    yVal = 'sepal length';
    console.log(yVal);
    createSVG();
});
ysw.addEventListener('mousedown',e=>{
    yVal = 'sepal width';
    console.log(yVal);
    createSVG();
});
ypl.addEventListener('mousedown',e=>{
    yVal = 'petal length';
    console.log(yVal);
    createSVG();
});
ypw.addEventListener('mousedown',e=>{
    yVal = 'petal width';
    console.log(yVal);
    createSVG();
});



