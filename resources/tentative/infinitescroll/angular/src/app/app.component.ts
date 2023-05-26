import {Component, Renderer2,ElementRef, OnInit} from '@angular/core';
//import{ AppGlobals } from './app_globals';
import { from, Observable, Observer } from "rxjs";
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'Chatter App';  
  constructor(private renderer: Renderer2, private el: ElementRef) {}
  appImages =["assets/person2.png", "assets/person1.png","assets/mail.png", "assets/translate.png", "assets/arrow.png", "assets/bookmark.png", "assets/calendar.png"];
  ngOnInit() {
    const result = this.loadAllImages(this.appImages);
    result.subscribe(img =>{
      img.style.display="none";
      this.renderer.appendChild(this.el.nativeElement, img)
    });
  }

  private loadImage(src: string): Observable<HTMLImageElement> {
      return new Observable((observer: Observer<HTMLImageElement>) => {
        const image = new Image();
        image.src = src;
        image.onload = () => {
          observer.next(image);
          observer.complete();
        };
    }); 
  }
  private loadAllImages(images: string[]): Observable<HTMLImageElement> {
    return from(images).pipe(
      mergeMap(src => this.loadImage(src))
    );   
  }
}
