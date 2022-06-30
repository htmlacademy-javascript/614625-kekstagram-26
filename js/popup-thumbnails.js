function showPopupData(data, evt){
  evt.preventDefault();
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  const likes = bigPicture.querySelector('.likes-count');
  const socialCaption = bigPicture.querySelector('.social__caption');
  const commentsCount = bigPicture.querySelector('.comments-count');
  const socCommentsCount = bigPicture.querySelector('.social__comment-count');
  const commentsLoader = bigPicture.querySelector('.comments-loader');

  const socialComments = bigPicture.querySelector('.social__comments');
  const elemSocialComments = socialComments.querySelectorAll('li');

  elemSocialComments.forEach((element) => {
    element.remove();
  });

  const listComments = document.createDocumentFragment();
  data.comments.forEach((element) => {
    const li = document.createElement('li');
    const img = document.createElement('img');
    const p = document.createElement('p');
    li.classList.add('social__comment');
    img.classList.add('social__picture');
    img.src = element.avatar;
    img.alt = element.name;
    li.appendChild(img);
    p.classList.add('social__text');
    p.innerText = element.message;
    li.appendChild(p);
    listComments.appendChild(li);
  });
  socialComments.appendChild(listComments);

  commentsLoader.classList.add('hidden');
  socCommentsCount.classList.add('hidden');
  commentsCount.innerText = data.comments.length;
  socialCaption.innerText = data.description;
  likes.innerText = data.likes;
  bigPictureImg.alt = data.description;
  bigPictureImg.src = data.url;
  bigPicture.classList.remove('hidden');
}

function closePopupData(){
  const bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.add('hidden');
}

export {showPopupData, closePopupData};
