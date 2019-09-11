function Data(dataObj) {
    this.dataObject = dataObj
    this.dataElements = {}
    this.classElements = {}

    let allElements = document.querySelectorAll('*')

    allElements.forEach(element => {

        this.getElementsByAttribute(element, 'data-bind', this.dataElements);
        this.getElementsByAttribute(element, 'class-bind', this.classElements);

        // if (element.hasAttribute('data-bind')) {
        //     let attValue = element.getAttribute('data-bind')
        //     let keyValueArr = attValue.split(':').map(item => item.trim())
        //     if (!dataObj.hasOwnProperty(keyValueArr[1])) {
        //         return
        //     }
        //
        //     if (!dataElements.hasOwnProperty(keyValueArr[1])) {
        //         dataElements[keyValueArr[1]] = []
        //     }
        //     dataElements[keyValueArr[1]].push({
        //         element: element,
        //         property: keyValueArr[0]
        //     })
        // }
        //
        // if (element.hasAttribute('class-bind')) {
        //     let attValue = element.getAttribute('class-bind')
        //     let keyValueArr = attValue.split(':').map(item => item.trim())
        //     if (!dataObj.hasOwnProperty(keyValueArr[1])) {
        //         return
        //     }
        //     if (!this.classElements.hasOwnProperty(keyValueArr[1])) {
        //         classElements[keyValueArr[1]] = []
        //     }
        //     classElements[keyValueArr[1]].push({
        //         element: element,
        //         className: keyValueArr[0]
        //     })
        // }
    });

    this.getElementsByAttribute = function (element, attribute, targetObject) {
        if (element.hasAttribute(attribute)) {
            let keyValueArr = element.getAttribute(attribute).split(':').map(item => item.trim())
            if (!dataObj.hasOwnProperty(keyValueArr[1])) {
                return
            }

            if (!targetObject.hasOwnProperty(keyValueArr[1])) {
                targetObject[keyValueArr[1]] = []
            }
            targetObject[keyValueArr[1]].push({
                element: element,
                property: keyValueArr[0]
            })
        }
    }

    console.log("Data elements: ", dataElements)
    console.log("Class elements: ", classElements)

    for (let key in dataObj) {
        if (dataObj.hasOwnProperty(key)) {
            if (dataElements.hasOwnProperty(key)) {
                for (let item in dataElements[key]) {
                    dataElements[key][item].element[dataElements[key][item].property] = dataObj[key]
                }
            }
            if (classElements.hasOwnProperty(key)) {
                for (let item in classElements[key]) {
                    let el = classElements[key][item]
                    el.element.classList.toggle(el.className, dataObj[key])
                }
            }
            Object.defineProperty(dataObj, `_${key}`, {
                set: function (v) {
                    dataObj[key] = v
                    if (dataElements.hasOwnProperty(key)) {
                        for (let item in dataElements[key]) {
                            dataElements[key][item].element[dataElements[key][item].property] = dataObj[key]
                        }
                    }

                    if (classElements.hasOwnProperty(key)) {
                        for (let item in classElements[key]) {
                            let el = classElements[key][item]
                            el.element.classList.toggle(el.className, dataObj[key])
                        }
                    }
                }
            });
        }
    }

    return dataObj
}