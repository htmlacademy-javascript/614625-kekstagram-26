function validateHashTeg(hashteg){
  hashteg = hashteg.split(' ');
  if(hashteg.length>5){
    return 'нельзя указывать больше 5 хештегов';
  }
  const allowCharacters = /(([a-zA-Z].*\d)|(\d.*[a-zA-Z]))/;
  // строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
  for (let i = 0; i<hashteg.length;i++){
    if(hashteg[i][0] !== '#'){
      return 'хэш-тег начинается с символа #';
    }
    if (allowCharacters.test(hashteg[i]) === false){
      return 'строка после решётки должна состоять из букв';
    }
    if(hashteg[i].length>20){
      return 'максимальная длина одного хэш-тега 20 символов';
    }
    if(hashteg[i]==='#'){
      return 'хеш-тег не может состоять только из одной решётки';
    }
    // if(hashteg.indexOf(hashteg[i]) !== -1){
    //   return 'один и тот же хэш-тег не может быть использован дважды';
    // }
  }
  return true;
}

export {validateHashTeg};
