import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ISong } from '../home/home.component';
import { SongService } from 'src/services/song.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-song',
  imports: [
    MatGridListModule
  ],
  templateUrl: './song.component.html',
  styleUrl: './song.component.scss'
})
export class SongComponent {
  data?: ISong;
  constructor(
    private _sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute,
    private songService: SongService
  ) {
    this.route.snapshot.params['id'] && songService.getSongById$(this.route.snapshot.params['id']).pipe(
      tap((song) => {
        this.data = {
          ...song,
          youtubeUrl: this._sanitizer.bypassSecurityTrustResourceUrl(this.convertYoutubeUrl(song.youtubeUrl as string))
        };
      })
    ).subscribe();
  }

  navigateToHome() {    
    this.router.navigateByUrl('/home');
  }

  convertYoutubeUrl(url: string): string {
    const regExp = /^.*(youtu\.be\/|v\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
  
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    } else {
      return ''; // URL non valido o ID video non trovato
    }
  }

}
