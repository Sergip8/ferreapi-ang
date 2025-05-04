import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoryService } from './_core/services/medical-info.service';
import { AlertComponent } from './shared/alert/alert.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { CommonService } from './_core/services/common.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AlertComponent, NgIf, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pipe-web';
  imageSrc = '../../../../assets/images/yellow_pipes.jpg';

  constructor(private categoryService: CategoryService, public commonService: CommonService){}

  
}