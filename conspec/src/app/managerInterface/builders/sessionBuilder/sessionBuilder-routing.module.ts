import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionBuilderComponent } from './sessionBuilder.component';


const routes: Routes = [
    {path: '',  component: SessionBuilderComponent }
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SessionBuilderRoutingModule {}
