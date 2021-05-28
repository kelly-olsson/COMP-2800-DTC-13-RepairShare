/**
 * Dynamically creates the user's chat history and adds it to their past chat page.
 * 
 * @param {Array} allChatInfo An array containing ["name", "chatID", "userID", "receiver's name", "profilepicure of the receiver"]
 */
function createAndInsertChatHistory(allChatInfo) {
    for (let i = 0; i < allChatInfo.length; i++) {
        let chatID = allChatInfo[i][1]
        let receiverName = allChatInfo[i][3]
        let recieverPic = allChatInfo[i][4]
        let historyDiv = document.getElementById('history');
        let singleChatDiv = document.createElement('div');
        let link = document.createTextNode(receiverName);
        let connectButton = document.createElement('a');
        connectButton.appendChild(link)
        connectButton.setAttribute('href', "personal-chat.html?id=" + chatID)
        singleChatDiv.appendChild(connectButton)
        historyDiv.appendChild(singleChatDiv)
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
            console.log(allChatInfo[i][1]);
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
                getChatData(uniqueChatlist)
            });
        }
    })
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


grabChatsAfterStateChange();