import { Component, OnInit } from '@angular/core';
import { CardModel } from '../../components/card/card-model';
import { CategoryService } from '../../../_core/services/medical-info.service';

@Component({
  selector: 'app-public-home',
  standalone: false,
  templateUrl: './public-home.component.html',
  styleUrl: './public-home.component.css'
})
export class PublicHomeComponent implements OnInit{

  title = 'pipe-web';
    imageSrc = '../../../../assets/images/yellow_pipes.jpg';
    searchTerm: string = '';
  
    constructor(private categoryService: CategoryService){}
    ngOnInit(): void {
      this.getCategories()
    }
  
    productCategories: CardModel[] = [
    ]
      
    getCategories(){
      this.categoryService.GetMainCategories().subscribe({
        next: (data)=> {
          this.productCategories = data.map(c => Object.assign({cardType: "category", title: c.category_name, imageSrc: c.image_url, id: c.category_id}))
          console.log(this.productCategories)
        } 
      })
    }
  
    pvcProducts: CardModel[] = [
      {
        id: 1,
        cardType: 'product',
        title: 'Schedule 40 PVC Pipe',
        subtitle: '1/2" diameter, 10ft length',
        description: 'Standard white PVC pipe for pressure applications. NSF-approved for potable water.',
        imageSrc: 'assets/pvc-pipe-40.jpg',
        imageAlt: 'White Schedule 40 PVC Pipe',
        price: 4.99,
        priceUnit: '10ft length',
        rating: 4.5,
        reviewCount: 42,
        specs: [
          'Pressure rating: 450 PSI',
          'Temperature range: 33°F to 140°F',
          'NSF/ANSI 61 certified',
          'Working pressure: 220 PSI @ 73°F'
        ],
        tags: ['pressure-rated', 'potable-water', 'construction-grade'],
        linkText: 'View Details',
        linkUrl: this.imageSrc
      },
      {
         id: 1,
        cardType: 'product',
        title: 'Schedule 80 PVC Pipe',
        subtitle: '3/4" diameter, 10ft length',
        description: 'Heavy-duty gray PVC pipe for high-pressure industrial applications.',
        imageSrc: 'assets/pvc-pipe-80.jpg',
        imageAlt: 'Gray Schedule 80 PVC Pipe',
        price: 8.49,
        priceUnit: '10ft length',
        rating: 4.7,
        reviewCount: 28,
        specs: [
          'Pressure rating: 630 PSI',
          'Temperature range: 33°F to 140°F',
          'UV resistant',
          'Working pressure: 370 PSI @ 73°F'
        ],
        tags: ['industrial', 'high-pressure', 'durable'],
        linkText: 'View Details',
        linkUrl: '/products/schedule-80-3-4'
      },
      {
         id: 1,
        cardType: 'product',
        title: 'PVC 90° Elbow',
        subtitle: '1" Schedule 40, Slip x Slip',
        description: 'White PVC elbow fitting for changing direction in PVC piping systems.',
        imageSrc: 'assets/pvc-elbow.jpg',
        imageAlt: 'PVC 90 Degree Elbow Fitting',
        price: 1.29,
        originalPrice: 1.59,
        onSale: true,
        rating: 4.8,
        reviewCount: 36,
        specs: [
          'Slip x slip connections',
          'For use with Schedule 40 pipe',
          'NSF-approved',
          '1" nominal size'
        ],
        tags: ['fitting', 'on-sale', 'drainage'],
        linkText: 'View Details',
        linkUrl: '/products/pvc-elbow-1in'
  }
    ]
  
    pvcServices: CardModel[] = [
      {
         id: 1,
        cardType: 'service',
        title: 'Custom Pipe Cutting',
        subtitle: 'Precision cuts to your specifications',
        description: 'Well cut your PVC pipes to exact lengths with professional equipment for clean, burr-free ends.',
       
      },
      {
         id: 1,
        cardType: 'service',
        title: 'Bulk Delivery',
        subtitle: 'Free for orders over $300',
        description: 'Professional delivery service for large orders. We handle loading, transport, and careful unloading at your job site or home.',
        
      },
      {
         id: 1,
        cardType: 'service',
        title: 'Project Consultation',
        subtitle: 'Expert PVC system design',
        description: 'Our certified technicians will help plan your irrigation, plumbing, or industrial PVC system with optimal material selection and layout.',
       
      },
      {
         id: 1,
        cardType: 'service',
        title: 'Project Consultation',
        subtitle: 'Expert PVC system design',
        description: 'Our certified technicians will help plan your irrigation, plumbing, or industrial PVC system with optimal material selection and layout.',
       
      }
    ]
  
    pvcTestimonials: CardModel[] = [
      {
         id: 1,
        cardType: 'testimonial',
        title: 'Maria G. - Homeowner',
        subtitle: 'DIY Irrigation Project',
        description: 'The team helped me design my backyard irrigation system and even cut all the pipes to exact lengths. Saved me hours of work and frustration! Their workshop taught me how to properly cement joints - zero leaks!',
  
        rating: 5,
  
      },
      {
         id: 1,
        cardType: 'testimonial',
        title: 'Thompson Plumbing Co.',
        subtitle: 'Commercial Account Since 2018',
        description: 'Their 24/7 emergency service has bailed us out on 3 midnight jobs this year alone. The contractor pricing lets us bid competitively, and their inventory management saves us 15+ hours/week in supply runs.',
   
        rating: 4.8,
   
      },
      {
         id: 1,
        cardType: 'testimonial',
        title: 'James R. - Farm Owner',
        subtitle: 'Livestock Water System',
        description: 'We needed durable piping that could handle -20°F winters. Their recommendation for Schedule 80 PVC with insulated wraps worked perfectly. Two winters later - not a single cracked pipe across 8 acres!',
  
        rating: 5,
  
      },
    ]

    onSearch(term: string) {
      this.searchTerm = term;
    }

}
