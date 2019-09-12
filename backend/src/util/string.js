const isEmpty = str => {
	return !str || 0 === str.length;
};

const containsOnlySpaces = str => !str.trim().length;

const isEmptyOrOnlySpaces = str => isEmpty(str) || containsOnlySpaces(str);

module.exports = { isEmpty, isEmptyOrOnlySpaces };
