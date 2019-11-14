import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';

@AutoUnsubscribe()
@Component({
  selector: 'app-parallax',
  templateUrl: './parallax.html',
  styleUrls: ['./parallax.scss']
})
export class ParallaxComponent implements OnInit, OnDestroy {
  @Input() public parallaxClass: string;

  public routeSub: Subscription;

  constructor(private route: ActivatedRoute) { }

  public ngOnInit(): void {
   this.routeSub = this.route.params.pipe()
      .subscribe(item =>  item.category ?
        this.parallaxClass = item.category :
        this.parallaxClass);
  }

  public ngOnDestroy(): void { }
}
