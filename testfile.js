var btn = document.getElementById("get-records");
btn.addEventListener('click', buttonHandler);

function buttonHandler () {
  console.log("You have clicked");
  toggleButton(false);
  getRecords();
}

function toggleButton (loaded) {
  btn.innerHTML = loaded ? "Get next" : "Loading...";
  btn.classList.toggle("button-not-loading");
  btn.classList.toggle("button-loading");
}

function getRecords () {
  var ids           = Server.getIds();
  var allTheRecords = [];

  ids.forEach(function(recordId) {
    error = null;

    Server.getRecord(recordId, function(error, data) {
      allTheRecords.push(data);
      if (allTheRecords.length === ids.length) {
        processRecords(allTheRecords);
      }
    });
  });}

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
  var sorted         = records.sort(function(currentValue, nextValue) {
    currentValueDate = parseDate(currentValue.date);
    nextValueDate    = parseDate(nextValue.date);

    return currentValueDate - nextValueDate;
  });

  return sorted;
}

function parseDate(strDate) {
  var dateParts = strDate.split("/");
  return new Date(dateParts[2], (dateParts[1] -1), dateParts[0]);
}

function addTotals (records) {
  var hours = 0;
  var paid  = 0;

   records.forEach(function (element) {
    hoursWorked = parseHours(element.hoursWorked);
    hours      += hoursWorked;
    paid       += hoursWorked * element.hourlyRate;
  });

  document.getElementById("totals-annot").innerHTML = "TOTALS";
  document.getElementById("totals-hours").innerHTML = hours;
  document.getElementById("totals-paid").innerHTML = paid;
}

function parseHours(strHours) {
  return parseInt(strHours);
}
