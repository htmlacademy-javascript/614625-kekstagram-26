import {createThumbnails} from './render-thumbnails.js';
import {showPopupData, closePopupData} from './popup-thumbnail.js';
import {isEscapeKey, getRandomInt} from './util.js';
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
    const imgFilterForm = document.querySelector('.img-filters__form');
    imgFilterForm.onclick = function (evt) {
      const dataPictures = document.querySelectorAll('.picture');
      imgFilter.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      dataPictures.forEach((element) => {
        element.remove();
      });
      if (evt.target.id === 'filter-random') {
        const numbers = [];
        for (let i=0;i<=COUNT_OBJECT-1;i++){
          numbers[i] = i;
        }
        const randomNumbers = [];
        let number;
        for (let i=0;i<=10-1;i++){
          number = getRandomInt(0,numbers.length-1);
          randomNumbers[i] = numbers[number];
          numbers.splice(number, 1);
        }
        const randomData = [];
        for (let i=0;i<=randomNumbers.length-1;i++){
          randomData[i] = arrayData[randomNumbers[i]];
        }
        const randomThumbnails = createThumbnails(randomData);
        pictures.append(randomThumbnails);
      }
      if (evt.target.id === 'filter-discussed') {
        const discussionArr = (arrayData.sort((a,b) => b.comments.length - a.comments.length)).slice(0,10);
        pictures.append(createThumbnails(discussionArr));
      }
      if (evt.target.id === 'filter-default'){
        pictures.append(createThumbnails(arrayData));
      }
    };

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
