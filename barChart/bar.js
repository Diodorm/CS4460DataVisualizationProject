
// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 1500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([height, 0]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "#ffffff");


// get the data
d3.csv("Video_Games_Sales_as_at_22_Dec_2016.csv", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
    d.NA_Sales = +d.NA_Sales;
  });

  // Scale the range of the data in the domains
  x.domain(data.map(function(d) { return d.Name; }));
  y.domain([0, d3.max(data, function(d) { return d.NA_Sales; })]);
  // append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.Name); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.NA_Sales); })
      .attr("height", function(d) { return height - y(d.NA_Sales); })
      .attr("fill", "blue");

  svg.selectAll("text")
      .data(data)
    .enter()
    .append("text")
    .attr("text-anchor", "middle")
    .attr("x", function(d) {
      return x(d.Name) + x.bandwidth() / 2;
    })
    .attr("y", function(d) { return y(d.NA_Sales) + 6; })
    .attr("dy", ".75em")
    .attr("fill", "white")
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .text(function(d) {
      return d.NA_Sales;
    });

  svg.append("text")
    .attr("class", "y label")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .text("NA Sales (millions of units)");


  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

//taken from https://bl.ocks.org/mbostock/7555321
  // svg.append("g")
  //     .attr("class", "x axis")
  //     .attr("transform", "translate(0," + height + ")")
  //     .call(xAxis)
  //   .selectAll(".tick text")
  //     .call(wrap, x.rangeBand());

  // add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));




//taken from https://bl.ocks.org/mbostock/7555321
  // function wrap(text, width) {
  //   text.each(function() {
  //     var text = d3.select(this),
  //         words = text.text().split(/\s+/).reverse(),
  //         word,
  //         line = [],
  //         lineNumber = 0,
  //         lineHeight = 1.1, // ems
  //         y = text.attr("y"),
  //         dy = parseFloat(text.attr("dy")),
  //         tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
  //     while (word = words.pop()) {
  //       line.push(word);
  //       tspan.text(line.join(" "));
  //       if (tspan.node().getComputedTextLength() > width) {
  //         line.pop();
  //         tspan.text(line.join(" "));
  //         line = [word];
  //         tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
  //       }
  //     }
  //   });
  // }

});

