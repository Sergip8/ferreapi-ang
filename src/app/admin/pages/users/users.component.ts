import { Component, QueryList, ViewChildren } from '@angular/core';
import { TableComponent } from '../../../shared/table/table.component';
import { FilterComponent } from '../../../shared/filter/filter.component';
import { SearchParameters, UserType } from '../../../models/user';
import { User } from '../../../models/user';
import { UserService } from '../../../_core/services/user.serevice';
import { AlertType } from '../../../shared/alert/alert.type';
import { Pagination } from '../../../shared/pagination/pagination-model';
import { CommonService } from '../../../_core/services/common.service';
import { userColumns, userFormSchema, userSchema } from '../../../models/schemas/user-schema';
import { FormComponent } from '../../../shared/form/form.component';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { LoadingComponent } from '../../../public/components/loading/loading.component';
import { NgIf } from '@angular/common';
import { AdminService } from '../../../_core/services/admin.service';
import { debounceTime, distinctUntilChanged, finalize, startWith } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateUserButtonComponent } from './create-user-button/create-user-button.component';

@Component({
  selector: 'app-users',
  imports: [TableComponent, FormComponent, ModalComponent, LoadingComponent, NgIf, FilterComponent, ReactiveFormsModule, CreateUserButtonComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  title = "Usuarios"
  current_user: User | null = null
  roles = Object.values(UserType)
  formSchema: any
  formData: any
  tableData: User[] = []
  UserColumns = userColumns
  userId = 0
  role = ""
  readonly alertType = AlertType;
  alert = this.alertType.Info
  showAlert = false
  alertMsg = ""
  params = new SearchParameters()
  loading = false;
  pagination: Pagination = {
    count: 5,
    page: 1,
    size: 10
  }
  usersActiveChange: any[] = []
  isModalOpen = false;
  modalTitle = '';
  isEqual = true;
  isUserEdit = false


  sortFields = [
    { label: "Name", value: "full_name" },
    { label: "Email", value: "email" },
    { label: "Created Date", value: "registration_date" }
  ]
  @ViewChildren(FormComponent) form!: QueryList<FormComponent>;

  constructor(private userService: UserService, private commonService: CommonService, private adminService: AdminService) { }
  ngOnInit(): void {
    this.adminService.filterRegisterState$.pipe(
      startWith(new SearchParameters()),
      debounceTime(200),
      distinctUntilChanged()
    )
      .subscribe(data => {
        this.params = data
        this.getUsers()
      });
  }
  onFormSubmit(formData: any): void {
    if(this.isUserEdit){
      if(this.current_user?.user_id)
      this.updateUser(this.current_user?.user_id, formData)
    }
    else{
      if(this.current_user?.role){
        console.log(formData)
        this.updateUserInfo(this.current_user.user_id, this.current_user?.role, formData)
      }
    }
    console.log('Form submitted:', formData);
    // Process form data here
  }
updateUser(id: number, data: any){
  this.userService.updateUser(id, data).pipe(
    finalize (() => {
      this.commonService.updateAlert({
        message: this.alertMsg,
        alertType: this.alert,
        show: true
      })
    })
  ).subscribe({
next: data => {
  
      this.alert = AlertType.Success
      this.alertMsg ="Usuario actualizado correctamente"
      this.isModalOpen = false
    
    }

,error: e => {
  console.log(e)
  this.alert = AlertType.Danger
  this.alertMsg = "Error al actualizar el usuario"
}}
)
}

  getUsers() {
    this.userService.getPagiantedUsers(this.params).subscribe({
      next: data => {
        this.tableData = <User[]>data.items
        this.pagination.count = data.total_count
        this.commonService.updatePagination({
          count: data.total_count,
          page: this.params.page,
          size: this.params.size
        })
        console.log(this.tableData)
      }
    })
  }

  updateUserInfo(id: number, role: string, data: any){
    this.userService.updateUserInfo(id, role, data).pipe(
      finalize (() => {
        this.commonService.updateAlert({
          message: this.alertMsg,
          alertType: this.alert,
          show: true
        })
      })
    ).subscribe({
  next: data => {
    
        this.alert = AlertType.Success
        this.alertMsg = role + " actualizado correctamente"
        this.isModalOpen = false
      
      }

  ,error: e => {
    console.log(e)
    this.alert = AlertType.Danger
    this.alertMsg = "Error al actualizar " + role
  }}
)
}
  


  onFormCancel(isChange: boolean): void {
    if (isChange) {
      const confirmCancel = window.confirm('Hay cambios sin guardar. ¿Seguro que quieres salir?');
      if (confirmCancel) {
        this.isModalOpen = false;
      }
    } else {
      this.isModalOpen = false;
    }
  }

  closeModal() {
    console.log("close modal parent")
    this.form.forEach((f) => {
      f.onCancel();

    });
  }
  openModal(): void {
    this.isModalOpen = true;
  }

  onUserClick(user: any): void {
    this.current_user = user
    this.title = "User"
    this.getUserInfo(user.user_id, user.role)
    this.isModalOpen = true
  }
  getUserInfo(id: number, role: UserType) {
    this.formData = null
    this.userService.getUserInfo(id, role).subscribe({
      next: data => {
        this.formData = data
        console.log(this.formData)
        this.formSchema = userFormSchema[role]
        this.title = this.formData.role.charAt(0).toUpperCase() + this.formData.role.slice(1)
      }
    })
  }
  compareObjects(object1: any, object2: any) {
    const keys = Object.keys(object1)

    keys.forEach(k => {
      if (typeof object1[k] === 'object') {
        this.compareObjects(object1[k], object2[k])
        return
      }

      if (object1[k] != object2[k]) {
        if (!k.endsWith("id")) {
          console.log(object1[k])
          this.isEqual = false
        }

      }
    })
  }

  onSortChange(event: { field: any, direction: 'asc' | 'desc' }): void {
    console.log('Sort changed:', event);
    // Handle sorting, either client-side or server-side
    this.sortData(event.field, event.direction);
  }

  sortData(field: keyof User, direction: 'asc' | 'desc'): void {
    this.tableData = [...this.tableData].sort((a, b) => {
      const valueA = a[field];
      const valueB = b[field];

      if (valueA && valueB && valueA < valueB) {
        return direction === 'asc' ? -1 : 1;
      }
      if (valueA && valueB && valueA > valueB) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  onDelete(row: any) {
    console.log(row)
  }
  onEdit(row: any) {
    this.isUserEdit = true
    this.formData = row
    this.formSchema = userSchema
    this.isModalOpen = true
  }
  onCheckbox(row: any) {
    this.tableData.forEach(u => {
      if (row.id === u.user_id)
        if (u.is_active && !row.value)
          this.usersActiveChange.push(row)
    })
    console.log(this.usersActiveChange)
  }
  onPageChange(page: number) {
    this.adminService.updateFilter({
      page: page,
      size: this.params.size
    })
  }

  getRole = (role: string) => {
    switch (role) {
      case "customer":
        return UserType.customer
      case "administrator":
        return UserType.administrator
      case "distributor":
        return UserType.distributor
      case "employee":
        return UserType.employee
      default:
        return ""
    }
  }


  onFilterChange(filterValues: any): void {
    this.params = {
      search: filterValues.search,
      sort: filterValues.sort,
      order: filterValues.order,
      role: this.getRole(filterValues.role),
      page: 1,
      size: this.params.size
    }
    this.getUsers()
  }

  onCreateUser(): void {
    this.isUserEdit = false;
    this.current_user = null;
    this.formData = {};
    this.formSchema = userSchema;
    this.modalTitle = 'Crear Usuario';
    this.isModalOpen = true;
  }

}
