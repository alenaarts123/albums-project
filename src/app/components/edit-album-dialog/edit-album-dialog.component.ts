import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Album } from '../../model/album.model';
import { UsersService } from '../../services/users.service';
import { User } from '../../model/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-album-dialog',
  templateUrl: './edit-album-dialog.component.html'
})
export class EditAlbumDialogComponent {
  selectedUserId = '';
  albumTitle = '';
  users: User[] = [];
  albumForEdit: Album;

  editAlbumForm: FormGroup;

  constructor(
    private userService: UsersService,
    private dialogRef: MatDialogRef<EditAlbumDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: Album
  ) {
    this.albumForEdit = data;
    this.editAlbumForm = new FormGroup({
      albumTitle: new FormControl(this.albumForEdit.title, Validators.required),
    });
  }

  updateAlbum(): void {
    let updatedAlbum: Album = {
      userId: this.selectedUserId,
      id: this.albumForEdit.id,
      title: this.editAlbumForm.controls['albumTitle'].value,
    };
    this.dialogRef.close(updatedAlbum);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  get isAlbumTitleInvalid(): boolean {
    return this.editAlbumForm.controls['albumTitle'].invalid && this.editAlbumForm.controls['albumTitle'].touched;
  }

  get isSaveButtonDisabled(): boolean {
    return !this.editAlbumForm.valid;
  }
}
