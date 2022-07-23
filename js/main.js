import {createThumbnails} from './render-thumbnails.js';
import {showPopupData, closePopupData} from './popup-thumbnail.js';
import {isEscapeKey} from './util.js';
import './upload-img.js';
import './edit-scaleimg.js';
import './effects-img.js';

const COUNT_OBJECT = 25;
const body = document.querySelector('body');

fetch('https://26.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response;
    }
    throw new Error(`${response.status} — ${response.statusText}`);
  })
  .then((response) => response.json())
  .then((data)=> {
    const arrayData = data.slice(0, COUNT_OBJECT);

    const thumbnail = createThumbnails(arrayData);
    const pictures = document.querySelector('.pictures');
    pictures.append(thumbnail);
    const imgFilter = document.querySelector('.img-filters');
    imgFilter.classList.remove('img-filters--inactive');
    //добавить прослушиватель на кнопки и при нажатии на кнопки сначала чистить все фото, потом в засивимости от нажатой кнопки вызывать функцию

    pictures.onclick = function (evt) {
      if (evt.target.nodeName === 'IMG') {
        body.classList.add('modal-open');
        showPopupData(arrayData[evt.target.offsetParent.dataset.id],evt);
        document.addEventListener('keydown', onPopupEscKeydown);
      }
    };
  })
  .catch((error) =>{
    const templateError = document.getElementById('error-data').content;
    const element = templateError.cloneNode(true);
    element.querySelector('p').innerText = error;
    body.appendChild(element);
  });

const buttonClose = document.querySelector('.big-picture__cancel');

function onPopupEscKeydown(evt){
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    body.classList.remove('modal-open');
    closePopupData();
    document.removeEventListener('keydown', onPopupEscKeydown);
  }
}

buttonClose.addEventListener('click', () => {
  body.classList.remove('modal-open');
  closePopupData();
  document.removeEventListener('keydown', onPopupEscKeydown);
});
