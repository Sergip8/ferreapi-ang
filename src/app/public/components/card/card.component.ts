import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardModel } from './card-model';
import { KeyValuePipe, NgClass, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SafeHtmlPipe } from '../../../_core/pipes/safe-html.pipe';


@Component({
  selector: 'app-card',
  imports: [NgClass, NgFor, NgIf, RouterLink, UpperCasePipe, KeyValuePipe, SafeHtmlPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() cardData!: CardModel;
  @Input() horizontal: boolean = false; 
  @Output() onClickCard = new EventEmitter()

  // Helper method to get the card style class based on type
  getCardClasses(): string {
    const baseClasses = 'rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ';
    const layoutClasses = this.horizontal ? 'flex-row' : 'flex-col h-full';

    switch(this.cardData.cardType) {
      case 'product':
        return `${baseClasses} ${layoutClasses} from-gray-50 to-gray-100 border border-orange-500 w-full`;
      case 'category':
        return `${baseClasses} ${layoutClasses} bg-gradient-to-br from-orange-50 to-orange-100 border-l-4 border-orange-500 w-full`;
      case 'service':
        return `${baseClasses} ${layoutClasses} bg-white border border-yellow-200 `;
      case 'testimonial':
        return `${baseClasses} ${layoutClasses} border border-orange-200 bg-yellow-100 `;
      case 'values':
        return `${baseClasses} ${layoutClasses} border border-gray-100 bg-gray-50 text-center`;
      default:
        return `${baseClasses} ${layoutClasses} bg-white border border-gray-200 w-[300px]`;
    }
  }

  // Helper method para obtener las clases del contenedor de imagen
  getImageContainerClasses(): string {
    if (this.horizontal) {
      return 'w-48 flex-shrink-0'; // Ancho fijo en modo horizontal
    }
    return 'text-center w-full flex justify-center items-center';
  }

  // Helper method para obtener las clases de la imagen
  getImageClasses(): string {
    if (this.horizontal) {
      return 'w-full h-full object-cover';
    }
    return 'w-full object-cover min-w-full h-auto';
  }

  // Helper method para obtener las clases del contenedor de contenido
  getContentContainerClasses(): string {
    if (this.horizontal) {
      return 'p-3 flex flex-col flex-grow justify-between';
    }
    return 'p-3 flex flex-col flex-grow';
  }

  // Helper method to get button style class based on type
  getButtonClasses(): string {
    const baseClasses = 'inline-block px-4 py-2 text-white rounded-md transition duration-300 text-sm font-medium';

    switch(this.cardData.cardType) {
      case 'product':
        return `${baseClasses} bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700`;
        case 'category':
            return `${baseClasses} bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700`;
      case 'service':
        return `${baseClasses} bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800`;
      case 'testimonial':
        return `${baseClasses} bg-orange-500 hover:bg-orange-600`;
      case 'values':
        return `${baseClasses} bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700`;
      default:
        return `${baseClasses} bg-orange-500 hover:bg-orange-600`;
    }
  }

  // Helper method to get title text color based on type
  getTitleClasses(): string {
    switch(this.cardData.cardType) {
      case 'product':
        return 'text-xl font-bold text-orange-800 mb-1';
        case 'category':
            return 'text-xl font-bold text-orange-800 mb-1';
      case 'service':
        return 'text-xl font-semibold text-yellow-800 mb-1';
      case 'testimonial':
        return 'text-xl font-medium text-orange-700 mb-1';
      case 'values':
        return 'text-xl font-medium text-blue-700 mb-1';
      default:
        return 'text-xl font-semibold text-gray-800 mb-1';
    }
  }
  calcSavingPercentage(price: number, originalPrice: number){
    return ((originalPrice-price)/originalPrice)*100
  }
}