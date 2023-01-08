import './slider.css';

interface ISlider {
    minGap: number,
    sliderContainer: HTMLDivElement,
    firstRange: HTMLSpanElement,
    secondRange: HTMLSpanElement,
    firstSlider: HTMLInputElement,
    secondSlider: HTMLInputElement,
    onchange: (min: number, max: number) => void,
    getSlider: (target: Node) => void,
    slideOne: () => void,
    slideTwo: () => void
}

export default class Slider implements ISlider {
    minGap = 0;
    sliderContainer: HTMLDivElement;
    firstRange!: HTMLSpanElement;
    secondRange!: HTMLSpanElement;
    firstSlider!: HTMLInputElement;
    secondSlider!: HTMLInputElement;
    onchange: (min: number, max: number) => void;
    constructor(onchange: (min: number, max: number) => void) {
        this.sliderContainer = document.createElement('div');
        this.onchange = onchange;
    }

    getSlider(target: Node) {
        const values = document.createElement('div');
        values.classList.add('values');
        target.appendChild(values);

        this.firstRange = document.createElement('span');
        this.firstRange.id = 'range1';
        this.firstRange.textContent = '0';
        values.appendChild(this.firstRange);

        const dash = document.createElement('span');
        dash.textContent = `-`;
        dash.style.color = 'white';
        values.appendChild(dash);

        this.secondRange = document.createElement('span');
        this.secondRange.id = 'range2';
        this.secondRange.textContent = '300';
        values.appendChild(this.secondRange);

        const sliderContainer = this.sliderContainer;
        sliderContainer.classList.add('slider_container');

        const track = document.createElement('div');
        track.classList.add('slider_track');
        sliderContainer.appendChild(track);

        this.firstSlider = document.createElement('input');
        this.firstSlider.type = 'range';
        this.firstSlider.setAttribute('min', '0');
        this.firstSlider.setAttribute('max', '300');
        this.firstSlider.value = '0';
        this.firstSlider.id = 'slider-1';
        this.firstSlider.addEventListener('input', this.slideOne.bind(this));

        sliderContainer.appendChild(this.firstSlider);

        this.secondSlider = document.createElement('input');
        this.secondSlider.type = 'range';
        this.secondSlider.setAttribute('min', '0');
        this.secondSlider.setAttribute('max', '300');
        this.secondSlider.value = '300';
        this.secondSlider.id = 'slider-2';
        this.secondSlider.addEventListener('input', this.slideTwo.bind(this));

        sliderContainer.appendChild(this.secondSlider);

        target.appendChild(sliderContainer);
    }

    slideOne() {
        const sliderFirst = this.firstSlider;
        const sliderSecond = this.secondSlider;
        const valueFirst = this.firstRange;

        let firstVal = (sliderFirst as HTMLInputElement).value;
        const secondVal = (sliderSecond as HTMLInputElement).value;
        if ((parseInt(secondVal) - parseInt(firstVal)) <= this.minGap) {
            firstVal = `link${(parseInt(secondVal) - this.minGap)}`;
        }
        (valueFirst as HTMLSpanElement).textContent = firstVal;
        this.onchange(Number(firstVal), Number(secondVal));
    }

    slideTwo() {
        const sliderFirst = this.firstSlider;
        const sliderSecond = this.secondSlider;
        const valueSecond = this.secondRange;

        const firstVal = (sliderFirst as HTMLInputElement).value;
        let secondVal = (sliderSecond as HTMLInputElement).value;
        if (parseInt(secondVal) - parseInt(firstVal) <= this.minGap) {
            secondVal = String(parseInt(firstVal) + this.minGap);
        }
        (valueSecond as HTMLSpanElement).textContent = secondVal;
        this.onchange(Number(firstVal), Number(secondVal));
    }

    resetSlider() {
        this.firstSlider.value = '0';
        this.secondSlider.value = '100';

        this.secondRange.textContent = '100';
        this.firstRange.textContent = '0';
    }
}
