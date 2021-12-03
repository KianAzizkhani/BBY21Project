function insertName() {
    firebase.auth().onAuthStateChanged((user) => {

      if (user) {

        currentUser = db.collection("users").doc(user.uid);

        currentUser.get().then((userDoc) => {
          var user_Name = userDoc.data().name;
          document.getElementById("names").innerHTML = user_Name;
        });
      } else {

      }
    });
  }
  insertName();

  function insertEmail() {
    firebase.auth().onAuthStateChanged((user) => {

      if (user) {

        currentUser = db.collection("users").doc(user.uid);

        currentUser.get().then((userDoc) => {
          var user_Name = userDoc.data().email;
          document.getElementById("emails").innerHTML = user_Name;
        });
      } else {

      }
    });
  }
  insertEmail();