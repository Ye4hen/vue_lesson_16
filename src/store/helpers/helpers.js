export function isCorrespondToFilter(driver, filterObj) {
	for (const props in filterObj) {
		if (props === 'expFrom' && filterObj[props] && driver.experience <= filterObj[props]) {
			return false;
		} else if (props === 'expTo' && filterObj[props] && driver.experience >= filterObj[props]) {
			return false;
		} else if (filterObj[props] && driver[props] && !driver[props].toString().toLowerCase().includes(filterObj[props].toString().toLowerCase())) {
			return false;
		}
	}
	return true;
}