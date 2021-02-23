import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShevCommonComponent } from './shev-common.component';

describe('ShevCommonComponent', () => {
  let component: ShevCommonComponent;
  let fixture: ComponentFixture<ShevCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShevCommonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShevCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
