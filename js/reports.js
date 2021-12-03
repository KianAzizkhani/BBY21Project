function chartMyData() {
    var labels = []; //insert task names here
    var values = []; //insert timespent values here

    //read data from Firestore

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        db.collection("users").doc(user.uid).collection("transactions") //must be letter perfect
          .where("Direction", "==", "Outcome")     //search by "L"arge size
          .orderBy("Time")          //sort by completion date
          .get()
          .then(function (snap) {
            snap.forEach(function (doc) {
              console.log(doc.data()); //just to check
              let y = doc.data().Amount; //y-axis
              let x = doc.data().Time.toDate().toLocaleString(); //x-
              values.push(y);     //timespent display on y
              labels.push(x);     //nickname display on x
              console.log(labels);
              console.log(values);
            })
            displayGraph(labels, values); //Display data from arrays
          })
      } else {
        // No user signed in. 
      }
    })

  }
  chartMyData();

  function displayGraph(xlabels, yvalues) {
    //define the graphing area
    var grapharea = document.getElementById('myChart');

    //assemble data for chart
    const data = {
      labels: xlabels,
      datasets: [{
        label: 'Amount',
        backgroundColor: 'rgb(181, 126, 255)',
        borderColor: 'rgb(255, 99, 132)',
        data: yvalues
      }]
    };

    const config = {
      type: 'bar',     //specify the kind of chart
      data: data,
      options: {}
    };

    //launch ie. "create" the chart
    const myChart = new Chart(grapharea, config)
  }