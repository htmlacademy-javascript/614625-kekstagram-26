const bigPicture = document.querySelector('.big-picture');
const socialComments = bigPicture.querySelector('.social__comments');

function showPopupData(data, evt){
  evt.preventDefault();
  const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  const likes = bigPicture.querySelector('.likes-count');
  const socialCaption = bigPicture.querySelector('.social__caption');
  const commentsCount = bigPicture.querySelector('.comments-count');

  data.comments.forEach((element) => {
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

export {showPopupData, closePopupData};
