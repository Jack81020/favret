import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ISong } from 'src/pages/home/home.component';

@Injectable({
  providedIn: 'any'
})
export class SongService {

  constructor(
    private http: HttpClient
  ) { }

  getSongs$(): Observable<ISong[]> {
    return this.http.get<ISong[]>("http://localhost:3000/songs");
  }
  
  getSongById$(songId: string): Observable<ISong> {
    return this.http.get<ISong>(`http://localhost:3000/songs/${songId}`);
  }

  addSong(song: ISong) {
    return this.http.post<ISong[]>("http://localhost:3000/songs", song);
  }

  editSong(song: ISong) {
    return this.http.put<ISong[]>(`http://localhost:3000/songs/${song.id}`, song);
  }

  removeSong(songId: number) {
    return this.http.delete<ISong[]>(`http://localhost:3000/songs/${songId}`);
  }
}
