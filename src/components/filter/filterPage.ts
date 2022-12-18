import './filterPage.css';

export default class FilterPage {
    getPage() {
        const filterContent = document.createElement('div');
        filterContent.classList.add('filter_content');
        filterContent.classList.add('wrapper');

        const filter = document.createElement('div');
        filter.classList.add('filter');
        filterContent.append(filter);

        const typeFilter = document.createElement('button');
        typeFilter.classList.add('type_accordeon');
        typeFilter.textContent = 'ТИП'
        filter.append(typeFilter);

        const accordeonField = document.createElement('div');
        accordeonField.classList.add('panel');
        typeFilter.append(accordeonField);

        const formAll = document.createElement('form');
        accordeonField.append(formAll);

        const input = document.createElement('input');
        input.type = 'checkbox';

        const label = document.createElement('label');
        label.textContent = 'Все(100)';

        formAll.append(label);
        formAll.append(input);

        const occasionFilter = document.createElement('button');
        occasionFilter.classList.add('type_accordeon');
        occasionFilter.textContent = 'ПОВОД'
        filter.appendChild(occasionFilter);

        const colorFilter = document.createElement('button');
        colorFilter.classList.add('type_accordeon');
        colorFilter.textContent = 'ЦВЕТ'
        filter.appendChild(colorFilter);

        const flowerFilter = document.createElement('button');
        flowerFilter.classList.add('type_accordeon');
        flowerFilter.textContent = 'ОСНОВНОЙ ЦВЕТОК'
        filter.appendChild(flowerFilter);

        const priceFilter = document.createElement('p');
        priceFilter.textContent = 'СТОИМОСТЬ';
        filter.appendChild(priceFilter);

        return filterContent;
    }
    // open(accordeon) {
    //     for (let i = 0; i < accordeon.length; i++) {
    //         accordeon[i].addEventListener("click", function() {
    //         this.classList.toggle("active");
    //         const panel = this.nextElementSibling;
    //         if (panel.style.display === "block") {
    //           panel.style.display = "none";
    //         } else {
    //           panel.style.display = "block";
    //         }
    //       });
    //     }
    // }
}