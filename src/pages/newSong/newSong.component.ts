import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from 'src/services/song.service';
import { ISong } from '../home/home.component';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-song',
  imports: [
    MatGridListModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    TextFieldModule,
    MatInputModule
  ],
  templateUrl: './newSong.component.html',
  styleUrl: './newSong.component.scss'
})
export class newSongComponent {
  
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  public form?: FormGroup<any>;
  constructor(
    private _sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private songService: SongService
  ) {
    //this.youtubeLink = this._sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/VnjdikpgR0E");
    if (this.route.snapshot.params['id']) {
      songService.getSongById$(this.route.snapshot.params['id']).pipe(
        tap((song) => {
          this.form = this.formBuilder.group({
            name: [song.name, Validators.required],
            author: [song.author, Validators.required],
            youtubeUrl: [song.youtubeUrl, Validators.required],
            lyrics: [song.lyrics, Validators.required]
          })
        })
      ).subscribe();
    } else {
      this.form = this.formBuilder.group({
        name: ['', Validators.required],
        author: ['', Validators.required],
        youtubeUrl: ['', Validators.required],
        lyrics: ['', Validators.required]
      })      
    }
  }

  navigateToHome() {    
    this.router.navigateByUrl('/home');
  }

  onSubmit() {
    if (this.route.snapshot.params['id']) {
      this.songService.editSong({_id: this.route.snapshot.params['id'], ...this.form!.value} as ISong).pipe(tap((data) => this.router.navigateByUrl('/home'))).subscribe()
    } else {
      this.songService.addSong(this.form!.value as ISong).pipe(tap((data) => this.router.navigateByUrl('/home'))).subscribe()
    }
    
  }

}
