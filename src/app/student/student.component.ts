import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Student } from '../class/student';
import { StudentService } from '../services/student.service';
import { CountryService } from '../services/country.service';
import { StateService } from '../services/state.service';
import { CityService } from '../services/city.service';
import { Country } from '../class/country';
import { State } from '../class/state';
import { City } from '../class/city';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-student',
  standalone: true,
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
  providers: [MessageService, ConfirmationService],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    ToastModule,
    ConfirmDialogModule
  ]
})
export class StudentComponent implements OnInit {
  studentsList: Student[] = [];
  newStudent: Student = new Student();
  editStudent: Student = new Student();
  displayAddDialog = false;
  displayEditDialog = false;

  // Dropdown data
  countries: Country[] = [];
  states: State[] = [];
  cities: City[] = [];
  filteredStates: State[] = [];
  filteredCities: City[] = [];

  constructor(
    private router: Router,
    private studentService: StudentService,
    private countryService: CountryService,
    private stateService: StateService,
    private cityService: CityService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    // if(sessionStorage.getItem('currentUser') == null)
    // {
    //   alert('you are not authorized user to access this information !!!');
    //   this.router.navigateByUrl("/login");      
    // }
    this.getAll();
    this.loadDropdownData();
  }

  loadDropdownData() {
    // Load countries
    this.countryService.getCountries().subscribe(
      (response) => {
        this.countries = response;
      },
      (error) => {
        console.log('Unable to load countries');
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Unable to load countries'
        });
      }
    );

    // Load all states
    this.stateService.getStates().subscribe(
      (response) => {
        this.states = response;
      },
      (error) => {
        console.log('Unable to load states');
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Unable to load states'
        });
      }
    );

    // Load all cities
    this.cityService.getCities().subscribe(
      (response) => {
        this.cities = response;
      },
      (error) => {
        console.log('Unable to load cities');
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Unable to load cities'
        });
      }
    );
  }

  onCountryChange(event: any, isEdit: boolean = false) {
    const selectedCountry = event.value;
    if (selectedCountry) {
      // Filter states by country
      this.filteredStates = this.states.filter(state => 
        state.countryName === selectedCountry.name
      );
      
      // Clear state and city selections
      if (isEdit) {
        this.editStudent.state = '';
        this.editStudent.city = '';
      } else {
        this.newStudent.state = '';
        this.newStudent.city = '';
      }
      this.filteredCities = [];
    } else {
      this.filteredStates = [];
      this.filteredCities = [];
    }
  }

  onStateChange(event: any, isEdit: boolean = false) {
    const selectedState = event.value;
    if (selectedState) {
      // Filter cities by state
      this.filteredCities = this.cities.filter(city => 
        city.stateName === selectedState.name
      );
      
      // Clear city selection
      if (isEdit) {
        this.editStudent.city = '';
      } else {
        this.newStudent.city = '';
      }
    } else {
      this.filteredCities = [];
    }
  }

  getAll() {
    this.studentService.getStudents().subscribe(
      (response) => {
        this.studentsList = response;
      },
      (error) => {
        console.log('unable to access api');
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Unable to fetch students'
        });
      }
    );
  }

  addClick() {
    this.newStudent = new Student();
    this.filteredStates = [];
    this.filteredCities = [];
    this.displayAddDialog = true;
  }

  saveClick() {
    console.log('=== SAVE STUDENT DEBUG ===');
    console.log('Saving student:', this.newStudent);
    console.log('API URL will be: https://localhost:7075/api/Student/Upsert');
    
    // Convert dropdown objects to strings for API
    const studentToSave = {
      ...this.newStudent,
      country: typeof this.newStudent.country === 'object' ? this.newStudent.country.name : this.newStudent.country,
      state: typeof this.newStudent.state === 'object' ? this.newStudent.state.name : this.newStudent.state,
      city: typeof this.newStudent.city === 'object' ? this.newStudent.city.name : this.newStudent.city
    };
    
    this.studentService.saveStudent(studentToSave).subscribe(
    (response: { success: boolean; message: string }) => {
        console.log('=== API RESPONSE RECEIVED ===');
        console.log('Full response:', response);
        console.log('Response type:', typeof response);
        console.log('Response keys:', Object.keys(response));
        console.log('Success property:', response.success);
        console.log('Message property:', response.message);
        
      if (response.success) {
          console.log('Operation successful, refreshing data...');
        this.getAll();
          this.newStudent.name = "";
          this.newStudent.course = "";
          this.newStudent.country = "";
          this.newStudent.state = "";
          this.newStudent.city = "";
        this.displayAddDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
            detail: response.message || 'Student added successfully'
        });
      } else {
          console.log('Operation failed, showing error message...');
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
            detail: response.message || 'Failed to save student'
        });
      }
    },
    (error) => {
        console.log('=== API ERROR ===');
        console.log('unable to access api !!!', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to save student - Network error'
      });
    }
  );
}

  editClick(data: Student) {
    this.editStudent = { ...data };
    
    // Set filtered states based on selected country
    if (this.editStudent.country) {
      const selectedCountry = this.countries.find(c => c.name === this.editStudent.country);
      if (selectedCountry) {
        this.filteredStates = this.states.filter(state => 
          state.countryName === selectedCountry.name
        );
      }
    }
    
    // Set filtered cities based on selected state
    if (this.editStudent.state) {
      const selectedState = this.states.find(s => s.name === this.editStudent.state);
      if (selectedState) {
        this.filteredCities = this.cities.filter(city => 
          city.stateName === selectedState.name
        );
      }
    }
    
    this.displayEditDialog = true;
  }

  updateClick() {
    // Convert dropdown objects to strings for API
    const studentToUpdate = {
      ...this.editStudent,
      country: typeof this.editStudent.country === 'object' ? this.editStudent.country.name : this.editStudent.country,
      state: typeof this.editStudent.state === 'object' ? this.editStudent.state.name : this.editStudent.state,
      city: typeof this.editStudent.city === 'object' ? this.editStudent.city.name : this.editStudent.city
    };
    
    this.studentService.updateStudent(studentToUpdate).subscribe(
    (response: { success: boolean; message: string }) => {
      if (response.success) {
        this.getAll();
        this.displayEditDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
            detail: response.message || 'Student updated successfully'
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
            detail: response.message || 'Failed to update student'
        });
      }
    },
    (error) => {
        console.log('unable to access api !!!', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to update student'
      });
    }
  );
}

  deleteClick(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this student?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentService.deleteStudent(id).subscribe(
          (response) => {
            this.getAll();
            Swal.fire('Deleted!', 'Student has been deleted.', 'success');
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Student deleted successfully'
            });
          },
          (error) => {
            console.log('unable to access api !!!', error);
            Swal.fire('Error!', 'Failed to delete student.', 'error');
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete student'
            });
          }
        );
      }
    });
  }

  isFormValid(): boolean {
    const countryValue = typeof this.newStudent.country === 'object' ? this.newStudent.country?.name : this.newStudent.country;
    const stateValue = typeof this.newStudent.state === 'object' ? this.newStudent.state?.name : this.newStudent.state;
    const cityValue = typeof this.newStudent.city === 'object' ? this.newStudent.city?.name : this.newStudent.city;
    
    return this.newStudent.name.trim() !== '' && 
           this.newStudent.course.trim() !== '' &&
           (countryValue?.trim() || '') !== '' &&
           (stateValue?.trim() || '') !== '' &&
           (cityValue?.trim() || '') !== '';
  }

  isEditFormValid(): boolean {
    const countryValue = typeof this.editStudent.country === 'object' ? this.editStudent.country?.name : this.editStudent.country;
    const stateValue = typeof this.editStudent.state === 'object' ? this.editStudent.state?.name : this.editStudent.state;
    const cityValue = typeof this.editStudent.city === 'object' ? this.editStudent.city?.name : this.editStudent.city;
    
    return this.editStudent.name.trim() !== '' && 
           this.editStudent.course.trim() !== '' &&
           (countryValue?.trim() || '') !== '' &&
           (stateValue?.trim() || '') !== '' &&
           (cityValue?.trim() || '') !== '';
  }

  // Helper methods for validation
  getCountryValue(student: Student): string {
    return typeof student.country === 'object' ? student.country?.name || '' : student.country || '';
  }

  getStateValue(student: Student): string {
    return typeof student.state === 'object' ? student.state?.name || '' : student.state || '';
  }

  getCityValue(student: Student): string {
    return typeof student.city === 'object' ? student.city?.name || '' : student.city || '';
  }

  isCountryValid(student: Student): boolean {
    const value = this.getCountryValue(student);
    return value.trim().length >= 2;
  }

  isStateValid(student: Student): boolean {
    const value = this.getStateValue(student);
    return value.trim().length >= 2;
  }

  isCityValid(student: Student): boolean {
    const value = this.getCityValue(student);
    return value.trim().length >= 2;
  }
}
