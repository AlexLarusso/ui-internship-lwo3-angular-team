import { Component, OnInit, Input } from '@angular/core';
import { faPlus, faMinus, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-accordeon',
  templateUrl: './accordeon.html',
  styleUrls: ['./accordeon.scss']
})
export class AccordeonComponent implements OnInit {
  @Input() content: { title: string; text: string; }[];

  public selectedTopic: number;
  public iconExpand: IconDefinition = faPlus;
  public iconCollapse: IconDefinition = faMinus;

  private collapsedAllIndex: number = -1;

  constructor() { }

  public ngOnInit() {
    this.selectedTopic = this.collapsedAllIndex;
  }

  public topicClick(i: number) {
    this.selectedTopic = this.selectedTopic === i ? this.collapsedAllIndex : i;
  }
}
