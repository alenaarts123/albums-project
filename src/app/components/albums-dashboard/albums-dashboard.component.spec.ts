import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsDashboardComponent } from './albums-dashboard.component';

describe('AlbumsDashboardComponent', () => {
  let component: AlbumsDashboardComponent;
  let fixture: ComponentFixture<AlbumsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumsDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
