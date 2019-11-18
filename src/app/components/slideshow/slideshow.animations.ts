import {
  animate, style, transition, trigger, group, query
} from '@angular/animations';

export const slideshowAnimation = trigger('slideAnimation', [
  transition(
    ':increment, 3 => 0',
    group([
      query(':enter', [
        style({
          transform: 'translateX(100%)'
        }),
        animate('500ms ease-in-out')
      ]),
      query(':leave', [
        animate(
          '500ms ease-in-out'),
          style({
            transform: 'translateX(-100%)'
          })
      ])
    ])
  ),
  transition(
    ':decrement, 0 => 3',
    group([
      query(':enter', [
        style({
          transform: 'translateX(-100%)'
        }),
        animate('500ms ease-in-out')
      ]),
      query(':leave', [
        animate(
          '500ms ease-in-out'),
          style({
            transform: 'translateX(100%)'
          })
      ])
    ])
  )
]);
