import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { SongService } from 'src/services/song.service';

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
    this.songService.getSongs$().subscribe((data) => {
      this.dataSource = data
    });
  }

  navigateTo(path: string) {
    this.router.navigateByUrl(path);
  }

  emitAction(action: 'play' | 'edit' | 'delete', element: ISong) {
    switch (action) {
      case 'play':
        this.router.navigateByUrl('/song');        
        break;
      case 'edit':
        break;
      default:
        break;
    }
  }

}

export interface ISong {
  id?: number;
  name: string;
  author: string;
  lyrics: string;
  youtubeUrl: string;
  options?: {action: 'open' | 'edit' | 'delete', icon: string}[];
}
