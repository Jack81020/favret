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

  private endpoint: string = "https://favretbe.onrender.com";//"http://localhost:3000"

  getSongs$(): Observable<ISong[]> {
    return this.http.get<ISong[]>(`${this.endpoint}/songs`);
  }
  
  getSongById$(songId: string): Observable<ISong> {
    return this.http.get<ISong>(`${this.endpoint}/songs/${songId}`);
  }

  addSong(song: ISong) {
    return this.http.post<ISong[]>(`${this.endpoint}/songs`, song);
  }

  editSong(song: ISong) {
    return this.http.put<ISong[]>(`${this.endpoint}/songs/${song._id}`, song);
  }

  removeSong(songId: number) {
    return this.http.delete<ISong[]>(`${this.endpoint}/songs/${songId}`);
  }
}
