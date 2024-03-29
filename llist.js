function Node (value) {
    this.value = value;
    this.next = null;
}

function LList () {
    let root = null;
    let size = 0;

    this.push = value => {
        const node = new Node(value);

        if (!root) {
            root = node;
        } else {
            let tempNode = root;

            while (tempNode.next) {
                tempNode = tempNode.next;
            }

            tempNode.next = node;
        }

        size++;
        return this.getSize();
    };

    this.init = array => {

        if (!array) {
            throw new Error("Invalid initialization!");
        }

        for (let i = 0; i < array.length; i++) {
            this.push(array[i]);
        }

    };

    this.getArray = () => {
        let array = [];
        let temp = root;

        for (let i = 0; i < this.getSize(); i++) {

            if(temp){
                array[i] = temp.value;
                temp = temp.next;
            }

        }

        return array;
    };

    this.getSize = () => {
        return size;
    };

    this.toString = () => {
        let string = '"[';
        let temp = root;
        for (let i = 0; i < this.getSize(); i++) {

            if (temp.next && i !== this.getSize() - 1) {
                string += temp.value;
                temp = temp.next;
                string += ', ';
            } else {
                string += temp.value + ']"';
            }
            console.log(string);
        }

        return string;
    };

    this.pop = () => {
        let temp = root;
        let beforeElem = temp;
        let returnTemp;

        for (let i = 0; i < this.getSize(); i++) {

            if (temp.next) {
                beforeElem = temp;
                temp = temp.next;
            } else {
                beforeElem.next = null;
                returnTemp = temp.value;
                size--;
            }

        }

        return returnTemp;
    };

    this.shift = () => {
        if (this.getSize() !== 0 ) {
            let temp = root;
            root = temp.next;
            size--;
            return temp.value;
        }
    };

    this.unshift = value => {
        let node = new Node(value);
        let temp = root;
        node.next = temp;
        root = node;
        size++;
        return this.getSize();
    };

    this.slice = (startIndex, finishIndex) => {

        if (this.getSize() === 0 || startIndex < 0 ) {
            return this.getArray();
        }

        if (startIndex > this.getSize()) {
            return [];
        }

        if (finishIndex < startIndex) {
            return [];
        }

        let start = startIndex;
        let finish = finishIndex;
        let array = [];
        let count = 0;
        let temp = root;

        if(!startIndex && startIndex !== 0) {
            start = 0;
        }

        if ((!finishIndex && finishIndex !== 0) || finishIndex > this.getSize()) {
            finish = this.getSize();
        }

        for (let i = 0; i < finish; i++) {

            if (i === start) {
                array[count] = temp.value;
                count++;
                start++;
            }

            temp = temp.next;
        }

        return array;
    };

    this.splice = (startIndex, amountDelete, ...insertElem) => {
        let definedStartIndex = 0;//переменая для обработанного от ошибок начального индекса
        let definedAmountDeleted = 0;// переменная для обработанного от ошибок количества удалений
        let definedInsertElem = [];// переменная для обработанного от ошибок массива вставленных елементов
        let spliceArray = [];//возвращаемый массив вырезанных елементов
        let tempSize = 0;//перемменная для счета новой длинны root
        //---------------------------------------------------------обработка ошибок ввода
        if (!startIndex) {
            definedStartIndex = 0;
        } else if (!!Number(startIndex)) {

            if (startIndex > this.getSize()) {
                definedStartIndex = this.getSize();
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
        //----------------------------------------------------------обработка закончена
        spliceArray = this.slice(definedStartIndex,definedStartIndex + definedAmountDeleted);

        let curIndex = 0;
        let temp = root;

        while (curIndex < definedStartIndex) {//веду указатель до места удаления елементов
            curIndex++;
            temp = temp.next;
        }

        let afterSplicedTemp = temp;

        while (curIndex < definedStartIndex + definedAmountDeleted && afterSplicedTemp) {//веду указатель до конца удаленных елементов
            curIndex++;
            afterSplicedTemp = afterSplicedTemp.next;
        }

        let tempAfterSplicedTemp = afterSplicedTemp;

        while (tempAfterSplicedTemp) {
            tempAfterSplicedTemp = tempAfterSplicedTemp.next;
            tempSize++;
        }

        let tempRoot = null;

        for (let i = 0; i < definedInsertElem.length; i++ ) {//в новую ечейку записываю елементы которые нужно вставить
            const node = new Node(definedInsertElem[i]);

            if (!tempRoot) {
                tempRoot = node;
            } else {
                let tempNode = tempRoot;

                while (tempNode.next) {
                    tempNode = tempNode.next;
                }

                tempNode.next = node;
            }

            tempSize++;
        }

        for (let i = definedInsertElem.length - 1; i >= 0; i--) {//перед указателем на конец удаленных елементов добавляю вставленные елементы
            let node = new Node(definedInsertElem[i]);
            tempRoot = afterSplicedTemp;
            node.next = tempRoot;
            afterSplicedTemp = node;
            tempSize++;
        }

        let leftPart = this.slice(0, definedStartIndex);

        for (let i = leftPart.length - 1; i >= 0; i--) {// и опять дообваляю неизмененную левуб часть(до удаленных елементов) к тому что получиллось в преведущем цикле
            let node = new Node(leftPart[i]);
            root = afterSplicedTemp;
            node.next = root;
            afterSplicedTemp = node;
            tempSize++;
        }

        size = tempSize;
        root = afterSplicedTemp;

        return spliceArray;
    };

    this.get = index => {
        let temp = root;
        let curIndex = 0;

        if (this.getSize() === 0 ) {
            return;
        } else if (index > this.getSize() || index < 0 ) {
            return;
        } else {

            while (curIndex < index && temp) {
                curIndex++;
                temp = temp.next;
            }

        }

        return temp.value;
    };

    this.set = (index, value) => {
        let temp = root;
        let curIndex = 0;

        if (index > this.getSize() || index < 0) {
            return;
        }

        while (curIndex < index) {
            curIndex++;
            temp = temp.next;
        }

        temp.value = value;
    };

    this.sort = (comparator = sortFunc) => {
        let current = root;

        for (let i = 0; i < this.getSize(); i++) {

            for (let j = 0; j < this.getSize() - 1; j++) {
                let result = comparator(current.value, current.next.value);
                let temp = 0;

                if (result > 0) {
                    temp = current.next.value;
                    current.next.value = current.value;
                    current.value = temp;
                }

                if (current.next) {
                    current = current.next;
                } else {
                    break;
                }

            }

            current = root;
        }

        return root;
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