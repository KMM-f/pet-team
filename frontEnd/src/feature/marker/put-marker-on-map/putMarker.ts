import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Icon } from 'ol/style';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { type Coordinate } from 'ol/coordinate';
//import {containsCoordinate} from 'ol/extent';
import Map from 'ol/Map';
import MultiPolygon from 'ol/geom/MultiPolygon.js';
import {Polygon} from 'ol/geom';
import { type Pixel } from 'ol/pixel';
import {toGeometry} from 'ol/render/Feature';

//import {type Place} from '@/entities/place'
//import {usePlacesListStore} from '@/entities/place'
//import { defineStore } from 'pinia'

//export const useMarkerStore = defineStore('marker', () => {

  //const placesListStore = usePlacesListStore();
//Стиль для метки
  const iconStyle = new Style({
    image: new Icon({
      anchor: [0.5, 1], // Точка привязки иконки
      // anchorXUnits: 'pixels', // Единицы измерения по X
      // anchorYUnits: 'pixels', // Единицы измерения по Y
      width: 70,
      height: 70,
      // scale: 0.1,
      src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Путь к иконке
    }),
  });

  function createFeatureOfPoint (coordinate:Coordinate) {
    const result =new Feature({
      geometry: new Point(coordinate),
    });
    return result
  }

  // Функция для нахождения самого большого полигона в мультиполигоне
  function findLargestPolygon (multiPolygon:MultiPolygon, coordinate:Coordinate){
    const polygons:Polygon[] = multiPolygon.getPolygons();
    let largestPolygon:Polygon = polygons[0];
    let maxArea = 0;
    polygons.forEach((polygon:Polygon) => {
      //if( !polygon.intersectsCoordinate(coordinateOnClick) ) { return}!!!!!!!!!!!!!!!!!!!!!!
      if( !polygon.intersectsCoordinate(coordinate) ) { return}
      const area = polygon.getArea();
      // Если текущий полигон больше, обновляем значения
      if (area > maxArea) {
        maxArea = area;
        largestPolygon = polygon;
      }
    });
    return largestPolygon;
  };

  function assignCoordinateForPoint (map:Map,pixel:Pixel, coordinate:Coordinate) {
    let coordinateToPoint:Coordinate|null =null;
    map.forEachFeatureAtPixel(pixel, function (feature){
      const properties = feature.getProperties(); //Свойства одного FEATURE
      if(properties.layer === 'building' && 'getFlatCoordinates' in feature){//If feature is RenderFeature of building
        const buildingGeometry = toGeometry(feature);
        if(buildingGeometry.getType() === "MultiPolygon"){
          const largestPolygon= findLargestPolygon(buildingGeometry as MultiPolygon, coordinate);//coordinateOnClick
          coordinate = largestPolygon.getInteriorPoint().getCoordinates();
        } else if (buildingGeometry.getType() === "Polygon") {
          coordinate = buildingGeometry.getInteriorPoint().getCoordinates();
        }
      }
    });
    //Если не нашли здание, то метка на месте клика.
    if (!coordinateToPoint) {
      coordinateToPoint = coordinate;
    }
    return coordinateToPoint as Coordinate
  }

    //Функция добавления метки и обновление карты
  function addPointToLayers (map:Map, featureOfPoint:Feature<Point>, markerSource:VectorSource,markerLayer:VectorLayer){
    featureOfPoint.setStyle(iconStyle);
    // Добавляем метку в источник данных
    markerSource.addFeature(featureOfPoint);
    //Обновляем слой меток на карте
    map.removeLayer(markerLayer);
    map.addLayer(markerLayer)
  }

  export function findCoordinateForNewPoint(map:Map, coordinate:Coordinate){
    const currentPixel = map.getPixelFromCoordinate(coordinate);
    const coordinateForPoint:Coordinate = assignCoordinateForPoint(map,currentPixel, coordinate);
    return coordinateForPoint;
  }

  export function addPointOnMap(map:Map, coordinate:Coordinate,markerSource:VectorSource,markerLayer:VectorLayer) {
    const featurePoint = createFeatureOfPoint(coordinate);
    addPointToLayers(map, featurePoint, markerSource, markerLayer)
  }
/*
  //Функция для обнаружения Point в здании.
  export function checkHavePoint (map:Map,coordinate:Coordinate,places:Place[]) {
    //const currentPixel = map.getPixelFromCoordinate(coordinateOnClick)!!!!!!!!!!!!!
    const currentPixel = map.getPixelFromCoordinate(coordinate)
    const isHavePoint = map.forEachFeatureAtPixel(currentPixel,(feature)=>{
      if('getFlatCoordinates' in feature) {
        const exnet = feature.getExtent();
        const result = places.find(function(item){
          return containsCoordinate(exnet,item.coordinate);
        })
        return result ? true : false;
      } else {
        return false
      }
    })
    return isHavePoint;
  }
*/

  //return {checkHavePoint, putPointAtMap}
//})
