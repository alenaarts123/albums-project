import { Component, OnDestroy, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { Photo } from '../../model/photo.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  photos: Photo[] = [];

  constructor(private photoService: PhotoService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((paramMap: ParamMap) => {
          let albumId = paramMap.get('albumId');
          return this.photoService.getPhotos(String(albumId));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((photos: Photo[]) => {
        this.photos = photos;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goToHomePage(): void {
    this.router.navigate(['']);
  }
}
