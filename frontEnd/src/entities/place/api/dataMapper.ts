import { type Coordinate } from 'ol/coordinate';

import { type PlaceBack} from './types'
import { type Place} from '@/entities/place'

export function createPlaceFromBack (placeBack: PlaceBack){
  const result:Place = {
    id:placeBack.id,
    coordinate: [
      placeBack.coordinateX, placeBack.coordinateY
    ]
  }
  if(placeBack.coordinateZ){
    result.coordinate.push(placeBack.coordinateZ)
  }
  return result;
}

export function convertPlacesListFromBack (plaseListBack:PlaceBack[]){
  const newPlaceList:Place[] = plaseListBack.map(item => {
    return createPlaceFromBack(item);
/*
    if (item.coordinateZ){
      return {
        id: item.id,
        coordinate: [
          item.coordinateX, item.coordinateY, item.coordinateZ
        ]
      }
    } else {
      return {
        id: item.id,
        coordinate: [
          item.coordinateX, item.coordinateY
        ]
      }
    }
*/
  });
  return newPlaceList;
}

export function convertCoordinateToBack (coordinate:Coordinate) {
  const place: PlaceBack = {
    coordinateX: coordinate[0],
    coordinateY: coordinate[1]
  }
  if(coordinate[2]){
    place.coordinateZ = coordinate[2];
  }
  return place;
}
