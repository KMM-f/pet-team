import axios from 'axios';
import {type Meet} from '../model/types'
import {URL_MEETS} from '@/utils/constants'

export async function postMeet (meet:Meet) {
  try{
    const {data} = await axios.post(URL_MEETS,meet);
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