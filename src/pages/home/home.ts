import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  private firstClientX: number;
  private lastClientX: number;
  private firstClientY: number;
  private lastClientY: number;
  private nowDriection: number = 0; //1 = vertical; 2 = horizontal ; 0 = none;
  @ViewChild(Content) content: Content;
  constructor() {
  }

  ngAfterViewInit() {
    console.log("content", this.content);
    let scrollElement = this.content.getScrollElement();
    scrollElement.addEventListener("touchmove", (event) => {
      this.lastClientX = event.touches[0].clientX;
      this.lastClientY = event.touches[0].clientY;
      let distanceX = Math.abs(this.lastClientX - this.firstClientX);
      let distanceY = Math.abs(this.lastClientY - this.firstClientY);
      console.log("distanceX: ", distanceX);
      console.log("distanceY: ", distanceY);

      if (this.nowDriection == 1) {
        event.stopPropagation();
      } else {
        if (this.nowDriection == 2) {
          return;
        } else {
          event.stopPropagation();
          (distanceX - distanceY) < 0 ? this.nowDriection = 1 : this.nowDriection = 2;
        }
      }

      console.log("child scroll direction: " + this.nowDriection);
    })
    scrollElement.addEventListener("touchstart", (event) => {
      this.firstClientX = event.touches[0].clientX;
      this.lastClientX = event.touches[0].clientX;
      this.firstClientY = event.touches[0].clientY;
      this.firstClientY = event.touches[0].clientY;
      this.nowDriection = 0;
    });
    scrollElement.addEventListener("touchend", (event) => {

    })
  }

}
