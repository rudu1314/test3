import { ExampleService } from './../@services/example.service';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Component1Component } from '../component1/component1.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-component2',
  imports: [
    RouterOutlet,
    Component1Component,
    Component2Component,
    FormsModule,
    
  ],
  templateUrl: './component2.component.html',
  styleUrl: './component2.component.scss',
})
export class Component2Component {
  h!: number;
  w!: number;
  final: string = '';
  bmi = 0;
  href: string = 'bmi.png';

  bmiSet() {
    this.bmi = this.w / ((this.h / 100) * (this.h / 100));
    if (this.bmi < 18.5) {
      this.final = '過輕' + this.bmi;
    } else if (this.bmi < 24) {
      this.final = '正常' + this.bmi;
    } else if (this.bmi < 27) {
      this.final = '過重' + this.bmi;
    } else {
      this.final = '數據異常' + this.bmi;
    }
  }
  router = inject(Router);
  exampleService = inject(ExampleService);

  name!: string;
  passWord!: number;
  @Output() outputEmit =new EventEmitter<string>();
  @Output() outputEmit2 =new EventEmitter<string>();
  outputData(){
    let data ='eirc';
    this.outputEmit.emit(data);
  }

   outputData2(){
    let data ='eirc';
    this.outputEmit.emit(data);
  }

  //   goSecond() {
  //     this.exampleService.userNameService = 'allen';
  //     this.router.navigateByUrl('/test');
  //   }

  login() {
    this.exampleService.userNameService = this.name;
    this.exampleService.userPassService = this.passWord;
    this.router.navigateByUrl('/test');
  }

  ngOnInit(): void {}
}
