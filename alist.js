function AList () {
    let array = [];

    this.init = arr => {

        if (!arr  && !Array.isArray(arr)) {
            array = [];
        } else {

            for (let i = 0; i < arr.length; i++) {
                array[i] = arr[i];
            }

        }
    };

    this.getArray = () => {
        return array;
    };

    this.toString = () => {
        let string = '"[';

        for (let i = 0; i < array.length; i++) {
            string += `${array[i]}`;
            if (i !== array.length - 1) {
                string += ', ';
            }
        }

        string += ']"';

        return string;
    };

    this.getSize = () => {
        let size = 0;

        for (let i = 0; i < array.length; i++) {
            size++;
        }

        return size;
    };

    this.push = elem => {

        if (elem !== undefined) {
            array[this.getSize()] = elem;
        }

        return this.getSize();
    };

    this.pop = () => {
        let lastElem = array[this.getSize() - 1];

        if (this.getSize() === 0) {
            lastElem = undefined;
        } else {
            array.length = this.getSize() - 1;
        }

        return lastElem;
    };

    this.shift = () => {
        let firstElem = array[0];

        if (this.getSize() === 0) {
            firstElem = undefined;
        } else {

            for (let i = 0; i < this.getSize() - 1; i++) {
                array[i] = array[i + 1];
            }

            array.length = this.getSize() - 1;
        }

        return firstElem;
    };

    this.unshift = elem => {

        if (elem !== undefined) {

            for (let i = this.getSize(); i > 0; i--) {
                array[i] = array[i - 1];
            }

            array[0] = elem;
        }

        return this.getSize();
    };

    this.slice = (startIndex, finishIndex) => {
        let newArray = [];

        if(!startIndex && startIndex !== 0) {
            return array;
        }

        if (!finishIndex && finishIndex !== 0) {

            for (let i = 0; i < this.getSize() - startIndex; i++) {
                newArray[i] = array[i + startIndex];
            }

        } else if (startIndex > finishIndex){
            return [];
        } else {

            if (finishIndex > this.getSize()) {
                finishIndex = this.getSize();
            }

            for (let i = 0, j = startIndex; i < this.getSize(), j < finishIndex; i++, j++) {
                newArray[i] = array[j];
            }

        }

        return newArray;
    };

    this.splice = (startIndex, amountDelete, ...insertElem) => {
        let definedStartIndex = 0;
        let definedAmountDeleted = 0;
        let definedInsertElem = [];
        let spliceArray = [];

        if (!startIndex) {
            definedStartIndex = 0;
        } else if (!!Number(startIndex)) {

            if (startIndex > this.getSize()) {
                definedStartIndex = this.getSize();
            } else if (startIndex < -this.getSize()) {
                definedStartIndex = 0;
            } else {
                definedStartIndex = parseInt(startIndex);
            }

        } else {
            return spliceArray;
        }

        if (!amountDelete || amountDelete <= 0) {
            definedAmountDeleted = 0;
        } else if (!!Number(amountDelete)) {
            definedAmountDeleted = parseInt(amountDelete);
        } else {
            definedAmountDeleted = 0;
        }

        if (!insertElem) {
            definedInsertElem = null;
        } else {

            for (let i = 0; i < insertElem.length; i++) {
                definedInsertElem[i] = insertElem[i];
            }

        }

        spliceArray = this.slice(definedStartIndex,definedStartIndex + definedAmountDeleted);

        let leftPart = this.slice(0, definedStartIndex);

        let rightPart = this.slice(definedStartIndex + definedAmountDeleted );

        array = [...leftPart, ...definedInsertElem, ...rightPart];

        return spliceArray;
    };

    this.sort = (comparator = sortFunc) => {

        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length - i - 1; j++){
                if (comparator(array[j], array[j + 1]) === 1) { //ascending
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }

        return array;
    };

    this.get = index => {
        return array[index];
    };

    this.set = (index, elem) => {

        if (index < 0 || index >= this.getSize()) {
            throw new Error("Index out of array!");
        } else {
            array[index] = elem;
        }

    };
}

const sortFunc = (first, second) => {

    if(first > second) {
        return 1;
    } else if (first === second) {
        return 0;
    } else {
        return -1;
    }

};