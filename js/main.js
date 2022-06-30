import * as data from './data.js';
import {createThumbnails} from './render-thumbnails.js';
import {showPopupData, closePopupData} from './popup-thumbnails.js';
import {isEscapeKey} from './util.js';

const COUNT_OBJECT = 25;

const arrayData = data.createData(COUNT_OBJECT);

const thumbnail = createThumbnails(arrayData);
const pictures = document.querySelector('.pictures');
pictures.append(thumbnail);

const buttonClose = document.querySelector('.big-picture__cancel');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    console.log('Esc');
    closePopupData();
  }
};

pictures.onclick = function (evt) {
  if (evt.target.nodeName === 'IMG') {
    showPopupData(arrayData[evt.target.offsetParent.dataset.id],evt);

    document.addEventListener('keydown', onPopupEscKeydown);
  }
}

buttonClose.addEventListener('click', () => {
  //функция закрытия окна
  closePopupData();
});
