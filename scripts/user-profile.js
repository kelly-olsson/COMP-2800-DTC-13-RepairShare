// Read user info from firebase and populates profile page accordingly
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
                    var picture = doc.data().profilePicture;
                    var userattributes = doc.data().attribute; 


                    $("#usernamegoeshere").text(name.toUpperCase());
                    $("#usercanhelp").text(name.toUpperCase());
                    $("#about").text(description);
                    $("#profile-photo").attr("src", picture);

                    for(var index = 0; index < skills.length; index++){          
                        let skill = skills[index];              

                        $(document).ready(function(){
                            var $skillset = '<li>' + skill + '</li>';
                            $("#skillsinfo").append($skillset)
                        })
                    }

                    Object.keys(tools).forEach(key=>{
                        if (tools[key] == true) {
                          let toolitem = key; 

                          $(document).ready(function(){
                              var $toolkit = '<li>'+ toolitem + '</li>'
                              $("#toolz").append($toolkit);
                          })

                      }
                        
                    })

                    Object.keys(userattributes).forEach(key=>{
                        if (userattributes[key] == true && key == 'Handy Certified'){

                            let handy = key;
                            let handyicon = '<span class="iconify" id="tooldescription" data-icon="bpmn:hand-tool" data-inline="false" data-height="32"></span> '


                            $(document).ready(function(){ 
                                var $handy = '<p id= "description">' + handyicon + handy + '</span>' + '</p>'
                                $('#userattributes').append($handy);
                            })
                        }
                        else if (userattributes[key] == true && key == 'Tool Share Member'){

                            let tooly = key; 
                            let toolicon = '<span class="iconify" id="tooldescription" data-icon="ion:hammer-sharp" data-inline="false" data-height="32"></span> ';
                            $(document).ready(function(){ 
                                var $handy = '<p id= "description">' + toolicon + tooly + '</span>' + '</p>'
                                $('#userattributes').append($handy);
                            })
                        }
                    })
                })
        }
    })
}

sayHello();