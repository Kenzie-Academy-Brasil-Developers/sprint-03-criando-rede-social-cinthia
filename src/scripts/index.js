import {users, posts, suggestUsers} from "./database.js";




/**
 * Renderiza os posts para a parte principal.
 * @param {*} posts 
 */
function renderPost(posts) {
    const ulPosts = document.querySelector(`.ul-posts`);
    ulPosts.innerHTML = ``;

    posts.forEach((post) => {
        const createdPost = createPost(post);
        ulPosts.appendChild(createdPost);
    })
}




/**
 * Cria os posts para a parte principal com suas divisórias correspondentes.
 * @param {*} posts 
 * @returns 
 */
function createPost(posts) {
    const listPost = document.createElement(`li`);
    listPost.classList.add(`list-post`);

    const divIconAndUser = document.createElement(`div`);
    const divUsernameAndDescription = document.createElement(`div`);
    const postIcon = document.createElement(`img`);
    const userName = document.createElement(`h2`);
    const userDescription = document.createElement(`span`);
    const mainTitle = document.createElement(`h1`);
    const subtitle = document.createElement(`span`);

    const divButtonAndLikeHeart = document.createElement(`div`);
    const openPostButton = document.createElement(`button`);
    const likeHeart = document.createElement(`span`);
    const heartCount = document.createElement(`span`);

    divIconAndUser.classList.add(`divider-icon-user`);
    divUsernameAndDescription.classList.add(`divider-user-desc`);

    postIcon.src = posts.img;
    postIcon.alt = posts.user;

    userName.innerText = posts.user;

    userDescription.innerText = posts.stack;
    userDescription.classList.add(`user-desc-span`);

    mainTitle.innerText = posts.title;

    if (posts.text.length > 184) {
        subtitle.innerText = posts.text.slice(0, 182) + `...`;
    } else {
        subtitle.innerText = posts.text.slice(0, 184);
    }
    subtitle.classList.add(`subtitle`);

    divButtonAndLikeHeart.classList.add(`divider-button-heart`);
    openPostButton.innerText = `Abrir Post`;
    openPostButton.classList.add(`open-post-button`);
    openPostButton.dataset.postId = posts.id;

    likeHeart.innerHTML = `&#10084;`;
    likeHeart.classList.add(`like-heart`);
    heartCount.innerText = posts.likes;
    heartCount.classList.add(`heart-count`);

    const modal = createModal(posts);

    listPost.append(divIconAndUser, mainTitle, subtitle, divButtonAndLikeHeart, modal);

    divIconAndUser.append(postIcon, divUsernameAndDescription);
    divUsernameAndDescription.append(userName, userDescription);
    divButtonAndLikeHeart.append(openPostButton, likeHeart, heartCount);

    openPostButton.addEventListener(`click`, () => {
        modal.showModal();
    })

    let flag = false
    likeHeart.addEventListener(`click`, () => {
        if (flag == false) {
            heartCount.innerHTML = `${Number(posts.likes) + 1}`;
            likeHeart.classList.add(`liked-button`);
            likeHeart.classList.remove(`like-heart`);

        } else {
            heartCount.innerHTML = posts.likes;
            likeHeart.classList.remove(`liked-button`);
            likeHeart.classList.add(`like-heart`);
        }
        flag = !flag;
    })

    return listPost;
}




/**
 * Renderiza as sugestões de usuários a serem seguidos.
 * @param {*} suggestions 
 */
function renderSuggestion(suggestions) {
    const asideSuggestion = document.querySelector(`.div-aside`);

    suggestions.forEach((suggestion) => {
        const userSuggestion = createSuggestions(suggestion);
        asideSuggestion.appendChild(userSuggestion);
    })
}




/**
 * Cria a parte dos usuários a serem seguidos com base num array de usuários.
 * @param {*} suggestion 
 * @returns 
 */
function createSuggestions(suggestion) {
    const listSuggestion = document.createElement(`li`);

    const divUserButton = document.createElement(`div`);
    divUserButton.classList.add(`divider-user-button`);

    const divIconUser = document.createElement(`div`);
    divIconUser.classList.add(`divider-icon-user`);

    const divUserAndDesc = document.createElement(`div`);
    divUserAndDesc.classList.add(`divider-user-desc`);

    const suggestionIcon = document.createElement(`img`);
    suggestionIcon.src = suggestion.img;
    suggestionIcon.alt = suggestion.user;

    const followButton = document.createElement(`button`);
    followButton.innerHTML = `Seguir`;
    followButton.classList.add(`follow-button`);

    const suggestedUser = document.createElement(`h2`);
    suggestedUser.innerText = suggestion.user;

    const suggestedDesc = document.createElement(`span`);
    suggestedDesc.innerText = suggestion.stack;
    suggestedDesc.classList.add(`user-desc-span`);

    divUserButton.append(divIconUser, followButton);
    divIconUser.append(suggestionIcon, divUserAndDesc);
    divUserAndDesc.append(suggestedUser, suggestedDesc);

    listSuggestion.appendChild(divUserButton);

    let flag = false;
    followButton.addEventListener(`click`, () => {
        if (flag == false) {
            followButton.innerText = `Seguindo`;
            followButton.classList.add(`followed`);
            followButton.classList.remove(`follow-button`);
        } else {
            followButton.innerText = `Seguir`;
            followButton.classList.remove(`followed`);
            followButton.classList.add(`follow-button`);
        }
        flag = !flag;
    });

    return listSuggestion;
}




/**
 * Renderiza a parte de criar uma nova postagem. Utiliza somente o primeiro usuário do array.
 * @param {*} users 
 */
function renderUserPost(users) {
    const userPost = document.querySelector(`.user-post`);

    const divIconAndUser = document.createElement(`div`);
    divIconAndUser.classList.add(`divider-icon-user`);

    const divUserAndDesc = document.createElement(`div`);
    divUserAndDesc.classList.add(`divider-user-desc`);

    const currentUser = document.createElement(`h2`);
    currentUser.innerText = users[0].user;

    const currentDesc = document.createElement(`span`);
    currentDesc.innerText = users[0].stack;
    currentDesc.classList.add(`user-desc-span`);

    const currentIcon = document.createElement(`img`);
    currentIcon.src = users[0].img;
    currentIcon.alt = users[0].user;

    const titleArea = document.createElement(`input`);
    titleArea.setAttribute(`type`, `text`);
    titleArea.classList.add(`title-area`);
    titleArea.placeholder = `Digite seu título aqui.`;

    const postArea = document.createElement(`textarea`);
    postArea.classList.add(`post-area`);
    postArea.placeholder = `Digite seu texto aqui.`;


    const postButton = document.createElement(`button`);
    postButton.innerText = `Postar`;
    postButton.classList.add(`post-button`);

    postButton.addEventListener(`click`, () => {
        const titleValue = document.querySelector(`.title-area`).value;
        const postValue = document.querySelector(`.post-area`).value;
        let count = 0;

        if (titleValue == [] || postValue == []) {
            alert(`Insira um texto válido.`)

        } else {
            posts.unshift({
                id: 0,
                title: titleValue,
                text: postValue,
                user: users[0].user,
                stack: users[0].stack,
                img: users[0].img,
                likes: 0
            })
            
            posts.forEach(post => {
                post.id = count++;
            });
            console.log(posts)
            renderPost(posts);
        } 

        const inputsToClear = document.querySelectorAll(`.title-area, .post-area`)
        inputsToClear.forEach(input => {
            input.value = ``;
        })
    })

    userPost.append(divIconAndUser, titleArea, postArea, postButton);
    divIconAndUser.append(currentIcon, divUserAndDesc);
    divUserAndDesc.append(currentUser, currentDesc);
}




/**
 * Cria um modal recebendo o array de posts, para apresentá-los por completo assim que o modal abrir.
 * @param {*} posts 
 */
function createModal(posts) {
    const modal = document.createElement(`dialog`);
    modal.classList.add(`modal`);
    const divModal = document.createElement(`div`);
    divModal.classList.add(`div-modal`);
    
    const divIconAndUser = document.createElement(`div`);
    const divUsernameAndDescription = document.createElement(`div`);
    const userIcon = document.createElement(`img`);
    const userName = document.createElement(`h2`);
    const userDescription = document.createElement(`span`);
    const mainTitle = document.createElement(`h1`);
    const subtitle = document.createElement(`span`);
    const buttonCloseModal = document.createElement(`div`);
    const spanX = document.createElement(`span`);

    divIconAndUser.classList.add(`divider-icon-user`);
    divUsernameAndDescription.classList.add(`divider-user-desc`);

    userIcon.src = posts.img;
    userIcon.alt = posts.user;

    userName.innerText = posts.user;

    userDescription.innerText = posts.stack;
    userDescription.classList.add(`user-desc-span`);

    mainTitle.innerText = posts.title;
    mainTitle.classList.add(`title-modal`);

    subtitle.innerText = posts.text;
    subtitle.classList.add(`subtitle-modal`);

    buttonCloseModal.classList.add(`button-close-modal`);
    spanX.innerText = `X`;
    spanX.classList.add(`span-x`);

    modal.appendChild(divModal);
    divModal.append(divIconAndUser, mainTitle, subtitle, buttonCloseModal);
    buttonCloseModal.appendChild(spanX);
    divIconAndUser.append(userIcon, divUsernameAndDescription);
    divUsernameAndDescription.append(userName, userDescription);

    buttonCloseModal.addEventListener(`click`, () => {
        modal.close();
    })
    return modal;
}




renderPost(posts);

renderSuggestion(suggestUsers);

renderUserPost(users);