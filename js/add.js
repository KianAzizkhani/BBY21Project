document.getElementById("submitButton").addEventListener("click", addTransaction, false);
        
function addTransaction(event) {
    event.preventDefault();
    let Amount = document.getElementById("Amount").value;
    let Frequency = document.getElementById("Frequency").value;
    // let Category = document.getElementById("Category").value;
    let Title = document.getElementById("Title").value;

    let Direction = document.querySelector("input[name='IncomeOutcome']:checked").value;
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log("user is signed in, I'm adding transactions.");
            var currentUser = db.collection("users").doc(user.uid).collection("transactions");
            var userID = user.uid;
            currentUser.add({
                Amount: Amount,
                // Catgeory: Category,
                Frequency: Frequency,
                Title: Title,
                Direction: Direction,
                Time: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                location.reload();
            });

        } else {
            alert("You're not signed in!");
        }

        
    });

}