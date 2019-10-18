import { Component, OnInit } from '@angular/core';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

// const MOCK_DATA = [
//   { title: 'Detail', text: 'Esse ipsum reprehenderit id est eiusmod consectetur. Ullamco eu nulla labore labore minim cupidatat pariatur. Et dolore voluptate ad mollit nulla ullamco Lorem dolore proident fugiat. Id velit labore tempor duis anim. Eu adipisicing id dolor ipsum nostrud ad consequat cillum cillum quis aliqua consequat tempor.'},
//   { title: 'Delivery', text: 'Esse cillum tempor proident cillum aliqua consectetur irure aute voluptate deserunt consectetur tempor. Aliquip id Lorem elit exercitation commodo proident est labore eu. Dolore voluptate ut laboris non. Nostrud non aute dolore et adipisicing qui qui ad irure. Cupidatat officia exercitation veniam voluptate proident enim. Laborum reprehenderit laborum fugiat sint magna laborum nostrud ullamco minim ad ullamco. Nulla laborum amet elit dolor.'},
//   { title: 'Style', text: 'Non eiusmod adipisicing elit quis aliqua nostrud excepteur sit.'}
// ];
@Component({
  selector: 'app-accordeon',
  templateUrl: './accordeon.html',
  styleUrls: ['./accordeon.scss']
})
export class AccordeonComponent implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
  // content: { title: string;text: string; }[];
  // selectedTopic: number;
  // iconExpand = faPlus;
  // iconCollapse = faMinus;
  // private collapsedAllIndex = -1;

  // constructor() { }

  // public ngOnInit() {
  //   this.content = this.getContent();
  //   this.selectedTopic = this.collapsedAllIndex;
  // }

  // topicClick(i: number) {
  //   this.selectedTopic = this.selectedTopic === i ? this.collapsedAllIndex : i;
  // }

  // private getContent() {
  //   //TODO
  //   return MOCK_DATA;
  // }
}
