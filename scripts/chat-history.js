/**
 * Dynamically creates the user's chat history and adds it to their past chat page.
 * 
 * @param {Array} allChatInfo An array containing ["name", "chatID", "userID", "receiver's name", "profilepicure of the receiver"]
 */
function createAndInsertChatHistory(allChatInfo) {
    for (let i = 0; i < allChatInfo.length; i++) {
        let chatID = allChatInfo[i][1]
        let receiverName = allChatInfo[i][3]
        let profilePic = allChatInfo[i][4]
        let receiverPic = allChatInfo[i][5]
        let historyDiv = document.getElementById('history');
        let singleChatDiv = document.createElement('div');
        let name = document.createTextNode(receiverName);
        let connectButton = document.createElement('a');
        let img = document.createElement('img');
        img.src = receiverPic
        singleChatDiv.appendChild(img)
        singleChatDiv.appendChild(name)
        connectButton.setAttribute('href', "personal-chat.html?id=" + chatID)
        connectButton.appendChild(singleChatDiv)
        historyDiv.appendChild(connectButton)
    }
}




/**
 * Grabs the information of each chat that the user had engaged in and passed it to the createAndInserChatHistory function.
 * 
 * @param {Array} uniqueChatlist An array of firebase chatIDs that are unique to the two users in conversation
 */
function getChatData(uniqueChatlist) {
    var allChatInfo = [];
    let chatIdArray = [];

    for (let i = 0; i < uniqueChatlist.length; i++) {
        chatIdArray.push(uniqueChatlist[i])
    }
    firebase.firestore()
        .collection('messages')
        .where('chat', 'in', chatIdArray)
        .get()
        .then(function (snapshot) {
            snapshot.forEach(function (doc) {
                let singleChatInfo = []
                singleChatInfo.push(doc.data().name) //allchatinfo[i][0] 
                singleChatInfo.push(doc.data().chat)//allchatinfo[i][1]
                singleChatInfo.push(doc.id)//allchatinfo[i][2]
                singleChatInfo.push(doc.data().receiverName)//allchatinfo[i][3]
                singleChatInfo.push(doc.data().profilePicUrl)//allchatinfo[i][4]
                singleChatInfo.push(doc.data().receiverPic)//allchatinfo[i][5]
                allChatInfo.push(singleChatInfo)
            })
            var myFinalList = removeDuplicates(allChatInfo)

            createAndInsertChatHistory(myFinalList)

        })
        .catch(function (error) {
            console.log(error)
        })


}


/**
 * 
 * @param {Array} allChatInfo An array containing ["name", "chatID", "userID", "receiver's name", "profilepicure of the receiver"]
 * @returns 
 */
function removeDuplicates(allChatInfo) {
    let finalList = [];
    let uidList = []
    for (let i = 0; i < allChatInfo.length; i++) {
        if (uidList.includes(allChatInfo[i][1])) {
            console.log("Duplicate");
        }
        else {
            uidList.push(allChatInfo[i][1])
            finalList.push(allChatInfo[i])
        }
    }
    return finalList
}

/**
 * Drives the script by waiting for the firebase authentication to be confirmed,
 * and then grabs the chat messages that they have been a part of in the past. 
 */
function grabChatsAfterStateChange() {
    firebase.auth().onAuthStateChanged(function (somebody) {
        let chatList = []
        if (somebody) {
            grabAllChatsWithUserId().then(result => {
                result.forEach(docSnapshot => {
                    chatList.push(docSnapshot.data().chat);

                })
                let uniqueChatlist = [...new Set(chatList)]

                if (uniqueChatlist.length === 0) {
                    noChatsYet();
                } else {
                    getChatData(uniqueChatlist)
                }


            });
        }
    })
}

function noChatsYet() {
    let historyDiv = document.getElementById('history');
    let singleChatDiv = document.createElement('div');
    let emptyText = document.createTextNode("You have no chat History! Click here to explore your community")

    let connectButton = document.createElement('a');
    connectButton.setAttribute('href', "map-tool.html")
    singleChatDiv.appendChild(emptyText)
    connectButton.appendChild(singleChatDiv)

    historyDiv.appendChild(connectButton)


}

/**
 * 
 * @returns All chat firebase docs in which the user's uid is marked as either a "sender" or a "receiver"
 */
async function grabAllChatsWithUserId() {
    const chatRef = firebase.firestore().collection('messages')
    let loggedInUser = firebase.auth().currentUser.uid
    const isSender = chatRef.where('sender', '==', loggedInUser).get()
    const isReceiver = chatRef.where('receiver', '==', loggedInUser).get()

    const [senderQuerySnapshot, receiverQuerySnapshot] = await Promise.all([
        isSender,
        isReceiver
    ]);

    const senderArray = senderQuerySnapshot.docs;
    const receiverArray = receiverQuerySnapshot.docs;

    const chatArray = senderArray.concat(receiverArray);
    return chatArray;
}

setTimeout(() => {
    $("#loading").hide();
}, 1500);
grabChatsAfterStateChange();