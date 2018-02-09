$(document).ready(function(){

	//inputs needed to form new question
	let $newQuestionInput = $('#new-q');
	let $newAnswer1 = $('#newQanswer1');
	let $newAnswer2 = $('#newQanswer2');

	//populates current question
	let $currentQuestion = $('#currentQuestion');

	//clicking the buttons
	$(document).on("submit", "#submitQuestion", insertQuestion);

	// initial questions array
	var questions = [];

	// getting things upon initial page load
	getQuestions();

	//functionalities

	// puts current question into currentQuestion section div
	function initialQuestion() { 
		$currentQuestion.empty();
		var displayedQuestion = [];
		for (var i=0; i < questions.length; i++) {
			displayedQuestion.push(questions[i])
		}
		$currentQuestion.prepend(displayedQuestion);
	}

	//grabs current question to database
	function getQuestions() {
		$.get("/api/questions", function(data) {
			questions = data;
			initialQuestion();
		});
	}

	//creates a new row to put in the current question
	function createNewQRow() {
		var $newQuestionRow = $(
			[
			question.text,
			// "<button type='submit' id='option1'>Option 1</button>"
			// "<button type='submit' id='option2'>Option 2</button>"
			].join(""));
		$newQuestionRow.data("question", question);
		return $newQuestionRow
	}

	//submitting a new questions
	function insertQuestion (event) {
		event.preventDefault();
		console.log("submit button clicked!");
		var question = {
			question: $newQuestionInput.val().trim(),
			answer1: $newAnswer1.val().trim(),
			answer2: $newAnswer2.val().trim()
		};
		$.post("/api/questions", NewQuestions, getQuestions);
		//empty out those entry fields
		$newQuestionInput.val("");
		$newAnswer1.val("");
		$newAnswer2.val("");
	}	
})