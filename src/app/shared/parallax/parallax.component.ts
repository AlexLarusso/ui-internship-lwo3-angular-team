import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';

@AutoUnsubscribe()
@Component({
  selector: 'app-parallax',
  templateUrl: './parallax.html',
  styleUrls: ['./parallax.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParallaxComponent implements OnInit, OnDestroy {
  @Input() public parallaxClass: string;

  public routeSub: Subscription;

  constructor(private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.routeSub = this.route.params
      .pipe(
        skipWhile(item => !item.category))
      .subscribe(item => this.parallaxClass = item.category);
  }

  public ngOnDestroy(): void { }
}
