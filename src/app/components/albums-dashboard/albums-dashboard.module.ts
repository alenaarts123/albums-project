import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlbumsDashboardComponent} from "./albums-dashboard.component";
import {AlbumsService} from "../../services/albums.service";
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDialogModule} from '@angular/material/dialog';
import {DeleteAlbumDialogComponent} from "../delete-album-dialog/delete-album-dialog.component";
import {CreateAlbumDialogComponent} from "../create-album-dialog/create-album-dialog.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {AlbumComponent} from "../album/album.component";
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {EditAlbumDialogComponent} from "../edit-album-dialog/edit-album-dialog.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule

  ],
  providers: [AlbumsService],
  declarations: [AlbumsDashboardComponent,
    DeleteAlbumDialogComponent,
  CreateAlbumDialogComponent,
    EditAlbumDialogComponent,
    AlbumComponent],
  exports: [AlbumsDashboardComponent,
    DeleteAlbumDialogComponent,
  CreateAlbumDialogComponent,
    EditAlbumDialogComponent,
    AlbumComponent]
})
export class AlbumsDashboardModule {
}
