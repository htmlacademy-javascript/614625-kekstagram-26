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
  socialComments.remove();
  const listComments = document.createDocumentFragment();

  commentsLoader.classList.add('hidden');
  socCommentsCount.classList.add('hidden');
  commentsCount.innerText = data.comments.length;
  //Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments. Разметка каждого комментария должна выглядеть так:
  socialCaption.innerText = data.description;
  likes.innerText = data.likes;
  bigPictureImg.alt = data.description;
  bigPictureImg.src = data.url;
  bigPicture.classList.remove('hidden');
  return;
}

export {showPopupData};
