import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-recently-viewed',
  templateUrl: 'recently-viewed.html',
  styleUrls: ['recently-viewed.scss']
})

export class RecentlyViewedComponent {
  public products = 'allrecentItems';
  constructor(private localStorageService: LocalStorageService) {}

  public arrOfProducts = this.localStorageService.recentlyViewed;

  public ngOnInit(): void {
    this.arrOfProducts = this.localStorageService.getItem('recentlyView')
  }
}

