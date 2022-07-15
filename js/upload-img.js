import {isEscapeKey} from './util.js';
import {validateHashTag} from './validate.js';

const body = document.querySelector('body');
const imgForm = document.querySelector('.img-upload__form');
const buttonUpload = document.querySelector('.img-upload__input');
const textHashtags = document.querySelector('.text__hashtags');
const errorField = document.querySelector('.img-upload__form--errors');
const pristine = new Pristine(imgForm);
const imgUpload = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');

function onCloseEscKeydown (evt){
  if (isEscapeKey(evt)) {
    if(document.activeElement.className === 'text__hashtags' || document.activeElement.className === 'text__description'){
      evt.stopPropagation();
      return;
    }
    evt.preventDefault();
    body.classList.remove('modal-open');
    imgUpload.classList.add('hidden');
    buttonUpload.value = '';
    document.removeEventListener('keydown',onCloseEscKeydown);
  }
}

imgUploadCancel.addEventListener('click', () => {
  body.classList.remove('modal-open');
  imgUpload.classList.add('hidden');
  buttonUpload.value = '';
  document.removeEventListener('keydown', onCloseEscKeydown);
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
  const isValidateHashTag = validateHashTag(textHashtags.value);
  if (isValid && typeof isValidateHashTag !== 'string') {
    errorField.classList.add('hidden');
    imgForm.submit();
  } else {
    errorField.classList.remove('hidden');
    if (!isValid){
      errorField.querySelector('p').innerText = 'Изображение не загружено';
    }
    if (isValidateHashTag){
      errorField.querySelector('p').innerText = ` ${isValidateHashTag}`;
    }
  }
});
