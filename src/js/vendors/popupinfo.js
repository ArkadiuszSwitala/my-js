export default function popUpInfo() {
    class PopUpInfo extends HTMLElement {
        constructor() {
            super();
            let shadow = this.attachShadow({mode: 'open'});

            let info = document.createElement('span');
            info.setAttribute('class', 'info');

            let text = this.getAttribute('text');
            console.log(this.getAttribute('text'));
            info.textContent = text;

            let style = document.createElement('style');

            style.textContent = '.info {' +
                    'font-size: 0.8rem;' +
                    'width: 200px;' +
                    'display: inline-block;' +
                    'border: 1px solid black;' +
                    'padding: 10px;' +
                    'background: white;' +
                    'color: red;' +
                    'border-radius: 10px;' +
                    'position: absolute;' +
                    'top: 20px;' +
                    'left: 10px;' +
                    'z-index: 3;' +
                    '}';

            // attach the created elements to the shadow dom

            shadow.appendChild(style);
            shadow.appendChild(info);
        }
    }

    customElements.define('popup-info', PopUpInfo);
}