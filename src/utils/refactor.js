export const refactorReplyPrompt = (comments) => {
	// console.log(comments);
	if (comments?.length > 2) {
		let userPrompt = JSON.parse(localStorage.getItem('userPrompt'));
		// refactor comments to choose for prompt write an algo for that here
		if (
			userPrompt &&
			userPrompt.replys[0]?.comment.videoId == comments[0].videoId
		) {
			// const arr = [];
			// for (let i = 0; i < 3; i++) {
			// 	// arr.push(comments[i]);
			// 	const obj = {
			// 		id: comments[i].id,
			// 		comment: comments[i],
			// 		replys: '',
			// 		replied: false,
			// 	};
			// 	arr.push(obj);
			// }
			// userPrompt.replys = arr;
			// localStorage.setItem('userPrompt', JSON.stringify(userPrompt));
		} else {
			//
			const arr = [];
			for (let i = 0; i < 3; i++) {
				// arr.push(comments[i]);
				const obj = {
					id: comments[i].id,
					comment: comments[i],
					replys: '',
					replied: false,
				};
				arr.push(obj);
			}
			userPrompt.replys = arr;
			localStorage.setItem('userPrompt', JSON.stringify(userPrompt));
		}
	} else {
		return;
	}
};
