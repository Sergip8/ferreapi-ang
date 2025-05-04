import { NgFor, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UserType } from '../../models/user';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  imports: [ReactiveFormsModule, NgFor, NgIf],
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() roles: UserType[] = [];
  @Input() isRole: boolean = false;
  @Input() sortFields: {label: string, value: string}[] = [];
  @Output() filterChange = new EventEmitter<any>();
  
  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      search: [''],
      sort: [''],
      order: ['ASC'],
      role: ['']
    });
  }

  ngOnInit(): void {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(values => {
        this.filterChange.emit(values);
      });
  }

  onOrderChange(): void {
    const currentOrder = this.filterForm.get('order')?.value;
    this.filterForm.patchValue({
      order: currentOrder === 'ASC' ? 'DESC' : 'ASC'
    });
  }
} 