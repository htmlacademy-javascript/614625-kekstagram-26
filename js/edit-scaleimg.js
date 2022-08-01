const controlSmall = document.querySelector('.scale__control--smaller');
const controlBig = document.querySelector('.scale__control--bigger');
const controlValue = document.querySelector('.scale__control--value');
const imgUpload = document.querySelector('.img-upload__preview img');
const MIN_SCALE = 0;
const MAX_SCALE = 100;
const STEP_SCALE = 25;

controlSmall.addEventListener('click', lowerScale);
controlBig.addEventListener('click', addScale);

function lowerScale(){
  if (controlValue.value === `${MIN_SCALE}%`){
    return '';
  }
  let value = controlValue.value.replace('%','');
  value = +value - STEP_SCALE;
  controlValue.value = `${value}%`;
  value = value / MAX_SCALE;
  imgUpload.style.transform = `scale(${value})`;
}

function addScale(){
  if (controlValue.value === `${MAX_SCALE}%`){
    return '';
  }
  let value = controlValue.value.replace('%','');
  value = +value + STEP_SCALE;
  controlValue.value = `${value}%`;
  value = value / MAX_SCALE;
  imgUpload.style.transform = `scale(${value})`;
}
