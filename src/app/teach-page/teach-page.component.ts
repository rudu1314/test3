import { ExampleService } from './../@services/example.service';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router';
import { Component1Component } from '../component1/component1.component';
import { Component2Component } from '../component2/component2.component';

@Component({
  selector: 'app-teach-page',
  imports: [
    RouterOutlet,
    Component1Component,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    Component2Component,
  ],
  templateUrl: './teach-page.component.html',
  styleUrl: './teach-page.component.scss',
})
export class TeachPageComponent {
  productName: string = 'Angular 17';
  price: number = 1000;
  isCount: boolean = true;
  name: string = 'John Doe';
  age: number = 20;
  target: string = 'https://www.google.com.tw/index.html?zx=1791787457263';
  myTitle: string = '你好我是';
  myContent: string = '我是內容';
  catPicUrl: string =
    'https://th.bing.com/th/id/OIP.Zjs4m1jESZs8p9zNwDQxOgHaEo?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3';
  number: number[] = [1, 2, 3, 4, 5];
  day: Date = new Date();
  priceStr: string = '250';

  priceNum = Number(this.priceStr);
  priceNum2 = this.priceNum - 50;
  priceStr2 = String(this.priceNum2);

  array1: number[] = [4, 6, 1, 2, 7, 9, 12, 15, 13];
  score: number[] = [10, 20, 30];
  inputData!: string;
  inputNumber!: number;

  isLocked: boolean = false;

  level: number = 1;
  def: number = 10;
  atk: number = 10;
  isLogin: boolean = false;

  exampleService = inject(ExampleService);
  userName!: string;
  userEmail!:string;

  pass!: number;



  showalert(data: string) {
    alert(data);
  }

  constructor(private rotuer: Router) {}
  changePage() {
    this.rotuer.navigateByUrl('/comp2');
  }

  checkUser() {
    if (this.isLogin) {
      this.rotuer.navigateByUrl('/comp2');
    } else {
      alert('未登入，跳轉失敗');
    }
  }

  levelUp() {
    this.level = this.level + 1;
    this.def = this.def + 3;
    this.atk = this.def + 2;
  }

  levelDown() {
    this.level = this.level - 1;
    this.def = this.def - 3;
    this.atk = this.def - 2;
  }

  setLevel() {
    this.level = this.inputNumber;
    this.def = 10 + (this.inputNumber - 1) * 3;
    this.atk = 10 + (this.inputNumber - 1) * 2;
  }

  changeImg() {
    this.catPicUrl =
      'https://media.istockphoto.com/id/507256954/photo/black-cat-close-up.jpg?s=170667a&w=0&k=20&c=4FidgB9_mC22UOwktow1rm_9VRr_jc_xrgIkGpDyG7E=';
    this.showAlert('B');
  }

  showAlert(text: string = '') {
    alert(text);
  }

  welcomeMessage() {
    alert('Welcome to Angular 17!');
  }

  sayHello(studentName: string) {
    console.log('Hello, ' + studentName + '!');
  }

  getArea(side: number): number {
    return side * side;
  }

  showArea(side2: number) {
    const area = this.getArea(side2);
    alert('Area: ' + area);
  }

  jsontest: any = {
    name: 'John Doe',
    age: 30,
    city: 'New York',
  };

  jsontest2: any = {
    course: 'Angular',
    isLTS: true,
  };
  jsonStr = JSON.stringify(this.jsontest2);
  jsonObj = JSON.parse(this.jsonStr);

  myTitle2: string = '你好我是Allen';
  arr: string[] = [];
  e = 0;

  age2 = 20;
  hasTicket = true;

  ngOnInit(): void {
    this.userName = this.exampleService.userNameService;
    this.pass = this.exampleService.userPassService;
    let str1: string = '10';
    let num1: number = parseInt(str1);
    console.log('num1:', num1);
    console.log('json:', this.jsontest);
    console.log(this.myTitle.indexOf('我'));
    console.log(this.priceNum);
    console.log(this.priceStr2);
    console.log(this.jsonStr);
    let e = 10000;
    for (let i of this.array1) {
      if (i < e) {
        e = i;
      }
    }
    console.log('Minimum value:', e);

    this.score.push(40);
    let t = 0;
    for (let i of this.score) {
      if (i >= 15) {
        t = t + i;
      }
    }
    console.log(t);

    for (let i = this.myTitle2.length; i >= 0; i--) {
      this.arr[e] = this.myTitle2[i - 1];
      e = e + 1;
    }
    let final = this.arr.join('');
    console.log(final);

    if (this.age2 >= 20 && this.hasTicket == true) {
      console.log('成功入場');
    } else {
      console.log('入場失敗');
    }

    let deadline = new Date('2026/12/31');
    let now = new Date();
    if (deadline.getTime() <= now.getTime()) {
      alert('已過期');
    } else {
      console.log('時間未到');
    }

    let backendProducts = [
      { prod_id: 101, title: '滑鼠' },
      { prod_id: 102, title: '鍵盤' },
    ];
    let front = backendProducts.map((item) => {
      return { id: item.prod_id, name: item.title };
    });
    console.log(front);

    let h = 170 / 100;
    let w = 65;
    let bmi = w / (h * h);
    if (bmi < 18.5) {
      console.log('過輕' + bmi);
    } else if (bmi < 24) {
      console.log('正常' + bmi);
    } else if (bmi < 27) {
      console.log('過重' + bmi);
    }
  }
}
