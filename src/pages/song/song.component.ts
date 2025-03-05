import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-song',
  imports: [
    MatGridListModule
  ],
  templateUrl: './song.component.html',
  styleUrl: './song.component.scss'
})
export class SongComponent {
  youtubeLink: SafeResourceUrl;
  constructor(
    private _sanitizer: DomSanitizer,
    private router: Router
  ) {
    this.youtubeLink = this._sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/VnjdikpgR0E");
  }

  navigateToHome() {    
    this.router.navigateByUrl('/home');
  }

}
