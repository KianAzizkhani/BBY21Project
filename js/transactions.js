firebase.auth().onAuthStateChanged(user => {
    db.collection("users").doc(user.uid).collection("transactions")
        .get()
        .then((snap) => {
            var increment = 0;
            var element = document.getElementById("allamounts");
            snap.forEach((doc) => {
                var amount = doc.data().Amount;
                var direction = doc.data().Direction;
                var title = doc.data().Title;
                var frequency = doc.data().Frequency;
                var time = doc.data().Time.toDate().toLocaleString();
                var tag = document.createElement("div");
                tag.innerHTML = '<table id="transaction' + increment + '" >';

                    element.append(tag);
                document.getElementById("transaction" + increment).innerHTML = '<tr><td id="amount"> Amount: $' 
                    + amount  + ' </td><td id="direction"> Direction: ' + direction + '</td> <td id="title">Title: ' 
                    + title + '</td><td id="frequency"> Frequency: ' + frequency + '</td><td id="time">' + time + "</td></tr>";

                increment++;
            }
            )
        }
        )
    });