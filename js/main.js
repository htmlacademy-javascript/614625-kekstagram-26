function checkLength(string, maxLengh){
  return string.length <= maxLengh;
}
checkLength('asd',4);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

const COUNT_OBJECT = 25;

const TXT_MESSAGE = `Всё отлично!
В целом всё неплохо. 
Но не всё.
Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент?!`;
const ARR_TXT = TXT_MESSAGE.split('\n');

const NAME = [
  'Федя',
  'Мария',
  'Константин',
  'Марина',
  'Светлана',
  'Виктория',
  'Игорь',
  'Василий',
  'Василиса',
  'Нина'
];

function createComments(count){
  const comments = [];
  let element;
  for (let index = 1; index <= count; index++) {
    element = {
      id: index,
      avatar: `img/avatar-${getRandomInt(1,6)}.svg`,
      message: ARR_TXT[getRandomInt(0,6)],
      name: NAME[getRandomInt(0,9)],
    };
    comments.push(element);
  }
  return comments;
}
let arrayData = [];

function createData(count){
  let element;
  for (let index = 1; index <= count; index++) {
    element = {
      id: index,
      url: `photos/${index}.jpg`,
      description: 'какое-то описание',
      likes: getRandomInt(15, 200),
      comments: createComments(getRandomInt(1,3)),
    };
    arrayData.push(element);
  }
  return arrayData;
}
arrayData = createData(COUNT_OBJECT);
