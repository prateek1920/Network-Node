import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BoxModalComponent } from './box-modal/box-modal.component';
import { ModalComponent } from './modal/modal.component';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { NgxModalComponent } from './ngx-modal/ngx-modal.component';
import { InterfaceService } from 'src/interfaces.service';

@NgModule({
  declarations: [
    AppComponent,
    BoxModalComponent,
    ModalComponent,
    NgxModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgxSmartModalModule.forRoot()
  ],
  providers: [NgxSmartModalService, InterfaceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
