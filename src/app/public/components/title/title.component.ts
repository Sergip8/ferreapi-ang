import { Component, Input } from '@angular/core';
import { NgFor, NgOptimizedImage } from '@angular/common';


 
export interface Title {
    main: string;
    strong: string;
    final: string;
    subtitle: string;
  }

const sampleImg = '/assets/images/yellow_pipes.jpg';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [ ],
  template: `
    <div class="">
      <h3 class="text-2xl md:text-3xl leading-[1.3]">
        <div class="relative inline-block font-normal mb-2 text-orangeAccent">
          {{title.main}}
          <div class="absolute bottom-[-5px] left-0 h-[3px] w-full bg-gradient-to-br from-yellowAccent to-orangeAccent"></div>
        </div>
        <strong class="block font-bold">
          <span class="text-vividRed">{{title.strong}}</span><span class="text-gray-700 font-medium"> {{title.final.substring(0, title.final.lastIndexOf(" "))}}</span>
          <br><span class="text-gray-700 font-medium"> {{title.final.substring(title.final.lastIndexOf(" ")+1)}}</span>
        </strong>
      </h3>
      <p class="text-gray-600 mt-4 opacity-90">{{title.subtitle}}</p>
    </div>
  `
})
export class ProductCardComponent {
    @Input() title!: Title 
    constructor() {
       
    }
}

