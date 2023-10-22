document.addEventListener("DOMContentLoaded", function() {
    fetchRandomArticle();
    const result = extractLinkText(htmlString);
    console.log(result);
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
            displayQuestion(title_text, extract_text)
        })
        .catch(error => console.error('Error fetching random article:', error));
}

function displayQuestion(title_text, extract_text) {
    const questionElement = document.getElementById("question");
    document.getElementById("title").textContent = title_text;
    words = extract_text.split(" ");
    var l = words.length;
    var randomNum = Math.floor(Math.random() * l) + 1;
    while (true){
        if (words[randomNum-1].length > 3){
            break;
        } 
        randomNum = Math.floor(Math.random() * l) + 1;
    }

    new_text = replaceNthWordWithUnderscore(extract_text, randomNum);
    answer = words[randomNum - 1]

    document.getElementById("question").innerHTML = new_text;
}

function checkAnswer() {
    console.log(answer)
    var userAnswer = document.getElementById("answer").value;
    if (answer == userAnswer){
        document.getElementById('answer').value = ''
        fetchRandomArticle()
    } else {
        alert("incorrect")
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