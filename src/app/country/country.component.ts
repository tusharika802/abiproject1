import { CountryService } from './../country.service';
import { Component, OnInit } from '@angular/core';
import { MessageService,ConfirmationService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';


// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Country } from '../country';

@Component({
  selector: 'app-country',
  standalone: true,
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
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
  ]
})
export class CountryComponent implements OnInit {
  countryList: Country[] = [];
  newCountry: Country = new Country();
  editCountry: Country = new Country();
  displayAddDialog: boolean = false;
  displayEditDialog: boolean = false;

  constructor(
      private countryService: CountryService,
      private messageService: MessageService,
        private confirmationService: ConfirmationService   // ✅ inject here
  
    ) {}
  
    ngOnInit(): void {
      this.getAll();
    }
  
    getAll(): void {
      this.countryService.getCountries().subscribe({
        next: (res) => (this.countryList = res),
        error: () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unable to fetch countries'
          })
      });
    }
  
    AddClick(): void {
      this.newCountry = new Country();
      this.displayAddDialog = true;
    }
  
       saving = false;
  
  saveClick(): void {
    console.log('Saving country:', this.newCountry);
  
    this.countryService.saveCountry(this.newCountry).subscribe({
      next: (response) => {
        console.log('Save response:', response); // { success: true, message: "..." }
  
        this.getAll();
        this.displayAddDialog = false;
        this.newCountry = new Country();
  
        this.messageService.add({
          severity: response.success ? 'success' : 'warn',
          summary: response.success ? 'Success' : 'Failed',
          detail: response.message
        });
      },
      error: (error) => {
        console.error('Save error:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not save student'
        });
      }
    });
  }
  
   
    editClick(data: Country): void {
      this.editCountry = { ...data };
      this.displayEditDialog = true;
    }
  
    updateClick(): void {
      this.countryService.updateCountry(this.editCountry).subscribe({
        next: () => {
          this.getAll();
          this.displayEditDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Updated',
            detail: 'Country updated successfully'
          });
        },
        error: () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update country'
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
        this.countryService.deleteCountry(id).subscribe({
          next: () => {
            this.getAll();
            Swal.fire('Deleted!', 'Country has been deleted.', 'success');
          },
          error: (err) => {
            console.error('Error deleting country:', err);
            Swal.fire('Error!', 'Failed to delete country.', 'error');
          }
        });
      }
    });
  }
  isFormValid(): boolean {
      return this.newCountry.name.trim() !== '' && this.newCountry.name.trim() !== '';
    }
    visible: boolean = false;
  
  showDialog() {
    this.visible = true;
  }
  
  }
  
  
  