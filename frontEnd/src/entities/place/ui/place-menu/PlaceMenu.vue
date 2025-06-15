<script setup lang="ts">
  import { computed, ref, watch } from 'vue';

  import { BaseButton } from '@/shared/ui';
  import { MeetListItem } from '@/entities/meet';
  import { useMeetsListStore } from '@/entities/meet';
  import { usePlacesListStore } from '@/entities/place';
  import {type Meet} from '@/entities/meet'

  const meetsListStore = useMeetsListStore()
  const placeListStore = usePlacesListStore()

  const emit =defineEmits(['closePlaceMenu','openCreateMeetForm']);

  const titleOfPlace = ref()
  const idOfPlace = computed(()=>{
    if(placeListStore.currentPlace && placeListStore.currentPlace.id){
      console.log('CURRENT ID изменился')
      return placeListStore.currentPlace.id;
    } else {
      return undefined
    }
  })
  const meetList =computed(()=>{
    const list:Meet[] = meetsListStore.currentMeetsList.filter(item=> item.idOfPlace === idOfPlace.value)
    console.log('ФИЛЬТР MEETLIST', meetList.value)
    return list;
  })
  watch(idOfPlace,()=>{
    if(idOfPlace.value){
      titleOfPlace.value = idOfPlace.value
    } else {
      titleOfPlace.value = 0
    }
  },
  { immediate: true }
  )
</script>

<template>
  <div class="place-menu__container">
    <div class="place-menu__header">
      <div class="place-menu__title">МЕСТО № {{ titleOfPlace }}</div>
      <div class="place-menu__close" @click="emit('closePlaceMenu')">Закрыть</div>
    </div>
    <div class="place-menu__list">
      <MeetListItem v-for="item in meetList"
      :key="item.id"
      :title="item.title"
      :date="item.date"
      />
    </div>
    <BaseButton
      :width="250"
      :height="40"
      color='green'
      @click="emit('openCreateMeetForm')"
    >Добавить мероприятие</BaseButton>
  </div>
</template>

<style scroped lang="scss">
  .place-menu {
    &__container {
      height: 400px;
      width: 300px;
      border: 1px solid black;
      background-color: white;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px 20px 10px 20px;
      align-items: center;
    }

    &__header{
      display: flex;
      width: 50%;
      justify-content: space-between;
      align-self: flex-end;
    }

    &__title{
      text-align: center;
      margin-left: -50%;
    }

    &__close {
      cursor: pointer;
    }

    &__list {
      height: 250px;
      border: 1px solid black;
      width:240px;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }

</style>
