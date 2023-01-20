import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlbumsService } from '../../services/albums.service';
import { Album } from '../../model/album.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAlbumDialogComponent } from '../delete-album-dialog/delete-album-dialog.component';
import { CreateAlbumDialogComponent } from '../create-album-dialog/create-album-dialog.component';
import { Router } from '@angular/router';
import { EditAlbumDialogComponent } from '../edit-album-dialog/edit-album-dialog.component';
import { skipEmpty } from '../../utils/rxjs-utils';
import { Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'albums-dashboard',
  templateUrl: './albums-dashboard.component.html',
  styleUrls: ['./albums-dashboard.component.scss'],
})
export class AlbumsDashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  albums: Album[] = [];

  constructor(
    private albumsService: AlbumsService,
    private deleteAlbumDialog: MatDialog,
    private createAlbumDialog: MatDialog,
    private editAlbumDialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.albumsService.getAlbums().subscribe((albums: Album[]) => {
      this.albums = albums;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openAlbumDeleteDialog(albumId: string): void {
    const dialogRef = this.deleteAlbumDialog.open(DeleteAlbumDialogComponent, {
      disableClose: true,
      data: { albumId },
    });
    dialogRef
      .afterClosed()
      .pipe(
        skipEmpty(),
        switchMap((albumId) => this.albumsService.deleteAlbum(albumId)),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        const deletedAlbumIndex = this.albums.findIndex((album: Album) => album.id === albumId);
        this.albums.splice(deletedAlbumIndex, 1);
      });
  }

  openAlbumCreateDialog(): void {
    const dialogRef = this.deleteAlbumDialog.open(CreateAlbumDialogComponent, {
      disableClose: true,
      data: {},
    });
    dialogRef
      .afterClosed()
      .pipe(
        skipEmpty(),
        switchMap((data) => this.albumsService.createAlbum(data.userId, data.albumTitle)),
        takeUntil(this.destroy$)
      )
      .subscribe((createdAlbum) => {
        this.albums.push(createdAlbum);
      });
  }

  openEditAlbumDialog(album: Album): void {
    const dialogRef = this.editAlbumDialog.open(EditAlbumDialogComponent, {
      disableClose: true,
      data: album,
    });
    dialogRef
      .afterClosed()
      .pipe(
        skipEmpty(),
        switchMap((data) => {
          return this.albumsService.updateAlbum(data);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((updatedAlbum) => {
        let indexOfUpdatedAlbum = this.albums.findIndex((album) => album.id === updatedAlbum.id);
        this.albums[indexOfUpdatedAlbum] = updatedAlbum;
      });
  }

  goToAlbum(albumId: string): void {
    this.router.navigate(['/album', albumId]);
  }
}
