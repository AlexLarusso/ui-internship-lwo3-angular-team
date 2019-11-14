import { Component, OnInit, Input } from '@angular/core';
import { faChevronDown, faChevronUp, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-accordeon',
  templateUrl: './accordeon.html',
  styleUrls: ['./accordeon.scss']
})
export class AccordeonComponent implements OnInit {
  @Input() content: { title: string; text: string; }[];

  public selectedTopic: number;
  public iconExpand: IconDefinition = faChevronDown;
  public iconCollapse: IconDefinition = faChevronUp;

  private collapsedAllIndex = -1;

  public ngOnInit(): void {
    this.selectedTopic = this.collapsedAllIndex;
  }

  public topicClick(index: number): void {
    this.selectedTopic = this.selectedTopic === index
      ? this.collapsedAllIndex
      : index;
  }
}
