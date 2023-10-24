var currentScore;
var currentMove = 0;
document.addEventListener("DOMContentLoaded", function() {
    fetchRandomArticle();
    console.log(result);
    currentScore = 0;
    currentMove = 0;
});
var answer;

function fetchRandomArticle() {
    // Use cors-anywhere to bypass CORS restriction.
    //const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
    //const timestamp = new Date().getTime();
    const apiUrl = 'https://en.wikipedia.org/api/rest_v1/page/random/summary'

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const title_text = data['title'];
            const extract_text = data['extract'];
            console.log(title_text, extract_text);
            displayQuestion(title_text, extract_text, data['thumbnail']['source'])
        })
        .catch(error => console.error('Error fetching random article:', error));
}

// function fetchChosenArticle(title) {
//     // Use cors-anywhere to bypass CORS restriction.
//     //const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
//     //const timestamp = new Date().getTime();
//     const apiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + title

//     fetch(apiUrl)
//         .then(response => response.json())
//         .then(data => {
//             const title_text = data['title'];
//             const extract_text = data['extract'];
//             console.log(title_text, extract_text);
//             displayQuestion(title_text, extract_text)
//         })
//         .catch(error => fetchRandomArticle());
// }

function displayQuestion(title_text, extract_text, img_src) {
    const questionElement = document.getElementById("question");
    document.getElementById("title").textContent = title_text;
    var imgElement = document.createElement("img");
    imgElement.src = img_src;
    imgElement.style.maxHeight = "300px";
    document.getElementById("image_holder").appendChild(imgElement);

    words = extract_text.split(" ");
    var l = words.length;
    var randomNum = Math.floor(Math.random() * l) + 1;
    while (true){
        if (randomNum-1 > title_text.split(" ").length){
            if (words[randomNum-1].length > 3){
                break;
            } 
        }
        randomNum = Math.floor(Math.random() * l) + 1;
    }

    new_text = replaceNthWordWithUnderscore(extract_text, randomNum);
    answer = stripPunctuation(words[randomNum - 1])
    console.log(answer)

    document.getElementById("question").innerHTML = new_text;
}

function stripPunctuation(str) {
    return str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
}

function checkAnswer() {
    console.log(answer)
    var userAnswer = document.getElementById("answer").value;
    if (answer.toLowerCase() == userAnswer.toLowerCase()){
        document.getElementById('answer').value = '';
        document.getElementById('score').textContent = parseInt(document.getElementById('score').textContent) + 1
        document.getElementById("image_holder").innerHTML = '';
        fetchRandomArticle()
    } else {
        document.getElementById('answer').value = ''
        //document.getElementById('score').textContent = parseInt(document.getElementById('score').textContent) - 1
        //fetchChosenArticle(answer)
        var q_holder = document.getElementById("question")
        shakeElement(q_holder)
        document.getElementById('correct').textContent = "Correct answer: " + answer;
        setTimeout(() => {
            document.getElementById("image_holder").innerHTML = '';
            document.getElementById('correct').textContent = "";
            fetchRandomArticle()
          }, 750);
    }
    if (currentMove == 5){
        alert("Final score: " + document.getElementById('score').textContent)
        location.reload()
    } else {
        currentMove++;
    }

}

function replaceNthWordWithUnderscore(sentence, n) {
    const words = sentence.split(' ');

    if (n <= 0 || n > words.length) {
        // Invalid value of n, return the original sentence
        return sentence;
    }

    // Replace the nth word with an underscore
    words[n - 1] = '_____';

    // Join the words back into a sentence
    const modifiedSentence = words.join(' ');

    return modifiedSentence;
}

function shakeElement(element) {
    element.style.animation = 'shake 0.75s';
    
    // Remove the animation after it's completed
    setTimeout(() => {
      element.style.animation = '';
    }, 750);
  }
  