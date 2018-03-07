function build(data, svg2, x2, y2, margin2, width2, height2, color, div) {


  x2.domain(data.map(function(d) { return d.Name; }));
  y2.domain([0, d3.max(data, function(d) { return d.Global_Sales; })]);

  svg2.selectAll(".bar").remove();
  svg2.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x2(d.Name); })
      .attr("width", x2.bandwidth())
      .attr("y", function(d) { return y2(d.Global_Sales); })
      .attr("height", function(d) { return height2 - y2(d.Global_Sales); })
      .attr("fill", d => color(d.Genre))
      .on("mousemove", function(d) {
          if (this.style.opacity == "0") {
            return
          }
          div.transition()
              .duration(50)
              .style("opacity", .9);
          div.html("<b>Title</b>: " + d.Name
            + "<br/><b>Genre</b>: " + d.Genre
            + "<br/><b>Platform</b>: " + d.Platform
            + "<br/><b>Release Year</b>: " + d.Year_of_Release
            + "<br/><b>Publisher</b>: " + d.Publisher
            + "<br/><b>Global Sales</b>: " + d.Global_Sales + " Million"
            + "<br/><b>Critic Score</b>: " + d.Critic_Score)
              .style("left", (d3.event.pageX + 15) + "px")
              .style("top", (d3.event.pageY - 50) + "px");
      })
      .on("mouseout", function(d) {
          div.transition()
              .duration(50)
              .style("opacity", 0);
      });

  svg2.selectAll("text").remove();
  svg2.selectAll("text")
      .data(data)
    .enter()
    .append("text")
    .attr("text-anchor", "middle")
    .attr("x", function(d) {
      return x2(d.Name) + x2.bandwidth() / 2;
    })
    .attr("y", function(d) { return y2(d.Global_Sales) + 6; })
    .attr("dy", ".75em")
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .text(function(d) {
      return d.Global_Sales;
    });

  svg2.append("text")
    .attr("class", "y label")
    .attr("y", 0 - margin2.left)
    .attr("x", 0 - (height2 / 2))
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .text("Global Sales (millions of units)");

  svg2.selectAll("g").remove();
  svg2.append("g")
      .attr("transform", "translate(0," + height2 + ")")
      .call(d3.axisBottom(x2));

  svg2.append("g")
      .call(d3.axisLeft(y2));
}

