const form = document.querySelector("#user-form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    db.collection("users").add({
        name: form.name.value,
        description: form.description.value
    });
    form.name.value = "";
    form.description.value = "";

}); 