import { IPage } from '../IPage';
import './errorPage.css';


export default class ErrorPage implements IPage {
    getPage() {
        const item = document.createElement('div');
        item.id = 'errorPage';
        item.classList.add('error');
        const text = document.createElement('p');
        text.classList.add('text_404');
        text.textContent = 'Кажется, что-то пошло не так';
        item.append(text);

        const imageError = document.createElement('img');
        imageError.src = './img/flower_404.png';
        imageError.classList.add('image_error');
        item.append(imageError);

        const bigText = document.createElement('p');
        bigText.classList.add('big_text');
        bigText.textContent = '404';
        item.append(bigText);

        return item;
    }
}