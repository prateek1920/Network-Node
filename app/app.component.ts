import { Component, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { InterfaceService } from 'src/interfaces.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  modalName: string = "popuptwo";
  nodesDetails: Object = [
    {
      name: "nodes_1",
      status: "online",
      ip: "1.1.1.1"
    },
    {
      name: "nodes_2",
      status: "offline",
      ip: "1.1.1.2"
      }
  ]
  @ViewChildren('items') items: QueryList<ElementRef>; 
  title = 'network-nodes';
  nodes: JSON;
  nodedetails: JSON;
  constructor (
    public ngxSmartModalService: NgxSmartModalService,
    private httpClient: HttpClient, 
    private nodeinterfaces: InterfaceService) {
      nodeinterfaces.getInterfacesData().subscribe( data => this.nodedetails = data as JSON);
    }

  ngOnInit(){
    this.httpClient.get('http://127.0.0.1:8080/').subscribe(
      (data: JSON) => {
        this.nodes = data;
        console.log(this.nodes);
      } 
    )
  }
  
  onCLick(item: string) {
    console.log(item);
    this.ngxSmartModalService.getModal(item).open();
    this.ngxSmartModalService.setModalData(this.nodes, item);
  }
}