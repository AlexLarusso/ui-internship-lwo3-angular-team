import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../shared/services/local-storage.service';

@Component({
  selector: 'app-recently-viewed',
  templateUrl: 'recently-viewed.html',
  styleUrls: ['recently-viewed.scss']
})

export class RecentlyViewedComponent implements OnInit {

constructor(private localStorageService: LocalStorageService ) {
}

public ngOnInit(): void {
  this.localStorageService.watchStorage().subscribe((data: string) => {
  console.log(data)})  
  }
}