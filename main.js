'use strict'
import data from './data.json' assert {type: 'json'}

const card = document.querySelector('.card');
const sendBut = document.querySelector(".send");
const repBut = document.querySelector('.replyBut');
let wantDel;

//destructurisation
const { comments, currentUser } = data;


// let arrey = [1, 2, 3];
// const [num1, num2, num3] = arrey;
// console.log(num3);

function addComent(comment) {
    const { id, content, createdAt, score, replyingTo, user, replies } = comment;
    const { image, username } = user;
    card.innerHTML += `
    <div class="mComments">
        <div class="headInfo">
            <img class='image' src="${image.png}"/>
            <h2 class='name'>${username}${username === "juliusomo" ? "<span class='you'>you</span>" : ""}</h2>
            <div class='time'>${createdAt}</div>
        </div>
        <div class='comments'>${content}</div>
        <div class="comentBot">
            <div class='score'>
                <button class="plusPut"> <img class="plusMin" src="./images/icon-plus.svg"/> </button>
                ${score}
                <button class="minusPut"> <img class="plusMin1" src="./images/icon-minus.svg"/> </button>
            </div>
            ${username !== "juliusomo" ? `
            <button class='replyBut' onclick="convertRep(event)">
                <img class='repImage' src="./images/icon-reply.svg"/>
                <h2 class='repText'>Reply</h2>
            </button>`: `
                <div class="youSection">
                    <button class="youEdDe deleteBut" onclick='delFuncM(event)'>
                        <img class="delImage" src="./images/icon-delete.svg"/>
                        <h3 class="delText">Delete</h3>
                    </button>
                    <button class="youEdDe editBut">
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
                            <button class="plusPut"> <img class="plusMin" src="./images/icon-plus.svg"/> </button>
                            ${score}
                            <button class="minusPut"> <img class="plusMin1" src="./images/icon-minus.svg"/> </button>
                        </div>
                        ${username !== "juliusomo" ? `
                        <button class='replyBut' onclick="convertRepR(event)">
                            <img class='repImage' src='./images/icon-reply.svg'>
                            <h2 class='repText'>Reply</h2>
                        </button>`: `
                        <div class="youSection">
                            <button class="youEdDe deleteBut" onclick='delFunc(event)'>
                                <img class="delImage" src="./images/icon-delete.svg"/>
                                <h3 class="delText">Delete</h3>
                            </button>
                            <button class="youEdDe editBut">
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
    }

}

sendBut.addEventListener('click', convert);

function convert() {
    let addedComment = document.getElementById("textArea").value;
    const bgdiv = document.querySelector('.bgDiv');
    bgdiv.st
    let addedComObject = {
        "id": 1,
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
    console.log(comments);
    document.getElementById("textArea").value = "";
}

window.delFunc = (event) => {
    document.getElementsByClassName('delDiv')[0].style.display = 'flex';
    document.getElementsByClassName('bgDiv')[0].style.display = 'flex';
    wantDel = event.path[5];
    console.log(event.path)
}

window.delFuncM = (event) => {
    document.getElementsByClassName('delDiv')[0].style.display = 'flex';
    document.getElementsByClassName('bgDiv')[0].style.display = 'flex';
    wantDel = event.path[4];
    console.log(event.path)
}

const cancelB = document.getElementsByClassName('noCancel')[0];
cancelB.addEventListener('click', noCancel);
function noCancel() {
    document.getElementsByClassName('delDiv')[0].style.display = 'none';
    document.getElementsByClassName('bgDiv')[0].style.display = 'none';
}


const yesDel = document.getElementsByClassName('yesBut')[0];
yesDel.addEventListener('click', yesDelFunc);

function yesDelFunc() {
    document.getElementsByClassName('delDiv')[0].style.display = 'none';
    document.getElementsByClassName('bgDiv')[0].style.display = 'none';
    wantDel.remove();
}



window.convertRep = (event) => {
    event.target.parentNode.parentNode.parentNode.innerHTML
    += `
        <div class="addComR">
            <textarea class="replayMainCom" id="textArea" rows="4" cols="50" placeholder="Add a replay…"></textarea>
            <div class="imageAndSend">
                <img class="image sendImage" src="./images/avatars/image-juliusomo.png" />
                <input class="send" type="button" value="REPLY" />
            </div>
        </div>
    `
}

window.convertRepR = (event) => {
    const ani = event.target.parentElement.parentElement.parentElement.parentElement;
    ani.innerHTML += 
    `
        <div class="addComR">
            <textarea id="textArea" rows="4" cols="50" placeholder="Add a replay…"></textarea>
            <div class="imageAndSend">
                <img class="image sendImage" src="./images/avatars/image-juliusomo.png" />
                <input class="send" type="button" value="REPLY" />
            </div>
        </div>
    `
    console.log(ani);

}
