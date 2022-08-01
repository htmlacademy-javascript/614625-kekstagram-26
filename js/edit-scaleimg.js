const controlSmall = document.querySelector('.scale__control--smaller');
const controlBig = document.querySelector('.scale__control--bigger');
const controlValue = document.querySelector('.scale__control--value');
const imgUpload = document.querySelector('.img-upload__preview img');
const minScale = 0;
const maxScale = 100;
const stepScale = 25;

controlSmall.addEventListener('click', lowerScale);
controlBig.addEventListener('click', addScale);

function lowerScale(){
  if (controlValue.value === `${minScale}%`){
    return '';
  }
  let value = controlValue.value.replace('%','');
  value = +value - stepScale;
  controlValue.value = `${value}%`;
  value = value / maxScale;
  imgUpload.style.transform = `scale(${value})`;
}

function addScale(){
  if (controlValue.value === `${maxScale}%`){
    return '';
  }
  let value = controlValue.value.replace('%','');
  value = +value + stepScale;
  controlValue.value = `${value}%`;
  value = value / maxScale;
  imgUpload.style.transform = `scale(${value})`;
}
