'use strict';

const optArticleSelector = '.post';

const optTitleSelector = '.post-title';

const optTitleListSelector = '.titles';

const optArticleTagsSelector = '.post-tags .list';

const titleClickHandler = function(event) {

    event.preventDefault();

    const clickedElement = this;

    console.log(event);

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    /* [IN PROGRESS] add class 'active' to the clicked link */

    console.log('clickedElement:', clickedElement);

    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');

    /* find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);

    console.log(targetArticle);

    /* add class 'active' to the correct article */

    targetArticle.classList.add('active');

};

function generateTitleLinks(customSelector = '') {

    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);

    titleList.innerHTML = '';

    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html = '';

    for (let article of articles) {

        /* get the article id */

        const articleId = article.getAttribute('id');

        /* find the title element */

        const articleTitle = article.querySelector(optTitleSelector).innerHTML;

        /* get the title from the title element */

        /* create HTML of the link */

        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

        console.log(linkHTML);

        /* insert link into titleList */

        html = html + linkHTML;
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
}

generateTitleLinks();

function tagClickHandler(event) {
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

    let HTML = '';

    console.log(html);

    for (let activeTag of activeTags) {

        /* remove class active */

        activeTag.classList.remove('active');

        /* END LOOP: for each active tag link */

        console.log('END LOOP: for each active tag link');
    }

    /* find all tag links with "href" attribute equal to the "href" constant */

    const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each found tag link */

    for (let tagLink of tagLinks) {

        /* add class active */

        tagLinks.classList.add('active');

        console.log('TagLinks is ', tagLinks);

        /* END LOOP: for each found tag link */

        console.log('END LOOP: for each found tag link');
    }

    /* execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-tags~="' + tag + '"]');

}

function generateTags() {

    /* [NEW] create a new variable allTags with an empty array */

    let allTags = {};

    /* find all articles */

    const articles = document.querySelectorAll('.post');

    /* START LOOP: for every article: */

    for (let article of articles) {

        /* find tags wrapper */

        const tagWrapper = article.querySelector(optArticleTagsSelector);

        /* make html variable with empty string */

        let html = '';

        /* get tags from data-tags attribute */

        const articleTags = article.getAttribute('data-tags');

        console.log(articleTags);

        /* split tags into array */

        const articleTagsArray = articleTags.split('');

        /* START LOOP: for each tag */

        for (let tag of articleTagsArray) {

            /* generate HTML of the link */

            const linkHTML = '<li><a href="#' + articleTags + '"><span>' + tagWrapper + '</span></a></li>';

            console.log(linkHTML);

            /* add generated code to html variable */

            html += linkHTML + '';

            /* [NEW] check if this link is NOT already in allTags */
            if (allTags.indexOf(linkHTML) == -1) {
                /* [NEW] add generated code to allTags array */
                allTags.push(linkHTML);
            }

            /* END LOOP: for each tag */

            console.log('END LOOP: for each tag');

        /* insert HTML of all the links into the tags wrapper */

        console.log('insert HTML');

        tagWrapper.innerHTML = html;

        /* END LOOP: for every article: */

        console.log('END LOOP: for every article');

}

        /* [NEW] find list of tags in right column */
        const tagList = document.querySelector(optTagsListSelector);

        /* [NEW] add html from allTags to tagList */
        tagList.innerHTML = allTags.join(' ');
    }

    generateTags();

    function addClickListenersToTags(){
        /* find all links to tags */

        const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

        /* START LOOP: for each link */

        for (let tagLink of tagLinks){

            /* add tagClickHandler as event listener for that link */

            tagLink.addEventListener('click', tagClickHandler);

           } /* END LOOP: for each link */
         }

    addClickListenersToTags();