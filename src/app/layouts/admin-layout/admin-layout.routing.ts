import { Routes } from "@angular/router";

// import { DashboardComponent } from "../../dashboard/dashboard.component";
import { Dashboard2Component } from "../../dashboard2/dashboard2.component";
import { UserProfileComponent } from "../../user-profile/user-profile.component";
import { TableListComponent } from "../../table-list/table-list.component";
import { TypographyComponent } from "../../typography/typography.component";
import { IconsComponent } from "../../icons/icons.component";
import { MapsComponent } from "../../maps/maps.component";
import { NotificationsComponent } from "../../notifications/notifications.component";
import { UpgradeComponent } from "../../upgrade/upgrade.component";
import { ProductsComponent } from "../../products/products.component";
import { CartsComponent } from "../../carts/carts.component";
import { PostsComponent } from "../../posts/posts.component";
import { CommentsComponent } from "../../comments/comments.component";
import { UsersComponent } from "../../users/users.component";
import { AuthLoginComponent } from "../../auth-login/auth-login.component";

export const AdminLayoutRoutes: Routes = [
  // {
  //   path: '',
  //   children: [ {
  //     path: 'dashboard',
  //     component: DashboardComponent
  // }]}, {
  // path: '',
  // children: [ {
  //   path: 'userprofile',
  //   component: UserProfileComponent
  // }]
  // }, {
  //   path: '',
  //   children: [ {
  //     path: 'icons',
  //     component: IconsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'notifications',
  //         component: NotificationsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'maps',
  //         component: MapsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'typography',
  //         component: TypographyComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'upgrade',
  //         component: UpgradeComponent
  //     }]
  // }
  // { path: "dashboard", component: DashboardComponent },
  { path: "dashboard", component: Dashboard2Component },
  { path: "user-profile", component: UserProfileComponent },
  { path: "table-list", component: TableListComponent },
  { path: "typography", component: TypographyComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "upgrade", component: UpgradeComponent },
  { path: "products", component: ProductsComponent },
  { path: "carts", component: CartsComponent },
  { path: "posts", component: PostsComponent },
  { path: "comments", component: CommentsComponent },
  { path: "users", component: UsersComponent },
  { path: "login", component: AuthLoginComponent },
];
