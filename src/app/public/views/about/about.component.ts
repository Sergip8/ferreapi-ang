import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModel } from '../../components/card/card-model';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  companyValues: CardModel[] = [
    {
    id: 1,
    title: 'Quality',
    cardType: 'values',
    description: 'We meticulously source and test all our products to ensure they meet our high standards for durability and performance.',
    icon:{icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>`,
    bgColor: 'bg-blue-200',
    color: 'text-blue-500'}
  },
  {
    id: 2,
    title: 'Innovation',
    cardType: 'values',
    description: 'We are committed to providing the best quality products and services to our customers. We are committed to providing the best quality products and services to our customers.',
    icon:{icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>`,
    bgColor: 'bg-yellow-200',
    color: 'text-yellow-500'}
  },
  {
    id: 3,
    title: 'Value',
    cardType: 'values',
    description: 'We believe in fair pricing that reflects the true value of our products, with no compromises on quality or service.',
    icon:{icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>`,
    bgColor: 'bg-orange-200',
    color: 'text-orange-500'}
  }
]
  teamMembers: CardModel[] = [
    {
      id: 1,
      cardType: 'service',
      title: 'John Smith',
      subtitle: 'Founder & CEO',
      description: 'With over 20 years in the hardware industry, John founded HardwareHub with a vision to provide quality tools and materials to professionals and DIY enthusiasts alike.',
      imageSrc: 'assets/images/team/john-smith.jpg'
    },
    {
      id: 2,
      cardType: 'service',
      title: 'Sarah Johnson',
      subtitle: 'Operations Manager',
      description: 'Sarah ensures our warehouse runs smoothly and that your orders are processed quickly and accurately. Her background in logistics makes her perfect for the role.',
      imageSrc: 'assets/images/team/sarah-johnson.jpg'
    },
    {
      id: 3,
      cardType: 'service',
      title: 'Mike Chen',
      subtitle: 'Product Specialist',
      description: 'Mikes deep knowledge of hardware tools and equipment helps us source only the best products for our customers. Hes always testing new items to add to our catalog.',
      imageSrc: 'assets/images/team/mike-chen.jpg'
    }
  ];

  milestones: CardModel[] = [
    {
      id: 1,
      cardType: 'category',
      subtitle: '2010',
      title: 'Company Founded',
      description: 'HardwareHub was established with a small storefront and big dreams.'
    },
    {
      id: 2,
      cardType: 'category',
      subtitle: '2015',
      title: 'Expanded Online',
      description: 'Launched our e-commerce platform to reach customers nationwide.'
    },
    {
      id: 3,
      cardType: 'category',
      subtitle: '2018',
      title: 'Warehouse Expansion',
      description: 'Opened our 50,000 sq ft warehouse to support growing demand.'
    },
    {
      id: 4,
      cardType: 'category',
      subtitle: '2022',
      title: 'Sustainability Initiative',
      description: 'Implemented eco-friendly packaging and carbon-offset shipping options.'
    }
  ];
}