import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ViewPanelModule } from './view-panel/view-panel.module';
import { LinksinfoService } from './linksinfo.service';
import { NodesinfoService } from './nodesinfo.service';
import { NodePanelService } from './node-panel.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ViewPanelModule,
    HttpClientModule
  ],
  providers: [NodesinfoService, LinksinfoService, NodePanelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
