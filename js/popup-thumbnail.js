const bigPicture = document.querySelector('.big-picture');
const socialComments = bigPicture.querySelector('.social__comments');
const loaderComments = bigPicture.querySelector('.social__comments-loader');
const commentsNumber = bigPicture.querySelector('.comments-number');
const commentsCount = bigPicture.querySelector('.comments-count');
let popUdData = null;
const COUNT_COMMENT = 5;

function showPopupData(data, evt){
  evt.preventDefault();
  popUdData = data;
  const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  const likes = bigPicture.querySelector('.likes-count');
  const socialCaption = bigPicture.querySelector('.social__caption');

  if (data.comments.length>COUNT_COMMENT){
    loaderComments.classList.remove('hidden');
    commentsNumber.innerText = `${COUNT_COMMENT}`;
    loaderComments.addEventListener('click', loadComments);
  } else{
    loaderComments.classList.add('hidden');
    commentsNumber.innerText = data.comments.length;
  }

  const comments = data.comments.slice(0,COUNT_COMMENT);
  comments.forEach((element) => {
    createComment(element);
  });

  commentsCount.innerText = data.comments.length;
  socialCaption.innerText = data.description;
  likes.innerText = data.likes;
  bigPictureImg.alt = data.description;
  bigPictureImg.src = data.url;
  bigPicture.classList.remove('hidden');
}

function closePopupData(){
  const elemSocialComments = socialComments.querySelectorAll('li');
  elemSocialComments.forEach((element) => {
    element.remove();
  });
  bigPicture.classList.add('hidden');
  loaderComments.classList.add('hidden');
  loaderComments.removeEventListener('click', loadComments);
}

function createComment(data){
  const listComments = document.createDocumentFragment();
  const li = document.createElement('li');
  const img = document.createElement('img');
  const p = document.createElement('p');
  li.classList.add('social__comment');
  img.classList.add('social__picture');
  img.src = data.avatar;
  img.alt = data.name;
  li.appendChild(img);
  p.classList.add('social__text');
  p.innerText = data.message;
  li.appendChild(p);
  listComments.appendChild(li);
  socialComments.appendChild(listComments);
}

function loadComments (){
  const countData = (commentsCount.innerText- commentsNumber.outerText);
  let commentsData;
  if ((countData/COUNT_COMMENT)>1){
    commentsData = popUdData.comments.slice(commentsNumber.outerText,+commentsNumber.outerText + COUNT_COMMENT);
    commentsData.forEach( (element) => {
      createComment(element);
    });
    commentsNumber.innerText = +commentsNumber.innerText + COUNT_COMMENT;
  } else{
    commentsData = popUdData.comments.slice(commentsNumber.outerText,+commentsNumber.outerText + countData);
    commentsData.forEach( (element) => {
      createComment(element);
    });
    commentsNumber.innerText = +commentsNumber.innerText + countData;
    loaderComments.classList.add('hidden');
    loaderComments.removeEventListener('click', loadComments);
  }
}

export {showPopupData, closePopupData};
