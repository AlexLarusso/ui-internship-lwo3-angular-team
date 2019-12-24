import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { faChevronDown, faChevronUp, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-accordeon',
  templateUrl: './accordeon.html',
  styleUrls: ['./accordeon.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordeonComponent implements OnInit {
  @Input() public content: { title: string; text: string; }[];

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
