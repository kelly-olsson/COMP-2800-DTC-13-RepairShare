
function createAndInsertChatHistory(allChatInfo) { //[['mahan', 'chatID], [['chris', chatid]]
    console.log("INSIDE CREATION")
    for (let i = 0; i < allChatInfo.length; i++) {
        let userName = allChatInfo[i][0]
        let chatID = allChatInfo[i][1]
        let historyDiv = document.getElementById('history');
        let singleChatDiv = document.createElement('div');
        // singleChatDiv.textContent = userName
        let link = document.createTextNode(userName);
        let connectButton = document.createElement('a');
        connectButton.appendChild(link)
        // connectButton.setAttribute('value', 'Message')
        // connectButton.setAttribute('type', 'button')
        connectButton.setAttribute('href',"personal-chat.html?id=" + chatID)
        singleChatDiv.appendChild(connectButton)
        historyDiv.appendChild(singleChatDiv)

        console.log("END OF CREATE DIV")

    }//end of for loop
    // return div;
}


//grab ONE chat ID (no duplicates), for each one, document.createElemenet(div), append the div to the "history" div.

function chatButton(chatId) {
    $('#chatboxbutton').attr("href", "chat.html?id=" + chatId);
}

//   var setID = "MNfZqn3fQ1Q1gZkTutxxp3Sxz5m1YasR9vy0hkdtI2fA9VWl7KdFCK93"
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
            console.log("duplicate");
            console.log(allChatInfo[i][1]);
        }
        else{
            uidList.push(allChatInfo[i][1])
            finalList.push(allChatInfo[i])
            console.log(allChatInfo[i])
    }
 }
    console.log(finalList)
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
                console.log(chatList)
                console.log(uniqueChatlist)
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

//     // Start listening to the query.
//     query.onSnapshot(function (snapshot) {
//       snapshot.docChanges().forEach(function (change) {
//         if (change.type === 'removed') {
//           deleteMessage(change.doc.id);
//         } else {
//           var message = change.doc.data();
//           displayMessage(change.doc.id, message.timestamp, message.name,
//             message.text, message.profilePicUrl, message.imageUrl);
//         }
//       });
//     });

// function removeChatDuplicated(chats){
//     let uniqueChats = [new Set(chats)]
//     console.log(uniqueChats)
//     return uniqueChats
// }


//   loadMessagedAfterStateChange();


//   const citiesRef = db.collection('cities');

//       //We define an async function
//       async function getIsCapitalOrCountryIsItaly() {
//         const isCapital = citiesRef.where('capital', '==', true).get();
//         const isItalian = citiesRef.where('country', '==', 'Italy').get();

//         const [capitalQuerySnapshot, italianQuerySnapshot] = await Promise.all([
//           isCapital,
//           isItalian
//         ]);

//         const capitalCitiesArray = capitalQuerySnapshot.docs;
//         const italianCitiesArray = italianQuerySnapshot.docs;

//         const citiesArray = capitalCitiesArray.concat(italianCitiesArray);

//         return citiesArray;
//       }

//       //We call the asychronous function
//       getIsCapitalOrCountryIsItaly().then(result => {
//         result.forEach(docSnapshot => {
//           console.log(docSnapshot.data());
//         });
//       });


// function getChatData(uniqueChatlist) {
//     let allChatInfo = [];
//   uniqueChatlist.forEach(function(element){
//       firebase.firestore()
//       .collection('messages')
//       .where('chat', '==', element)
//       .get()
//       .then(function (snapshot) {
//           let tempArray = []
//               tempArray.push(doc.data().name)
//               // tempArray.push(doc.id)
//               allChatInfo.push(tempArray) 
//               console.log(tempArray)

//       })
//       console.log(allChatInfo)


//   .catch(function(error){
//       console.log(error)
//   })
// })
// }

//             megaArray = []  
//             snapshot.forEach(function (doc) {
//                 let tempArray = []
//                 tempArray.push(doc.data().location)
//                 tempArray.push(doc.id)
//                 megaArray.push(tempArray)
//             })

//             setMarkers(map, megaArray)})
//             .catch(function(error){
//                 console.log(error)
//             })
// }
