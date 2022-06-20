import * as data from './data.js';
import {createThumbnail} from './render-thumbnails.js';

const COUNT_OBJECT = 25;

const arrayData = data.createData(COUNT_OBJECT);

const thumbnail = createThumbnail(arrayData);
const pictures = document.querySelector('.pictures');
pictures.append(thumbnail);
