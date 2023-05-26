import { Directive, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';
//fire a DOM change event only if it is the last item on the batch of messages. the "DOWN" button listens to this and fires the click event
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[domChange]'
})
export class DomChangeDirective implements OnDestroy {
  private changes: MutationObserver;

  @Output()
  public domChange = new EventEmitter();

  constructor(private elementRef: ElementRef) {
    const element = this.elementRef.nativeElement;
    var islast = false;
    this.changes = new MutationObserver((mutations: MutationRecord[]) => {
        mutations.forEach((mutation: MutationRecord) => {
            mutation.addedNodes.forEach(function (added_node){
                if (added_node.childNodes[0] != null){
                    var elementList = [];
                    elementList.push(added_node.childNodes[0] as HTMLElement);
                    if(elementList[0].id != null){
                        if( elementList[0].id == "lastListItem"){
                            islast = true;
                        }
                    }
                }
            });
            if(islast){
                this.domChange.emit(mutation);
                islast = false;
            }
        });
      }
    );

    this.changes.observe(element, {
     // attributes: true,
      childList: true
    //   characterData: true
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
