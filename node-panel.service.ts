import { Injectable } from '@angular/core';
import * as d3 from "d3";
import { jsPanel } from 'node_modules/jspanel4/es6module/jspanel.min.js';
import { InterfacesService } from './interfaces.service';
import * as $ from "jquery";
var interfaces: Object = {};
@Injectable({
  providedIn: 'root'
})
export class NodePanelService {
  
  constructor( private _interfaces: InterfacesService) {
    this._interfaces.getInterfacesInfo().subscribe(data => interfaces = data);
   }  

  
  getNodePanel(nodes, links, width, height) {
    
    function newMethod(arg, arg1) {
      console.log(arg1);
      jsPanel.create({ 
        headerTitle: arg.name,
        content: `<div id = "node_interfaces"></div>
        <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Ifindex</th>
            <th scope="col">Name</th>
            <th scope="col">Status</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody id= 'table_body'>
        </tbody>
      </table>`,
        contentSize: { width: 600 , height: 400},
        position: 'center', 
        theme: 'primary',
        callback : function() {
          console.log(arg1['ports']);
          var node_interfaces = d3.select('#node_interfaces')
          .attr('align', "center")
          .append('svg')
          .attr('width', 490)
          .attr('height', 80)
          .style('border','1px solid black');

          node_interfaces.append('g')
            .attr('class', 'node_interfaces')
            .selectAll('rect')
            .data(arg1['ports'])
            .enter().append('rect')
            .attr('width', function(d, i) { return d['coords'].w })
            .attr('height', function(d, i) { return d['coords'].h } )
            .attr('x', function(d, i) { return d['coords'].x } )
            .attr('y', function(d, i) { return d['coords'].y} )
            .attr('fill', function(d) {
              if(d.status === 'online') {
                return 'green'
              }
              if(d.status === 'offline') {
                return 'red'
              }
              if(d.status === 'testing') {
                return 'orange'
              }
            });
          var tbody = $('#table_body');
          $.each(arg1['ports'], function (i, item) {
              $('<tr>').append(
                  $('<td>').text(item.ifindex),
                  $('<td>').text(item.name),
                  $('<td>').text(item.status),
                  $('<td>').text(item.description)).appendTo(tbody);
          });
        } 
      });
    }

    function getNeighbors(node) {
      return links.reduce(function (neighbors, link) {
        console.log('Link :', link.target['name']);
          if (link.target['name'] === node.name){
            neighbors.push(link.source['name']);
          } else if (link.source['name'] === node.name) {
            neighbors.push(link.target['name'])
          }  
          return neighbors
        }, [node.name]
      )
    }

    function isNeighborLink(node, link) {
      return link.target.id === node.id || link.source.id === node.id
    }
    
    
    function getNeighborColor(node, neighbors) {      
      if (Array.isArray(neighbors) && neighbors.indexOf(node.name) > -1) {
        return 'black'
      }
    }
    
    
    function getLinkColor(node, link) {
      console.log(link);
      return isNeighborLink(node, link) ? 'green' : '#E5E5E5'
    }
    
    function getTextColor(node, neighbors) {
      return Array.isArray(neighbors) && neighbors.indexOf(node.name) > -1 ? 'green' : 'black'
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
      var neighbors = getNeighbors(selectedNode);
      console.log(neighbors);
      
      nodeElements.attr('stroke', function (node) { return getNeighborColor(node, neighbors) })
      textElements.attr('fill', function (node) { return getTextColor(node, neighbors) })
      linkElements.attr('stroke', function (d) { return getLinkColor(selectedNode, d) })
    }
  
    var div = d3.select('#container').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    var svg = d3.select('#container').append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('border','1px solid black')
      .call(d3.zoom()
        .scaleExtent([1, 5])
        .translateExtent([[-100, -100], [width + 90, height + 100]])
        .on("zoom", function () {
          svg.attr("transform", d3.event.transform)
      }))
      .on('dblclick.zoom', null)
      .append("g");

    var linkForce = d3
      .forceLink()
      .id( function (link) { return link.name })
      .strength( function () { return 0.1 })
      .distance( 150 );

    var simulation = d3
      .forceSimulation()
      .force('link', linkForce)
      .force('charge', d3.forceManyBody().strength(-120))
      .force('center', d3.forceCenter( width / 2, height / 2));

    var dragDrop = d3.drag().on('start', function (node) {
        node.fx = node.x
        node.fy = node.y
      }).on('drag', function (node) {
        simulation.alphaTarget(0.7).restart()
        node.fx = d3.event.x
        node.fy = d3.event.y
        fix_nodes(node);
      }).on('end', function (node) {
        if (!d3.event.active) {
          simulation.alphaTarget(0)
        }
        node.fx = node.x
        node.fy = node.y
      })

    function fix_nodes(this_node) {
      nodeElements.each(function(d) {
        if (this_node != d) {
          d.fx = d.x;
          d.fy = d.y;
        }
      });
    }


    var linkElements = svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(links)
      .enter().append("line")
        .attr("stroke-width", 3)
        .attr("stroke", "darkgrey")
        .on('contextmenu', function(d) {
          d3.event.preventDefault();
          if(d3.event.button == 2)
          {
          // tooltip to show neighbors info
            console.log(d.target.id);
            alert('hi');    
          }
        });
    
    var nodeElements = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('rect')
      .data(nodes)
      .enter().append('rect')
        .attr('width', 20)
        .attr('height', 20)
        .attr('fill', getNodeColor)
        .call(dragDrop)
        .on('dblclick', function(d) {
          newMethod(d, interfaces[d.id - 1]);
        })
        .on('click', selectNode)
        .on('mouseover', function(d) {
          div.transition()
            .duration(200)
            .style('opacity', 0.9);
          div.html(`Name : ${d.name} <br>
                    Status : ${d.status} <br>
                    IP : ${d.ip_address} <br>` )
            .style('left', d3.event.pageX + 'px')
            .style('top', d3.event.pageY + 'px')
        })
        .on('mouseout', function() {
          div.transition()
            .duration(200)
            .style('opacity', 0);
        });

    var textElements = svg.append('g')
      .attr('class', 'texts')
      .selectAll('text')
      .data(nodes)
      .enter().append('text')
        .text(function (node) { return node.name})
        .attr('font-size', 15)
        .attr('dx', 25)
        .attr('dy', 15);

      simulation.nodes(nodes).on('tick', () => {
      nodeElements
        .attr('x', function(node) { return node.x})
        .attr('y', function(node) { return node.y})

      textElements
        .attr('x', function(node) { return node.x})
        .attr('y', function(node) { return node.y})

      linkElements
        .attr('x1', function(link) { 
          return link.source.x + 10 
        })
        .attr('y1', function(link) { return link.source.y + 10 })
        .attr('x2', function(link) { return link.target.x + 10 })
        .attr('y2', function(link) { return link.target.y + 10 })
    });

    simulation.force('link').links(links)

    }

  
}
