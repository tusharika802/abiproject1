import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'angularwithapi';
  items: MenuItem[] = [];

       ngOnInit() {
         this.items = [
           {
             label: 'Home',
             icon: 'pi pi-home',
             routerLink: '/'
           },
           {
             label: 'Address',
             icon: 'pi pi-map-marker',
             items: [
                  {
                  label: 'Country',
                  icon: 'pi pi-users',
                  routerLink: '/country'
                },
               {
                 label: 'State',
                 icon: 'pi pi-user',
                 routerLink: '/state'
               },
               {
                 label: 'City',
                 icon: 'pi pi-mobile',
                 routerLink: '/city'
               },
             ]
           },
           {
             label: 'Student',
             icon: 'pi pi-users',
             routerLink: '/student'
           }
         ];
       }
}