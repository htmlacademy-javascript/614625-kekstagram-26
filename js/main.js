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
    showPopupData(arrayData[evt.target.offsetParent.dataset.id],evt);
  }
}
