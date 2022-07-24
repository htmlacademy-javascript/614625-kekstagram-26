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
    imgFilter.onclick = function (evt) {
      const dataPictures = document.querySelectorAll('.picture');
      dataPictures.forEach((element) => {
        element.remove();
      });
      if (evt.target.id === 'filter-random') {
        //получить 10 чисел из диапазона от начала массива до конца
        //получить элементы эти в новый массив
        //выложить новый массив в поток
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
        //создать новый элемент и в него запушить дату с рандомным индексом
        const randomData = [];
        for (let i=0;i<=randomNumbers.length-1;i++){
          randomData[i] = arrayData[randomNumbers[i]];
        }
        const randomThumbnails = createThumbnails(randomData);
        pictures.append(randomThumbnails);
      }
      if (evt.target.id === 'filter-discussed') {
        //отсортировать массив по комментариям
        //далее первые 10 выложить
        console.log(evt.target.id);
      }
      console.log(evt.target.id);
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
