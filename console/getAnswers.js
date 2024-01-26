// Select the script tag
let scriptTag = document.querySelector('script[type="application/json"]');

// Get the content of the script tag
let jsonString = scriptTag.innerHTML;

// Parse the JSON string into a JavaScript object
let obj = JSON.parse(jsonString);

// Access the dailyQuestions array
let dailyQuestions = obj.props.pageProps.dailyQuestions;

for(var i=0;i<dailyQuestions.length;i++) {
  //Get the current question
  let q = dailyQuestions[i];
  
  //Get all answer objects
  let as = q.answers;
  let ast = [];

  //Push each answertext of answer object into an array
  for(var j=0;j<as.length;j++) {
    ast.push(" "+as[j].answerText);
  }

  //Log the name and answer
  console.log(q.questionCategory.name + ":" + ast);
}
