function Rule() {
	this.conditionTrueFlag = false;
	this.conditionFalseFlag = false;
	this.equalTo = equalTo;
	this.notEqualTo = notEqualTo;
	this.greaterThan = greaterThan;
	this.greaterThanEqualTo = greaterThanEqualTo;
	this.lessThan = lessThan;
	this.lessThanEqualTo = lessThanEqualTo;
	this.contains = contains;
	this.or = or;
	this.validateRules = validateRules;
}

function binarySearch(array, searchElement) {
	var minIndex = 0;
    var maxIndex = array.length - 1;
    var currentIndex;
    var currentElement;
 
    while (minIndex <= maxIndex) {
        currentIndex = (minIndex + maxIndex) / 2 | 0;
        currentElement = array[currentIndex];
 
        if (currentElement < searchElement) {
            minIndex = currentIndex + 1;
        }
        else if (currentElement > searchElement) {
            maxIndex = currentIndex - 1;
        }
        else {
            return currentIndex;
        }
    }
 
    return -1;
}

function equalTo(input, condition) {
	if (input === condition) {
		this.conditionTrueFlag = true;
	} else {
		this.conditionFalseFlag = true;
	}

	return this;
}

function notEqualTo(input, condition) {
	if (input !== condition) {
		this.conditionTrueFlag = true;
	} else {
		this.conditionFalseFlag = true;
	}

	return this;
}

function greaterThan(input, condition) {
	if (input > condition) {
		this.conditionTrueFlag = true;
	} else {
		this.conditionFalseFlag = true;
	}

	return this;
}

function greaterThanEqualTo(input, condition) {
	if (input >= condition) {
		this.conditionTrueFlag = true;
	} else {
		this.conditionFalseFlag = true;
	}

	return this;
}

function lessThan(input, condition) {
	if (input < condition) {
		this.conditionTrueFlag = true;
	} else {
		this.conditionFalseFlag = true;
	}

	return this;
}

function lessThanEqualTo(input, condition) {
	if (input <= condition) {
		this.conditionTrueFlag = true;
	} else {
		this.conditionFalseFlag = true;
	}

	return this;
}

function contains(input, condition) {
	var findIndex = binarySearch(input, condition);

	if (findIndex !== -1) {
		this.conditionTrueFlag = true;
	} else {
		this.conditionFalseFlag = true;
	}

	return this;
}

function or(object) {
	if (this.conditionTrueFlag && object.conditionTrueFlag) {
		this.conditionTrueFlag = true;
	} else {
		this.conditionFalseFlag = true;
	}

	return this;
}

function validateRules(callback) {
	if (typeof callback === 'function') {
		if (!this.conditionFalseFlag) {
			callback(true, "All rules satisfied");
		} else {
			callback(false, "All rules did not satisfy");
		}
	}
}