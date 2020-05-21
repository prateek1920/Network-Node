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
  selectedrowid: string;
  rectelement: HTMLElement;

  constructor(private modalService: NgxSmartModalService) { }

  ngOnInit() { }

  closeModal() {
    this.modalService.closeLatestModal();
  }

  highlightRow(event) {
    (event.target as SVGRectElement ).style.stroke = '#ccc';
    (event.target as SVGRectElement ).style.strokeWidth = '3';
    console.log(event.target);
    this.selectedrowid = 'id' + event.target.id;
    console.log(this.selectedrowid);
    const element = document.getElementById(this.selectedrowid);
    element.style.backgroundColor = 'rgb(129, 173, 255)';
    element.scrollIntoView();
  }

  unHighlightRow(event) {
    (event.target as SVGRectElement ).style.stroke = '';
    (event.target as SVGRectElement ).style.strokeWidth = '';
    console.log(event.target);
    console.log(this.selectedrowid);
    const element2 = document.getElementById(this.selectedrowid);
    element2.style.backgroundColor = '';
  }

  highlightInterface(index: string) {
    this.rectelement = document.getElementById(index);
    this.rectelement.style.stroke = 'grey';
    this.rectelement.style.strokeWidth = '3';
  }

  unHighlightInterface() {
    this.rectelement.style.stroke = '';
    this.rectelement.style.strokeWidth = '';
  }
}
