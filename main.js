'use strict'
import data from './data.json' assert {type: 'json'}

const card = document.querySelector('.card');
const sendBut = document.querySelector(".send");
// const repBut = document.querySelector('.replyBut');
let wantDel;

let idInex = 4;
//destructurisation
const { comments, currentUser } = data;




// let arrey = [1, 2, 3];
// const [num1, num2, num3] = arrey;
// console.log(num3);

function addComent(comment) {
    const { id, content, createdAt, score, replyingTo, user, replies } = comment;
    const { image, username } = user;
    card.innerHTML += `
    <div class="mComments" id="${id}">
        <div class="headInfo">
            <img class='image' src="${image.png}"/>
            <h2 class='name'>${username}${username === "juliusomo" ? "<span class='you'>you</span>" : ""}</h2>
            <div class='time'>${createdAt}</div>
        </div>
        <div class='comments'>${content}</div>
        <div class="comentBot">
            <div class='score'>
                <button class="plusPut" onclick="plus(this)"> <img class="plusMin" src="./images/icon-plus.svg"/> </button>
                <div>${score}</div>
                <button class="minusPut" onclick="minus(this)"> <img class="plusMin1" src="./images/icon-minus.svg"/> </button>
            </div>
            ${username !== "juliusomo" ? `
            <button class='replyBut' onclick="convertRep(event, ${id})">
                <img class='repImage' src="./images/icon-reply.svg"/>
                <h2 class='repText'>Reply</h2>
            </button>`: `
                <div class="youSection">
                    <button class="youEdDe deleteBut" onclick='delFuncM(event)'>
                        <img class="delImage" src="./images/icon-delete.svg"/>
                        <h3 class="delText">Delete</h3>
                    </button>
                    <button class="youEdDe editBut" onclick="editMainReply(event)">
                        <img class="editImage" src="./images/icon-edit.svg"/>
                        <h3 class="editText">Edit</h3>
                    </button>
                </div>
            `}
        </div>
    <div>
    `
}


for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    addComent(comment);
    const { id, content, createdAt, score, replyingTo, user, replies } = comment;
    const { image, username } = user;
    //catch each replay and manipulate in DOM

    if (0 < replies.length) {
        let replies_contents = '';
        for (let ani = 0; ani < replies.length; ani++) {
            const reply = replies[ani];
            const { id, content, createdAt, score, replyingTo, user } = reply;
            const { image, username } = user;
            replies_contents += `
        <div class="hrFor">
            <div class="forLine"> </div>
            <div class="replays ${ani === replies.length - 1 ? "lastReply" : ""}">
                <div class="replayCard">
                    <div class="headInfo">
                        <img class='image' src="${image.png}"/>
                        <h2 class='name'>${username}${username === "juliusomo" ? "<span class='you'>you</span>" : ""}</h2>
                        <div class='time'>${createdAt}</div>
                    </div>
                    <div class='comments'>
                        <span class="torep">@${replyingTo}</span>
                        ${content}
                    </div>
                    <div class="comentBot">
                        <div class='score'>
                            <button class="plusPut" onclick="plus(this)"> <img class="plusMin" src="./images/icon-plus.svg"/> </button>
                            <div>${score}</div>
                            <button class="minusPut" onclick="minus(this)"> <img class="plusMin1" src="./images/icon-minus.svg"/> </button>
                        </div>
                        ${username !== "juliusomo" ? `
                        <button class='replyBut' onclick="convertRepR(event, ${id})">
                            <img class='repImage' src='./images/icon-reply.svg'>
                            <h2 class='repText'>Reply</h2>
                        </button>`: `
                        <div class="youSection">
                            <button class="youEdDe deleteBut" onclick='delFunc(event)'>
                                <img class="delImage" src="./images/icon-delete.svg"/>
                                <h3 class="delText">Delete</h3>
                            </button>
                            <button class="youEdDe editBut" onclick="editReply(this)">
                                <img class="editImage" src="./images/icon-edit.svg"/>
                                <h3 class="editText">Edit</h3>
                            </button>
                        </div>
                        `}
                    </div>
                </div> 
            </div>
        </div>
        `
        }
        card.innerHTML += `<div class="mainRepDiv">${replies_contents} </div>`
    }else{
        card.innerHTML += `<div class="mainRepDiv"> </div>`
    }

}


// addes Main comments
sendBut.addEventListener('click', convert);
function convert() {
    let addedComment = document.getElementById("textArea").value;
    idInex++
    // const bgdiv = document.querySelector('.bgDiv');
    // bgdiv.st
    let addedComObject = {
        "id": idInex,
        "content": addedComment,
        "createdAt": "",
        "score": 0,
        "user": {
            "image": {
                "png": "./images/avatars/image-juliusomo.png",
                "webp": "./images/avatars/image-juliusomo.webp"
            },
            "username": "juliusomo"
        },
        "replies": []
    };
    comments.push(addedComObject);
    addComent(addedComObject);
    document.getElementById("textArea").value = "";
}



// shows delete window of Reply comment
window.delFunc = (event) => {
    document.getElementsByClassName('delDiv')[0].style.display = 'flex';
    document.getElementsByClassName('bgDiv')[0].style.display = 'flex';
    wantDel = event.path[5];
}

// shows delete window of Main comment
window.delFuncM = (event) => {
    document.getElementsByClassName('delDiv')[0].style.display = 'flex';
    document.getElementsByClassName('bgDiv')[0].style.display = 'flex';
    wantDel = event.path[4];
}

// cancels delete
const cancelB = document.getElementsByClassName('noCancel')[0];
cancelB.addEventListener('click', noCancel);
function noCancel() {
    document.getElementsByClassName('delDiv')[0].style.display = 'none';
    document.getElementsByClassName('bgDiv')[0].style.display = 'none';
}

// deletes comment
const yesDel = document.getElementsByClassName('yesBut')[0];
yesDel.addEventListener('click', yesDelFunc);

function yesDelFunc() {
    document.getElementsByClassName('delDiv')[0].style.display = 'none';
    document.getElementsByClassName('bgDiv')[0].style.display = 'none';
    wantDel.remove();
}


// add replies section to general comments
window.convertRep = (event, id) => {
    const button =event.target.parentElement;
    let gino = true
    button.removeAttribute('disabled');
    
    if(!button.disabled){
    event.target.parentNode.parentNode.parentNode.innerHTML
    += `
        <div class="addComR">
            <textarea class="replayMainCom" id="textArea" rows="4" cols="50" placeholder="Add a replay…"></textarea>
            <div class="imageAndSend">
                <img class="image sendImage" src="./images/avatars/image-juliusomo.png" />
                <input class="send" type="button" value="REPLY" onclick='convertAndAddReply(event, ${id})' />
            </div>
        </div>
    `
    }
    
    button.setAttribute("disabled", ""); 
}

// adds replies section to reply
window.convertRepR = (event, id) => {
    const ani = event.target.parentElement.parentElement.parentElement.parentElement;
    ani.innerHTML += 
    `
        <div class="addComR">
            <textarea class="replayOfRep" id="textArea" rows="4" cols="50" placeholder="Add a replay…"></textarea>
            <div class="imageAndSend">
                <img class="image sendImage" src="./images/avatars/image-juliusomo.png" />
                <input class="send" type="button" value="REPLY" onclick='convertAndAddReplyToReply(event,  ${id})'  />
            </div>
        </div>
    `
}


// creates comments replies
function addRepToReplies(repliesR, currentDiv){
    const { id, content, createdAt, score, replyingTo, user, replies } = repliesR;
    const { image, username } = user;
    currentDiv.innerHTML += `
    <div class="hrFor">
    <div class="forLine"> </div>
    <div class="replays lastReply" >
        <div class="replayCard">
            <div class="headInfo">
                <img class='image' src="${image.png}"/>
                <h2 class='name'>${username}${username === "juliusomo" ? "<span class='you'>you</span>" : ""}</h2>
                <div class='time'>${createdAt}</div>
            </div>
            <div class='comments'>
                <span class="torep">@${replyingTo}</span>
                ${content}
            </div>
            <div class="comentBot">
                <div class='score'>
                    <button class="plusPut"> <img class="plusMin" src="./images/icon-plus.svg"/> </button>
                    ${score}
                    <button class="minusPut"> <img class="plusMin1" src="./images/icon-minus.svg"/> </button>
                </div>
                ${username !== "juliusomo" ? `
                <button class='replyBut' onclick="convertRepR(event, ${id})">
                    <img class='repImage' src='./images/icon-reply.svg'>
                    <h2 class='repText'>Reply</h2>
                </button>`: `
                <div class="youSection">
                    <button class="youEdDe deleteBut" onclick='delFunc(event)'>
                        <img class="delImage" src="./images/icon-delete.svg"/>
                        <h3 class="delText">Delete</h3>
                    </button>
                    <button class="youEdDe editBut" onclick="editReply(this)>
                        <img class="editImage" src="./images/icon-edit.svg"/>
                        <h3 class="editText">Edit</h3>
                    </button>
                </div>
                `}
            </div>
        </div> 
    </div>
</div>
`
}

//adds replies to Comments

window.convertAndAddReply = (event, id) => {
    let currentDiv = document.getElementById(`${id}`).nextElementSibling;
    let addedReply = document.getElementById("textArea").value;
    idInex ++ ;
    let coment = comments.find((element) => element.id==id);
    let addedReplyObject = {
        "id": idInex,
          "content": addedReply,
          "createdAt": "",
          "score": 0,
          "replyingTo": coment.user.username,
          "user": {
            "image": { 
              "png": "./images/avatars/image-juliusomo.png",
              "webp": "./images/avatars/image-juliusomo.webp"
            },
            "username": "juliusomo"
          }
    };
    coment.replies.push(addedReplyObject);
    let forDel = event.target.parentElement.parentElement;
    forDel.remove();
    addRepToReplies(addedReplyObject, currentDiv);
}

// creates Replies of Replies
function addRepToRepliesR(repliesR, currentDiv){
    const { id, content, createdAt, score, replyingTo, user, replies } = repliesR;
    const { image, username } = user;
    currentDiv.innerHTML += `
    <div class="hrFor">
    <div class="forLine"> </div>
    <div class="replays lastReply" >
        <div class="replayCard">
            <div class="headInfo">
                <img class='image' src="${image.png}"/>
                <h2 class='name'>${username}${username === "juliusomo" ? "<span class='you'>you</span>" : ""}</h2>
                <div class='time'>${createdAt}</div>
            </div>
            <div class='comments'>
                <span class="torep">@${replyingTo}</span>
                ${content}
            </div>
            <div class="comentBot">
                <div class='score'>
                    <button class="plusPut"> <img class="plusMin" src="./images/icon-plus.svg"/> </button>
                    ${score}
                    <button class="minusPut"> <img class="plusMin1" src="./images/icon-minus.svg"/> </button>
                </div>
                ${username !== "juliusomo" ? `
                <button class='replyBut' onclick="convertRepR(event, ${id})">
                    <img class='repImage' src='./images/icon-reply.svg'>
                    <h2 class='repText'>Reply</h2>
                </button>`: `
                <div class="youSection">
                    <button class="youEdDe deleteBut" onclick='delFunc(event)'>
                        <img class="delImage" src="./images/icon-delete.svg"/>
                        <h3 class="delText">Delete</h3>
                    </button>
                    <button class="youEdDe editBut" onclick="editReply(this)" >
                        <img class="editImage" src="./images/icon-edit.svg"/>
                        <h3 class="editText">Edit</h3>
                    </button>
                </div>
                `}
            </div>
        </div> 
    </div>
</div>
`
}

//adds replies to Replies

window.convertAndAddReplyToReply = (event, id) => {
    // let currentDiv = document.getElementById(`${id}`).nextElementSibling;
    // console.log(currentDiv)
    let catchRep = event.target.parentElement.parentElement.parentElement.parentElement.parentElement
    let currentComIDCatcher = catchRep.previousElementSibling.getAttribute("id");
    let addedReply = document.getElementById("textArea").value;
    idInex ++ ;
    let coment = comments.find((element) => element.id==currentComIDCatcher);
    let reply = coment.replies.find((element) => element.id==id);
    let addedReplyObject = {
        "id": idInex,
          "content": addedReply,
          "createdAt": "",
          "score": 0,
          "replyingTo": reply.user.username,
          "user": {
            "image": { 
              "png": "./images/avatars/image-juliusomo.png",
              "webp": "./images/avatars/image-juliusomo.webp"
            },
            "username": "juliusomo"
          }
    };
    coment.replies.push(addedReplyObject);
    let forDel = event.target.parentElement.parentElement;
    forDel.remove();
    addRepToRepliesR(addedReplyObject, catchRep);
}


// Edit Main Reply
window.editMainReply = (event) =>{
    let clicksSec = event.target.parentElement.parentElement;
    let scoreButDiv = event.target.parentElement.parentElement.previousElementSibling;
    const textarea = document.createElement("textarea");
    textarea.classList.add("editTextarea");
    let toxTo = event.target.parentElement.parentElement.parentElement.previousElementSibling;
    textarea.value = toxTo.textContent;
    toxTo.replaceWith(textarea);
    // console.log(currentDiv);
    scoreButDiv.style.display = "none";
    clicksSec.innerHTML +=`<button class="update" onclick="convertBack(event)" >UPDATE</button>`
}

// Edited Main convertBack
window.convertBack = (event) =>{
    let editedComment = document.querySelector(".editTextarea");
    idInex++ ;
    let editedcommentObject = {
        "id": idInex,
        "content": editedComment.value,
        "createdAt": "",
        "score": 0,
        "user": {
            "image": {
                "png": "./images/avatars/image-juliusomo.png",
                "webp": "./images/avatars/image-juliusomo.webp"
            },
            "username": "juliusomo"
        },
        "replies": []
    };
    const editedFiv = document.createElement("div");
    editedFiv.classList.add("comments");
    editedFiv.textContent = editedComment.value;
    editedComment.replaceWith(editedFiv);
    let clicksSec = event.target;
    let scoreButDiv = event.target.parentElement.previousElementSibling;
    scoreButDiv.style.display = "flex";
    clicksSec.remove();
}

// Edit child Reply
window.editReply = (element) =>{
    let clicksSec = element.parentElement.parentElement;
    // console.log(element.parentElement.parentElement.previousElementSibling);
    
    let scoreButDiv = element.parentElement.previousElementSibling;
    scoreButDiv.style.display = "none";
    // console.log(element)
    const textarea = document.createElement("textarea");
    textarea.classList.add("editTextarea");
    let toxTo = element.parentElement.parentElement.previousElementSibling;
    textarea.value = toxTo.textContent;
    clicksSec.innerHTML +=`<button class="update updateR" onclick="convertBackReply(event)">UPDATE</button>`
    toxTo.replaceWith(textarea);
    // console.log(element);
}

// Edited Main convertBack
window.convertBackReply = (event) =>{
    let editedComment = document.querySelector(".editTextarea");
    idInex++ ;
    let editedcommentObject = {
        "id": idInex,
        "content": editedComment.value,
        "createdAt": "",
        "score": 0,
        "user": {
            "image": {
                "png": "./images/avatars/image-juliusomo.png",
                "webp": "./images/avatars/image-juliusomo.webp"
            },
            "username": "juliusomo"
        },
        "replies": []
    };
    const editedFiv = document.createElement("div");
    editedFiv.classList.add("comments");
    editedFiv.textContent = editedComment.value;
    editedComment.replaceWith(editedFiv);
    let clicksSec = event.target;
    let scoreButDiv = event.target.previousElementSibling.previousElementSibling;
    scoreButDiv.style.display = "flex";
    clicksSec.remove();
}





let clicked = true ;
let clickedM = true;

    window.plus = (e)=>{
        if (clicked){
        const scoreCount = e.nextElementSibling.innerHTML;
        const addOne = Number(scoreCount)+1;
        e.nextElementSibling.innerHTML = addOne;
        clicked=false;
        clickedM=true;
    }
    
}

window.minus = (e)=>{
    if (clickedM){
    const scoreCount = e.previousElementSibling.innerHTML;
    const addOne = Number(scoreCount)-1;
    e.previousElementSibling.innerHTML = addOne;
    clickedM=false;
    clicked=true;
}
}