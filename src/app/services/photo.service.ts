import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Photo } from '../model/photo.model';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private httpClient: HttpClient) {}

  getPhotos(albumId: string): Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
  }
}
