import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-album-dialog',
  templateUrl: './delete-album-dialog.component.html'
})
export class DeleteAlbumDialogComponent {
  albumId = '';

  constructor(private dialogRef: MatDialogRef<DeleteAlbumDialogComponent>, @Inject(MAT_DIALOG_DATA) data: { albumId: string }) {
    this.albumId = data.albumId;
  }

  deleteAlbum(): void {
    this.dialogRef.close(this.albumId);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
