import { NgModule } from '@angular/core';
import {MatDividerModule, MatInputModule, MatSelectModule, MatOptionModule, MatFormFieldModule, MatRadioModule, MatTabsModule, MatMenuModule, MatCardModule, MatIconModule, MatToolbarModule, MatChipsModule, MatButtonModule, MatCheckboxModule} from '@angular/material';

@NgModule({
      imports: [MatDividerModule, MatInputModule, MatSelectModule, MatOptionModule, MatFormFieldModule, MatRadioModule, MatTabsModule, MatMenuModule, MatCardModule, MatIconModule, MatToolbarModule, MatChipsModule, MatButtonModule, MatCheckboxModule],
        exports: [MatDividerModule, MatInputModule, MatSelectModule, MatOptionModule, MatFormFieldModule, MatRadioModule, MatTabsModule, MatMenuModule, MatCardModule, MatIconModule, MatToolbarModule, MatChipsModule, MatButtonModule, MatCheckboxModule],
})

export class AppMaterialModule { }
