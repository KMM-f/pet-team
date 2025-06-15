import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

import {type Meet} from './types'
import {type MeetFormBack} from './types'
import {URL_MEETS} from '@/utils/constants'

export const useMeetsListStore = defineStore('meetsList', ()=>{
  const currentMeetsList = ref<Meet[]>([])

  const fetchMeetsList = async() =>{
    try{
      const {data} = await axios.get(URL_MEETS);
      console.log(data, 'DATA ИЗ URL__MEETS')
      currentMeetsList.value = data.map((item:MeetFormBack)=>{
        console.log(item.id,item.date,item.idOfPlace,item.title, 'ДАННЫЕ С БЭКА')
        return{
          id:item.id,
          idOfPlace:item.idOfPlace,
          date: new Date( Date.parse(item.date)),
          title: item.title
        }
      });
      return data;
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

  const getMeetByIdOfPlace = async(id:number)=>{
    fetchMeetsList();
    const meetsList:Meet[] =currentMeetsList.value.filter(item => item.idOfPlace === id)
    return meetsList
  }

  const postToMeetsList =async(meet:Meet)=>{
    try{
      const {data} = await axios.post(URL_MEETS,meet);
      currentMeetsList.value =[...currentMeetsList.value,data]
      return data;
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

  return{currentMeetsList,fetchMeetsList,postToMeetsList,getMeetByIdOfPlace}
})

