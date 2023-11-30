import { trigger, transition, style, query, animateChild, group, animate } from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ top: '-100%' })
    ]),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ top: '100%' }))
      ]),
      query(':enter', [
        animate('500ms ease-out', style({ top: '0%' }))
      ])
    ]),
    query(':enter', animateChild())
  ]),
]);
