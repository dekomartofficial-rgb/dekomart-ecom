import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterpagerenderComponent } from './footerpagerender.component';

describe('FooterpagerenderComponent', () => {
  let component: FooterpagerenderComponent;
  let fixture: ComponentFixture<FooterpagerenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterpagerenderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterpagerenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
