export const deleteSearchResults = () => {
  const parentElement = document.getElementById("searchResults");
  let child = parentElement.lastElementChild;
  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
};





export const clearStatsLine = () => {
  document.getElementById("stats").textContent = "";
};
export const setStatsLine = (numresults) => {
  const statLine = document.getElementById("stats");
  if (numresults) {
    statLine.textContent = `We have found ${numresults} results for you.`;
  } else {
    statLine.textContent = "Sorry, no results.";
  }
};
