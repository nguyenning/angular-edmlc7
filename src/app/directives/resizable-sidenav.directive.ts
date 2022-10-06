import {
  Directive,
  ElementRef,
  forwardRef,
  Inject,
  Input,
  NgZone,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { ResizableDirective } from 'angular-resizable-element';
import { debounceTime, Subscription } from 'rxjs';

@Directive({
  selector: '[appResizableSidenav]',
  providers: [
    {
      provide: ResizableDirective,
      useExisting: forwardRef(() => ResizableSidenavDirective),
    },
  ],
})
export class ResizableSidenavDirective extends ResizableDirective {
  @Input() override enableGhostResize: boolean = false;

  private sub = new Subscription();

  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) platformId: any,
    renderer: Renderer2,
    zone: NgZone
  ) {
    super(platformId, renderer, elementRef, zone);

    this.sub.add(
      this.resizing.subscribe((e) => {
        this.elementRef.nativeElement.style.width = e.rectangle.width + 'px';
      })
    );
  }
}
