import { Component, OnInit, OnDestroy } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { Subscription } from 'rxjs';

import { faChevronUp, IconDefinition, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { ScrollService } from 'src/app/shared/services';
import { IPageAnchor } from 'src/app/interfaces';

@AutoUnsubscribe()
@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.html',
  styleUrls: ['./scroll.scss']
})
export class ScrollComponent implements OnInit, OnDestroy {
  public pageComponents: IPageAnchor[] = [];
  public activeElement: number;
  public toHeaderIcon: IconDefinition = faChevronUp;
  public toFooterIcon: IconDefinition = faChevronDown;
  public anchorsSub: Subscription;
  public activeAnchorSub: Subscription;

  constructor(private scrollService: ScrollService) { }

  public onItemSelect(anchor: IPageAnchor): void {
    this.scrollService.moveTo(anchor);
  }

  public ngOnInit(): void {
    this.anchorsSub = this.scrollService.anchors
      .subscribe((anchors: IPageAnchor[]) =>
        this.pageComponents = anchors);
    this.activeAnchorSub = this.scrollService.activeAnchor
      .subscribe((index: number) =>
        this.activeElement = index);
  }

  public ngOnDestroy(): void { }
}
