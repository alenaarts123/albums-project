import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AlbumsDashboardComponent} from "./components/albums-dashboard/albums-dashboard.component";
import {AlbumComponent} from "./components/album/album.component";

const routes: Routes = [

  { path: '', component: AlbumsDashboardComponent},
  { path: 'album/:albumId', component: AlbumComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
