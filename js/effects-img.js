const imgUpload = document.querySelector('.img-upload__preview img');
const slider = document.querySelector('.effect-level__slider');
const original = document.querySelector('.effects__preview--none');
const hrom = document.querySelector('.effects__preview--chrome');
const sepia = document.querySelector('.effects__preview--sepia');
const marvin = document.querySelector('.effects__preview--marvin');
const fobos = document.querySelector('.effects__preview--phobos');
const znoy = document.querySelector('.effects__preview--heat');
const effectLevel = document.querySelector('.effect-level__value');

original.addEventListener('click', addOriginEffect);
hrom.addEventListener('click',addHromEffect);
sepia.addEventListener('click',addSepiaEffect);
marvin.addEventListener('click',addMarvinEffect);
fobos.addEventListener('click',addFobosEffect);
znoy.addEventListener('click',addZnoyEffect);

noUiSlider.create(slider, {
  range:{
    min:0,
    max:1,
  },
  start:0.1,
  step:0.1,
  connect: 'lower',
});
slider.setAttribute('disabled', true);
slider.style.display = 'none';

slider.noUiSlider.on('update', () => {
  imgUpload.style.filter = '';
  if(imgUpload.classList.contains('effects__preview--chrome')){
    imgUpload.style.filter = `grayscale(${slider.noUiSlider.get()})`;
  }
  if(imgUpload.classList.contains('effects__preview--sepia')){
    imgUpload.style.filter = `sepia(${slider.noUiSlider.get()})`;
  }
  if(imgUpload.classList.contains('effects__preview--marvin')){
    imgUpload.style.filter = `invert(${slider.noUiSlider.get()}%)`;
  }
  if(imgUpload.classList.contains('effects__preview--phobos')){
    imgUpload.style.filter = `blur(${slider.noUiSlider.get()}px)`;
  }
  if(imgUpload.classList.contains('effects__preview--heat')){
    imgUpload.style.filter = `brightness(${slider.noUiSlider.get()})`;
  }
  effectLevel.value = slider.noUiSlider.get();
});

function addOriginEffect(){
  original.setAttribute('checked', 'true');
  effectLevel.value = '';
  slider.setAttribute('disabled', true);
  imgUpload.className = '';
  imgUpload.style.filter = '';
  slider.style.display = 'none';
}

function addHromEffect(){
  hrom.setAttribute('checked', 'true');
  effectLevel.value = '1';
  slider.removeAttribute('disabled');
  slider.style.display = 'block';
  imgUpload.className = '';
  imgUpload.classList.add('effects__preview--chrome');
  imgUpload.style.filter = 'grayscale(1)';
  slider.noUiSlider.updateOptions({
    range: {
      min: 0.1,
      max: 1,
    },
    step: 0.1
  });
  slider.noUiSlider.set(1);
}

function addSepiaEffect(){
  sepia.setAttribute('checked', 'true');
  effectLevel.value = '1';
  slider.removeAttribute('disabled');
  slider.style.display = 'block';
  imgUpload.className = '';
  imgUpload.classList.add('effects__preview--sepia');
  imgUpload.style.filter = 'sepia(1)';
  slider.noUiSlider.updateOptions({
    range: {
      min: 0.1,
      max: 1,
    },
    step: 0.1
  });
  slider.noUiSlider.set(1);
}

function addMarvinEffect(){
  marvin.setAttribute('checked', 'true');
  effectLevel.value = '100';
  slider.removeAttribute('disabled');
  slider.style.display = 'block';
  imgUpload.className = '';
  imgUpload.classList.add('effects__preview--marvin');
  imgUpload.style.filter = 'invert(100%)';
  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100,
    },
    step: 1
  });
  slider.noUiSlider.set(100);
}

function addFobosEffect(){
  fobos.setAttribute('checked', 'true');
  effectLevel.value = '3';
  slider.removeAttribute('disabled');
  slider.style.display = 'block';
  imgUpload.className = '';
  imgUpload.classList.add('effects__preview--phobos');
  imgUpload.style.filter = 'blur(3px)';
  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1
  });
  slider.noUiSlider.set(3);
}

function addZnoyEffect(){
  znoy.setAttribute('checked', 'true');
  effectLevel.value = '3';
  slider.removeAttribute('disabled');
  slider.style.display = 'block';
  imgUpload.className = '';
  imgUpload.classList.add('effects__preview--heat');
  imgUpload.style.filter = 'brightness(3)';
  slider.noUiSlider.updateOptions({
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1
  });
  slider.noUiSlider.set(3);
}
