import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { SongService } from 'src/services/song.service';


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
  constructor(
    private _sanitizer: DomSanitizer,
    private router: Router,
    private formBuilder: FormBuilder,
    private songService: SongService
  ) {
    //this.youtubeLink = this._sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/VnjdikpgR0E");
  }
  public form = this.formBuilder.group({
    name: ['', Validators.required],
    author: ['', Validators.required],
    youtubeUrl: ['', Validators.required],
    lyrics: ['', Validators.required]
  })

  navigateToHome() {    
    this.router.navigateByUrl('/home');
  }

  onSubmit() {
    console.log(this.form.value);
    this.songService.addSong(this.form.value)
    this.router.navigateByUrl('/home');
  }

}
