var hier;

function main() {
  const width = $(window).width()*.9, height = $(window).height()*.7;
  const minDistance = 20;
  const maxDistance = 150;

  $("#showhier").hide();
  $("#deletenode").hide();
  $("#name").hide();

  const settings = { 
    entity: {col: ["#aaa", "forestgreen"], r: 10, sw: 4},
    leaf: {col: ["#000", "white"], r: 5, sw: 2}
  };

  let nodes = [{x: width/2, y: height/2, r: settings.entity.r,
               type: "entity", id: 0                
              }];
  let links = [];

  let selectedNodeId = undefined; // id of currently selected node
  let fromNode = undefined;
  let toNode = undefined;
  let newNodeMode = false; // add new node

  let cursorPosition = undefined; // {x, y}
  let nameUpdateNode = undefined;

  const nameEntry = d3.select("#nameEntry");
  nameEntry
    .on("keydown", function(event) {
      let el = d3.select(this);
      let newValue = "";
      if (event.key === "Enter") {
        if (nameUpdateNode) {
          newValue = el.property("value");
          nameUpdateNode.append("title").text(newValue);
        }
        el.property("value", "")
        //d3.select("#name").style("opacity", 0);
        $("#name").hide();
      }

      nodes.map( d => {
        if (d.id == nameUpdateNode.datum().id) {
          d.name = newValue;
        }
        return d;
      })

    });

  //d3.select("#name").style("opacity", 0);

  d3.select("#nameOk")
    .on("click", function(event) {
      let ev = new KeyboardEvent("keydown", {
        bubbles: true,
        key: "Enter"}
      );
      document.getElementById("nameEntry").dispatchEvent(ev);
    });

  d3.select("#showhierbutton")
    .on("click", function() {
      $("#showhier").show();
      let svgH = d3.select("#showhier")
        .attr("width", width)
        .attr("height", height);
      svgH.selectAll("g").remove();
      let data = makeDataV2(links, nodes);
      let hnodes = d3.hierarchy(data, d => d.kids);
      d3.tree().size([width*.8, height*.8])(hnodes);
      
      let g = svgH.append("g")
        .attr("transform", `translate(${width*.1}, ${height*.1})`);

      let lineMaker = d3.linkVertical().x(d => d.x).y(d => d.y);
      g.selectAll("path")
        .data(hnodes.links()).enter()
        .append("path")
          .attr("d", d => lineMaker(d))
          .attr("stroke", "red").attr("fill", "none");

      g.selectAll("circle")
        .data(hnodes.descendants())
        .enter()
        .filter(d => !d.data.name)
        .append("circle")
          .attr("r", 5)
          .attr("cx", d => d.x )
          .attr("cy", d => d.y );

      g.selectAll("text")
        .data(hnodes.descendants())
        .enter()
        .filter(d => d.data.name)
        .append("text")
          .attr("x", d => d.x)
          .attr("y", d => d.y)
          .attr("id", "htext")
          .attr("text-anchor", "middle")
          .attr("font-family", "monospace")
          .text(d => d.data.name);

      let txtNodes = g.selectAll("text").nodes();
      txtNodes.forEach(d => {
        let {x: x, y: y, width:w, height: h} = d.getBBox();
        g.append("rect")
          .attr("x", x)
          .attr("y", y)
          .attr("width", w)
          .attr("height", h)
          .attr("fill", "white");
      })

      g.selectAll("text").raise();

    });

  d3.select("#deletenode")
    .on("click", function() {
      newNodeMode = false;
      let selId = selectedNodeId;
      [nodes, links] = deleteNode(selId, nodes, links);
      $("#deletenode").hide();

      fromNode.attr("stroke", "#000");
      fromNode = undefined;
      selectedNodeId = undefined;

      node = node
      .data(nodes)
      .join(
        enter => enter.append("circle").attr("r", 0)
          .call(enter => enter.transition().attr("r", d => d.r))
          .attr("stroke-width", settings.leaf.sw),
        update => update,
        exit => exit.remove()
      )
      .call(nodeCallbacks);

      link = link
        .data(links)
        .join("line");

      simulation.nodes(nodes);
      simulation.force("links")(links);
      simulation.alpha(1).restart();
    });

  const simulation = d3.forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(-15).distanceMax(50))
    .force("cforce", d3.forceCenter(width/2, height/2))
    .force("links", d3.forceLink().id(d => d.id))
    .alphaDecay(0.1);

  function nodeCallbacks(node) {
    return node
      .on("click.node", function(event) {
        let el = d3.select(this);
        if (selectedNodeId === el.datum().id) {
          $("#deletenode").hide();
          el.attr("stroke", "#000");
          selectedNodeId = undefined;
          fromNode = undefined;
          newNodeMode = false;
        } else if (!fromNode) {
          selectedNodeId = d3.select(this).datum().id;
          fromNode = el;
          el.attr("stroke", "steelblue");
          newNodeMode = true;
          $("#deletenode").show();
        } else {
          toNode = el;
          fromNode.attr("stroke", "steelblue");
          newNodeMode = true;
          $("#deletenode").show();
        }
      })
      .on("dblclick.node", function(event) {
        let el = d3.select(this);
        let val = el.select("title").node()?el.select("title").text():"";
        //d3.select("#name").style("opacity", 1);
        $("#name").show();
        nameEntry.property("value",val?val:"");
        document.getElementById('nameEntry').focus();
        nameUpdateNode = el;
      });
    }

  const svg = d3.select("#makestructure")
    .attr("width", width)
    .attr("height", height)
    .on("mousemove", function(event) {
      const [x, y] = d3.pointer(event);
      cursorPosition = {x, y};
      simulation.alpha(0.3).restart();
    }).on("click.svg", function(event) {
      mouseLink.attr("visibility", "visible");

      if (fromNode) {
        const [sx, sy] = [fromNode.attr("cx"), fromNode.attr("cy")];
        const {x: tx, y: ty} = cursorPosition;

        let distance = Math.hypot(sx - tx, sy - ty);
        let n = {x: tx, y: ty, r: settings.leaf.r, type: "leaf",
                id: nodes.length};
        
        if (distance > minDistance || toNode) {
          if (!toNode) {
            nodes.push(n); 
          }
          
          fromNode
            .transition()
            .duration(500)
            .attr("fill", d => d.name?settings.entity.col[1]:settings.entity.col[0])
            .attr("r", settings.entity.r);

          nodes.map(function(d) {
            if (d.id === fromNode.datum().id) {
              d.type = "entity";
              //d.col = settings.entity.col;
              d.r = settings.entity.r;
              //d.sw = settings.entity.sw;
            }
            return d;
          });


          node = node
            .data(nodes)
            .join(
              enter => enter.append("circle").attr("r", 0)
                .call(enter => enter.transition().attr("r", d => d.r))
                .attr("stroke-width", settings.leaf.sw),
              update => update,
              exit => exit.remove()
            )
            .call(nodeCallbacks);
  
          if(toNode) {
            links.push({source: fromNode.datum(), target: toNode.datum()});
            toNode = undefined;
          } else {
            links.push({source: fromNode.datum(), target: n});
          }

          link = link
            .data(links)
            .join("line");
  
          $("#deletenode").hide();
  
          simulation.nodes(nodes);
          simulation.force("links")(links);
          simulation.alpha(1).restart();
        }       
        
      if (distance > maxDistance && fromNode) {
        newNodeMode = false;
        fromNode.attr("stroke", "#000");
        fromNode = undefined;
        selectedNodeId = undefined;
      }

      }
    });


  const mouseLink = svg.append("g")
    .append("line")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 1);

  let link = svg.append("g")
    .attr("stroke", "#999")
    .selectAll("line");

  const allNodes = svg.append("g");

  let node = allNodes
    .selectAll("circle")
    .data(nodes).enter()
    .append("circle")
      .attr("stroke", "#000")
      .attr("stroke-width", settings.entity.sw)
      .attr("fill", "none")
    .call(nodeCallbacks);
    
    
  simulation.on("tick", function(event) {

    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => d.r)
      .attr("fill", d => d.name?settings[d.type].col[1]:settings[d.type].col[0])
      //.attr("fill", d => d.col)
      .attr("stroke-width", d => settings[d.type].sw);
      //.attr("stroke-width", d => d.sw);

    link.attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    if(newNodeMode && fromNode) {
      mouseLink
        .attr("x1", fromNode.datum().x)
        .attr("y1", fromNode.datum().y)
        .attr("x2", cursorPosition.x)
        .attr("y2", cursorPosition.y);
    }

    if (!newNodeMode) {
      mouseLink.attr("visibility", "hidden");
    }
    
  });

}

function deleteNode(nodeId, nodes, links) {
  if (nodeId !== 0 ) {
    nodes = nodes.filter(d => d.id !== nodeId);
    links = links.filter(d => {
      return (d.source.id === nodeId || d.target.id === nodeId)?false:true;
    });
    
    let allNodes = {};
    nodes.forEach(function(d) { allNodes[d.id] = ({id: d.id, val: 0}); });

    links.forEach(l => {
      allNodes[l.source.id].val++;
      allNodes[l.target.id].val++;
    });

    _.forEach(allNodes, n => {
      if (n.val === 0) {
        [nodes, links] = deleteNode(n.id, nodes, links);
      }
    });

  }
  return [nodes, links];
}

function makeDataV2(links, nodes) {
  let start = nodes.filter(d => d.id === 0)[0];

  function getKids(tree) {
    let kids = links.filter(d => d.source.id === tree.id);
    let kidsList = [];
    for (const k in kids) {
      let newtree = nodes.filter(d => d.id === kids[k].target.id)
      kidsList.push(getKids(newtree[0]));
    }
    tree.kids = kidsList;
    return tree;
  }

  return getKids(start)

}

window.addEventListener("load", main);