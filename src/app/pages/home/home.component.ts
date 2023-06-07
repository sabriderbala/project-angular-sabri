import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Router } from '@angular/router';
import { Country } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);
  public countryData: any[] = [];

  constructor(
    private olympicService: OlympicService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe((data) => {
      this.countryData = data;
    });
  }

  onCountrySelected(countryName: string): void {
    const selectedCountry = this.countryData.find((country: Country) => country.country === countryName);
    if (selectedCountry) {
      this.router.navigate(['detail', selectedCountry.id]);
    }
  }
}
