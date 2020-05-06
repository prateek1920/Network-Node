import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'network-nodes';
  nodes: JSON;
  ImageName = "../assets/images/node_1.png";
  constructor (private httpClient: HttpClient, private modalService: NgbModal) {}

  ngOnInit(){
    this.httpClient.get('http://127.0.0.1:8080/').subscribe(
      (data: JSON) => {
        this.nodes = data;
        console.log(this.nodes);
      }

      
    )
  }

  myfunnc(event:any) {
    console.log(event.x);
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  openXl(content) {
    this.modalService.open(content, { size: 'xl' });
  }
}