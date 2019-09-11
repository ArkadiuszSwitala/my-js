function Data(dataObj) {
    let allElements = document.querySelectorAll('*')
    let dataElements = {},
            classElements = {}
    allElements.forEach(element => {
        if (element.hasAttribute('data-bind')) {
            let attValue = element.getAttribute('data-bind')
            let keyValueArr = attValue.split(':').map(item => item.trim())
            if (!dataObj.hasOwnProperty(keyValueArr[1])) {
                return
            }

            if (!dataElements.hasOwnProperty(keyValueArr[1])) {
                dataElements[keyValueArr[1]] = []
            }
            dataElements[keyValueArr[1]].push({
                element: element,
                property: keyValueArr[0]
            })
        }

        if (element.hasAttribute('class-bind')) {
            let attValue = element.getAttribute('class-bind')
            let keyValueArr = attValue.split(':').map(item => item.trim())
            if (!dataObj.hasOwnProperty(keyValueArr[1])) {
                return
            }
            if (!classElements.hasOwnProperty(keyValueArr[1])) {
                classElements[keyValueArr[1]] = []
            }
            classElements[keyValueArr[1]].push({
                element: element,
                className: keyValueArr[0]
            })
        }
    });

    console.log("Data elements: ", dataElements)
    console.log("Class elements: ", classElements)

    for (let key in dataObj) {
        if (dataObj.hasOwnProperty(key)) {
            if (dataElements.hasOwnProperty(key)) {
                for (let item in dataElements[key]) {
                    console.log(dataElements[key][item].element)
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
                            console.log(dataElements[key][item].element)
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