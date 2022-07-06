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

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    body.classList.remove('modal-open');
    closePopupData();
  }
};

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

buttonUpload.addEventListener('change', (evt) => {

  imgUpload.classList.remove('hidden');
  const [file] = buttonUpload.files;

  imgUpload.querySelector('img').src = URL.createObjectURL(file);
});

imgForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    console.log('все норм');
  } else {
    console.log('не норм');
  }
})
// var control = document.getElementById("your-files");
// control.addEventListener("change", function(event) {
//   // Когда происходит изменение элементов управления, значит появились новые файлы
//     files = control.files,
//     len = files.length;

//   for (var i = 0; i < len; i++) {
//     console.log("Filename: " + files[i].name);
//     console.log("Type: " + files[i].type);
//     console.log("Size: " + files[i].size + " bytes");
//   }

// }, false);
