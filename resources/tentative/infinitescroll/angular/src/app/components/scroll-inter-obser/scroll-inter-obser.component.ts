import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

import {Subscription} from 'rxjs';
import { MessagesService } from '../../services/messages.service';
import { AppGlobals } from '../../app_globals';
import { ActivatedRoute, Params } from '@angular/router';
//import { delay } from 'rxjs/operators';
@Component({
  selector: 'app-scroll',
  templateUrl: './scroll-inter-obser.component.html',
  styleUrls: ['./scroll-inter-obser.component.scss'],
})
export class ScrollInterObserComponent implements OnInit, AfterViewInit {
  //Element for intersection observer
  @ViewChildren('theLastListItem', { read: ElementRef })
  theLastListItem!: QueryList<ElementRef>;

  //Handle to button to click to mimic infinite scroll
  @ViewChild('btnScrollDown', { static: false })
  btnScrollDown!: ElementRef;
  //Handle to button to click to mimic infinite scroll
  @ViewChild('btnScrollUp', { static: false })
  btnScrollUp!: ElementRef;

  //subscription for mock message service
  msgSub: Subscription = new Subscription();
  messages: any = [];

  //number of pages to display - make sure there are enough messsage elements in the MESSAGES array in mock-messages.ts (total messages currently is 600)
  //totalPages is the number of times the page is scrolled. 
  //numMessages is the number of messages per page
  totalPages: number = 20;
  numMessages: number = 30;
  observer: any;
  routeParams!: Params;
  scrolled: boolean = false;//scroll seems to be firing twice
  constructor(
    private msgService: MessagesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {  
    console.log("Viewport height: " + window.innerHeight);
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.routeParams = params;
      //set service params
      this.msgService.numMsgsPerPage = this.numMessages;
    });
  }
 
  //setup observer to observe the last element in the batch of messages. 
  ngAfterViewInit() {
    this.theLastListItem.changes.subscribe((d) => {
      if (d.last) {
        this.observer.observe(d.last.nativeElement);
      }
    });
  }

  //getMessages to start workload and to add incoming messages when last element is displayed ( i.e after scroll)
  getMessages(): void {
    this.scrolled = false;
    this.msgSub = this.msgService.getAS().subscribe((messages) => { 
      //Start time after messages are received, before insertion into DOM starts
      AppGlobals.startTime = performance.now();   
      messages.forEach((element: any) => {
        this.messages.push(element);
      });  
      //increment page after a page of data is received
      this.msgService.pagenum += 1;      
    });
  }

  //define the intersectionObserver and connect this.observer
  //callback handles getting more messages
  intersectionObserver() {
    let options = {
      root: null, //To watch for intersection relative to the device's viewport, specify null for root option
      rootMargin: '0px',
      threshold: 0,
    };
   

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          AppGlobals.numberofScrolls++;
          this.getMessages();
        } else {
          return;
        }
      });
    }, options);
  }

  @HostListener('window:scroll', [])
  
  scrollDown() {
    if (!this.scrolled){
      let scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
      window.scrollTo({ top: scrollHeight }); 
    }
   
    this.scrolled = true;
  }
  scrollUp() {
    window.scrollTo(0, 0);
  }
  
  startWorkload(){
    this.getMessages();
    this.intersectionObserver();
  }

  onDomChange($event: Event): void {
    if (this.msgService.pagenum <= this.totalPages) {
      AppGlobals.endTime = performance.now();
      AppGlobals.totalTime += AppGlobals.endTime - AppGlobals.startTime;
    }else{
      this.observer.disconnect();
      alert("Total time: " + AppGlobals.totalTime.toFixed(2));
      console.log("Total time: " + AppGlobals.totalTime.toFixed(2));
    }
    this.scrollDown();  
  }
}
