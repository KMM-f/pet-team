import Map from 'ol/Map';
import { type Coordinate } from 'ol/coordinate';
import {containsCoordinate} from 'ol/extent';

import { ref} from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

import {convertPlacesListFromBack, createPlaceFromBack} from '@/entities/place'
import {type Place} from './types'
import {URL_PLACE_LIST} from '@/utils/constants'
import type { PlaceBack } from '../api/types';


export const usePlacesListStore = defineStore('placesList', () => {
  const placesList =ref<Place[]>([])
  const currentPlace =ref<Place>();
  const currentCoordinate = ref<Coordinate|null>()

  const fetchPlaceList = async() =>{
    try{
      const {data} = await axios.get(URL_PLACE_LIST);
      const mapperData = convertPlacesListFromBack(data);
      placesList.value = mapperData;
      console.log('placesList.value ПОСЛЕ ЗАПРОСА НА БЭК', placesList.value)
      return mapperData;
    } catch (e){
            // console.log(e);
			if (axios.isAxiosError(e)) {
        console.log('Axios error:', e.message);
        if (e.response) {
          // Сервер ответил с кодом, отличным от 2xx
          console.log('Response data:', e.response.data);
          console.log('Response status:', e.response.status);
          console.log('Response headers:', e.response.headers);
        } else if (e.request) {
          // Запрос был сделан, но ответа не было
          console.log('Request data:', e.request);
        } else {
          // Произошла ошибка при настройке запроса
          console.log('Error message:', e.message);
        }
      } else {
        // Ошибка не связана с Axios
        console.log('Non-Axios error:', e);
      }
    }
  }
    //Функция для обнаружения Point в здании.
    function checkHavePoint (map:Map,coordinate:Coordinate) {
      const currentPixel = map.getPixelFromCoordinate(coordinate)
      const isHavePoint = map.forEachFeatureAtPixel(currentPixel,(feature)=>{
        //if('getFlatCoordinates' in feature)
        const isBuilding = feature.getProperties().layer === "building";
          if (isBuilding){
          const exnet = feature.getExtent();
          const result = placesList.value.find(function(item){
            return containsCoordinate(exnet,item.coordinate);
          })
          return result ? result : false;
        } else {
          return false
        }
      })
      return isHavePoint ? isHavePoint : false;
    }

  const postToPlaceList = async(placeToBack:PlaceBack) =>{
    try{
      const {data} = await axios.post(URL_PLACE_LIST,placeToBack);
      const mapperData = createPlaceFromBack(data)
      placesList.value = [...placesList.value, mapperData];
      currentPlace.value = mapperData;
      return mapperData;
    } catch (e) {
      // console.log(e);
			if (axios.isAxiosError(e)) {
        console.log('Axios error:', e.message);
        if (e.response) {
          // Сервер ответил с кодом, отличным от 2xx
          console.log('Response data:', e.response.data);
          console.log('Response status:', e.response.status);
          console.log('Response headers:', e.response.headers);
        } else if (e.request) {
          // Запрос был сделан, но ответа не было
          console.log('Request data:', e.request);
        } else {
          // Произошла ошибка при настройке запроса
          console.log('Error message:', e.message);
        }
      } else {
        // Ошибка не связана с Axios
        console.log('Non-Axios error:', e);
      }
    }
    }

  const deletePlace = async(place:Place)=>{
    try{
      const {data} = await axios.delete(URL_PLACE_LIST + `${place.id}`);
      placesList.value = data;
      console.log(placesList.value, 'placesList.value')
      return data;
    } catch (e) {
      // console.log(e);
			if (axios.isAxiosError(e)) {
        console.log('Axios error:', e.message);
        if (e.response) {
          // Сервер ответил с кодом, отличным от 2xx
          console.log('Response data:', e.response.data);
          console.log('Response status:', e.response.status);
          console.log('Response headers:', e.response.headers);
        } else if (e.request) {
          // Запрос был сделан, но ответа не было
          console.log('Request data:', e.request);
        } else {
          // Произошла ошибка при настройке запроса
          console.log('Error message:', e.message);
        }
      } else {
        // Ошибка не связана с Axios
        console.log('Non-Axios error:', e);
      }
    }
  }

  return { placesList, currentPlace,currentCoordinate, postToPlaceList, deletePlace, fetchPlaceList, checkHavePoint}
})
