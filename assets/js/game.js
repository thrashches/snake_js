startBtn.addEventListener('click', () => {
    // Нажатие кнопи старт
    document.getElementById('preStart').remove();
    const apple = new Apple();

    apple.render();

    const snake = new Snake();


    const intevalId = setInterval(() => {
        // Запуск змейки
        snake.step();
        if (apple.x == snake.head().x && apple.y == snake.head().y) {
            snake.eat();
            apple.reinit();
        }
    }, 200);
    document.addEventListener('keyup', (event) => {
        // Нажатие стрелок
        event.preventDefault();
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
    score = 3

    constructor() {
        // this.sections.push()
        for (let i = 5; i <= 7; i++) {
            const section = new Section(5, i, 'snake__section');
            this.sections.push(section);
        }
        this.render();

        // const int = setInterval(this.step(), 500);
    }

    head() {
        // Возвращает координаты головы
        const headSection = this.sections[this.sections.length - 1];
        return { x: headSection.x, y: headSection.y }
    }

    setCommand(value) {
        // Проверяет и устанавливает направление движения
        if (!((value == 'up' && this.command == 'down')
            || (value == 'down' && this.command == 'up')
            || (value == 'left' && this.command == 'right')
            || (value == 'right' && this.command == 'left'))) {
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

        // Проверка последней команды от пользователя
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
        // Сделать шаг или умереть
        if (this.sections.length) {
            const nextSection = this.getNextStep();
            if (this.checkTail(nextSection.x, nextSection.y)) {
                this.die();
            }
            else {
                this.sections.push(nextSection);
                this.sections.shift();
                this.render();
            }
        }

    }

    checkTail(x, y) {
        // Проверка что мы не уперлись в хвост
        for (let i = 0; i <= this.sections.length; i++) {
            console.log(this.sections[i]);
            console.log(x);
            console.log(y);
            if (this.sections[i].x == x && this.sections[i].y == y) {
                return true;
            }
            else {
                return false;
            }
        }
    }

    die() {
        console.log('die');
        const snakeSections = document.querySelectorAll('.snake__section');
        for (let element of snakeSections) {

            element.classList.remove('snake__section');
        }
        this.sections = [];
        return this.score
    }

    eat() {
        // Действие при встрече с яблоком
        const nextSection = this.getNextStep();
        this.sections.push(nextSection);
        this.render();
        this.score += 1;
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
    reinit() {
        const element = document.querySelector('.apple');
        element.classList.remove('apple');
        this.x = getRandomInt(1, 11);
        this.y = getRandomInt(1, 11);
        this.render();
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}


