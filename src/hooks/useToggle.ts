import { useState } from 'react';

const useToggle = (initialValue = false) => {
	const [isOn, setIsOn] = useState(initialValue);

	const toggleHandler = () => setIsOn((prev) => !prev);

	return { toggleHandler, isOn };
};

export default useToggle;
