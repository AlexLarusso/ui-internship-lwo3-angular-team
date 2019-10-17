import { Component } from '@angular/core';

@Component({
  selector: 'app-story',
  templateUrl: './story.html',
  styleUrls: ['./story.scss']
})
export class StoryComponent {
  public storyText = `Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ac diam
    amet quam vehicula elementum sed sit amet dui. Vivamus suscipit tortor eget felis
    porttitor volutpat. Accumsan id imperdiet et, porttitor at sem.
    Vestibulum ac diam sit amet quam vehisuscipit tortor eget felis.`;
}
