import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinksinfoService {
  links = [
    { target : 'node_8', source : 'node_5', strength : 0.1 },
    { target : 'node_3', source : 'node_8', strength : 0.1 },
    { target : 'node_8', source : 'node_2', strength : 0.1 },
    { target : 'node_3', source : 'node_6', strength : 0.1 },
    { target : 'node_6', source : 'node_1', strength : 0.1 },
    { target : 'node_4', source : 'node_7', strength : 0.1 },
    { target : 'node_1', source : 'node_4', strength : 0.1 },
    { target : 'node_7', source : 'node_5', strength : 0.1 },
  ]
  constructor() { }

  getLinksInfo() {
    return this.links;
  }
  
}
