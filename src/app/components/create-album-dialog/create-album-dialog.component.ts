import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../model/user.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-create-album-dialog',
  templateUrl: './create-album-dialog.component.html',
  styleUrls: ['./create-album-dialog.component.scss'],
})
export class CreateAlbumDialogComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  createAlbumForm: FormGroup;
  users: User[] = [];

  constructor(
    private userService: UsersService,
    private dialogRef: MatDialogRef<CreateAlbumDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { albumId: string }
  ) {
    this.createAlbumForm = new FormGroup({
      selectedUser: new FormControl(null, Validators.required),
      albumTitle: new FormControl('', Validators.required),
    });
  }

  get isSelectedUserInvalid(): boolean {
    return (
      this.createAlbumForm.controls['selectedUser'].invalid &&
      this.createAlbumForm.controls['selectedUser'].touched
    );
  }

  get isAlbumTitleInvalid(): boolean {
    return (
      this.createAlbumForm.controls['albumTitle'].invalid &&
      this.createAlbumForm.controls['albumTitle'].touched
    );
  }

  get isSaveButtonDisabled(): boolean {
    return !this.createAlbumForm.valid;
  }

  ngOnInit(): void {
    this.userService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: User[]) => {
        this.users = users;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  createAlbum(): void {
    this.dialogRef.close({
      userId: this.createAlbumForm.controls['selectedUser'].value,
      albumTitle: this.createAlbumForm.controls['albumTitle'].value,
    });
  }
}
