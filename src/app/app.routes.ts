import { Routes } from '@angular/router';
import { HomeComponent } from 'src/pages/home/home.component';
import { newSongComponent } from 'src/pages/newSong/newSong.component';
import { SongComponent } from 'src/pages/song/song.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'song/:id',
    component: SongComponent
  },
  {
    path: 'manage_song',
    component: newSongComponent
  },
  {
    path: 'manage_song/:id',
    component: newSongComponent
  },
];