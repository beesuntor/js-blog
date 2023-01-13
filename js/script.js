'use strict';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE]remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE]add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* [DONE]remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log('articleSelector', articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log('targetArticle', targetArticle);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

const links = document.querySelectorAll('.titles a');

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  // eslint-disable-next-line no-unused-vars
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.list.tags';

/* [DONE] remove contents of titleList */
function generateTitleLinks(customSelector = '') {
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [DONE] find all the articles and save them to variable: articles */
  /* ... */
  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );
  let html = '';

  for (let article of articles) {
    /* [DONE] get the article id */
    /* ... */
    const articleId = article.getAttribute('id');
    /* [DONE] find the title element */
    /* ... */
    const articleTitleElement = article.querySelector(optTitleSelector);

    /* [DONE] get the title from the title element */
    /* ... */
    const articleTitle = articleTitleElement.innerText;

    /* [DONE] create HTML of the link */
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      '</span></a></li>';
    /* ... */

    /* [DONE] insert link into html variable */
    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    tagsWrapper.innerHTML = '';
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('articleTags: ', articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const linkHTML =
        '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      /* add generated code to html variable */
      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';
  // [NEW] Start Loop: for each tag in allTags:
  for (let tag in allTags) {
    /* [NEW] Generate HTML code with class for cloud tags */
    allTagsHTML +=
      '<a href="#tag-' +
      tag +
      '"> ' +
      tag +
      ' </a> (' +
      allTags[tag] +
      ') </br>';
  }
  // [NEW]  END LOOP: for each tag in allTags:

  // [NEW] add HTML from allTagsHTML to tagList
  tagList.innerHTML = allTagsHTML;
}
generateTags();
function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('tag', tag);
  /* find all tag links with class active */
  const tagLinksActives = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let tagLinksActive of tagLinksActives) {
    /* remove class active */
    tagLinksActive.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (let linkToTag of allLinksToTags) {
    /* add tagClickHandler as event listener for that link */
    linkToTag.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {
  /*  find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* For each article get atribute data-author and id */
  for (let article of articles) {
    const authorName = article.getAttribute('data-author');
    const articleName = article.getAttribute('id');

    /* Develop HTML code for links to author */
    const authorHTML =
      '<a href="#author:' + authorName + '"> author: ' + authorName + '</a>';
    const test = '#' + articleName + ' > .post-author';
    const authorWrapper = article.querySelector(test);
    authorWrapper.innerHTML = authorHTML;
  }
}
generateAuthors();

function addClickListenersToAuthors() {
  /* find all links to tags */
  const allLinksToAuthors = document.querySelectorAll('a[href^="#author-"]');
  /* START LOOP: for each link */
  for (let linkToAuthor of allLinksToAuthors) {
    /* add tagClickHandler as event listener for that link */
    linkToAuthor.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();
function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  console.log('author', author);
  /* find all tag links with class active */
  const authorLinksActives = document.querySelectorAll(
    'a.active[href^="#author-"]'
  );
  /* START LOOP: for each active tag link */
  for (let authorLinksActive of authorLinksActives) {
    /* remove class active */
    authorLinksActive.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let authorLink of authorLinks) {
    /* add class active */
    authorLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}
