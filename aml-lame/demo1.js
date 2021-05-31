function main() {
  const width = 600, height = 600;
  var nodes = [{x: 300, y: 300, id:0 },
               {x: 400, y: 300, id:1 }];
  var links = [];
  var mouse = null;

  const mindistance = 67;
  inrange = ({x: sx, y: sy}, {x: tx, y: ty}) => Math.hypot(sx - tx, sy - ty) <= mindistance;

  const svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const simulation = d3.forceSimulation(nodes)
    .force("charge", d3.forceManyBody().distanceMax(5))
    .force("r", d3.forceRadial(100, 300, 300).strength(.1))
    .force("collide", d3.forceCollide(15))
    .force("link", d3.forceLink(links))
    .alphaDecay(.2);

  var circle = svg.append("g")
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("r", 10)
    .call(drag(simulation));

  let link = svg.append("g")
    .attr("stroke", "#999")
    .selectAll("line");

  let mouselink = svg.append("g")
      .attr("stroke", "red")
    .selectAll("line");

  simulation.on("tick", () => {
    circle
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);

    link.attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    mouselink = mouselink
    .data(mouse ? nodes.filter(node => inrange(mouse, node)) : [])
    .join("line")
      .attr("x1", mouse && mouse.x)
      .attr("y1", mouse && mouse.y)
      .attr("x2", d => d.x)
      .attr("y2", d => d.y);

  });

  function mouseleft() {
    mouse = null;
  }

  function mousemoved(event) {
    const [x, y] = d3.pointer(event);
    mouse = {x, y};
    simulation.alpha(0.3).restart();
  }

  const dragger = drag(simulation)
    .on("start.mouse", mouseleft);

  svg.on("mousemove", mousemoved);

  svg.on("click", function(event) {
    let lastIdx = _.last(nodes)["id"] + 1;

    let source = {x: event.x, y: event.y};
    
    for(const target of nodes) {
      if (inrange(source, target)) {
        console.log({"source": lastIdx, "target": target.id});
        links.push({"source": lastIdx, "target": target.id});
      } 
    }

    link = link
      .data(links)
      .join("line");

    nodes = _.concat(nodes, [{x: event.x, y: event.y, id: lastIdx}]);
    circle = circle
      .data(nodes)
      .join(
        enter => enter.append("circle").attr("r", 0)
          .call(enter => enter.transition().attr("r", 10))
          .call(dragger),
        update => update,
        exit => exit.remove()
      );

    console.log(links);
    
    simulation.nodes(nodes);
    simulation.force("link").links(links);
    simulation.alpha(1).restart();
  });

}


function drag(simulation) {
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function draggended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  return d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", draggended);
}

window.addEventListener("load", main);