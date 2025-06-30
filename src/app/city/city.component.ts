import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessageService,ConfirmationService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { DropdownModule } from 'primeng/dropdown';


// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { CityService } from '../services/city.service';
import { StateService } from '../services/state.service';
import { City } from '../class/city';
@Component({
  selector: 'app-city',
  standalone: true,
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
providers: [MessageService, ConfirmationService],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    DropdownModule

  ]
})
export class CityComponent implements OnInit {
  cityList: City[] = [];
  newCity: City = new City();
  editCity: City = new City();
  displayAddDialog = false;
  displayEditDialog = false;
filteredCities: any;

  constructor(
    private cityService: CityService,
    private stateService : StateService,
    private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private ref : ChangeDetectorRef   // ✅ inject here

  ) {}

  ngOnInit(): void {
    this.getAll();
    this.getStates();
  }

  sattes : StatesInterface[] = [];
  onCityChange(event : any):void{
    console.log(event)
  }
  getStates():void{
    this.stateService.getStatesV2().subscribe({
      next:(valeus)=>{
        this.sattes = valeus;
        console.log(valeus)
        this.ref.markForCheck();
      }
    })
  }
  getAll(): void {
    this.cityService.getCities().subscribe({
      next: (res) => (this.cityList = res),
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Unable to fetch cities'
        })
    });
  }
  AddClick(): void {
      this.newCity = new City();
      this.displayAddDialog = true;
    }
  
       saving = false;
  
  saveClick(): void {
    console.log('Saving city:', this.newCity);
  
    this.cityService.saveCity(this.newCity).subscribe({
      next: (response) => {
        console.log('Save response:', response); // { success: true, message: "..." }
  
        this.getAll();
        this.displayAddDialog = false;
        this.newCity = new City();
  
        this.messageService.add({
          severity: 'success',
          summary: 'Success' ,
          detail: response?.message
        });
      },
      error: (error) => {
        console.error('Save error:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not save city'
        });
      }
    });
  }
    editClick(data: City): void {
      this.editCity = { ...data };
      this.displayEditDialog = true;
    }
  
    updateClick(): void {
      this.cityService.updateCity(this.editCity).subscribe({
        next: () => {
          this.getAll();
          this.displayEditDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Updated',
            detail: 'City updated successfully'
          });
        },
        error: () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update city'
          })
      });
    }
  
  
  deleteClick(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this record?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cityService.deleteCity(id).subscribe({
          next: () => {
            this.getAll();
            Swal.fire('Deleted!', 'City has been deleted.', 'success');
          },
          error: (err) => {
            console.error('Error deleting city:', err);
            Swal.fire('Error!', 'Failed to delete city.', 'error');
          }
        });
      }
    });
  }
  isFormValid(): boolean {
      return this.newCity.name.trim() !== '' && this.newCity.name.trim() !== '';
    }
    visible: boolean = false;
  
  showDialog() {
    this.visible = true;
  }
  
  }
  
  
  export interface StatesInterface {
  id: number;
  name: string;
  countryId: number;
  countryName: string;
}