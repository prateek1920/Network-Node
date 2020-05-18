import { Component, OnInit, Input } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { InterfaceService } from 'src/interfaces.service';

@Component({
  selector: 'app-ngx-modal',
  templateUrl: './ngx-modal.component.html',
  styleUrls: ['./ngx-modal.component.css']
})
export class NgxModalComponent implements OnInit {

  @Input() myInput: string;
  @Input() nodesInfo: JSON;
  @Input() name: string;
  nodesinterfaces: Object;

  constructor(private modalService: NgxSmartModalService,
              private interfaceService: InterfaceService) {
                interfaceService.getInterfacesData().subscribe( data => this.nodesinterfaces = data);
               }

  ngOnInit() {
    console.log('p')
    console.log(this.myInput);
  }

  closeModal() {
    this.modalService.closeLatestModal();
  }
}
