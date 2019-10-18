import { Component, OnInit, OnChanges } from '@angular/core';
import { LocalStorageService } from '../../shared/services/local-storage.service';

@Component({
  selector: 'app-recently-viewed',
  templateUrl: 'recently-viewed.html',
  styleUrls: ['recently-viewed.scss']
})

export class RecentlyViewedComponent implements OnInit, OnChanges {
public recentItems = 'recentItems';

constructor(private localStorageService: LocalStorageService ) {
}

public ngOnInit(): void {
}

public ngOnChanges(): void {
  this.localStorageService.watchStorage().subscribe((key: string) => {
    console.log(JSON.parse(this.localStorageService.getItem(key)))
})
}}