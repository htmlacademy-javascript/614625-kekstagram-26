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

const sliderInitial = {
  min:0,
  max:1,
  step:0.1,
  start:0.1,
};

const valueEffects = {
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
    min:sliderInitial['min'],
    max:sliderInitial['max'],
  },
  start:sliderInitial['start'],
  step:sliderInitial['step'],
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
  effectLevel.value = `grayscale(${valueEffects['chrome']['max']})`;
  slider.removeAttribute('disabled');
  slider.style.display = 'block';
  imgUpload.className = '';
  imgUpload.classList.add('effects__preview--chrome');
  imgUpload.style.filter = `grayscale(${valueEffects['chrome']['max']})`;
  slider.noUiSlider.updateOptions({
    range: {
      min: valueEffects['chrome']['min'],
      max: valueEffects['chrome']['max'],
    },
    step: valueEffects['chrome']['step']
  });
  slider.noUiSlider.set(valueEffects['chrome']['max']);
}

function addSepiaEffect(){
  sepia.setAttribute('checked', 'true');
  effectLevel.value = `${valueEffects['sepia']['max']}`;
  slider.removeAttribute('disabled');
  slider.style.display = 'block';
  imgUpload.className = '';
  imgUpload.classList.add('effects__preview--sepia');
  imgUpload.style.filter = `sepia(${valueEffects['sepia']['max']})`;
  slider.noUiSlider.updateOptions({
    range: {
      min: valueEffects['sepia']['min'],
      max: valueEffects['sepia']['max'],
    },
    step: valueEffects['sepia']['step']
  });
  slider.noUiSlider.set(valueEffects['sepia']['max']);
}

function addMarvinEffect(){
  marvin.setAttribute('checked', 'true');
  effectLevel.value = `${valueEffects['marvin']['min']}`;
  slider.removeAttribute('disabled');
  slider.style.display = 'block';
  imgUpload.className = '';
  imgUpload.classList.add('effects__preview--marvin');
  imgUpload.style.filter = `invert(${valueEffects['marvin']['max']}%)`;
  slider.noUiSlider.updateOptions({
    range: {
      min: valueEffects['marvin']['min'],
      max: valueEffects['marvin']['max'],
    },
    step: valueEffects['marvin']['min']
  });
  slider.noUiSlider.set(valueEffects['marvin']['max']);
}

function addPhobosEffect(){
  fobos.setAttribute('checked', 'true');
  effectLevel.value = `${valueEffects['phobos']['max']}`;
  slider.removeAttribute('disabled');
  slider.style.display = 'block';
  imgUpload.className = '';
  imgUpload.classList.add('effects__preview--phobos');
  imgUpload.style.filter = `blur(${valueEffects['phobos']['max']}px)`;
  slider.noUiSlider.updateOptions({
    range: {
      min: valueEffects['phobos']['min'],
      max: valueEffects['phobos']['max'],
    },
    step: valueEffects['phobos']['step']
  });
  slider.noUiSlider.set(valueEffects['phobos']['max']);
}

function addHeatEffect(){
  znoy.setAttribute('checked', 'true');
  effectLevel.value = `${valueEffects['heat']['max']}`;
  slider.removeAttribute('disabled');
  slider.style.display = 'block';
  imgUpload.className = '';
  imgUpload.classList.add('effects__preview--heat');
  imgUpload.style.filter = `brightness(${valueEffects['heat']['max']})`;
  slider.noUiSlider.updateOptions({
    range: {
      min: valueEffects['heat']['min'],
      max: valueEffects['heat']['max'],
    },
    step: valueEffects['heat']['step']
  });
  slider.noUiSlider.set(valueEffects['heat']['max']);
}
