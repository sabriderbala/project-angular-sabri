## Application Olympique

Cette application affiche les données olympiques de différents pays, notamment le nombre de médailles remportées par pays et le nombre total d'athlètes participants. Elle comprend également des graphiques pour visualiser ces données.

# Installation

Clonez ce dépôt de code sur votre machine locale.
Assurez-vous d'avoir Node.js et Angular CLI installés.
Ouvrez un terminal à la racine du projet et exécutez la commande suivante pour installer les dépendances :
Copy code
npm install

# Exécution de l'application

Dans le même terminal, exécutez la commande suivante : ng serve

L'application sera accessible à l'adresse http://localhost:4200/ dans votre navigateur.

# Structure du code

Le fichier app.module.ts définit le module principal de l'application et importe les composants nécessaires ainsi que les modules externes utilisés, tels que HttpClientModule et NgxChartsModule.
Le fichier app.component.ts contient la logique principale de l'application. Il charge les données initiales à partir du service OlympicService et les assigne aux variables countryData et participationData. Il s'agit du composant racine de l'application.
Le fichier app-routing.module.ts définit les routes de l'application, notamment la page d'accueil (HomeComponent) et la page de détail d'un pays (PaysDetailComponent).
Les fichiers pie-chart.component.ts et line-chart.component.ts contiennent la logique et la présentation des composants de graphique en camembert et en ligne respectivement. Ils utilisent les données fournies par le service OlympicService et les affichent à l'aide du module NgxCharts.
Le fichier pays-detail.component.ts est responsable de l'affichage des détails d'un pays sélectionné. Il utilise le service OlympicService pour charger les données initiales et récupère l'ID du pays à partir de l'URL. Il affiche ensuite les données correspondantes.
Les fichiers HTML correspondants (app.component.html, pie-chart.component.html, line-chart.component.html et pays-detail.component.html) définissent la structure et le contenu des composants.

# Données

Les données olympiques sont stockées dans le fichier olympic-data.json et sont utilisées par le service OlympicService pour fournir les données nécessaires aux composants.

# Conclusion

Cette application permet de visualiser les données olympiques de différents pays à l'aide de graphiques interactifs. Elle utilise Angular et les modules externes NgxCharts pour faciliter la manipulation et la présentation des données. N'hésitez pas à explorer le code source pour en savoir plus sur son fonctionnement et à apporter des améliorations selon vos besoins.
