import { NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';

interface Project {
  id: string;
  title: string;
  category: string; 
  description: string;
  imageUrl: string;
  altText: string;
  details: string[];
  layoutType: 'imageLeft' | 'imageRight' | 'featureBox';
  mainBgClass: string;
  textPrimaryClass: string;
  accentColorClass: string;
  buttonText?: string;
  buttonLink?: string;
  buttonClasses?: string; 
}

@Component({
  selector: 'app-projects',
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      id: 'proj1',
      title: 'Backyard Irrigation Oasis',
      category: 'DIY Home Improvement',
      description: 'Transform your garden with a custom PVC irrigation system. Easy to assemble and incredibly efficient, our PVC pipes and fittings make weekend projects a breeze.',
      imageUrl: 'https://i.ibb.co/mVBq1H9w/Choosing-The-Best-Irrigation-System-For-A-Vegetable-Garden.webp',
      altText: 'Lush garden with a DIY PVC irrigation system',
      details: [
        'Uses durable, weather-resistant PVC.',
        'Customizable to any garden layout.',
        'Significant water savings.',
        'Step-by-step guides available.'
      ],
      layoutType: 'imageLeft',
      mainBgClass: 'bg-white',
      textPrimaryClass: 'text-gray-700',
      accentColorClass: 'text-orange-600',
      buttonText: 'Explore DIY Kits',
      buttonLink: '#irrigation-kits',
      buttonClasses: 'bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105'
    },
    {
      id: 'proj2',
      title: 'Modern PVC Shelving Unit',
      category: 'Creative PVC Builds',
      description: 'Discover the versatility of PVC pipes combined with natural wood to create stunning, modern furniture. This shelving unit is both functional and a statement piece.',
      imageUrl: 'https://i.ibb.co/KJgNJvL/6ae5d-3345815-sq1-web.jpg',
      altText: 'Stylish modern shelving unit made from PVC',
      details: [
        'Combines industrial PVC with warm wood tones.',
        'Lightweight yet sturdy construction.',
        'Perfect for minimalist or industrial decor.',
        'Fully customizable dimensions.'
      ],
      layoutType: 'imageRight',
      mainBgClass: 'bg-gray-50', 
      textPrimaryClass: 'text-gray-800',
      accentColorClass: 'text-yellow-700',
      buttonText: 'Get Inspired',
      buttonLink: '#pvc-furniture-gallery',
      buttonClasses: 'bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105'
    },
    {
      id: 'proj3',
      title: 'Heavy-Duty PVC Greenhouse Frame',
      category: 'Agricultural & Outdoor Structures',
      description: 'Construct a robust and long-lasting greenhouse frame using our high-grade PVC pipes. Ideal for all seasons, providing excellent support for your agricultural needs.',
      imageUrl: 'https://i.ibb.co/d4cVLCCd/20ft-Low-Side-Wall-Frame-5000x.webp',
      altText: 'Strong PVC greenhouse frame structure',
      details: [
        'Engineered for strength and durability.',
        'Resistant to rust, rot, and pests.',
        'Easy to assemble and modify.',
        'Cost-effective solution for growers.'
      ],
      layoutType: 'featureBox', // A different layout, perhaps more centered or with image as background
      mainBgClass: 'bg-orange-50', 
      textPrimaryClass: 'text-orange-800',
      accentColorClass: 'text-orange-600',
      buttonText: 'View Structural PVC',
      buttonLink: '#structural-pvc',
      buttonClasses: 'bg-white hover:bg-gray-100 text-orange-600 font-semibold py-3 px-6 rounded-lg border border-orange-500 shadow-md transition duration-300 ease-in-out transform hover:scale-105'
    }
  ];

  constructor() {}

}
