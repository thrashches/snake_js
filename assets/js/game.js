startBtn.addEventListener('click', () => {
    document.getElementById('preStart').remove();
    const snake = new Snake();
    const intevalId = setInterval(() => { snake.step() }, 1000);
    document.addEventListener('keyup', (event) => {
        if (event.code == 'ArrowUp') {
            snake.setCommand('up');
        }
        else if (event.code == 'ArrowDown') {
            snake.setCommand('down');
        }
        else if (event.code == 'ArrowLeft') {
            snake.setCommand('left');
        }
        else if (event.code == 'ArrowRight') {
            snake.setCommand('right');
        }
    })
})

const area = document.getElementsByClassName('game-area__item');

class Snake {
    // Класс змейки
    sections = [] // Секции из которых состоит змейка(должны быть объектами Section)
    nextStep = {} // Координаты следующей клетки
    command = 'down'

    constructor() {
        // this.sections.push()
        for (let i = 5; i <= 7; i++) {
            const section = new Section(5, i, 'snake__section');
            this.sections.push(section);
        }
        this.render();

        // const int = setInterval(this.step(), 500);
    }

    stop() {

    }

    setCommand(value) {
        if (value != this.command) {
            this.command = value;
        }
    }

    getNextStep() {
        // Метод для получения следующей клетки
        console.log(this.sections);
        const lastSection = this.sections[this.sections.length - 1];
        const prelastSection = this.sections[this.sections.length - 2];
        console.log(lastSection, prelastSection);

        var x = '';
        var y = '';

        
        if (this.command == 'up') {
            x = lastSection.x;
            if (lastSection.y == 1) {
                y = '10'
            }
            else {
                y = parseInt(lastSection.y) - 1;
            }
            console.log('up');
        }
        else if (this.command == 'down') {
            x = lastSection.x;
            if (lastSection.y == 10) {
                y = '1';
            }
            else {
                y = parseInt(lastSection.y) + 1;
            }
            console.log('down');
        }
        else if (this.command == 'left') {
            y = lastSection.y;
            if (lastSection.x == 1) {
                x = '10';
            }
            else {
                x = parseInt(lastSection.x) - 1;
            }
            console.log('left');
        }
        else if (this.command == 'right') {
            y = lastSection.y;
            if (lastSection.x == 10) {
                x = '1'
            }
            else {
                x = parseInt(lastSection.x) + 1;
            }
            console.log('right');
        }

        const nextSection = new Section(x, y, 'snake__section');
        return nextSection
    }

    step() {
        const nextSection = this.getNextStep();
        this.sections.push(nextSection);
        this.sections.shift();
        this.render();
    }



    isAlive() {

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

    constructor(x, y, cssClassName) {
        this.x = x;
        this.y = y;
        this.cssClassName = cssClassName;
    }

    render() {
        const element = document.querySelector(`[data-x="${this.x}"][data-y="${this.y}"]`);
        element.classList.add(this.cssClassName);
    }
}

class Apple extends Section {
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