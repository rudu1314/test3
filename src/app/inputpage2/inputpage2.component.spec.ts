import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inputpage2Component } from './inputpage2.component';

describe('Inputpage2Component', () => {
  let component: Inputpage2Component;
  let fixture: ComponentFixture<Inputpage2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inputpage2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Inputpage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
