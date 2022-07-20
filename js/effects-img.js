const imgUpload = document.querySelector('.img-upload__preview img');
const slider = document.querySelector('.effect-level__slider');
const original = document.querySelector('.effects__preview--none');
const hrom = document.querySelector('.effects__preview--chrome');
const sepia = document.querySelector('.effects__preview--sepia');
const marvin = document.querySelector('.effects__preview--marvin');
const fobos = document.querySelector('.effects__preview--phobos');
const znoy = document.querySelector('.effects__preview--heat');

original.addEventListener('click', addOriginEffect);
hrom.addEventListener('click',addHromEffect);
sepia.addEventListener('click',addSepiaEffect);
marvin.addEventListener('click',addMarvinEffect);
fobos.addEventListener('click',addFobosEffect);
znoy.addEventListener('click',addZnoyEffect);

//При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%): слайдер, CSS-стиль изображения и значение поля должны обновляться.
//при передвижении слайдера меняется эффект и меняется значение в инпуте

function addOriginEffect(){
  //Для эффекта «Оригинал» CSS-стили filter удаляются.
  //При выборе эффекта «Оригинал» слайдер скрывается.
}

function addHromEffect(){
  console.log('click');
  noUiSlider.create(slider, {
    range:{
      min:0,
      max:1,
    },
    start:0.1,
    step:0.1,
    connect: 'lower',
  });

  //Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
}

function addSepiaEffect(){
  //Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
}

function addMarvinEffect(){
  //Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
}

function addFobosEffect(){
  //Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
}

function addZnoyEffect(){
  //Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
}
