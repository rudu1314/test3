import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-inputpage2',
  imports: [],
  templateUrl: './inputpage2.component.html',
  styleUrl: './inputpage2.component.scss',
})
export class Inputpage2Component {
  @Input() userName2!: string;
  @Input() userEmail2!: string;
}
