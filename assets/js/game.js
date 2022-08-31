startBtn.addEventListener('click', () => {
    document.getElementById('preStart').remove();
})

const area = document.getElementsByClassName('game-area__item');

class Snake {
    // Класс змейки
    sections = [] // Секции из которых состоит змейка(должны быть объектами Section)
    nextStep = {} // Координаты следующей клетки

    constructor () {
        // this.sections.push()
        for (let i = 5; i <= 7; i++) {
            const section = new Section(5, i, 'snake__section');
            this.sections.push(section);
        }
        this.render();
    }

    getNextStep() {
        // Метод для получения следующей клетки
        const lastSection = this.sections[this.sections.length - 1];
        const prelastSection = this.sections[this.sections.length - 2];
        
        let x;
        let y;
        if (lastSection.dataset.x === prelastSection.dataset.x && lastSection.dataset.y > prelastSection.dataset.y) {
            // движение вправо
            y = lastSection.y;
            if (lastSection.dataset.x == 10) {
                x = '1';
            }
            else {
                x = parseInt(x) + 1;
            }
            
        }
        else if (lastSection.dataset.x === prelastSection.dataset.x && lastSection.dataset.y < prelastSection.dataset.y) {
            // движение влево
            y = lastSection.y;
            if (lastSection.dataset.x == 1) {
                x = '10';
            }
            else {
                x = parseInt(x) - 1;
            }
        }
        else if (lastSection.dataset.x < prelastSection.dataset.x && lastSection.dataset.y === prelastSection.dataset.y) {
            // движение вверх
            x = lastSection.x;
            if (lastSection.dataset.y == 1) {
                y = '10';
            }
            else {
                y = parseInt(y) - 1;
            }
        }
        else if (lastSection.dataset.x > prelastSection.dataset.x && lastSection.dataset.y === prelastSection.dataset.y) {
            // движение вниз
            x = lastSection.x;
            if (lastSection.dataset.y == 10) {
                y = '1';
            }
            else {
                y = parseInt(y) + 1;
            }
        }
        const nextSection = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
        console.log(nextSection);
    }

    step() {
        const lastSection = this.sections[this.sections.length - 1];

    }

    eat() {
        // Действие при встрече с яблоком

    }

    render() {
        // Обновление изображения змейки согласно новым данным
        const oldSections = document.querySelectorAll('.snake__section');
        for (let element of oldSections) {
            
            element.classList.remove('snake__section');
        }
        console.log(oldSections);
        for (let i = 0; i < this.sections.length; i++) {
            this.sections[i].render();
        }
    }
}


class Section {
    x = ""
    y = ""
    cssClassName = ""

    constructor (x, y, cssClassName) {
        this.x = x;
        this.y = y;
        this.cssClassName = cssClassName;
    }

    render() {
        const element = document.querySelector(`[data-x="${this.x}"][data-y="${this.y}"]`);
        element.classList.add(this.cssClassName);
    }
}

class Apple extends Section{
    constructor() {
        const x = getRandomInt(1, 11);
        const y = getRandomInt(1, 11);
        const cssClassName = "apple";
        super(x, y, cssClassName);
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
  }


const apple = new Apple();

apple.render();