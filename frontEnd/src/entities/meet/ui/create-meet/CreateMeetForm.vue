<script setup lang="ts">
  import {ref, watch} from 'vue';

  import { SelectDate } from '@/shared/ui/form';
  import {BaseButton} from '@/shared/ui';
  //import { disable } from 'ol/rotationconstraint';
  import {usePlacesListStore} from '@/entities/place'
  import { useMeetsListStore } from '@/entities/meet';
  import {type Meet} from '@/entities/meet'

  import { type PlaceBack } from '@/entities/place';
  import {convertCoordinateToBack} from '@/entities/place'

  const placesListStore = usePlacesListStore();
  const meetsListStore = useMeetsListStore()

  const emit = defineEmits(['closeDialog','getCoordinate', 'addPointOnMap']);
  const props = defineProps<{
    isNewPlace: boolean
  }>()
  //const props = defineProps<{
    //pointCoodinates: Coordinate,
  //}>()

  const title = ref('')
  const year = ref<string>('noselect')
  const month = ref<string>('noselect')
  const day = ref<string>('noselect')
  const isFormValid = ref<boolean>(false)
  const buttonColor = ref('grey');

  watch([title,year,month,day], ()=>{
    if (title.value && year.value !='noselect' && month.value!='noselect' && day.value!='noselect'){
      isFormValid.value = true;
    } else {
      isFormValid.value = false;
    }
  })
  watch(isFormValid, ()=>{
    buttonColor.value = isFormValid.value ? 'aqua' : 'grey';
  })

  function resetForm(){
    year.value = 'noselect'
    month.value = 'noselect'
    day.value = 'noselect'
    title.value =''
  }
  async function postPlace() {
    if(placesListStore.currentCoordinate){
      const placeOfPoint:PlaceBack = convertCoordinateToBack(placesListStore.currentCoordinate)
      await placesListStore.postToPlaceList(placeOfPoint)
    }
  }
  async function createPlaceAndMeet() {
    emit('getCoordinate')
    await postPlace();
    console.log('CREATEPLACE после ЗАПРОСА НА БЭК')
    if(placesListStore.currentPlace && placesListStore.currentPlace.id){
      console.log('ID есть')
      const dateOfMeet = new Date(+year.value,+month.value,+day.value)
      const meet:Meet = {
        title:title.value,
        idOfPlace: placesListStore.currentPlace.id,
        date: dateOfMeet,
      }
      meetsListStore.postToMeetsList(meet);
    }
    emit('addPointOnMap')
    resetForm()
  }

  function createMeet(){
    if(placesListStore.currentPlace && placesListStore.currentPlace.id){
      console.log('ID есть')
      const dateOfMeet = new Date(+year.value,+month.value,+day.value)
      const meet:Meet = {
        title:title.value,
        idOfPlace: placesListStore.currentPlace.id,
        date: dateOfMeet,
      }
      meetsListStore.postToMeetsList(meet);
    }
    resetForm()
  }

  function handlerButtonClick(){
    if(props.isNewPlace){
      createPlaceAndMeet()
    } else{
      createMeet()
      emit('closeDialog');
    }
  }


</script>

<template>
  <div class="meet-form__container">
    <div class="close" @click="emit('closeDialog')">
        <img class="img__cross" src="/src/shared/assets/icons/cross_icon-icons.com_72347.png" alt="">
      </div>
    <div class="meet-form__content">
      <header class="meet-form__header header">
        <div class="header__title title">
          <input v-model="title"
          class="title__input"
          id='input-title'
          type="text"
          placeholder="Название мероприятия"
          autofocus>
        </div>
      </header>
      <SelectDate
      title="Выберите дату мероприятия"
      v-model:year="year"
      v-model:day="day"
      v-model:month="month"/>
      <div class="meta-form__button button">
        <BaseButton @click=" handlerButtonClick()"
          :width="100"
          :height="30"
          :color=buttonColor
          :class ="{buttonDisable: !isFormValid}"
        > Создать
      </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .meet-form__container{
    height: 400px;
    width: 300px;
    border: 1px solid black;
    position: relative;
    background-color: white;
  }
  .close{
    position: absolute;
    top: 5px;
    right: 5px;
  }
  .meet-form__content{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
  }
  .meet-form__date{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .date__label{
    margin-bottom: 20px;
  }
  .date__select{
    select{
      width: 85px;
      border: 1px solid gray;
      border-radius: 5px;
      &:not(:last-child){
      margin-right: 20px;
      }
    }
  }
  .title__input:invalid, .date__input:invalid{
    border: 1px solid red;
  }
  .button__submit{
    text-align: center;
    border-radius: 10px;
    width: 100px;
    height: 30px;
    background-color: green;
  }
  .buttonDisable{
    pointer-events: none;
    cursor: default;
  }
</style>
