import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { SongService } from 'src/services/song.service';
import { tap } from 'rxjs/operators';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  imports: [
    MatGridListModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = 'FAVRET';
  displayedColumns: string[] = ['id', 'name', 'author', 'options'];
  dataSource: ISong[] = [];

  constructor(
    private router: Router,
    private songService: SongService
  ) {
    this.refreshData();
  }

  navigateTo(path: string) {
    this.router.navigateByUrl(path);
  }

  emitAction(action: 'play' | 'edit' | 'delete', element: ISong) {
    switch (action) {
      case 'play':
        this.router.navigateByUrl(`/song/${element.id}`);
        break;
      case 'edit':
        this.router.navigateByUrl(`/manage_song/${element.id}`);
        break;
      case 'delete':
        this.songService.removeSong(element.id!).pipe(
          tap(() => this.refreshData())
        ).subscribe();
        break;
      default:
        break;
    }
  }

  refreshData() {
    this.songService.getSongs$().subscribe((data) => {
      this.dataSource = data
    });
  }

}

export interface ISong {
  id?: number;
  name: string;
  author: string;
  lyrics: string;
  youtubeUrl: string | SafeResourceUrl;
  options?: {action: 'open' | 'edit' | 'delete', icon: string}[];
}
