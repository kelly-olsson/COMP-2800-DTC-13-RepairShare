/**
 * Dynamically creates and 
 * 
 * @param {*} allChatInfo 
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
        connectButton.setAttribute('href',"personal-chat.html?id=" + chatID)
        singleChatDiv.appendChild(connectButton)
        historyDiv.appendChild(singleChatDiv)
    }
}


function chatButton(chatId) {
    $('#chatboxbutton').attr("href", "chat.html?id=" + chatId);
}

function getChatData(uniqueChatlist) {
    var allChatInfo = [];
    let sadArray = [];
    for (let i = 0; i < uniqueChatlist.length; i++) {
        sadArray.push(uniqueChatlist[i])
    }
        firebase.firestore()
            .collection('messages')
            .where('chat', 'in', sadArray)
            .get()
            .then(function (snapshot) {
                snapshot.forEach(function (doc) {
                    let tempArray = []
                    tempArray.push(doc.data().name) //allchatinfo[i][0]
                    tempArray.push(doc.data().chat)//allchatinfo[i][1]
                    tempArray.push(doc.id)//allchatinfo[i][2]
                    tempArray.push(doc.data().receiverName)//allchatinfo[i][3]
                    tempArray.push(doc.data().profilePicUrl)//allchatinfo[i][4]
                    allChatInfo.push(tempArray)
                    console.log(tempArray)
                })
                console.log(allChatInfo)
                var myFinalList = removeDuplicates(allChatInfo)
                createAndInsertChatHistory(myFinalList)

            })
            .catch(function (error) {
                console.log(error)
            })
    

}

function removeDuplicates(allChatInfo){
    let finalList = [];
    let uidList = []
    for (let i = 0; i < allChatInfo.length; i++){
        if (uidList.includes(allChatInfo[i][1])){
            console.log(allChatInfo[i][1]);
        }
        else{
            uidList.push(allChatInfo[i][1])
            finalList.push(allChatInfo[i])
    }
 }
    return finalList
}


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

//Grabs all the chats that have the logged in user's ID as a sender or a receiver
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