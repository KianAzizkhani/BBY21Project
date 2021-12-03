var userID;
function addGoal() {
        let Goal = document.getElementById("Goal").value;
        let Category = document.getElementById("Category").value;

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log("user is signed in, I'm adding a goal.")
                var currentUser = db.collection("users").doc(user.uid).collection("Goal");
                userID = user.uid;

                currentUser.add({
                    Goal: Goal,
                    Category: Category,
                    // date: automatic
                });
                read_display_goal();
            } else {
                console.log("no user signed in");
            }
        });
    }

    function read_display_goal(){
        var currentUser = db.collection("users").doc(userID).collection("Goal")
            .onSnapshot(GoalDoc=>{
                addGoalRow(GoalDoc.docs);
                GoalDoc.docs.forEach(doc => {
                    document.getElementById("goal-goes-here").innerText = doc.data().Goal;
                    document.getElementById("Category-goes-here").innerText = doc.data().Category;

                });
            })
    }

    function addGoalRow(docs) {
        let template = document.getElementById("template");
        let container = document.getElementById("tabledata");

        while (container.firstChild){
            container.removeChild(container.firstChild);
        }

        docs.forEach(doc => {

            let newRow = template.cloneNode(true);

            newRow.querySelector('#goal-goes-here').innerHTML = doc.data().Goal;
            newRow.querySelector('#Category-goes-here').innerHTML = doc.data().Category;
            container.appendChild(newRow);

        })
    }