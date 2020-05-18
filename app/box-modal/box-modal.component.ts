import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-box-modal',
  templateUrl: './box-modal.component.html',
  styleUrls: ['./box-modal.component.css']
})
export class BoxModalComponent implements OnInit {

  constructor( private modalService: NgbModal ) { }

  ngOnInit(): void {
  }

}
