//отрисовка окна с полноразмерным изображением
//функция отрисовки данных в попап
function showPopupData(data, evt){
  evt.preventDefault();
  const imgUpload = document.querySelector('.big-picture');
  imgUpload.classList.remove('hidden');
  return;
}

export {showPopupData};
