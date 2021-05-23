// !preview r2d3 data=c(0.3, 0.6, 0.8, 0.95, 0.40, 0.20)
//
// r2d3: https://rstudio.github.io/r2d3
//

function f(x) {
    //return (x-0.1)*(x-0.1) - 0.1;
    return (1/Math.sqrt(2*Math.PI))*Math.exp(-x*x/2);
    //return (x-1)*(x-1.5)*(x+1) ;
}

function trapInt(fx, dx) {
    fxN1 = _.initial(fx);
    sumFx = fxN1.reduce((a, v) => a+v);
    return dx*(sumFx + (fx[0] + fx[fx.length - 1])/2);
}

function main() {

    var dx = 1/50; // granuality of the chart
    var margins = {top: 20, right: 10, bottom: 50, left: 10};

    var xVals = d3.range(-5, 5, dx); // x
    var yVals = xVals.map( x => f(x)); // f(x)

    // define the scales
    var scX = d3.scaleLinear()
      .domain(d3.extent(xVals))
      .range([margins.left, width - margins.right])
      .nice();

    var scY = d3.scaleLinear()
      .domain(d3.extent(yVals))
      .range([height - margins.bottom, margins.top])
      .nice();

    // scale x and f(x) to the screen coordinates
    var data = xVals.map( (d, i) => [scX(d), scY(yVals[i])]);

    // create axes
    var xAxis = d3.axisBottom(scX);
    var yAxis = d3.axisLeft(scY);

    // add axes to the svg component
    svg.append("g")
      .attr("transform", `translate(0, ${scY(0)})`)
      .call(xAxis);
    
    svg.append("g")
      .attr("transform", `translate(${scX(0)}, 0)`)
      .call(yAxis);


    // plot
    var lineMkr = d3.line().curve(d3.curveLinear);

    // line
    var chart = svg.append("g")
      .append("path")
      .attr("d", lineMkr(data))
      .attr("fill", "none")
      .attr("stroke", "orange")
      .attr("stroke-width", 2);

    // cooridiates text
    var coord = svg.append("text")
      .attr("visibility", "hidden");

    // currently selected value
    var circle = svg.append("g")
      .append("circle")
      .attr("visibility", "hidden");

    // add event listeners
    svg.on("mousemove", function(event) {
        var pt = d3.mouse(svg.node()); // point in the svg component coordinates

        // get coordinates of the selected point
        var xPos = _.clamp(scX.invert(pt[0]), d3.min(xVals), d3.max(xVals));
        var yPos = f(xPos);

        // draw 
        circle
          .attr("r", 5)
          .attr("cx", scX(xPos))
          .attr("cy", scY(yPos))
          .attr("visibility", "visible");

        // format displayed coordinates text
        var txtPos = `(${d3.format(".2f")(xPos)}, ${d3.format(".2f")(yPos)})`;

        coord
          .attr("x", pt[0] > width/2 ? scX(xPos) - 10 : scX(xPos) + 10)
          .attr("y", scY(yPos))
          .attr("visibility", "visible")
          .attr("text-anchor", pt[0] > width/2 ? "end" : "start")
          .text(txtPos);
    })
    .on("mouseout", function(event) {
        // hide the circle an the associated text
        circle.attr("visibility", "hidden");
        coord.attr("visibility", "hidden");
    });

    // SELECT THE AREA

    // define the closed selection
    var selectionMaker = d3.line().curve(d3.curveLinearClosed);

    var selectionSvg = svg.append("g")
      .append("path")
      .attr("fill", "steelblue")
      .attr("opacity", .2)
      .attr("visibility", "hidden");

    // display the area
    var txtArea = svg.append("g")
      .append("text")
      .attr("x", 50)
      .attr("y", 50)
      .attr("font-family", "sans-serif")
      .attr("visibility", "hidden");

    var dragStart; // x screen coordinate
    var dragEnd;  // x screen coordinate
    var selectionIdx; // boolean vector indicating which data values are being used in selection
    var h0 = scY(0); // y=0 in screen coordinates

    // on click hide the selection and displayed area
    svg.on("click", function(event) {
        selectionSvg.attr("visibility", "hidden");
        txtArea.attr("visibility", "hidden");
        dragStart = undefined;
    });

    // define the drag behaviour
    var drag = d3.drag()
      .on("start", function(event) {
          dragStart = d3.mouse(svg.node())[0];
          dragEnd = dragStart;
      })
      .on("drag", function(event) {
        var pt = d3.mouse(svg.node());

        dragEnd = pt[0]; // end selection at the current x poisition

        // to reduce errors due to the granuality
        // calculate exact start and end coordinates
        var exactStartY = scY(f(scX.invert(dragStart)));
        var exactEndY = scY(f(scX.invert(dragEnd)));

        // determine which data points are included in the selection
        selectionIdx = data.map( d => _.inRange(d[0], dragStart, dragEnd));

        // select only relevant slice of the chart data
        var selection = data.filter( (d, i) => selectionIdx[i]);

        // add the additional points to close the curve
        add2Sel = [[dragEnd, h0], [dragStart, h0]].sort( (a, b) => b[0] - a[0]);
        addExact = [[dragEnd, exactEndY], [dragStart, exactStartY]].sort( (a, b) => b[0] - a[0]);

        add2Sel = _.concat([addExact[0]], add2Sel, [addExact[1]]);
        selection = _.concat(selection, add2Sel);
        
        // draw the selection
        selectionSvg
          .attr("d", selectionMaker(selection))
          .attr("visibility", "visible");

        // update the position of the circle while dragging

        var xPos = _.clamp(scX.invert(pt[0]), d3.min(xVals), d3.max(xVals));
        var yPos = f(xPos);

        circle
            .attr("r", 5)
            .attr("cx", scX(xPos))
            .attr("cy", scY(yPos))
            .attr("visibility", "visible");

        var txtPos = `(${d3.format(".2f")(xPos)}, ${d3.format(".2f")(yPos)})`;

        coord
            .attr("x", pt[0] > width/2 ? scX(xPos) - 10 : scX(xPos) + 10)
            .attr("y", scY(yPos))
            .attr("visibility", "visible")
            .attr("text-anchor", pt[0] > width/2 ? "end" : "start")
            .text(txtPos);
      })
      .on("end", function() {
          var fx = yVals.filter( (d, i) => selectionIdx[i] );

          if (fx.length > 1) {
              txtArea.text("Selected Area: " + d3.format(".3f")(trapInt(fx, dx)))
                .attr("visibility", "visible");
          }
      });

    // add the dragging behaviour to the svg element
    drag(svg);

}

main();