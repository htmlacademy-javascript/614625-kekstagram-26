import * as data from './data.js';
import {createThumbnails} from './render-thumbnails.js';
import {showPopupData, closePopupData} from './popup-thumbnail.js';
import {isEscapeKey} from './util.js';
import './upload-img.js';
import './edit-scaleimg.js';
import './effects-img.js';

const COUNT_OBJECT = 25;

const arrayData = data.createData(COUNT_OBJECT);

const thumbnail = createThumbnails(arrayData);
const pictures = document.querySelector('.pictures');
pictures.append(thumbnail);

const buttonClose = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');

function onPopupEscKeydown(evt){
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    body.classList.remove('modal-open');
    closePopupData();
    document.removeEventListener('keydown', onPopupEscKeydown);
  }
}

pictures.onclick = function (evt) {
  if (evt.target.nodeName === 'IMG') {
    body.classList.add('modal-open');
    showPopupData(arrayData[evt.target.offsetParent.dataset.id-1],evt);
    document.addEventListener('keydown', onPopupEscKeydown);
  }
};

buttonClose.addEventListener('click', () => {
  body.classList.remove('modal-open');
  closePopupData();
  document.removeEventListener('keydown', onPopupEscKeydown);
});
