import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { OlympicService } from './core/services/olympic.service';
import { Country } from './core/models/Olympic';
import { Participation } from './core/models/Participation';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  countryData!: Country[];
  participationData!: Participation[];

  constructor(private olympicService: OlympicService) {}

  // on initialise le composant
  ngOnInit(): void {
    // on charge les données
    this.olympicService.loadInitialData().pipe(take(1)).subscribe(data => {
      this.countryData = data;
      this.participationData = this.countryData[0].participations;
    });
  }
}
