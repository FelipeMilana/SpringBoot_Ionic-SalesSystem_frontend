import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { AuthService } from '../services/auth.service';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { StorageService } from '../services/storage.service';
import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';
import { UserService } from '../services/domain/user.service';
import { WithdrawService } from '../services/domain/withdraw.service';
import { VehicleService } from '../services/domain/vehicle.service';
import { PersonService } from '../services/domain/person.service';
import { ExpenseService } from '../services/domain/expense.service';
import { SaleService } from '../services/domain/sale.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    StorageService,
    UserService,
    WithdrawService,
    VehicleService,
    PersonService,
    ExpenseService,
    SaleService
  ]
})
export class AppModule {}
