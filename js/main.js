import * as data from './data.js';
import {createThumbnails} from './render-thumbnails.js';
import {showPopupData} from './popup-thumbnails.js';

const COUNT_OBJECT = 25;

const arrayData = data.createData(COUNT_OBJECT);

const thumbnail = createThumbnails(arrayData);
const pictures = document.querySelector('.pictures');
pictures.append(thumbnail);

pictures.onclick = function (evt) {
  if (evt.target.nodeName === 'IMG') {
    const idData = + evt.target.offsetParent.classList[1].replace('dataImg-','');
    //если мы кликнули мы должны вывести превент дефолт и передать данные в функцию по открытию модального окна
    //вызываем функцию показа попап
    showPopupData(arrayData[idData-1],evt);
  }
}
