let hackerNewsURL = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"; //URL to Hackernews Database
let hackerNewsURLItem = function(id){`https://news.ycombinator.com/item?id=${id}`} ; //URL to Hackernews Item
let responseArray;
let response = []; //grabs initial array gathred from XML data
let responseURLObject = []; //stores the data objects from second XML response. allows for further dynamic rendering
let numberOfResponses = 0;
let articleIndex = 0
let XMLResponse;

document.querySelector(".loadContent").addEventListener("click", loadMoreArticle);


// allows for XHTTP requests to be made for each value in the initial response array
function apiRequest(url) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      XMLResponse = this.responseText;
      let objectResponse = JSON.parse(XMLResponse);
      responseURLObject.push(objectResponse);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

// Creating the onscreen objects
function displayObjects(numberOfResponses) {
  for (let i = articleIndex; i < numberOfResponses; i++) {
    let data = responseURLObject[i];
    var commentLength;

    // Creating and Referencing DOM elements
    let articleHTML = document.createElement("div");
    let articleListContent = document.createElement("div");

    // List Counter
    let articleListCounter = document.createElement("div");
    articleListCounter.setAttribute("class", "list-counter");
    var spanCount = document.createElement("span");
    spanCount.setAttribute("class", "list-value");
    spanCount.innerHTML = i + 1 + ". ";
    articleListCounter.appendChild(spanCount);

    var dataVoter = document.createElement("div");
    dataVoter.setAttribute("class", "list-voter");
    var voteIcon = document.createElement("i");
    voteIcon.setAttribute("class", "ion-arrow-up-b");
    dataVoter.appendChild(voteIcon);

    // Object Title
    let articleListTitle = document.createElement("a");
    articleListContent.setAttribute("class", "list-title");
    articleListTitle.setAttribute("href", data.url);
    articleListTitle.setAttribute("class", "link");
    articleListTitle.innerHTML = data.title;
    articleListContent.appendChild(articleListTitle);

    // Object SubTitle
    let articleListSubTitle = document.createElement("div");
    articleListSubTitle.setAttribute("class", "list-subTitle");
    let articleCommentLink = document.createElement("a");
    articleCommentLink.setAttribute("href","https://news.ycombinator.com/item?id="+data.id);
    articleCommentLink.setAttribute("class","link");
    articleCommentLink.innerHTML = commentLength + " comments";

    // Calculating the hours
    let currentTime = new Date(Date.now());
    let currentHour = currentTime.getHours();
    let articleTime = new Date(data.time * 1000);
    let articleHour = articleTime.getHours();
    let hoursAgo = currentHour - articleHour;

    articleListSubTitle.innerHTML = "by: " + data.by + " " + hoursAgo + " hours ago | hide  " 
    articleListSubTitle.appendChild(articleCommentLink);

    // List Content Div
    articleListContent.setAttribute("class", "list-content");
    articleListContent.appendChild(articleListTitle);
    articleListContent.appendChild(articleListSubTitle);

    // List Item
    articleHTML.setAttribute("class", "list-item");
    articleHTML.appendChild(articleListCounter);
    articleHTML.appendChild(dataVoter);
    articleHTML.appendChild(articleListContent);

    let articleList = document.querySelector(".content-list");
    articleList.appendChild(articleHTML);
  }
}

function loadMoreArticle(){
  numberOfResponses += 30
  displayObjects(numberOfResponses)
  articleIndex += 30
}

window.onload = function(){
  // Grabs the information from the HackerNews database on the page load
  (function onLoadArticles() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        XMLResponse = this.responseText;
        response = JSON.parse("[" + XMLResponse + "]");
        responseArray = response[0];
        for (var i = 0; i < response[0].length; i++) {
          const article = `https://hacker-news.firebaseio.com/v0/item/${
            responseArray[i]
          }.json?print=pretty`;
          apiRequest(article)
        }
        return responseArray;
        return responseURL;
      } 
    };
    xhttp.open("GET", hackerNewsURL, true);
    xhttp.send();
  }
  )();
}

