



// INITIALIZING VARIABLES
var url = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
var httpRequest;
var contentListRaw;
var contentListReduced = []

const solution = (S) => {
  let dashPosition = 3
  let array = S.split('')
  let removeSpaceDash = array.filter((item) => { return item !== ' ' }).filter((item) => { return item !== '-'}).filter((item) => { return item !== '-'}).toString()
  let removeCommas = removeSpaceDash.replace(new RegExp(',','g'), '')
  let chunk = (removeCommas, n) =>  {
      let ret = [];
      let i;
      let len;

      for(i = 0, len = removeCommas.length; i < len; i += n) {
         ret.push(removeCommas.substr(i, n))
      }
      return ret
  };

  if (removeCommas.length % 10 !== 0) {
      let phoneNumber = chunk(removeCommas, dashPosition).join('-')
      return phoneNumber
    } else {
      let firstSet = removeCommas.substring(0,6)
      let firstSetFormatted = chunk(firstSet, 3).join('-')
      let secondSet = removeCommas.substring(removeCommas.length - 4)
      let secondSetFormatted = chunk(secondSet, 2).join('-')
      let phoneNumber = `${firstSetFormatted}-${secondSetFormatted}`
      return phoneNumber
    }
}

function contentList(value){
  var string = value.split('')
  var removeSpaceDash = string.filter(function(item){
    return item !== ' '
  }).filter(function(item){
    return item !== '-'
  }).toString()
  var removeCommas = removeSpaceDash.replace(new RegExp(',','g'), '')
  console.log(removeCommas);
}


if (window.XMLHttpRequest) {
  xhr = new XMLHttpRequest()
  console.log(xhr);
  xhr.withCredentials = true
  console.log(xhr);
} else if (window.ActiveXObject) {
  http = newActiveXObject('Microsoft.XMLHTTP')
}

// MAKING INITIAL REQUEST TO HACKERNEWS
function makeRequest() {
  xhr = new XMLHttpRequest();

  if (!xhr) {
    alert('Giving up :( Cannot create an XMLHTTP instance');
    return false;
  }

  xhr.onreadystatechange = alertContents;
  xhr.open('GET', url);
  xhr.send();
}

// RENDERING RESPONSE INFORMATION
function alertContents() {
  try {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        contentListRaw = xhr.response
        contentList(contentListRaw)
        // console.log(contentListRaw);
        console.log(typeof contentListRaw);
        console.log(contentListReduced)
      } else {
        alert('There was a problem with the request.');
      }
    }
  } catch (e) {
    alert('Caught Exception: ' + e.description)
  }
}

setTimeout(function() {
  makeRequest()
  alertContents()
}, 0 )





document.querySelector('.link').addEventListener('click', function(e){
  e.preventDefault()
})



// document.querySelector('.button').addEventListener('click', () => {
//   console.log('clicked')
// })
//
// document.querySelector('.link').addEventListener('click', (e) => {
//   e.preventDefault()
//   httpRequest.open('GET', 'https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty')
//   httpRequest.send()
//
// httpRequest.onreadystatechange = function(data){
//   console.log(data);
// }
// })
