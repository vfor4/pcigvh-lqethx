import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #cityFilter>
        <button class="primary" type="button" (click)="filteredByCity(cityFilter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location *ngFor="let housingLocation of housingLocationFilter" [housingLocation] ="housingLocation"></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';
  housingLocationList: HousingLocation[] = [];
  housingLocationFilter: HousingLocation[] = [];

  constructor(private housingService: HousingService){
    this.housingService.getAllHousingLocations().then(
      (housingLocationList: HousingLocation[]) => {
        this.housingLocationFilter = housingLocationList;
        this.housingLocationList = housingLocationList;
      }
    )
  }

  filteredByCity(text:string) : void {
    if(!text){
      this.housingLocationFilter = this.housingLocationList;
    }
    this.housingLocationFilter = this.housingLocationList.filter(
      housing => housing?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
