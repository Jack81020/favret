import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import *  as db from '../../db.json';
import { Observable, of } from 'rxjs';
import { ISong } from 'src/pages/home/home.component';

@Injectable({
  providedIn: 'any'
})
export class SongService {

  constructor(
    private http: HttpClient
  ) { }

  getSongs$(): Observable<ISong[]> {
    return of(db.songs || [])
  }

  addSong(song: any) {
    db.songs.push({
      id: Math.max(...db.songs.map((currSong) => currSong.id))+1,
      ...song
    });
  }

  editSong(song: any) {
    let oldSong = db.songs.find((currSong) => currSong.id = song.id);
    oldSong = song;
  }

  removeSong(song: ISong) {
    //db.songs = db.songs.filter((currSong) => currSong.id !== song.id)
  }
}
