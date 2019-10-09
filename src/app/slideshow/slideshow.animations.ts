import {
  animate,
  style,
  transition,
  trigger,
  group,
  query
} from "@angular/animations";

export const slideshowAnimation = trigger('slideAnimation', [
    transition('void => left', [
    style({transform: 'translateX(100vw)'}),
    animate('500ms ease-in-out')
   ]),
    transition(':leave, left => void', [
    animate('500ms ease-in-out'), 
    style({transform: 'translateX(-100vw)'})
   ]),
   transition('void => right', [
    style({transform: 'translateX(-100vw)'}),
    animate('500ms ease-in-out')
   ]),
   transition('right => void', [
    animate('500ms ease-in-out'), 
    style({transform: 'translateX(100vw)'})
   ]),    
])

// trigger("slideAnimation", [
//   transition(
//     ":increment",
//     group([
//       query(":enter", [
//         style({
//           transform: "translateX(100%)"
//         }),
//         animate("500ms ease-in-out")
//       ]),
//       query(":leave", [
//         animate(
//           "500ms ease-in-out"),
//           style({
//             transform: "translateX(-100%)"
//           })
//       ])
//     ])
//   ),
//   transition(
//     ":decrement",
//     group([
//       query(":enter", [
//         style({
//           transform: "translateX(-100%)"
//         }),
//         animate("500ms ease-in-out")
//       ]),
//       query(":leave", [
//         animate(
//           "500ms ease-in-out"),
//           style({
//             transform: "translateX(100%)"
//           })
//       ])
//     ])
//   )
// ]);
