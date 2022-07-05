import * as data from './data.js';
import {createThumbnails} from './render-thumbnails.js';
import {showPopupData, closePopupData} from './popup-thumbnail.js';
import {isEscapeKey} from './util.js';

const COUNT_OBJECT = 25;

const arrayData = data.createData(COUNT_OBJECT);

const thumbnail = createThumbnails(arrayData);
const pictures = document.querySelector('.pictures');
pictures.append(thumbnail);

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
  console.log(evt.target.files[0]);
  imgUpload.classList.remove('hidden');
  const [file] = buttonUpload.files;
  imgUpload.querySelector('img').src = URL.createObjectURL(file);
});

// var control = document.getElementById("your-files");
// control.addEventListener("change", function(event) {
//   // Когда происходит изменение элементов управления, значит появились новые файлы
//   var i = 0,
//     files = control.files,
//     len = files.length;

//   for (; i < len; i++) {
//     console.log("Filename: " + files[i].name);
//     console.log("Type: " + files[i].type);
//     console.log("Size: " + files[i].size + " bytes");
//   }

// }, false);
