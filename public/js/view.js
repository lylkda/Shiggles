$(document).ready(function(){

	//inputs needed to form new question
	let $newQuestionInput = $('input.new-q');
	let $newAnswer1 = $('newQanswer1');
	let $newAnswer2 = $('newQanswer2');

	//populates current question
	let $currentQuestion = $('#currentQuestion');

	//clicking the buttons
	$(document).on("click", "#submitQuestion", insertQuestion);

	//functionalities

	//submitting a new questions
	function insertQuestion (event) {
		event.preventDefault();
		console.log("submit button clicked!");
		var question = {
			question: $newQuestionInput.val().trim(),
			answer1: $newAnswer1.val().trim(),
			answer2: $newAnswer2.val().trim()
		};
		$.post("/api/questions", question);
		//empty out those entry fields
		$newQuestionInput.val("");
		$newAnswer1.val("");
		$newAnswer2.val("");
	}	
})