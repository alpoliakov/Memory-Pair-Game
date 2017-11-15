class Game {
    constructor(elem, count, countCards, buttonElem) {
        this.elem = elem;
        this.steps = count;
        this.countCards = countCards;
        this.elemSteps = document.body.querySelector('.score');
        this.elemSteps.innerHTML = 0;

        this.buttonElem = buttonElem;
        this.buttonElem.innerHTML = 'Clear and restart';

        this.timeCheckPoint = true;
        this.arrCheckCards = [];

        this.flipElem = this.flipElem.bind(this);
        this.elem.addEventListener('click', this.flipElem);
    }

    flipElem(evt) {
        evt.preventDefault();
        this.el = evt.target;
        if (!this.el.classList.contains('front')) return;

        if (!this.timeCheckPoint) return;
        this.timeCheckPoint = false;
        setTimeout(() => this.timeCheckPoint = true, 500);

        this.el.parentNode.classList.toggle('flipped');
        this.arrCheckCards.push(this.el.parentNode);

        this.steps += 1;
        this.elemSteps.innerHTML = this.steps;

        if (this.arrCheckCards.length > 1) {
            if (this.arrCheckCards[0].dataset.name === this.arrCheckCards[1].dataset.name) {
                this.countCards -= 2;
                setTimeout(() => {
                   for (let count = 0; count < 2; count += 1) {
                       this.arrCheckCards[count].remove();
                   }
                   this.arrCheckCards = [];
               }, 500)
            }

            if (this.arrCheckCards.length > 2) {
                for (let count = 0; count < 2; count += 1) {
                    this.arrCheckCards[count].classList.toggle('flipped');
                }

                this.arrCheckCards.splice(0, 2);
            }
        }

        if (this.countCards === 0) {
            setTimeout(() => alert('You Win!'), 1000);
            setTimeout(() => this.elem.remove(), 1500);

            this.buttonElem.innerHTML = 'Start the game again?';
        }
    }
}

const initialGame = (parenElem, count, countCards) => {
    const buttonElem = document.querySelector('.start__button');
    return new Game(parenElem, count, countCards, buttonElem);
};


class BuildPlayingField {
    constructor({elem, classButton, fieldParent, countSteps, elemSteps, arrayAttributes}) {
        this.elem = elem;
        this.classButton = classButton;
        this.fieldParent = fieldParent;
        this.countSteps = countSteps;
        this.elemSteps = elemSteps;
        this.arrAttr = arrayAttributes;
        this.countCards = this.arrAttr.length;

        this.beginGame = this.beginGame.bind(this);
        this.elem.addEventListener('click', this.beginGame);
    }

    beginGame(evt) {
        this.el = evt.target;
        if (this.el.className !== this.classButton) return;

        if (this.fieldParent.lastChild) {
            this.fieldParent.remove();
            this.fieldParent = document.createElement('div');
            this.fieldParent.classList.add('playing__field');
            document.querySelector('.content').append(this.fieldParent);
            this.countSteps = 0;
        }

        this.arrAttr.sort(function() { return 0.5 - Math.random() });
        let template = ``;
        for (let count = 0; count < this.arrAttr.length; count++) {
            template += `<section class="container__flip">
                            <div class="card" data-name=${this.arrAttr[count].dataset}>
                                <div class="front"></div> 
                                <div class="back">
                                    <img src=${this.arrAttr[count].path}>
                                </div>                                                          
                             </div>
                        </section>`;
        }
        this.fieldParent.insertAdjacentHTML(`afterBegin`, template);
        document.body.querySelector('.text__score').hidden = false;

        initialGame(this.fieldParent, this.countSteps, this.countCards, this.buttonElem);
    }

}

const initialTask = () => {
    const value = {
        elem: document.querySelector('.content'),
        classButton: 'start__button',
        fieldParent: document.querySelector('.playing__field'),
        countSteps: 0,
        arrayAttributes: [
            {dataset: "linux", path: "img/linux.svg"},
            {dataset: "linux", path: "img/linux.svg"},
            {dataset: "google", path: "img/google.svg"},
            {dataset: "google", path: "img/google.svg"},
            {dataset: "html5", path: "img/html5.svg"},
            {dataset: "html5", path: "img/html5.svg"},
            {dataset: "firefox", path: "img/firefox.svg"},
            {dataset: "firefox", path: "img/firefox.svg"},
            {dataset: "apple", path: "img/apple.svg"},
            {dataset: "apple", path: "img/apple.svg"},
            {dataset: "vue", path: "img/vue.svg"},
            {dataset: "vue", path: "img/vue.svg"},
            {dataset: "webpack", path: "img/webpack.svg"},
            {dataset: "webpack", path: "img/webpack.svg"},
            {dataset: "github", path: "img/github.svg"},
            {dataset: "github", path: "img/github.svg"}
        ]
    };

    return new BuildPlayingField(value);
};

initialTask();
