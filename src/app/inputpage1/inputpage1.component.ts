import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Inputpage2Component } from '../inputpage2/inputpage2.component';

@Component({
  selector: 'app-inputpage1',
  imports: [FormsModule, Inputpage2Component],
  templateUrl: './inputpage1.component.html',
  styleUrl: './inputpage1.component.scss',
})
export class Inputpage1Component {
  userName!: string;
  userEmail!: string;
  localName!: string;
  displayTitle!: string;
  array = [
    { id: 1, name: 'a' },
    { id: 2, name: 'b' },
  ];
  array2 = [
    { id: 1, name: 'a', userData: [{ userId: '01' }] },
    { id: 2, name: 'b', userData: [{ userId: '02' }] },
  ];

  userArray = [
    {
      userName: '玩家A',
      lev: 10,
      props: [
        { propsName: '蘑菇', amount: 5 },
        { propsName: '金幣', amount: 15 },
      ],
    },

    {
      userName: '玩家B',
      lev: 15,
      props: [
        { propsName: '龜殼', amount: 1 },
        { propsName: '砲彈', amount: 15 },
      ],
    },
  ];

  role: string = 'VIP';

  saveButton() {
    localStorage.setItem('cached_user', this.localName);
  }

  ngOnInit(): void {
    this.displayTitle = localStorage.getItem('cached_user') || '訪客';

    switch (this.role) {
      case 'VIP':
        console.log('vip');
        break;
      case 'mvp':
        console.log('mvp');
        break;
    }
  }
}
