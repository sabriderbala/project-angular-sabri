import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Country } from '../core/models/Olympic';
import { Participation } from '../core/models/Participation';
import { OlympicService } from '../core/services/olympic.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  @Input() data!: Country[];
  @Input() countryId!: string;
  @Input() numberOfJos!: number[];
  @Output() countrySelected: EventEmitter<string> = new EventEmitter<string>();
  single!: any[];
  totalJos!: number;
  totalCountries!: number;

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute,
    private router:Router
  ) {}

  // on initialise le composant
  ngOnInit(): void {
    this.processData()
    // on récupère l'id du pays dans l'url
    this.route.snapshot.paramMap.get('id') ? this.countryId = this.route.snapshot.paramMap.get('id')! : this.countryId = '0';
  }

  // on traite les données pour les afficher dans le graphique
  processData(): void {
    this.single = this.data.map((country: Country) => {
      if (country.participations) {

        // on calcule le nombre total de médailles
        const totalMedals = country.participations.reduce(
          (total: number, participation: Participation) => total + participation.medalsCount,
          0
        );

        // on calcule le nombre total de JO
        const totalJos = country.participations.length;
        this.totalJos = totalJos;

        // on calcule le nombre total de pays
        const totalCountries = this.data.length;
        this.totalCountries = totalCountries;

        return {
          name: country.country,
          value: totalMedals,
        };
      } else {
        return {
          name: country.country,
          value: 0,
        };
      }
    });

  }


  // on recupere le pays selectionné
  onContinue(event: any): void {
    const segment = event?.name;

    if (segment) {
      this.countrySelected.emit(segment)
    }
  }

}
