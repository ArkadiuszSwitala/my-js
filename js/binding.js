function Data(dataObj) {
    this.dataObject = {}
    this.dataElements = {}
    this.classElements = {}
    this.prepareData = function (){
        for(let prop in dataObj){
            this.dataObject[`_${prop}`] = dataObj[prop]
        }
    }
    this.getElementsByAttribute = function (element, attribute, targetObject) {
        if (element.hasAttribute(attribute)) {
            let keyValueArr = element.getAttribute(attribute).split(':').map(item => item.trim())
            if (!this.dataObject.hasOwnProperty(`_${keyValueArr[1]}`)) {
                return
            }

            if (!targetObject.hasOwnProperty(`_${keyValueArr[1]}`)) {
                targetObject[`_${keyValueArr[1]}`] = []
            }

            targetObject[`_${keyValueArr[1]}`].push({
                element: element,
                property: keyValueArr[0]
            })
        }
    }
    this.updateDom = function (key){
        if (this.dataElements.hasOwnProperty(key)) {
            for (let item in this.dataElements[key]) {
                this.dataElements[key][item].element[this.dataElements[key][item].property] = this.dataObject[key]
            }
        }
        if (this.classElements.hasOwnProperty(key)) {
            for (let item in this.classElements[key]) {
                let el = this.classElements[key][item]
                el.element.classList.toggle(el.property, this.dataObject[key])
            }
        }
    }

    this.prepareData()

    let allElements = document.querySelectorAll('*')

    allElements.forEach(element => {
        this.getElementsByAttribute(element, 'data-bind', this.dataElements);
        this.getElementsByAttribute(element, 'class-bind', this.classElements);
    });

    for (let key in this.dataObject) {
        if (this.dataObject.hasOwnProperty(key)) {
 
        this.updateDom(key)
            Object.defineProperty(this.dataObject, key.substr(1), {
                set: (v) => {
                    this.dataObject[key] = v
                    this.updateDom(key)
                },
                get: () => {
                    return this.dataObject[key]
                }
            });
        }
    }
    
    return this.dataObject
}