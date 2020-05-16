import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {PositionDTO} from "../../dto/PositionDTO";
import {StrapDTO} from "../../dto/StrapDTO";
import {StrapService} from "../../service/StrapService";
import {PositionService} from "../../service/PositionService";
import {interval, Observable, observable, Subscription} from "rxjs";
import {startWith, subscribeOn} from "rxjs/operators";
import {OpenLayersMap, randomHexaColor} from "../../OpenLayersMap";
import {fromLonLat, toLonLat} from 'ol/proj';
import {SubSink} from "subsink";

/**
 * Affiche une carte sur laquelle l'on afficher la position d'un résident
 */
@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit, AfterViewInit, OnDestroy {

  /**
   * Position
   */
  position: PositionDTO;

  /**
   * Bracelets
   */
  straps: StrapDTO[] = [];

  /**
   * Carte
   */
  map: OpenLayersMap = new OpenLayersMap();

  private subs = new SubSink();

  constructor(private strapService: StrapService, private positionService: PositionService) {
  }

  ngOnInit() {
    this.findAllStrap();
  }

  /**
   * Récupère les bracelets
   */
  findAllStrap(): void {
    this.strapService.findAll().subscribe(straps => {
      this.straps = straps;
    });
  }

  ngAfterViewInit(): void {
    this.map.initializeMap('map');
    this.map.setOptions({asGPSTracker: true, centerOnMarker: true});
    this.map.centerAt([2.2333279252052307, 48.90928638628919]);
    this.map.setZoom(18.5);
    this.map.addGeoJSONLayer('assets/map_correcte.json', {color: 'red'});
  }

  positionHistory(strapId: bigint): void {
    this.subs.unsubscribe();
    this.map.removeMarkers();
    this.map.removeHistoryLayers();
    this.subs.add(this.positionService.positionHistory(strapId).subscribe(history => {
        const positions = history.map(position => [position.longitude, position.latitude]);
        this.map.positionsHistory(positions);
        /*console.log(positions)
        history.forEach(position => {
          this.map.addMarker(strapId, [position.longitude, position.latitude], { isHistoryMarker: true })
        });
        this.map.drawLine(positions, {withArrows: true});*/
      })
    );
  }

  /**
   * Ajoute un marqueur à la position du bracelet
   * @param id Identifiant du bracelet
   */
  findPosition(id: bigint): void {
    this.map.removeHistoryLayers();
    this.subs.add(
      this.positionService.findPositionByStrap(id).subscribe(position => {
        this.map.addMarker(position.strap.id, [position.longitude, position.latitude], {textUnderMarker: `${position.strap.person.firstName}  ${position.strap.person.lastName}`});
      })
    );
  }

  private async parseJson() {
    const f = await fetch('assets/map_correcte.json');
    const r = await f.json();
    const features = r.features;
    for (let i = 0; i < features.length; i++) {

      if (features[i].geometry.type === 'LineString') {
        const coords = features[i].geometry.coordinates;

        for (let j = 0; j < coords.length; j++) {
          coords[j][0] = parseFloat(coords[j][0]).toFixed(6);
          coords[j][1] = parseFloat(coords[j][1]).toFixed(6);
        }
      } else {
        if (features[i].geometry.type === 'Polygon') {
          const coords = features[i].geometry.coordinates[0];

          for (let g = 0; g < coords.length; g++) {
            coords[g][0] = parseFloat(coords[g][0]).toFixed(6);
            coords[g][1] = parseFloat(coords[g][1]).toFixed(6);
          }
        }
      }
    }

    r.features = features;

    console.log(r);
    console.log(JSON.stringify(r));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}


