'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tagCloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-authorCloud-link').innerHTML)
};

const optArticleSelector = '.post';

const optTitleSelector = '.post-title';

const optTitleListSelector = '.titles';

const optArticleTagsSelector = '.post-tags .list';

const optArticleAuthorSelector = '.post-author';

const optTagsListSelector = '.tags.list';

const optAuthorsListSelector = '.authors.list';

const optCloudClassCount = 5;

const optCloudClassPrefix = 'tag-size-';

const titleClickHandler = function(event){

  event.preventDefault();

  console.log(event);

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  const clickedElement = this;

  console.log('clickedElement:', clickedElement);

  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts .active');

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

    const linkHTMLData = {id: articleId, title: articleTitle};

    const linkHTML = templates.articleLink(linkHTMLData);

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

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */

  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */

    for(let activeTagLink of activeTagLinks){
      activeTagLink.classList.remove('active');
    }

  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */

  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */

  for (let tagLink of tagLinks){

    /* add class active */

    tagLink.classList.add('active');
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

  const articles = document.querySelectorAll(optArticleSelector);

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

      const linkHTMLData = {id: 'tag-' + tag, title: tag};

      const linkHTML = templates.tagLink(linkHTMLData);


      /* add generated code to html variable */

      html = html + ' ' + linkHTML;

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

    tagWrapper.innerHTML = html;

}

   /* [NEW] find list of tags in right column */

   const tagList = document.querySelector(optTagsListSelector);

   const tagsParams = calculateTagsParams(allTags);

   console.log('tagsParams:',tagsParams);

   /* [NEW] create variable for all links HTML code */

   const allTagsData = {tags: []};

   /* [NEW] START LOOP: for each tag in allTags: */

   for(let tag in allTags){
    
   allTagsData.tags.push({

      tag: tag,

      count: allTags[tag],

      className: calculateTagClass(allTags[tag], tagsParams)
    });

} 

   /* [NEW] generate code of a link and add it to allTagsHTML */

   

   /* [NEW] END LOOP: for each tag in allTags: */
   
   /* [NEW] add html from allTagsHTML to taglist */

   tagList.innerHTML = templates.tagCloudLink(allTagsData);

   console.log(allTagsData);

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

function generateAuthors(){

  /* [NEW] create a new variable allTags with an empty object */

  let allAuthors = {};

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /*loop for every article*/

  for(let article of articles){

    /* find authors wrapper */

    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    const author = article.getAttribute('data-author');

      /* generate HTML of the link */

      const linkHTMLData = {id: 'author-' + author, title: author};

      const linkHTML = templates.authorLink(linkHTMLData);

      /* add generated code to html variable */

      /* [NEW] check if this link is NOT already in allTags */
      if(!allAuthors[author]) {
        /* [NEW] add tag to allTags object */
        allAuthors[author] = 1;
      } else {
        allAuthors[author]++;
      }

     html = html + linkHTML;
  
    /* insert HTML of all the authors into the Author wrapper */

    authorWrapper.innerHTML = html;
 }


        /* END LOOP: for each tag */

  /* [NEW] find list ofd authors in right column */
  
  const authorList = document.querySelector(optAuthorsListSelector);

  /* [NEW] create variable for all authors HTML code */
 
  const allAuthorsData = {authors: []};

  /* [NEW] START LOOP: for each tag in allTags: */

  for(let author in allAuthors){

  /* [NEW] generate code of a link and add it to allTahsHTML */

  allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author]
    });
  }
  
  /*[NEW] add HTML from allAuthorsHTML to authorList */

  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
  console.log('allAuthorsData', allAuthorsData);

}

generateAuthors();

function authorClickHandler(event){

  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */

  const author = href.replace('#author-', '');

  /* find all tag links with class active */

  const activeAuthorLinks= document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active author link */

  for(let activeAuthorLink of activeAuthorLinks){

    /* remove class active */

    activeAuthorLink.classList.remove('active');
  }

  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */

  const authorLinks = document.querySelectorAll('a[href="' + href + '"]' == href); 

  /* START LOOP: for each found tag link */

  for (let authorLink of authorLinks){

    /* add class active */

    authorLink.classList.add('active');

  }
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author~="' + author + '"]');

}


function addClickListenersToAuthors(){

  /* find all links to authors */

  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  /* START LOOP: for each link */

  for(let authorLink of authorLinks){

    /* add authorClickHandler as event listener for that link */

    authorLink.addEventListener('click', authorClickHandler);

  }  /* END LOOP: for each link */

}

addClickListenersToAuthors();