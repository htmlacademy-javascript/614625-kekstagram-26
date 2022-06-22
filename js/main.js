import * as data from './data.js';
import {createThumbnails} from './render-thumbnails.js';
import {showPopupData} from './popup-thumbnails.js';

const COUNT_OBJECT = 25;

const arrayData = data.createData(COUNT_OBJECT);

const thumbnail = createThumbnails(arrayData);
const pictures = document.querySelector('.pictures');
pictures.append(thumbnail);

const picture = document.querySelectorAll('.picture');
for (let i = 0; i < picture.length;i++){
  picture[i].addEventListener('click', function (event) {
    event.preventDefault();
    showPopupData(picture[i]);
  });
}
