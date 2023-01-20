import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAlbumDialogComponent } from './delete-album-dialog.component';

describe('DeleteAlbumDialogComponent', () => {
  let component: DeleteAlbumDialogComponent;
  let fixture: ComponentFixture<DeleteAlbumDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAlbumDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAlbumDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
