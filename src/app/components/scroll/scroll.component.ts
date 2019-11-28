import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { faChevronUp, IconDefinition, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { ScrollService } from 'src/app/shared/services';
import { IPageAnchor } from 'src/app/interfaces';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.html',
  styleUrls: ['./scroll.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollComponent implements OnInit {
  public toHeaderIcon: IconDefinition = faChevronUp;
  public toFooterIcon: IconDefinition = faChevronDown;
  public anchors$: Observable<Array<IPageAnchor>>;
  public activeAnchor$: Observable<IPageAnchor>;

  constructor(private scrollService: ScrollService) { }

  public onItemSelect(anchor: IPageAnchor): void {
    this.scrollService.moveTo(anchor);
  }

  public ngOnInit(): void {
    this.anchors$ = this.scrollService.anchors;
    this.activeAnchor$ = this.anchors$.pipe(
      switchMap(anchors => this.scrollService.activeAnchor.pipe(
        map(index => anchors[index])
      ))
    );
  }
}
