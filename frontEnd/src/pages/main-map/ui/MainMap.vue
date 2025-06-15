<script setup lang="ts">
  import Map from 'ol/Map';
  import View from 'ol/View';
  import { defaults as defaultControls } from 'ol/control';
  import Attribution from 'ol/control/Attribution';
  import { fromLonLat } from 'ol/proj';
  import { apply } from 'ol-mapbox-style';
  import VectorLayer from 'ol/layer/Vector';
  import VectorSource from 'ol/source/Vector';
  import Overlay from 'ol/Overlay.js';
  import { type Coordinate } from 'ol/coordinate';
  import { type MapBrowserEvent } from 'ol';
//------------------------------------------------------------------------------------------------------------------------------------------------------------
  import { onMounted, watch, ref} from 'vue';

  import { CreateMeetForm } from '@/entities/meet';
  import {AddPlaceConfirmation} from '@/entities/place';
  //import { type PlaceBack } from '@/entities/place';
  //import {convertCoordinateToBack} from '@/entities/place'
  import {type Place} from '@/entities/place'
  import {usePlacesListStore} from '@/entities/place'
  import {PlaceMenu} from '@/entities/place'
  import { useMeetsListStore } from '@/entities/meet';

  import {addPointOnMap,findCoordinateForNewPoint} from '@/feature/marker'

  import { STYLE_JSON_MAPTILER_URL  } from '@/utils/constants';
//------------------------------------------------------------------------------------------------------------------------------------------------------------
  const placesListStore = usePlacesListStore();
  const meetsListStore = useMeetsListStore()

  let map:Map;

  let coordinateOnClick:Coordinate;
  const isNewPlace =ref<boolean>(false);

  let addPlaceConfirmationOverlay: Overlay;
  let createMeetFormOverlay: Overlay;
  let placeMenuOverlay: Overlay;

// Слой для меток
  const markerSource = new VectorSource()
  const markerLayer = new VectorLayer({
    source: markerSource,
  })
//----------FUNCTIONS-----------------------------------------------------------------------------------------------------------------------
// Overlay creation function
  function overlayInit (elem:HTMLElement) {
    const overlay: Overlay = new Overlay({
      element: elem as HTMLElement,
      autoPan: {
        animation: {
          duration: 250,
        },
      },
    });
    return overlay;
  }

  function closeOverlay (overlay:Overlay){
    if(overlay) {
      overlay.setPosition(undefined);
    }
  }

  function showOverlay (overlay:Overlay, coordinate:Coordinate) {
    if(overlay) {
      overlay.setPosition(coordinate)
    }
  }

//Инициализация карты
  function initMap (conformationOverlay:Overlay,createMeetOverlay:Overlay) {
    const map = new Map({
      target: 'map',
      controls: defaultControls({ attribution: false }).extend([
        new Attribution({
          collapsible: false,
        }),
      ]),
      layers: [markerLayer],
      overlays: [conformationOverlay,createMeetOverlay,placeMenuOverlay],
      view: new View({
        constrainResolution: true,
        center: fromLonLat([104.2802, 52.2864]), // Центр карты
        zoom: 17, // Уровень масштабирования
      }),
    });
    // Применяем стиль MapTiler
    apply(map, STYLE_JSON_MAPTILER_URL);
    return map;
  }

  function getPointCoordinate(){
    placesListStore.currentCoordinate = findCoordinateForNewPoint(map,coordinateOnClick);
  }

  function addPoint() {
    if(placesListStore.currentCoordinate){
      addPointOnMap(map,placesListStore.currentCoordinate,markerSource, markerLayer)
      placesListStore.currentCoordinate = null;
      closeOverlay(createMeetFormOverlay)
    }
  }
/*function addPoint(coordinate:Coordinate){
    const coordinatePlace = addPointOnMap(map,coordinate,markerSource, markerLayer);
    const placeOfPoint:PlaceBack = convertCoordinateToBack(coordinate)
    const PostPlace = placesListStore.postToPlaceList(placeOfPoint);
    PostPlace.then((result)=>{
      if(result){
        placesListStore.currentPlace= result;
      }
    })
    closeOverlay(createMeetFormOverlay)
  };
*/

  function addMeetAtThisPlace () {
    closeOverlay(addPlaceConfirmationOverlay)
    showOverlay(createMeetFormOverlay,coordinateOnClick)
  }

  function IsOverlayShow(){
    return !!addPlaceConfirmationOverlay.getPosition() || !!createMeetFormOverlay.getPosition() || !!placeMenuOverlay.getPosition()
  }
//----------------------------------------------------------------------------------------------------------------------------------------
  onMounted(()=>{
    placesListStore.fetchPlaceList().then((data) => {
      if(data) {
        data.forEach((item:Place) =>{
          console.log(item);
          addPointOnMap(map,item.coordinate,markerSource,markerLayer)
          console.log('markerSouse:',markerSource,'markerLayer:',markerLayer)
        })
      }
    });
    const popUpElem = document.getElementById('pop-up');
    if(popUpElem) {
      addPlaceConfirmationOverlay = overlayInit(popUpElem);
    }
    const createMeetFormElem = document.getElementById('create-meet-form');
    if (createMeetFormElem) {
      createMeetFormOverlay = overlayInit(createMeetFormElem);
    }
    const placeMenuElem =document.getElementById('place-menu')
    if (placeMenuElem){
      placeMenuOverlay = overlayInit(placeMenuElem);
    }
    // Создаем карту
    map = initMap(addPlaceConfirmationOverlay,createMeetFormOverlay);
    map.on('click', function(evt:MapBrowserEvent<UIEvent>){
      if(IsOverlayShow()){
        closeOverlay(createMeetFormOverlay);
        closeOverlay(addPlaceConfirmationOverlay);
        closeOverlay(placeMenuOverlay);
      }
      coordinateOnClick = evt.coordinate;//Hundler putPoint() needs the current coordinates.
      const isHavePoint =placesListStore.checkHavePoint(map,coordinateOnClick);
      if (isHavePoint) {
        placesListStore.currentPlace= isHavePoint;
        isNewPlace.value = false;
        meetsListStore.fetchMeetsList().then(()=>{
          showOverlay(placeMenuOverlay,evt.coordinate)
        })
      } else {
        isNewPlace.value = true;
        showOverlay(addPlaceConfirmationOverlay,evt.coordinate)
      }
    })
  });

  watch(placesListStore.placesList, ()=>{
    placesListStore.placesList.forEach((item:Place) =>{
      console.log(item);
      addPointOnMap(map,item.coordinate,markerSource,markerLayer)
      console.log('markerSouse:',markerSource,'markerLayer:',markerLayer)
    })
  })
</script>

<template>
  <div id="map" class="map">
    <a href="https://www.maptiler.com" style="position:absolute;left:10px;bottom:10px;z-index:999;">
      <img src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler logo">
    </a>
  </div>
  <p>
    <a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a>
    <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>
  </p>
  <AddPlaceConfirmation id="pop-up"
    @close-pop-up="closeOverlay(addPlaceConfirmationOverlay)"
    @put-point="addMeetAtThisPlace()"/>
  <CreateMeetForm id="create-meet-form"
    :is-new-place='isNewPlace'
    @close-dialog="closeOverlay(createMeetFormOverlay)"
    @get-coordinate="getPointCoordinate"
    @add-point-on-map="addPoint"/>
  <PlaceMenu id="place-menu"
    @open-create-meet-form="showOverlay(createMeetFormOverlay,coordinateOnClick), closeOverlay(placeMenuOverlay)"
    @close-place-menu="closeOverlay(placeMenuOverlay)"/>

</template>

<style scoped lang="scss">
</style>
