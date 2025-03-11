import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    return this.http.get<ISong[]>("https://favretbe.onrender.com/songs");
  }
  
  getSongById$(songId: string): Observable<ISong> {
    return this.http.get<ISong>(`https://favretbe.onrender.com/songs/${songId}`);
  }

  addSong(song: ISong) {
    return this.http.post<ISong[]>("https://favretbe.onrender.com/songs", song);
  }

  editSong(song: ISong) {
    return this.http.put<ISong[]>(`https://favretbe.onrender.com/songs/${song.id}`, song);
  }

  removeSong(songId: number) {
    return this.http.delete<ISong[]>(`https://favretbe.onrender.com/songs/${songId}`);
  }
}
