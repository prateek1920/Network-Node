import { Component, AfterContentInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {
  title = 'd3-force-demo';
  width = window.innerWidth;
  height = window.innerHeight;
  nodeElements: any;
  textElements: any;
  linkElements: any;
  
  nodes = [
    { id : 1, label : 'node_1', ip : '1.1.1.1', status : 'online' },
    { id : 2, label : 'node_2', ip : '1.1.1.2', status : 'offline' },
    { id : 3, label : 'node_3', ip : '1.1.1.3', status : 'online' },
    { id : 4, label : 'node_4', ip : '1.1.1.4', status : 'online' },
    { id : 5, label : 'node_5', ip : '1.1.1.5', status : 'testing' },
    { id : 6, label : 'node_6', ip : '1.1.1.6', status : 'online' },
    { id : 7, label : 'node_7', ip : '1.1.1.7', status : 'testing' },
  ]

  links = [
    { target : 'node_1', source : 'node_5', strength : 0.1 },
    { target : 'node_7', source : 'node_2', strength : 0.1 },
    { target : 'node_3', source : 'node_6', strength : 0.1 },
    { target : 'node_6', source : 'node_1', strength : 0.1 },
    { target : 'node_4', source : 'node_7', strength : 0.1 },
    { target : 'node_1', source : 'node_4', strength : 0.1 },
    { target : 'node_7', source : 'node_5', strength : 0.1 }
  ]

  ngAfterContentInit() {
    const self = this;
    function getNeighbors(node) {
      console.log('fdfgdg',self.links);
      
      return self.links.reduce(function (neighbors, link) {
        console.log('Link :', link.target['label']);
          if (link.target['label'] === node.label){
            neighbors.push(link.source['label']);
          } else if (link.source['label'] === node.label) {
            neighbors.push(link.target['label'])
          }  
          return neighbors
        }, [node.label]
      )
    }

    function isNeighborLink(node, link) {
      return link.target.id === node.id || link.source.id === node.id
    }
    
    
    function getNeighborColor(node, neighbors) {
      if (Array.isArray(neighbors) && neighbors.indexOf(node.label) > -1) {
        return node.label === 'online' ? 'blue' : 'brown'
      }
    
      return node.label === 'online' ? 'skyblue' : 'gray'
    }
    
    
    function getLinkColor(node, link) {
      console.log(link);
      return isNeighborLink(node, link) ? 'green' : '#E5E5E5'
    }
    
    function getTextColor(node, neighbors) {
      console.log(neighbors.indexOf(node.label));
      console.log(Array.isArray(neighbors));  
      return Array.isArray(neighbors) && neighbors.indexOf(node.label) > -1 ? 'green' : 'black'
    }
    

    

    function getNodeColor(node) {
      if (node.status === 'online') {
        return 'green'
      } else if (node.status === 'offline') {
        return 'red'
      } else
        return 'orange'
    }
    function selectNode (selectedNode) {
      console.log(selectedNode);
      var neighbors = getNeighbors(selectedNode);
      console.log(this.nodeElements);
      
      nodeElements.attr('fill', function (node) { return getNeighborColor(node, neighbors) })
      textElements.attr('fill', function (node) { return getTextColor(node, neighbors) })
      linkElements.attr('stroke', function (d) { return getLinkColor(selectedNode, d) })
    }

    var div = d3.select('#container').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
    var svg = d3.select('#container').append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .style('border','1px solid black')
      .call(d3.zoom()
        .scaleExtent([1, 5])
        .translateExtent([[-100, -100], [this.width + 90, this.height + 100]])
        .on("zoom", function () {
        svg.attr("transform", d3.event.transform)
      }))
        .append("g")

    var linkForce = d3
      .forceLink()
      .id( function (link) { return link.label })
      .strength( function (link) { return link.strength })
      .distance( 120 )

    var simulation = d3
      .forceSimulation()
      .force('link', linkForce)
      .force('charge', d3.forceManyBody().strength(-120))
      .force('center', d3.forceCenter( this.width / 2, this.height / 2))

    var dragDrop = d3.drag().on('start', function (node) {
      node.fx = node.x
      node.fy = node.y
    }).on('drag', function (node) {
      simulation.alphaTarget(0.7).restart()
      node.fx = d3.event.x
      node.fy = d3.event.y
    }).on('end', function (node) {
      if (!d3.event.active) {
        simulation.alphaTarget(0)
      }
      node.fx = null
      node.fy = null
    })

    var linkElements = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(this.links)
      .enter().append('line')
        .attr('stroke-width', 3)
        .attr('stroke', 'darkgrey')
        .on('contextmenu', function(d) {
          d3.event.preventDefault();
          if(d3.event.button == 2)
          {
          // tooltip to show neighbors info
            console.log(d.target.id);
            alert('hi');    
          }
        })

    var nodeElements = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('rect')
      .data(this.nodes)
      .enter().append('rect')
        .attr('width', 20)
        .attr('height', 20)
        .attr('fill', getNodeColor)
        .call(dragDrop)
        .on('click', selectNode)
        .on('mouseover', function(d) {
          div.transition()
            .duration(200)
            .style('opacity', 0.9);
          div.html( `<h4> Name : ${d.label} </h4>
                     <h4>Status : ${d.status} </h4>
                     <h4>IP : ${d.ip} </h4>` )
            .style('left', d3.event.pageX + 'px')
            .style('top', d3.event.pageY + 'px')
        })
        .on('mouseout', function() {
          div.transition()
            .duration(200)
            .style('opacity', 0);
        })

    var textElements = svg.append('g')
      .attr('class', 'texts')
      .selectAll('text')
      .data(this.nodes)
      .enter().append('text')
        .text(function (node) { return node.label})
        .attr('font-size', 15)
        .attr('dx', 25)
        .attr('dy', 15)

    simulation.nodes(this.nodes).on('tick', () => {
      nodeElements
        .attr('x', function(node) { return node.x})
        .attr('y', function(node) { return node.y})

      textElements
        .attr('x', function(node) { return node.x})
        .attr('y', function(node) { return node.y})

      linkElements
        .attr('x1', function(link) { return link.source.x + 10 })
        .attr('y1', function(link) { return link.source.y + 10 })
        .attr('x2', function(link) { return link.target.x + 10 })
        .attr('y2', function(link) { return link.target.y + 10 })
    })

    simulation.force('link').links(this.links)
    }


    

  
}
