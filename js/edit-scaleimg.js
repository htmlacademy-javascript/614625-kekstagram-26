const controlSmall = document.querySelector('.scale__control--smaller');
const controlBig = document.querySelector('.scale__control--bigger');
const controlValue = document.querySelector('.scale__control--value');
const imgUpload = document.querySelector('.img-upload__preview img');

controlSmall.addEventListener('click', lowerScale);
controlBig.addEventListener('click', addScale);

function lowerScale(){
  if (controlValue.value === '0%'){
    return '';
  }
  let value = controlValue.value.replace('%','');
  value = +value - 25;
  controlValue.value = `${value}%`;
  value = value / 100;
  imgUpload.style.transform = `scale(${value})`;
}

function addScale(){
  if (controlValue.value === '100%'){
    return '';
  }
  let value = controlValue.value.replace('%','');
  value = +value + 25;
  controlValue.value = `${value}%`;
  value = value / 100;
  imgUpload.style.transform = `scale(${value})`;
}
