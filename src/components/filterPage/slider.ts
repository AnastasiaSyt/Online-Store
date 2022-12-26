import './slider.css';

interface ISlider {
    minGap: number,
    getSlider: (target: Node) => void,
    slideOne: () => void,
    slideTwo: () => void
}

export default class Slider implements ISlider {
    minGap = 0;

    getSlider(target: Node) {
        const values = document.createElement('div');
        values.classList.add('values');
        target.appendChild(values);

        const firstRange = document.createElement('span');
        firstRange.id = 'range1';
        firstRange.textContent = '0';
        values.appendChild(firstRange);

        const dash = document.createElement('span');
        dash.textContent = `-`;
        values.appendChild(dash);

        const secondRange = document.createElement('span');
        secondRange.id = 'range2';
        secondRange.textContent = '100';
        values.appendChild(secondRange);

        const sliderContainer = document.createElement('div');
        sliderContainer.classList.add('slider_container');

        const track = document.createElement('div');
        track.classList.add('slider_track');
        sliderContainer.appendChild(track);

        const firstSlider = document.createElement('input');
        firstSlider.type = 'range';
        firstSlider.setAttribute('min', '0');
        firstSlider.setAttribute('max', '100');
        firstSlider.value = '30';
        firstSlider.id = 'slider-1';
        firstSlider.setAttribute('oninput', 'slideOne()');

        sliderContainer.appendChild(firstSlider);

        const secondSlider = document.createElement('input');
        secondSlider.type = 'range';
        secondSlider.setAttribute('min', '0');
        secondSlider.setAttribute('max', '100');
        secondSlider.value = '70';
        secondSlider.id = 'slider-2';
        secondSlider.setAttribute('oninput', 'slideTwo()');

        sliderContainer.appendChild(secondSlider);

        target.appendChild(sliderContainer);
    }

    slideOne() {
        const sliderFirst = document.getElementById('slider-1');
        const sliderSecond = document.getElementById('slider-2');
        const valueFirst = document.getElementById('range1');

        // let minGap = 0;
        let firstVal = (sliderFirst as HTMLInputElement).value;
        let secondVal = (sliderSecond as HTMLInputElement).value;
        if ((parseInt(secondVal) - parseInt(firstVal)) <= this.minGap) {
            firstVal = `link${(parseInt(secondVal) - this.minGap)}`;
        }
        (valueFirst as HTMLSpanElement).textContent = firstVal;
    }

    slideTwo() {
        const sliderFirst = document.getElementById('slider-1');
        const sliderSecond = document.getElementById('slider-2');
        const valueSecond = document.getElementById('range2');

        let firstVal = (sliderFirst as HTMLInputElement).value;
        let secondVal = (sliderSecond as HTMLInputElement).value;
        if (parseInt(secondVal) - parseInt(firstVal) <= this.minGap) {
            secondVal = String(parseInt(firstVal) + this.minGap);
        }
        (valueSecond as HTMLSpanElement).textContent = secondVal;
    }

}
