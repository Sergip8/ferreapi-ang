import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('150ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('150ms', style({ opacity: 0 })),
  ]),
]);

export const pageTransition = trigger('pageTransition', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('500ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('500ms', style({ opacity: 0 })),
  ]),
]);

export const slideDown = trigger('slideDown', [
  transition(':enter', [
    style({opacity: 0, maxHeight: '0'}),
    animate('300ms ease-in', style({opacity: 1, maxHeight: '1000px'})),
  ]),
]);

export const pageTurn = trigger('pageTurn', [
  transition('* => *', [
    animate('1s ease-in-out', keyframes([
      style({ transform: 'rotateY(0deg)', offset: 0 }),
      style({ transform: 'rotateY(-120deg)', offset: 0.5 }),
      style({ transform: 'rotateY(0deg)', offset: 1.0 })
    ]))
  ])
]);

export const slideInOut = trigger('slideInOut', [
  state('expanded', style({
    height: '*',
    opacity: '1',
    display: 'block'
  })),
  state('collapsed', style({
    height: '0',
    opacity: '0',
    display: 'none'
  })),
  transition('collapsed <=> expanded', [
    animate('300ms ease-in-out')
  ])
]);

export const rotateIcon = trigger('rotateIcon', [
  state('expanded', style({
    transform: 'rotate(0deg)'
  })),
  state('collapsed', style({
    transform: 'rotate(0deg)'
  })),
  transition('expanded <=> collapsed', [
    animate('300ms ease-in-out')
  ])
]);

export const slideSidebar = trigger('slideSidebar', [
  state('expanded', style({
    width: '16rem',
    opacity: '1'
  })),
  state('collapsed', style({
    width: '4rem',
    opacity: '1'
  })),
  transition('expanded <=> collapsed', [
    animate('300ms ease-in-out')
  ])
]);

export const slideContent= trigger('slideContent', [
  state('expanded', style({
     marginLeft: '4rem',
    opacity: '1'
  })),
  state('collapsed', style({
     marginLeft: '16rem',
    opacity: '1'
  
  })),
  transition('expanded <=> collapsed', [
    animate('300ms ease-in-out')
  ])
]);

export const fadeBackground = trigger('fadeBackground', [
  state('expanded', style({
    opacity: '0'
  })),
  state('collapsed', style({
    opacity: '0.5'
  })),
  transition('expanded <=> collapsed', [
    animate('300ms ease-in-out')
  ])
]);

export const slideDownUp =    trigger('slideDownUp', [
  state('void', style({
    transform: 'translateY(-100%)',
    opacity: 0
  })),
  state('*', style({
    transform: 'translateY(0)',
    opacity: 1
  })),
  transition('void => *', [
    animate('300ms ease-out')
  ]),
  transition('* => void', [
    animate('300ms ease-in')
  ])
])
