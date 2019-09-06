export const isEmpty = (str: string) => {
	return !str || 0 === str.length;
};

export const containsOnlySpaces = (str: string) => !str.trim().length;

export const isEmptyOrOnlySpaces = (str: string) =>
	isEmpty(str) || containsOnlySpaces(str);
