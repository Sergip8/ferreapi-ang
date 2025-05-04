import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { slideContent, slideSidebar } from '../shared/utils/animations';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations:[slideContent]
})
export class AdminComponent {
onSidebar($event: boolean) {
  this.isSidebar = $event;
}
  title = 'event-bud-frontend';
  isSidebar = false;

  constructor(private element: ElementRef, private rendered: Renderer2) { }

  // @HostListener('click', ['$event.target']) onClick(e: Element) {
  //   const profileDropdown = this.element.nativeElement.querySelector('.profile-dropdown') as Element;

  //   if (!profileDropdown.contains(e)) {
  //     const profileDropdownList = this.element.nativeElement.querySelector('.profile-dropdown-list');
  //     this.rendered.setAttribute(profileDropdownList, 'aria-expanded', 'false')
  //   }
  // }
}
