import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Country } from '../core/models/Olympic';
import { map, switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-pays-detail',
  templateUrl: './pays-detail.component.html',
  styleUrls: ['./pays-detail.component.scss'],
})
export class PaysDetailComponent implements OnInit {
  public olympics$!: Observable<any>;
  public countryDataArray: Country[] = [];
  public data: Country[] = [];
  public selectedCountry: Country | undefined;


  constructor(
    private OlympicService: OlympicService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // on initialise le composant
  ngOnInit(): void {
    // on charge les données
    this.OlympicService.loadInitialData().subscribe(() => {
      this.olympics$ = this.OlympicService.getOlympics();

      this.olympics$.subscribe((data: Country[]) => {
        this.data = data;
      });

      // on recupere l'id du pays dans l'url
      this.route.paramMap.pipe(
        switchMap((params: ParamMap) => {
          const countryId = params.get('id');
          if (countryId) {
            return this.olympics$.pipe(
              map((data: any) => data.find((country: Country) => country.id.toString() === countryId) as Country)
            );
          } else {
            return of(null);
          }
        })
      ).subscribe((selectedCountry: Country | null) => {
        if (selectedCountry !== null) {
          this.selectedCountry = selectedCountry;
        }
      });
    });
  }

  // on execute cette methode pour revenir en arriere
  goback() {
    window.history.back();
  }

  // on execute cette methode quand on clique sur un pays
  isCountrySelected(): boolean {
    return this.selectedCountry !== undefined;
  }

}
