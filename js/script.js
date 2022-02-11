'use strict';

const optArticleSelector = '.post';

const optTitleSelector = '.post-title';

const optTitleListSelector = '.titles';

const optArticleTagsSelector = '.post-tags .list';

const optArticleAuthorSelector = '.post-author';

const optTagsListSelector = '.tags.list';

const optAuthorsListSelector = '.author.list';

const optCloudClassCount = 5;

const optCloudClassPrefix = 'tag-size-';

const titleClickHandler = function(event){

  event.preventDefault();

  const clickedElement = this;

  console.log(event);

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);

  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);

  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');
};

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);

  titleList.innerHTML = '';

  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for(let article of articles){

    /* get the article id */

    const articleId = article.getAttribute('id');

    /* find the title element */

    /* get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    console.log(linkHTML);

    /* insert link into titleList */

    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function tagClickHandler(event){
  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  console.log(clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  console.log(tag);

  /* find all tag links with class active */

  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  console.log(activeTags);

  /* START LOOP: for each active tag link */

  let html = '';

  console.log(html);

  for(let activeTag of activeTags){

    /* remove class active */

    activeTag.classList.remove('active');
  }

  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */

  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each found tag link */

  for (let tagLink of tagLinks){

    /* add class active */

    tagLinks.classList.add('active');

    console.log('TagLinks is ', tagLinks);
  }
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function calculateTagsParams (tags) {

  const params = {max:0 , min:999999};

  console.log(params);

  for(let tag in tags){

    if(tags[tag] > params.max){

      params.max = tags[tag];
    }
    if(tags[tag] < params.min){

      params.min = tags[tag];
    }

    console.log(tag + ' is used ' + tags[tag] + ' times');
  }

  return params;
}

function calculateTagClass (count , params){

  const normalizedCount = count - params.min;

  const normalizedMax = params.max - params.min;

  const percentage = normalizedCount / normalizedMax;

  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

  return optCloudClassPrefix+classNumber;
}


function generateTags(){

  /* [NEW] create a new variable allTags with an empty object */

  let allTags = {};

  /* find all articles */

  const articles = document.querySelectorAll('.post');

  /* START LOOP: for every article: */

  for(let article of articles){

    /* find tags wrapper */

    const tagWrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');

    console.log(articleTags);

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */

    for(let tag of articleTagsArray){

      /* generate HTML of the link */

      const linkHTML = '<li><a href="#tag' + articleTags + '"><span>' + tag + '</span></a></li>';

      console.log(linkHTML);

      /* add generated code to html variable */

      html += linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]){
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }

     /* END LOOP: for each tag */

     console.log('END LOOP: for each tag');

     /* insert HTML of all the links into the tags wrapper */

    console.log('insert HTML');

    tagWrapper.innerHTML = html;

    console.log('END LOOP: for every article');

}

   /* [NEW] find list of tags in right column */

   const tagList = document.querySelector('.tags');

   const tagsParams = calculateTagsParams(allTags);

   console.log('tagsParams:',tagsParams);

   /* [NEW] create variable for all links HTML code */

   let allTagsHTML = '';

   /* [NEW] START LOOP: for each tag in allTags: */

   for(let tag in allTags){

   allTagsHTML += tag + ' (' + allTags[tag] + ') ';

}  
   /* [NEW] generate code of a link and add it to allTagsHTML */

   

   /* [NEW] END LOOP: for each tag in allTags: */
   
   /* [NEW] add html from allTagsHTML to taglist */

   tagList.innerHTML = allTagsHTML ;

}

generateTags();

function addClickListenersToTags(){

  /* find all links to tags */

  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */

  for(let tagLink of tagLinks){

    /* add tagClickHandler as event listener for that link */

    tagLink.addEventListener('click', tagClickHandler);

  }  /* END LOOP: for each link */
}

addClickListenersToTags();

function authorClickHandler(event){

  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */

  /* find all tag links with class active */

  const activeAuthors= document.querySelectorAll('.data-author a.active');

  /* START LOOP: for each active author link */

  let html = '';

  console.log(html);

  for(let activeAuthor of activeAuthors){

    /* remove class active */

    activeAuthors.classList.remove('active');
  }

  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */

  const authorLinks = document.querySelectorAll('.data-author a.active');

  console.log(authorLinks);

  /* START LOOP: for each found tag link */

  for (let authorLink of authorLinks){

    /* add class active */

    authorLink.classList.add('active');

    console.log('TagLinks is ', authorLink);
  }
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author~="' + authorLinks + '"]');

}

function generateAuthors(){

  /* [NEW] create a new variable allTags with an empty object */

  let allAuthors = {};

  /* find all articles */

  const articles = document.querySelectorAll('.post');

  /*loop for every article*/

  for(let article of articles){

    /* find authors wrapper */

    const authorsWrapper = article.querySelector(optArticleAuthorSelector);

    /* make html variable with empty string */

    let html = '';

    console.log(html);

    /* get tags from data-tags attribute */

    const articleAuthor = article.getAttribute('data-author');

      /* generate HTML of the link */

      const linkHTML = '<li><a href="#author' + articleAuthor + '"><span>' + articleAuthor + '</span></a></li>';

      /* add generated code to html variable */

      html = linkHTML;

      console.log(html);

      /* [NEW] check if this link is NOT already in allTags */
      if(!allAuthors[articleAuthor]) {
        /* [NEW] add tag to allTags object */
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }
  
    /* insert HTML of all the authors into the Author wrapper */

    authorsWrapper.innerHTML = html;

    console.log(authorsWrapper.innerHTML);
 }


        /* END LOOP: for each tag */

  /* [NEW] find list ofd authors in right column */
  
  const authorList = document.querySelector ('.authors');

  /* [NEW] create variable for all authors HTML code */
 
  let allAuthorsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */

  for(let articleAuthor in allAuthors){

  /* [NEW] generate code of a link and add it to allTahsHTML */

  allAuthorsHTML += articleAuthor + ' (' + allAuthors[articleAuthor] + ') ';
}
  /*[NEW] add HTML from allAuthorsHTML to authorList */
  authorList.innerHTML = allAuthorsHTML;


}

generateAuthors();

function addClickListenersToAuthors(){

  /* find all links to authors */

  const authorLinks = document.querySelectorAll(optArticleAuthorSelector);

  console.log(authorLinks);

  /* START LOOP: for each link */

  for(let authorLink of authorLinks){

    /* add authorClickHandler as event listener for that link */

    authorLink.addEventListener('click', authorClickHandler);

  }  /* END LOOP: for each link */

}

addClickListenersToAuthors();