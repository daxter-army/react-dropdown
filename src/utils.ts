// Function to match the given value with any value present in the array.
export const valueMatcher = (value: string, valueArr: {
	id: number,
	label: string;
}[]) => {
	let isValuePresent: (boolean | number) = false

	for (let i = 0; i < valueArr.length; i++) {
		if (valueArr[i].label.toLowerCase() === value.toLowerCase()) {
			isValuePresent = i
			break
		}
	}

	return isValuePresent
}