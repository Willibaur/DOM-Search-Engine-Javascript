var btn = document.getElementById("get-records");
btn.addEventListener('click', buttonHandler);


function buttonHandler () {
  console.log("You have clicked");
  toggleButton(false);
  getRecords();
}

function toggleButton (loaded) {
  // fix this method to change the button text
  btn.innerHTML = loaded ? "Get next" : "Loading...";
  btn.classList.toggle("button-not-loading");
  btn.classList.toggle("button-loading");
}

function getRecords () {
  var ids = Server.getIds();
  var allTheRecords = [];

  ids.forEach(function(recordId) {
    error = null;
    Server.getRecord(recordId, function(error, data) {
      allTheRecords.push(data);
      processRecords(allTheRecords);
    });
  });
}
  // getting each corresponding record is an async operation
  // you need to make sure the list is not rendered until we have all the records!
  // you can get a SINGLE record by calling Server.getRecord(recordId, callbackFunction)
  // callbackFunction takes 2 parameters, error and data
  // the invocation will look like this

  // if the fetch is unsuccessful the callback function is invoked with the error only
  // if the fetch is successful the callback is invoked with error set to null, and data will holds the response (i.e. the record you wanted to retrieve)
  // the tricky thing (and what we are assessing) is how to wait for ALL the callbacks to complete before you process the responses?
  // HINT - you know how many times you need to call Server.getRecord before you do it...
  // ...meaning that you have a way of tracking how many have "called back"
  // when you have all the records, call processRecords as follows



function processRecords (records) {

  toggleButton(true);
  var sortedRecords = sortRecords(records);
  var html = "";
  var tr;
  sortedRecords.forEach(function (value) {
    tr = "";
    tr +=
    "<tr>" +
    "<td>" + value.date + "</td>" +
    "<td>" + value.name + "</td>" +
    "<td>" + value.natInsNumber + "</td>" +
    "<td>" + value.hoursWorked + "</td>" +
    "<td>" + value.hourlyRate + "</td>" +
    "<td>" + (value.hoursWorked * value.hourlyRate) + "</td>" +
    "</tr>";
    html += tr;
  });
  document.getElementById("results-body").innerHTML = html;
  addTotals(sortedRecords);
}

function sortRecords (records) {

  var sorted = records;
  // you get brownie points for sorting the results in date order, most recent last
  return sorted;
}

function addTotals (records) {

  var hours = 0;
  var paid = 0;

  // you get brownie points for fixing the total hours

  records.forEach(function (value, index) {
    hours += value.hoursWorked;
    paid += (value.hoursWorked * value.hourlyRate);
  });

  document.getElementById("totals-annot").innerHTML = "TOTALS";
  document.getElementById("totals-hours").innerHTML = hours;
  document.getElementById("totals-paid").innerHTML = paid;
}
