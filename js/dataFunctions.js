import {
  setStatsLine,
  clearStatsLine
} from './searchResults.js';

const getSearchTerm = () => {
  const rawSearchTerm = document.getElementById("search").value.trim();
  const regex = /[ ]{2,}/gi;
  const searchTerm = rawSearchTerm.replaceAll(regex, " ");
  return searchTerm;
};



export const getWikiSearchString = (searchTerm) => {
  searchTerm = getSearchTerm()
  const maxChars = getMaxChars();
  const rawSearchString = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`;
  const searchString = encodeURI(rawSearchString);
  return searchString;
};

const getMaxChars = () => {
  const width = window.innerWidth || document.body.clientWidth;
  let maxChars;
  if (width < 414) maxChars = 65;
  if (width >= 414 && width < 1400) maxChars = 100;
  if (width >= 1400) maxChars = 130;
  return maxChars;
};

export const requestData = async (searchString) => {

  try {
    const response = await fetch(searchString);
    const data = await response.json();
    let results = data.query.pages;
    console.log(results)
    clearStatsLine()
    processWikiResults(results);

  } catch (err) {
    console.error(err);
  }
};
// processing the search results with es6 template strings
const processWikiResults = (results) => {
  let r = document.getElementById('searchResults')
  let a = Object.keys(results);

  setStatsLine(a.length);

  let wow = a.map(key => {
    let id = results[key].pageid
    let link = `https://en.wikipedia.org/?curid=${id}`;
    let title = results[key].title;

    let des = results[key].extract;

    let image = results[key].thumbnail ? results[key].thumbnail.source : null;

    return (`
    <div class="resdiv box-1">
  <h2 class="title"><a href=${link} target='_blank'  >${title}</a></h2>


      <a href=''><img src=${image} class="img" /></a>
  <p class="info">${des}</p>
    </div>
    `)
  }).join('');
  r.innerHTML = wow

}
