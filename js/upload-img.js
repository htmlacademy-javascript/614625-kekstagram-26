import {isEscapeKey} from './util.js';
import {validateHashTag} from './validate.js';

const body = document.querySelector('body');
const imgForm = document.querySelector('.img-upload__form');
const buttonUpload = document.querySelector('.img-upload__input');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const errorField = document.querySelector('.img-upload__form--errors');
const pristine = new Pristine(imgForm);
const imgUpload = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const imgPreview = document.querySelector('.img-upload__preview img');
const slider = document.querySelector('.effect-level__slider');
const effectNone = document.querySelector('#effect-none');

function onCloseEscKeydown (evt){
  if (isEscapeKey(evt)) {
    if(document.activeElement.className === 'text__hashtags' || document.activeElement.className === 'text__description'){
      evt.stopPropagation();
      return;
    }
    evt.preventDefault();
    closeUpload();
  }
}

imgUploadCancel.addEventListener('click', () => {
  closeUpload();
});

function closeUpload(){
  body.classList.remove('modal-open');
  imgUpload.classList.add('hidden');
  buttonUpload.value = '';
  imgPreview.style.filter = '';
  imgPreview.className = '';
  if (document.querySelector('.effects__label span[checked="true"]') !== null){
    document.querySelector('.effects__label span[checked="true"]').removeAttribute('checked');
    document.querySelector('.effects__radio:checked').checked = false;
  }
  effectNone.setAttribute('checked', 'true');
  slider.setAttribute('disabled', 'true');
  slider.style.display = 'none';
  document.removeEventListener('keydown', onCloseEscKeydown);
  imgPreview.style.transform = '';
  document.querySelector('.scale__control--value').value = '100%';
  textHashtags.value = '';
  textDescription.value = '';
  errorField.querySelector('p').innerText = '';
  errorField.classList.add('hidden');
}

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
        closeUpload();
        document.removeEventListener('keydown', onCloseEscKeydown);
        if( document.querySelector('.success') === null ){
          const success = document.querySelector('#success').content;
          const element = success.cloneNode(true);
          body.appendChild(element);
        } else {
          document.querySelector('.success').classList.remove('hidden');
        }
        const blockSuccess = document.querySelector('.success');
        blockSuccess.onclick = function(event){
          if (event.target.classList.value === 'success'){
            blockSuccess.classList.add('hidden');
          }
        };
        const successButton = blockSuccess.querySelector('.success__button');
        successButton.onclick = function () {
          blockSuccess.classList.add('hidden');
        };
        document.addEventListener('keydown', onPopupEscKeydown);
      })
      .catch(() => {
        if( document.querySelector('.error') === null ){
          const templateError = document.querySelector('#error').content;
          const element = templateError.cloneNode(true);
          body.appendChild(element);
        } else {
          document.querySelector('.error').classList.remove('hidden');
        }
        closeUpload();
        document.removeEventListener('keydown', onCloseEscKeydown);
        document.addEventListener('keydown',onCloseEscError);
        const errorBlock = document.querySelector('.error');
        const errorButton = document.querySelector('.error__button');
        errorBlock.onclick = function(event){
          if (event.target.classList.value === 'error'){
            errorBlock.classList.add('hidden');
          }
        };
        errorButton.onclick = function () {
          errorBlock.classList.add('hidden');
        };
      });
    errorField.classList.add('hidden');
  } else {
    errorField.classList.remove('hidden');
    errors.forEach((element) => {
      errorField.querySelector('p').innerText = errorField.querySelector('p').innerText + element;
    });
  }
});

function onPopupEscKeydown(evt){
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    body.classList.remove('modal-open');
    const blockSuccess = document.querySelector('.success');
    blockSuccess.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscKeydown);
  }
}

function onCloseEscError(evt){
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    document.querySelector('.error').classList.add('hidden');
    document.removeEventListener('keydown', onCloseEscError);
  }
}

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
