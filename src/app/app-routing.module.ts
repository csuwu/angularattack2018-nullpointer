import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartscreenComponent } from './components/startscreen/startscreen.component';
import { GamescreenComponent } from './components/gamescreen/gamescreen.component';


const routes: Routes = [
  {path : 'start', component : StartscreenComponent},
  {path : 'game', component : GamescreenComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
