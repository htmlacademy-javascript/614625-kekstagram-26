function validateHashTag(hashteg){
  if (hashteg === ''){
    return true;
  }
  hashteg = hashteg.split(' ');
  if(hashteg.length>5){
    return 'нельзя указывать больше 5 хештегов';
  }
  const allowCharacters = /(([a-zA-Z\d]))/;
  for (let i = 0; i<hashteg.length;i++){
    if(hashteg[i][0] !== '#'){
      return 'хэш-тег начинается с символа #';
    }
    if (allowCharacters.test(hashteg[i]) === false){
      return 'строка после решётки должна состоять из букв и цифр';
    }
    if(hashteg[i].length>20){
      return 'максимальная длина одного хэш-тега 20 символов';
    }
    if(hashteg[i]==='#'){
      return 'хеш-тег не может состоять только из одной решётки';
    }
  }
  if(hashteg.length>1){
    for(let k=0;k<hashteg.length;k++){
      for(let j=k+1;j<hashteg.length;j++){
        if (hashteg[k] === hashteg[j]){
          return 'один и тот же хэш-тег не может быть использован дважды';
        }
      }
    }
  }
  return true;
}

export {validateHashTag};
