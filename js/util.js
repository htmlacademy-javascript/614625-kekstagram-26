function checkLength(string, maxLengh){
  return string.length <= maxLengh;
}
checkLength('asd',4);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomInt, isEscapeKey};
