// Read user info from firebase and greet user based on user's name.
function sayHello() {
    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {
            db.collection("users")
                .doc(somebody.uid)
                .get()
                .then(function (doc) {
                    var name = doc.data().name;
                    var description = doc.data().description;
                    var skills = doc.data().skills;
                    var tools = doc.data().tools;



                    $("#usernamegoeshere").text(name);
                    $("#about").text(description);

                    for(var index = 0; index < skills.length; index++){          
                        let skill = skills[index];              

                        $(document).ready(function(){
                            var $skillset = '<p>' + skill + '</p>';
                            $("#skillsinfo").append($skillset)
                        })
                    }

                })
        }
    })
}

sayHello();