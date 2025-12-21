import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    active: boolean;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '', active: true, },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '', active: false, },
    { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '', active: false, },
    { path: '/typography', title: 'Typography',  icon:'library_books', class: '', active: false, },
    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '', active: false, },
    { path: '/maps', title: 'Maps',  icon:'location_on', class: '', active: false, },
    { path: '/products', title: 'Products',  icon:'view_in_ar', class: '', active: true, },
    { path: '/carts', title: 'Carts',  icon:'shopping_cart', class: '', active: true, },
    { path: '/posts', title: 'Posts',  icon:'assignment', class: '', active: false, },
    { path: '/comments', title: 'Comments',  icon:'forum', class: '', active: false, },
    { path: '/users', title: 'Users',  icon:'person', class: '', active: true, },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '', active: true, },
    { path: '/login', title: 'Login',  icon:'login', class: '', active: true, },

    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro', active: false, },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    // this.menuItems = ROUTES.filter(menuItem => true);
    this.menuItems = ROUTES.filter(menuItem => menuItem.active==true);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
