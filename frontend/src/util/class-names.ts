export type TClassNames = {
	[className: string]: boolean;
};

export const getClassNames = (classNames: TClassNames) =>
	Object.keys(classNames)
		.filter(key => classNames[key])
		.join(' ');
