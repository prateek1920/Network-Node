import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeNetworkComponent } from './node-network/node-network.component';



@NgModule({
  declarations: [NodeNetworkComponent],
  imports: [
    CommonModule
  ],
  exports: [
    NodeNetworkComponent
  ]
})
export class ViewPanelModule { }
