function getAnswers() {
  let ans = [];
  // Select the script tag
  let scriptTag = document.querySelector('script[type="application/json"]');

  // Get the content of the script tag
  let jsonString = scriptTag.innerHTML;

  // Parse the JSON string into a JavaScript object
  let obj = JSON.parse(jsonString);

  // Access the dailyQuestions array
  let dailyQuestions = obj.props.pageProps.dailyQuestions;

  for (var i = 0; i < dailyQuestions.length; i++) {
    //Get the current question
    let q = dailyQuestions[i];

    //Get all answer objects
    let as = q.answers;
    let ast = [];

    //Push each answertext of answer object into an array
    for (var j = 0; j < as.length; j++) {
      ast.push(" " + as[j].answerText);
    }

    //Log the name and answer
    console.log(q.questionCategory.name + ":" + ast);
    ans.push(ast[0].trim());
  }
  console.log(ans);
  return ans;
}
let answers = getAnswers();


function clickAnswer(ansText) {
  // Select all li elements whose id starts with 'cmd-palette-answer'
  let lis = Array.from(document.querySelectorAll('[id^="cmd-palette-answer"]'));

  for (let li of lis) {
    // Find the span within the li
    let span = li.querySelector('span');

    // Check if the innerHTML of the span equals ansText
    if (span && span.innerHTML === ansText) {
      // Find the button within the li and simulate a click
      let button = li.querySelector('button');
      if (button) {
        button.click();
      }
    }
  }
}

for (let i = 1; i < 10; i++) {
  let element = document.getElementById("grid-card-cell-" + i);
  console.log(answers[i]);

  if (element) {
    element.addEventListener("click", function (e) {
      setTimeout(() => {
        const cmdPaletteInput = document.getElementById('cmd-palette-input');
        cmdPaletteInput.value = answers[i - 1];
        cmdPaletteInput.dispatchEvent(new Event('change', { bubbles: true }));

        setTimeout(() => {
          var inputElement = document.getElementById('cmd-palette-input');

          // Create a new keyboard event with the provided data
          var event = new KeyboardEvent('keyup', {
            isTrusted: true,
            key: 'e',
            code: 'KeyE',
            location: 0,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            repeat: false,
            keyCode: 69,
            charCode: 0,
            bubbles: true,
            cancelable: true,
            composed: true,
            view: window,
            which: 69,
          });

          // Dispatch the event
          inputElement.dispatchEvent(event);
          inputElement.value += event.key;
          
          function doThing(e) {
            if (e.key == "Backspace") {
              setTimeout(() => { clickAnswer(answers[i - 1]); }, 700);
              inputElement.removeEventListener('keydown', doThing);
            }
          }

          inputElement.addEventListener('keydown', doThing);
        }, 500);
      }, 500);
    }, 500);
  }
}
