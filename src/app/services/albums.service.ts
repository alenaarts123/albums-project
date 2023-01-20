import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from '../model/album.model';

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  constructor(private httpClient: HttpClient) {}

  getAlbums(): Observable<Album[]> {
    return this.httpClient.get<Album[]>('https://jsonplaceholder.typicode.com/albums');
  }

  deleteAlbum(albumId: string): Observable<void> {
    return this.httpClient.delete<void>(`https://jsonplaceholder.typicode.com/albums/${albumId}`);
  }

  updateAlbum(album: Album): Observable<Album> {
    return this.httpClient.put<Album>(`https://jsonplaceholder.typicode.com/albums/${album.id}`, {
      userId: album.userId,
      title: album.title,
      id: album.id,
    });
  }

  createAlbum(userId: string, albumTitle: string): Observable<Album> {
    return this.httpClient.post<Album>('https://jsonplaceholder.typicode.com/albums', {
      userId: userId,
      title: albumTitle,
    });
  }
}
