import * as data from './data.js';
import {createThumbnails} from './render-thumbnails.js';
import {showPopupData, closePopupData} from './popup-thumbnail.js';
import {isEscapeKey} from './util.js';

const COUNT_OBJECT = 25;

const arrayData = data.createData(COUNT_OBJECT);

const thumbnail = createThumbnails(arrayData);
const pictures = document.querySelector('.pictures');
pictures.append(thumbnail);

const imgForm = document.querySelector('.img-upload__form');
const pristine = new Pristine(imgForm);
const buttonClose = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const buttonUpload = document.querySelector('.img-upload__input');
const imgUpload = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    body.classList.remove('modal-open');
    closePopupData();
  }
};

const onCloseEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    body.classList.remove('modal-open');
    imgUpload.classList.add('hidden');
    buttonUpload.value = '';
  }
};

const textHashtags = document.querySelector('.text__hashtags');

pictures.onclick = function (evt) {
  if (evt.target.nodeName === 'IMG') {
    body.classList.add('modal-open');
    showPopupData(arrayData[evt.target.offsetParent.dataset.id-1],evt);
    document.addEventListener('keydown', onPopupEscKeydown);
  }
};

imgUploadCancel.addEventListener('click', () => {
  body.classList.remove('modal-open');
  imgUpload.classList.add('hidden');
  buttonUpload.value = '';
  document.removeEventListener('keydown', onCloseEscKeydown);
});

buttonClose.addEventListener('click', () => {
  body.classList.remove('modal-open');
  closePopupData();
  document.removeEventListener('keydown', onPopupEscKeydown);
});

buttonUpload.addEventListener('change', () => {
  body.classList.add('modal-open');
  imgUpload.classList.remove('hidden');
  const file = buttonUpload.files[0];
  imgUpload.querySelector('img').src = URL.createObjectURL(file);
  document.addEventListener('keydown', onCloseEscKeydown);
});

imgForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  validateHashTeg(textHashtags.value);
  //валидация хеш тега
  if (isValid) {
    console.log('все норм');
  } else {
    console.log('не норм');
  }
});

function validateHashTeg(hashteg){
  hashteg = hashteg.split(' ');
  if(hashteg.length>5){
    return 'нельзя указывать больше 5 хештегов';
  }
  const allowCharacters = /(([a-zA-Z].*\d)|(\d.*[a-zA-Z]))/;
  // строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
  for (let i = 0; i<hashteg.length;i++){
    if(hashteg[i][0] !== '#'){
      return 'хэш-тег начинается с символа #';
    }
    if (allowCharacters.test(hashteg[i]) === false){
      return 'строка после решётки должна состоять из букв';
    }
    if(hashteg[i].length>20){
      return 'максимальная длина одного хэш-тега 20 символов';
    }
    if(hashteg[i]==='#'){
      return 'хеш-тег не может состоять только из одной решётки';
    }
    if(hashteg.indexOf(hashteg[i]) !== -1){
      return 'один и тот же хэш-тег не может быть использован дважды';
    }
  }
}