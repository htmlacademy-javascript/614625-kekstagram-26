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
hrom.addEventListener('click',addChromeEffect);
sepia.addEventListener('click',addSepiaEffect);
marvin.addEventListener('click',addMarvinEffect);
fobos.addEventListener('click',addPhobosEffect);
znoy.addEventListener('click',addHeatEffect);

const SLIDER_INITIAL = {
  min:0,
  max:1,
  step:0.1,
  start:0.1,
};

const VALUE_EFFECTS = {
  chrome: {
    min: 0.1,
    max: 1,
    step: 0.1,
  },
  sepia: {
    min: 0.1,
    max: 1,
    step: 0.1,
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
  },
};

noUiSlider.create(slider, {
  range:{
    min:SLIDER_INITIAL['min'],
    max:SLIDER_INITIAL['max'],
  },
  start:SLIDER_INITIAL['start'],
  step:SLIDER_INITIAL['step'],
  connect: 'lower',
});
slider.setAttribute('disabled', 'true');
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
  slider.setAttribute('disabled', 'true');
  imgUpload.className = '';
  imgUpload.style.filter = '';
  slider.style.display = 'none';
}

function addChromeEffect(){
  hrom.setAttribute('checked', 'true');
  effectLevel.value = `grayscale(${VALUE_EFFECTS['chrome']['max']})`;
  slider.removeAttribute('disabled');
  slider.style.display = 'block';
  imgUpload.className = '';
  imgUpload.classList.add('effects__preview--chrome');
  imgUpload.style.filter = `grayscale(${VALUE_EFFECTS['chrome']['max']})`;
  slider.noUiSlider.updateOptions({
    range: {
      min: VALUE_EFFECTS['chrome']['min'],
      max: VALUE_EFFECTS['chrome']['max'],
    },
    step: VALUE_EFFECTS['chrome']['step']
  });
  slider.noUiSlider.set(VALUE_EFFECTS['chrome']['max']);
}

function addSepiaEffect(){
  sepia.setAttribute('checked', 'true');
  effectLevel.value = `${VALUE_EFFECTS['sepia']['max']}`;
  slider.removeAttribute('disabled');
  slider.style.display = 'block';
  imgUpload.className = '';
  imgUpload.classList.add('effects__preview--sepia');
  imgUpload.style.filter = `sepia(${VALUE_EFFECTS['sepia']['max']})`;
  slider.noUiSlider.updateOptions({
    range: {
      min: VALUE_EFFECTS['sepia']['min'],
      max: VALUE_EFFECTS['sepia']['max'],
    },
    step: VALUE_EFFECTS['sepia']['step']
  });
  slider.noUiSlider.set(VALUE_EFFECTS['sepia']['max']);
}

function addMarvinEffect(){
  marvin.setAttribute('checked', 'true');
  effectLevel.value = `${VALUE_EFFECTS['marvin']['min']}`;
  slider.removeAttribute('disabled');
  slider.style.display = 'block';
  imgUpload.className = '';
  imgUpload.classList.add('effects__preview--marvin');
  imgUpload.style.filter = `invert(${VALUE_EFFECTS['marvin']['max']}%)`;
  slider.noUiSlider.updateOptions({
    range: {
      min: VALUE_EFFECTS['marvin']['min'],
      max: VALUE_EFFECTS['marvin']['max'],
    },
    step: VALUE_EFFECTS['marvin']['min']
  });
  slider.noUiSlider.set(VALUE_EFFECTS['marvin']['max']);
}

function addPhobosEffect(){
  fobos.setAttribute('checked', 'true');
  effectLevel.value = `${VALUE_EFFECTS['phobos']['max']}`;
  slider.removeAttribute('disabled');
  slider.style.display = 'block';
  imgUpload.className = '';
  imgUpload.classList.add('effects__preview--phobos');
  imgUpload.style.filter = `blur(${VALUE_EFFECTS['phobos']['max']}px)`;
  slider.noUiSlider.updateOptions({
    range: {
      min: VALUE_EFFECTS['phobos']['min'],
      max: VALUE_EFFECTS['phobos']['max'],
    },
    step: VALUE_EFFECTS['phobos']['step']
  });
  slider.noUiSlider.set(VALUE_EFFECTS['phobos']['max']);
}

function addHeatEffect(){
  znoy.setAttribute('checked', 'true');
  effectLevel.value = `${VALUE_EFFECTS['heat']['max']}`;
  slider.removeAttribute('disabled');
  slider.style.display = 'block';
  imgUpload.className = '';
  imgUpload.classList.add('effects__preview--heat');
  imgUpload.style.filter = `brightness(${VALUE_EFFECTS['heat']['max']})`;
  slider.noUiSlider.updateOptions({
    range: {
      min: VALUE_EFFECTS['heat']['min'],
      max: VALUE_EFFECTS['heat']['max'],
    },
    step: VALUE_EFFECTS['heat']['step']
  });
  slider.noUiSlider.set(VALUE_EFFECTS['heat']['max']);
}
