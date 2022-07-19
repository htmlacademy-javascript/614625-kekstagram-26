const controlSmall = document.querySelector('.scale__control--smaller');
const controlBig = document.querySelector('.scale__control--bigger');
const controlValue = document.querySelector('.scale__control--value');
const imgUpload = document.querySelector('.img-upload__preview img');

controlSmall.addEventListener('click', lowerScale);
controlBig.addEventListener('click', addScale);

//проверить можно ли уменьшить или увеличить на 25
//смысл функции какой добавить значение в инпут
//применить эффект картинке
//шаг 25%
function lowerScale(){
  if (controlValue.value === '0%'){
    return '';
  }
  imgUpload.style.transform = 'scale(0.25)';
}

function addScale(){
  if (controlValue.value === '100%'){
    return '';
  }
  imgUpload.style.transform = 'scale(0.75)';
}
