import { State } from '../class/state';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessageService,ConfirmationService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';


//PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { StateService } from '../services/state.service';
import { DropdownModule } from 'primeng/dropdown';
import { CountryService } from '../services/country.service';

@Component({
  selector: 'app-state',
  standalone: true,
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss'],
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
export class StateComponent implements OnInit {
  stateList: State[] = [];
  newState: State = new State();
  editState: State = new State();
  countryList: any[] = [];
  displayAddDialog: boolean = false;
  displayEditDialog: boolean = false;

  constructor(
      private stateService:   StateService,
      private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private countryService: CountryService,
      private ref : ChangeDetectorRef   // ✅ inject here

    ) {}
  
    ngOnInit(): void {
      this.getAll();
      this.getCountries();
    }
    counties:CountriesInterface[] = [];
    onCountryChange(event : any):void{
      console.log(event)
    }
    getCountries():void{
      this.countryService.getCountriesVS().subscribe({
        next:(valuees)=>{
          this.counties = valuees;
          console.log(valuees)
          this.ref.markForCheck();

        }
      })
    }
  getAll(): void {
      this.stateService.getStates().subscribe({
        next: (res) => (this.stateList = res),
        error: () =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unable to fetch states'
          })
      });
    }
    AddClick(): void {
        this.newState = new State();
        this.displayAddDialog = true;
      }
    
         saving = false;
    
      saveClick(): void {
        console.log('Saving city:', this.newState);
      
        this.stateService.saveState(this.newState).subscribe({
          next: (response) => {
            console.log('Save response:', response); // { success: true, message: "..." }
      
            this.getAll();
            this.displayAddDialog = false;
            this.newState = new State();
      
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
      editClick(data: State): void {
        this.editState = { ...data };
        this.displayEditDialog = true;
      }
      updateClick(): void {
        this.stateService.updateState(this.editState).subscribe({
          next: (response: { success: boolean; message: string }) => {
            if (response.success) {
              this.getAll();
              this.displayEditDialog = false;
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: response.message || 'State updated successfully'
              });
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: response.message || 'Failed to update state'
              });
            }
          },
          error: () =>
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update state'
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
        this.stateService.deleteState(id).subscribe({
          next: () => {
            this.getAll();
            Swal.fire('Deleted!', 'State has been deleted.', 'success');
          },
          error: (err) => {
            console.error('Error deleting state:', err);
            Swal.fire('Error!', 'Failed to delete state.', 'error');
          }
        });
      }
    });
  }
  isFormValid(): boolean {
      return this.newState.name.trim() !== '' && this.newState.name.trim() !== '';
    }
    visible: boolean = false;
  
  showDialog() {
    this.visible = true;
  }
  
  }
  
  export interface CountriesInterface {
  id: number;
  name: string;
 
}
  
