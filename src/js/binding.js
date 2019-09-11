import _ from 'lodash'
import Data from './data'

export default function() {
    function component() {
        const element = document.createElement('div');
        element.innerHTML = _.join([
            `<h2 class="header" data-bind="innerHTML: header" class-bind="is-open: isOpen"></h2>`,
            `<h3 class="header" data-bind="innerHTML: header"></h3>`,
            `<button onclick="dataUpdate('header')">mod header</button>`,
            `<div class="nav" class-bind="is-open: isOpen">`,
                `<p data-bind="innerText: paragraph"></p>`,
                `<button onclick="dataUpdate('paragraph')">mode parag</button>`,
                `<br><br>`,
                `<input data-bind="value: input" name="text"/>`,
                `<button onclick="dataUpdate('input')">mod input</button>`,
            `</div>`,
            `<button onclick="toggleOpen()">open</button>`
        ], ' ');
        return element;
      }
    
    document.body.appendChild(component());

    let data = new Data({
        header: "<span style='color: red'>Default headeddr</span>",
        paragraph: "Default paragraph",
        input: 34,
        isOpen: false,
        test: false
    })
    
    function dataUpdate(prop) {
        data[prop] = data[prop] + 2
    }
    
    function toggleOpen() {
        data.isOpen = !data.isOpen
    }
    
    window.dataUpdate = dataUpdate
    window.toggleOpen = toggleOpen
}