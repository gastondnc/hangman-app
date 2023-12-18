import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input('message') message: string = '';
  @Input('type') type: 'winner' | 'loser' = 'winner';
  @Output('on-close') onCloseEmitter: EventEmitter<boolean> = new EventEmitter()

  public btnLabel: string = 'Close';


  constructor() {}


  onClose() {
    console.log('Cerrar')
    this.onCloseEmitter.emit(true)

  }


}


