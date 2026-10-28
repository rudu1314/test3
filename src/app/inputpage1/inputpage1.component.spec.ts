import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inputpage1Component } from './inputpage1.component';

describe('Inputpage1Component', () => {
  let component: Inputpage1Component;
  let fixture: ComponentFixture<Inputpage1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inputpage1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Inputpage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
