import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
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

  constructor(
    private router: Router,
    private studentService: StudentService,
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
    this.displayAddDialog = true;
  }

  saveClick() {
    this.studentService.saveStudent(this.newStudent).subscribe(
      (response) => {
        console.log('Save response:', response);
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
          detail: response || 'Student saved successfully'
        });
      },
      (error) => {
        console.log('unable to access api !!!', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to save student'
        });
      }
    );
  }

  editClick(data: Student) {
    this.editStudent = { ...data };
    this.displayEditDialog = true;
  }

  updateClick() {
    this.studentService.updateStudent(this.editStudent).subscribe(
      (response) => {
        this.getAll();
        this.displayEditDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response || 'Student updated successfully'
        });
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
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this student?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.studentService.deleteStudent(id).subscribe(
          (response) => {
            this.getAll();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response || 'Student deleted successfully'
            });
          },
          (error) => {
            console.log('unable to access api !!!', error);
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
    return this.newStudent.name.trim() !== '' && 
           this.newStudent.course.trim() !== '' &&
           (this.newStudent.country?.trim() || '') !== '' &&
           (this.newStudent.state?.trim() || '') !== '' &&
           (this.newStudent.city?.trim() || '') !== '';
  }

  isEditFormValid(): boolean {
    return this.editStudent.name.trim() !== '' && 
           this.editStudent.course.trim() !== '' &&
           (this.editStudent.country?.trim() || '') !== '' &&
           (this.editStudent.state?.trim() || '') !== '' &&
           (this.editStudent.city?.trim() || '') !== '';
  }
}

