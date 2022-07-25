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
  const errors = validateImgForm();
  errorField.querySelector('p').innerText = '';
  if (errors.length === 0) {
    const formData = new FormData(evt.target);
    fetch(
      'https://26.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body: formData,
      }
    )
      .then((response) => {
        if (response.ok) {
          return response;
        }
        throw new Error(`${response.status} — ${response.statusText}`);
      })
      .then(()=>{
        body.classList.remove('modal-open');
        imgUpload.classList.add('hidden');
        buttonUpload.value = '';
        document.removeEventListener('keydown', onCloseEscKeydown);
        const success = document.getElementById('success').content;
        const element = success.cloneNode(true);
        body.appendChild(element);
      })
      .catch(() => {
        const templateError = document.getElementById('error').content;
        const element = templateError.cloneNode(true);
        body.appendChild(element);
        body.classList.remove('modal-open');
        imgUpload.classList.add('hidden');
        buttonUpload.value = '';
        document.removeEventListener('keydown', onCloseEscKeydown);
      });
    errorField.classList.add('hidden');
  } else {
    errorField.classList.remove('hidden');
    errors.forEach((element) => {
      errorField.querySelector('p').innerText = errorField.querySelector('p').innerText + element;
    });
  }
});

function validateImgForm(){
  const isValid = pristine.validate();
  const errors = [];
  if (isValid ===false){
    errors.push('Изображение не загружено ');
  }
  const isValidateHashTag = validateHashTag(textHashtags.value);
  if (isValidateHashTag !== true){
    errors.push(isValidateHashTag);
  }
  return errors;
}
