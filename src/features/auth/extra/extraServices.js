// reset Password
// forgot Password
// verify Email via OTP

// set user Details for the user prompt and everything else
const setUserPrompt = (prompt) => {
	// setup here the prompt being sent to backend for using with the gpt replys
	localStorage.setItem('userDetails', JSON.stringify(prompt));
};

const extraServices = {
	setUserPrompt,
};

export default extraServices;
