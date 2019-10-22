import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-recently-viewed',
  templateUrl: 'recently-viewed.html',
  styleUrls: ['recently-viewed.scss']
})

export class RecentlyViewedComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService) {}

  public products = 'allrecentItems';
  public isEmpty: boolean;

  public ngOnInit(): void {
    this.isEmpty = Boolean(this.localStorageService.recentlyViewed);
  }
}
