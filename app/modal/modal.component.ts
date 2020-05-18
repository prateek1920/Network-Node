import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  index = 1;
  selectedIndex = -1;
  constructor(private el: ElementRef) { }

  ngOnInit(): void {
  }

  openModal(id: number) {
    console.log(id);
    this.selectedIndex = id;
  }

  remClass() {
    console.log(this.el.nativeElement);
  }
}
