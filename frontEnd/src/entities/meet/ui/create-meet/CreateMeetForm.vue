<script setup lang="ts">
  import {ref} from 'vue';
  import { SelectDate } from '@/shared/ui/form';
  import {BaseButton} from '@/shared/ui';

  const emit =defineEmits(['closeDialog','createPlace']);

  const title = ref('')

  let year:string;
  let month:string;
  let day:string;

  function getValueFromElem (e:Event) {
    const elem = e.target as HTMLSelectElement
    return elem.value
  }
  function setYear (e:Event) {
    year = getValueFromElem(e);
  }
  function setMonth (e:Event) {
    month = getValueFromElem(e);
  }
  function setDay (e:Event) {
    day = getValueFromElem(e);
    console.log('ДАТА:',year,month,day)
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
      @change-year="setYear"
      @change-month="setMonth"
      @change-day="setDay"/>
      <div class="meta-form__button button">
        <BaseButton @click="emit('createPlace')"
          :width="100"
          :height="30"
          color="aqua"
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
</style>
