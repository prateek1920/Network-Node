import { Component, OnInit, AfterContentInit, ViewEncapsulation } from '@angular/core';
import { NodesinfoService } from '../../nodesinfo.service';
import { LinksinfoService } from '../../linksinfo.service';
import { NodePanelService } from 'src/app/node-panel.service';

@Component({
  selector: 'app-node-network',
  templateUrl: './node-network.component.html',
  styleUrls: ['./node-network.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NodeNetworkComponent implements OnInit, AfterContentInit {
  width = window.innerWidth;
  height = window.innerHeight;
  nodes = [];
  links = [];

  constructor( private _nodesInfo: NodesinfoService, 
               private _linksInfo: LinksinfoService,
               private _nodePanel: NodePanelService ) { 

               }

  ngOnInit(): void {    
  }

  ngAfterContentInit() {
    this.links = this._linksInfo.getLinksInfo();
    console.log(this.links);
    this._nodesInfo.getNodesInfo().subscribe((data) => {
      this.nodes = data;
      console.log(this.links,this.width, this.height,this.nodes);
      this._nodePanel.getNodePanel(this.nodes,this.links,this.width, this.height);
    });
  }
  
}
