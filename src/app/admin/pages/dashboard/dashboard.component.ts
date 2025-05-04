import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { 
  heroUsers, 
  heroShoppingCart, 
  heroCurrencyDollar,
  heroChartBar
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ heroUsers, heroShoppingCart, heroCurrencyDollar, heroChartBar })],
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent {
  recentOrders = [
    { id: '#12345', customer: 'John Doe', status: 'Completed', amount: '299.99' },
    { id: '#12346', customer: 'Jane Smith', status: 'Processing', amount: '199.99' },
    { id: '#12347', customer: 'Bob Johnson', status: 'Pending', amount: '399.99' },
    { id: '#12348', customer: 'Alice Brown', status: 'Completed', amount: '149.99' },
    { id: '#12349', customer: 'Charlie Wilson', status: 'Processing', amount: '249.99' }
  ];

  getStatusClass(status: string): string {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
} 