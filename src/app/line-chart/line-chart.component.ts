import { Component, Input, OnChanges, OnInit, SimpleChanges, OnDestroy } from '@angular/core';
import { Country } from '../core/models/Olympic';
import { Participation } from '../core/models/Participation';
import { OlympicService } from '../core/services/olympic.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit, OnChanges, OnDestroy {
  @Input() data!: Country[];
  @Input() selectedCountry!: Country;
  view: [number, number] = [300, 200];
  single: any[] = [];
  totalMedalsCount!: number;
  totalAthleteCount!: number;
  private subscription: Subscription = new Subscription();


  // options du line chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Years';
  yAxisLabel = 'Medals Count';



  constructor(
    private OlympicService: OlympicService
    ) {}

  // on initialise le composant
  ngOnInit(): void {
    // on charge les données
    this.OlympicService.loadInitialData().subscribe(() => {
      this.getData();
    });
  }

  // methode qui s'execute quand les données changent
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['selectedCountry']) {
      this.processData();
    }
  }

  // on se désabonne de l'observable
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // on recupere les données depuis le service
  getData(): void {
    this.OlympicService.getOlympics().subscribe((data: Country[]) => {
      this.data = data;
      if (!this.selectedCountry) {
        this.selectedCountry = this.data[0];
      }
      this.processData();
    });
  }


  // on traite les données pour les afficher dans le graphique
  processData(): void {
    if (this.selectedCountry) {
      this.single = [{
        name: this.selectedCountry.country,
        series: this.selectedCountry.participations.map((participation: Participation) => {
          return {
            name: participation.year.toString(),
            value: participation.medalsCount,
          };
        })
      }];

      this.totalMedalsCount = this.selectedCountry.participations.reduce((total, participation) => {
        return total + participation.medalsCount;
      }, 0);

      this.totalAthleteCount = this.selectedCountry.participations.reduce((total, participation) => {
        return total + participation.athleteCount;
      }, 0);
    }
  }



}
