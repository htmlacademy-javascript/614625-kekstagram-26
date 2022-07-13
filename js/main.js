import * as data from './data.js';
import {createThumbnails} from './render-thumbnails.js';
import {showPopupData, closePopupData} from './popup-thumbnail.js';
import {isEscapeKey} from './util.js';
import {validateHashTeg} from './validate.js';

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

function onPopupEscKeydown(evt){
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    body.classList.remove('modal-open');
    closePopupData();
  }
}

function onCloseEscKeydown (evt){
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    body.classList.remove('modal-open');
    imgUpload.classList.add('hidden');
    buttonUpload.value = '';
  }
}

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

const errorField = document.querySelector('.img-upload__form--errors');

imgForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  const isValidateHashTeg = validateHashTeg(textHashtags.value);
  if (isValid && typeof isValidateHashTeg !== 'string') {
    errorField.classList.add('hidden');
    console.log('все норм');
  } else {
    errorField.classList.remove('hidden');
  }
});
