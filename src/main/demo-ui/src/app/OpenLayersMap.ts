import Map from 'ol/Map';
import View from 'ol/View';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {OSM, Vector as VectorSource} from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import {fromLonLat, toLonLat} from 'ol/proj';
import {Geometry, LineString, Point} from 'ol/geom';
import Feature from 'ol/Feature';
import {Coordinate} from 'ol/coordinate';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Icon from 'ol/style/Icon';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';
import distance from '@turf/distance';
import TextPlacement from 'ol/style/TextPlacement';
import {PositionDTO} from "./dto/PositionDTO";


/**
 * Retourne une couleur aléatoire au format hexadécimal
 */
export function randomHexaColor(): string {
  return '#'.concat(Math.floor(Math.random() * 16777215).toString(16));
}

/**
 * Retourne les coordonnées géographiques d'une adresse
 * @param address Adresse
 * @param postalCode Code postal
 * @param city Ville
 * @param country Pays
 */
export async function getLatLongFromAddress(address: string, postalCode: string, city: string, country: string): Promise<Coordinate> {
  const url = new URL('https://nominatim.openstreetmap.org/search/?');
  const params = new URLSearchParams();
  params.append('street', address);
  params.append('postalcode', postalCode);
  params.append('city', city);
  params.append('country', country);
  params.append('format', 'json');

  const request = await fetch(`${url}${params}`);
  const response = await request.json();
  const result = response[0];

  return [result.lon, result.lat];
}


/**
 * Options du marqueur
 */
export interface IMarkerOptions {
  /**
   * Identifiant
   */
  id?: string | number;

  /**
   * Visibilité
   */
  visible?: boolean;

  /**
   * Affiche du texte sous le marqueur
   */
  textUnderMarker?: string;

  /**
   * Couleur du marqueur
   */
  color?: number[] | string;

  /**
   * Si le marqueur est un marqueur "historique"
   */
  isHistoryMarker?: boolean
}


/**
 * Options de la ligne
 */
export interface ILineOptions {

  /**
   * Identifiant de la ligne
   */
  id?: string;

  /**
   * Si la ligne doit se terminer par une flèche
   */
  withArrows?: boolean;

  /**
   * Couleur
   */
  color?: string;

  /**
   * Affiche la distance entre les deux points de la ligne
   */
  withDistance?: boolean;
}


/**
 * Options de la carte
 */
export interface IMapOptions {

  /**
   * S'il faut faire comme dans les traceurs GPS, où l'on suit un seul point mouvant sur une carte
   */
  asGPSTracker?: boolean;

  /**
   * S'il faut centrer la carte sur le marqueur lorsqu'il bouge
   * (Uniquement possible si asGPSTracker est activé)
   */
  centerOnMarker?: boolean;
}


/**
 * Permet la création de cartes avec OpenLayers
 */
export class OpenLayersMap {

  /**
   * Carte
   */
  private map: Map;

  /**
   * Vue
   */
  private view: View;

  /**
   * Vecteur source
   */
  private vectorSource: VectorSource = new VectorSource();

  /**
   * Options de la carte
   */
  private mapOptions: IMapOptions;

  private markersLayer: VectorLayer;
  // [{ strapId: 12, markers: [] ..
  private markers: { strapId: bigint, marker: Feature<Point> }[] = [];

  private history: Feature<Point>[] = [];

  constructor() {
    this.markersLayer = new VectorLayer();
  }

  /**
   * Retourne vrai si le tableau est un tableau de coordonnées
   * @param coords Coordonnées
   */
  private static isCoordinate(coords: number[]): boolean {
    return coords.length === 2 && typeof coords[0] === 'number' && typeof coords[1] === 'number';
  }

  /**
   * Affiche une carte OpenStreetMaps dans le sélecteur spécifié
   * @param selector Sélecteur
   * @param [centerTo=[0,0]] Coordonnées géographiques
   * @param [zoom=2] Zoom
   * @param [options] Options de la carte
   */
  initializeMap(selector: string, centerTo: Coordinate = [0, 0], zoom: number = 2, options: IMapOptions = {asGPSTracker: false}): void {
    this.view = new View({
      center: fromLonLat(centerTo),
      zoom
    });

    this.map = new Map({
      target: selector,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
      ],
      view: this.view
    });

    this.mapOptions = options;
    this.mapOptions.asGPSTracker = options.asGPSTracker;
    this.markersLayer.set('type', 'markersLayer');
    this.map.addLayer(this.markersLayer);

    // Redéfinit le zoom si celui est supérieur au zoom maximum
    this.setZoom(zoom);
  }

  /**
   * Définit une nouvelle carte
   */
  setMap(map: Map): void {
    this.map = map;
  }

  /**
   * Retourne la carte
   */
  getMap(): Map {
    return this.map;
  }

  /**
   * Définit les options de la carte
   * @param options Options de la carte
   */
  setOptions(options: IMapOptions): void {
    this.mapOptions = options;
  }

  /**
   * Ajoute une couche GeoJSON
   * Il est recommandé de spécifier un identifiant pour pouvoir supprimer le tracé
   * @param geoJSONFilePath URL ou chemin du fichier GeoJSON
   * @param [options] Options
   * @param [options.color] Couleur du tracé
   * @param [options.visible] Visibilité du tracé
   * @param [options.id] Identifiant de la couche
   */
  addGeoJSONLayer(geoJSONFilePath: string,
                  options?: { id?: string | number, color?: string, visible?: boolean }): void {
    options = Object.assign({}, {color: '#1560c2', visible: true, id: ''}, options);

    const vectorSource = new VectorSource({
      url: geoJSONFilePath,
      format: new GeoJSON({featureProjection: 'EPSG:3857'}),
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        stroke: new Stroke({
          color: options.visible ? options.color : [0, 0, 0, 0],
        })
      })
    });

    vectorLayer.set('id', options.id);
    vectorLayer.set('type', 'geojson');

    this.map.addLayer(vectorLayer);
  }


  /**
   * Définit le zoom de la vue
   * @param zoom Zoom
   */
  setZoom(zoom: number): void {
    if (!this.canBeZoomed(zoom)) {
      throw new Error(`Le zoom spécifié est supérieur à ${this.map.getView().getMaxZoom()}`);
    }

    this.map.getView().setZoom(zoom);
  }

  /**
   * Centre la carte aux coordonnées spécifiées
   * @param coords Coordonnées géographiques
   */
  centerAt(coords: Coordinate): void {
    this.map.getView().setCenter(fromLonLat(coords));
  }

  /**
   * Ajoute un marqueur aux coordonnées spécifiées
   * @param at Coordonnées géographiques
   * @param [options] Options du marqueur
   */
  addMarker(strapId: bigint, at: Coordinate, options?: IMarkerOptions): void {
    options = Object.assign({}, {
      id: '',
      color: '#000000',
      visible: true,
      textUnderMarker: '',
      isHistoryMarker: false
    } as IMarkerOptions, options);

    if (OpenLayersMap.isCoordinate(at)) {
      const marker = new Feature(
        new Point(fromLonLat(at))
      );

      marker.set('type', 'marker');

      const styles = [
        new Style({
          image: new Icon({
            src: 'data:image/png; charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABpUlEQVQ4y7WVPXLbMBBGn+2G6cAOJdypo8qUuEF0A/EGPoKPwMkJPOyois4NWLoUSlXEDbjsoAopBCQaWbSdif3NYIbNvtmfb5c3vC+VHoCkt6ibNyBroALMBdADDthfg18DroEfgAXW6qQTTQQRkQQbgF/pexG4Bh6AjTFGWWupqopzoHOOYRjw3gvwDPy8hJ7DnsqyFGttbJomjuMYLzWOY2yaJlprY1mWAjyl2Fc9ewQma23s+z5O0xSXNE1T7Ps+WmsjMKVYBXCXgN+B2hiz2m63bDabP2VeU1EUaK0JIXA4HIpTWzmkgUHq21TX9dUylzSOY6zrOmf5AHCbUjVKKVVVFcYYPipjTB6ayvbKQKWUerPMRdf/jVMZ+Km6zeuUTPvPgLM4ASQDvYiIcw7v/Ydh3nucc3l7PCDZNt+AlYgYpRSr1YqiKN7NrOs6drsdIvIC7AB/d7b0WkTWx+Ox0FqjtV6EigjDMNC2Lfv9XoAu7XXIwADMgJrn+d57X4QQ0Fq/mrz3nq7raNsW59wcQngG2mzqTz8OX36+vuTA/tcv4DcQ5j3msmvKlAAAAABJRU5ErkJggg==',
            crossOrigin: 'anonymous',
            color: options.color ? options.color : [0, 0, 0],
          })
        })
      ];

      if (options.id) {
        marker.setId(options.id);
      }

      // Texte sous le marqueur
      if (options.textUnderMarker.length > 0) {
        const textStyle = new Style({
          text: new Text({
            text: options.textUnderMarker,
            offsetY: 21,
            scale: 1.17,
            fill: new Fill({
              color: [0, 0, 0]
            }),
            stroke: new Stroke({
              color: '#ffffff',
              width: 1
            })
          })
        });

        styles.push(textStyle);
      }

      marker.setStyle(styles);

      this.addPosition(strapId, marker);

      const vectorSource = new VectorSource({
        features: [...this.markers.map(marker => marker.marker)]
      });

      this.markersLayer.setSource(vectorSource);

      this.showOnlyLastMarkers();
    } else {
      throw new Error('Ajouter un marqueur nécessite des coordonnées valides');
    }
  }

  addPosition(strapId: bigint, marker: Feature<Point>): void {
    const markerByStrapId = this.markers.find(marker => marker.strapId === strapId);
    if (markerByStrapId) {
      markerByStrapId.marker = marker;
    } else {
      this.markers.push({strapId, marker});
    }
  }

  positionsHistory(positions: number[][], options?: IMarkerOptions) {
    this.removeHistoryLayers();
    options = Object.assign({}, {
      id: '',
      color: '#000000',
      visible: true,
      textUnderMarker: '',
      isHistoryMarker: false
    } as IMarkerOptions, options);

    for (let position of positions) {
      const marker = new Feature(
        new Point(fromLonLat(position))
      );

      marker.set('type', 'marker');

      const styles = [
        new Style({
          image: new Icon({
            src: 'data:image/png; charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABpUlEQVQ4y7WVPXLbMBBGn+2G6cAOJdypo8qUuEF0A/EGPoKPwMkJPOyois4NWLoUSlXEDbjsoAopBCQaWbSdif3NYIbNvtmfb5c3vC+VHoCkt6ibNyBroALMBdADDthfg18DroEfgAXW6qQTTQQRkQQbgF/pexG4Bh6AjTFGWWupqopzoHOOYRjw3gvwDPy8hJ7DnsqyFGttbJomjuMYLzWOY2yaJlprY1mWAjyl2Fc9ewQma23s+z5O0xSXNE1T7Ps+WmsjMKVYBXCXgN+B2hiz2m63bDabP2VeU1EUaK0JIXA4HIpTWzmkgUHq21TX9dUylzSOY6zrOmf5AHCbUjVKKVVVFcYYPipjTB6ayvbKQKWUerPMRdf/jVMZ+Km6zeuUTPvPgLM4ASQDvYiIcw7v/Ydh3nucc3l7PCDZNt+AlYgYpRSr1YqiKN7NrOs6drsdIvIC7AB/d7b0WkTWx+Ox0FqjtV6EigjDMNC2Lfv9XoAu7XXIwADMgJrn+d57X4QQ0Fq/mrz3nq7raNsW59wcQngG2mzqTz8OX36+vuTA/tcv4DcQ5j3msmvKlAAAAABJRU5ErkJggg==',
            crossOrigin: 'anonymous',
            color: options.color ? options.color : [0, 0, 0],
          })
        })
      ];

      marker.setStyle(styles);

      this.history.push(marker);

      this.vectorSource.addFeature(marker);

      const historyLayer: VectorLayer = new VectorLayer({
        source: this.vectorSource
      });

      historyLayer.set('type', 'historyLayer');

      this.map.addLayer(historyLayer);
    }

    this.drawLine(positions, {withArrows: true});
  }

  /**
   * Supprime tous les marqueurs de la carte
   */
  removeAllMarkers(): void {
    this.markers = [];
  }

  removeMarkers(): void {
    const markersLayer = this.markersLayer.getSource();
    for (let marker of this.markers) {
      markersLayer.removeFeature(marker.marker)
    }
  }

  removeHistoryLayers(): void {
    this.history = [];
    for(let f of this.vectorSource.getFeatures()) {
      this.vectorSource.removeFeature(f);
    }

    const layers = this.map.getLayers().getArray().filter(layer => layer.get('type') && layer.get('type') == 'historyLayer');
    for (let layer of layers) {
      this.map.getLayers().remove(layer);
    }
  }

  showOnlyLastMarkers() {
    const index = this.map.getLayers().getArray().findIndex(layer => layer.get('type') == 'markersLayer');
    if (index) {
      const markersLayer = this.map.getLayers().item(index) as VectorLayer;
      this.map.removeLayer(markersLayer);
      this.map.addLayer(markersLayer);
    }
  }

  getMarkers(): Feature<Point>[] {
    /* const markers = [];
     const layers = this.map.getLayers().getArray();
     for(let layer of layers) {
       try {
         if (layer.get('type') === 'historyLayer') {
           const features = (layer as VectorLayer).getSource().getFeatures();
           for (let feature of features) {
             if (feature.get('type') === 'marker'){
               markers.push(feature);
             }
           }
         }
       } catch (e) {}*/

    return this.history;
  }

  /**
   * Trace une ligne entre chaque marqueur
   * @param [options] Options de la ligne
   */
  drawLineBetweenEachMarker(options?: ILineOptions): void {
    const markers = this.getMarkers();
    console.log(markers)
    const coords: Coordinate[] = markers.map(m => m.getGeometry().getCoordinates());
    console.log(coords)
    if (markers.length > 1) {
      this.drawLine(coords, options);
    } else {
      throw new Error('Deux marqueurs minimum sont nécessaires pour tracer une ligne');
    }
  }

  /**
   * Trace une ligne entre le premier marqueur et le dernier marqueur
   * @param [options] Options de la ligne
   */
  drawLineBetweenFirstMarkerAndLastMarker(options?: ILineOptions): void {
    const markers = this.getMarkers();
    const allCoordinates: Coordinate[] = markers.map(m => m.getGeometry().getCoordinates());
    const coords = [allCoordinates[0], allCoordinates[allCoordinates.length - 1]];
    if (markers.length > 1) {
      this.drawLine(coords, options);
    } else {
      throw new Error('Deux marqueurs minimum sont nécessaires pour tracer une ligne');
    }
  }

  /**
   * Trace une ligne entre deux positions
   * @param p1 Première position
   * @param p2 Deuxième position
   * @param [options] Options de la ligne
   */
  drawLineBetweenTwoPositions(p1: Coordinate, p2: Coordinate, options?: ILineOptions): void {
    if (OpenLayersMap.isCoordinate(p1) && OpenLayersMap.isCoordinate(p2)) {
      const coords: Coordinate[] = [p1, p2];
      this.drawLine([...coords]);
    } else {
      throw new Error('Les positions spécifiées ne sont pas des coordonnées');
    }
  }

  /**
   * Trace une ligne entre les points spécifiés
   * @param coords Coordonnées des points
   * @param [options] Options de la ligne
   */
  drawLine(coords: Coordinate[], options?: ILineOptions): void {
    options = Object.assign({}, {
      id: '',
      color: '#242424',
      withArrows: false,
      withDistance: false
    } as ILineOptions, options);

    if (coords.length > 1) {

      for (let p = 0; p < coords.length; p++) {
        coords[p] = fromLonLat(coords[p]);
      }

      const line = new Feature(new LineString(coords));

      const styles = [
        new Style({
          stroke: new Stroke({
            color: options.color
          })
        })
      ];

      // Si l'option withArrows est activée
      if (options.withArrows) {
        // On ajoute de jolies flèches
        line.getGeometry().forEachSegment((start, end) => {
          const dx = end[0] - start[0];
          const dy = end[1] - start[1];
          const rotation = Math.atan2(dy, dx);

          // Style de la flèche
          styles.push(new Style({
            geometry: new Point(end),
            image: new Icon({
              src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAjklEQVRIie3UrQ3CABRF4a8hQaBQSBJ0NQ5RAZIFYCIYgQ2YgAHAoxGVxaEwCEIwdIRLIOkxz72TvJ9Lx69TYPGpEWZ4YZuUrPDEDr2UZIkH9uinJBXuOGCQkkxxwwnDlKREgzNGKckENS4Y/52gxFVoRO2SjwJLrgTPNPpoa8GoaMNuIxR2BeaJxh3f4w1HOhuNYfjIaAAAAABJRU5ErkJggg==',
              anchor: [1, 0.5],
              rotateWithView: true,
              rotation: -rotation,
              color: [0, 0, 0]
            })
          }));
        });
      }

      if (options.withDistance) {
        const formatDistance = (start, end): string => {
          const lineDistance = distance(toLonLat(start), toLonLat(end), {units: 'kilometers'});
          let output = '';
          if (lineDistance > 0 && lineDistance < 1) {
            output = (Math.round(lineDistance * 1000 * 100) / 100) +
              ' ' + 'm';
          } else {
            if (lineDistance >= 1) {
              output = (Math.round(lineDistance * 100) / 100) +
                ' ' + 'km';
            }
          }

          return output;
        };

        line.getGeometry().forEachSegment((start, end) => {
          const dx = end[0] - start[0];
          const dy = end[1] - start[1];

          styles.push(new Style({
              geometry: new LineString([start, end]),
              text: new Text({
                text: formatDistance(start, end),
                placement: TextPlacement.LINE,
                offsetY: 22,
                scale: 1.17,
                rotateWithView: true,
                fill: new Fill({
                  color: [0, 0, 0]
                }),
                stroke: new Stroke({
                  color: '#ffffff',
                  width: 2
                })
              })
            })
          );
        });
      }

      line.set('type', 'line');

      console.log(line)

      this.vectorSource.addFeature(line);

      const vectorLayer = new VectorLayer({
        source: this.vectorSource,
        style: styles,
      });

      vectorLayer.set('type', 'historyLayer');

      this.map.addLayer(vectorLayer);
    } else {
      throw new Error('Deux positions minimum sont nécessaires pour tracer une ligne');
    }
  }

  /**
   * Retourne vrai si le zoom spécifié est inférieur au zoom maximum
   * @param zoom Zoom
   */
  private canBeZoomed(zoom: number): boolean {
    return zoom <= this.map.getView().getMaxZoom();
  }
}
