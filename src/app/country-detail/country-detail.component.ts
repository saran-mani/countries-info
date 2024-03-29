import { Component, OnInit } from '@angular/core';
import { Country } from '../interface/country';
import { CountryService } from '../service/country.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'country-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.css',
  providers: [CountryService],
})
export class CountryDetailComponent implements OnInit {
  countryDetails: Country[] = [];
  isLoading: boolean = true;
  googleMapsLink = 'https://www.google.com/maps/place/';

  constructor(
    private countryService: CountryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.loading();
    this.onAssignParams();
  }
  onAssignParams(): void {
    this.route.params.subscribe((params) => {
      const cca3Code = params['cca3'];

      if (cca3Code) {
        this.loadCountryDetails(cca3Code);
      }
    });
  }
  loadCountryDetails(cca3: string) {
    this.countryService.getCountryByCode(cca3).subscribe({
      next: (data: Country[]) => {
        if (Array.isArray(data)) {
          if (data.length > 0) {
            this.countryDetails = data;
            this.isLoading = false;
          }
        } else {
          this.countryDetails = [data];
        }
      },
      error: (error: any) => console.log(error),
      complete: () => console.log('Done Retrieving country details'),
    });
  }
  getLanguageArray() {
    return Object.values(this.countryDetails[0].languages);
  }
  scroll(arg0: number, arg1: number) {
    window.scroll(arg0, arg1);
  }
}
