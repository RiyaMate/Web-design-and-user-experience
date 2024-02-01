//Title constructor function that creates a Title object
function Title(t1) {
  this.mytitle = t1;
}

Title.prototype.getName = function () {
  return this.mytitle;
};

var socialMedia = {
  facebook: "http://facebook.com",
  twitter: "http://twitter.com",
  flickr: "http://flickr.com",
  youtube: "http://youtube.com",
};

var t = new Title("CONNECT WITH ME!");
var numOfChecks = 0;

function getParentByTagName(obj, tagName) {
  tagName = tagName.toLowerCase();
  while (
    obj != null &&
    obj.tagName != null &&
    obj.tagName.toLowerCase() != tagName
  ) {
    obj = obj.parentNode;
  }
  return obj;
}
function onClickCheckBox(checkBox) {
  var table = document.getElementById("myTable");

  var dum = table.firstElementChild.lastElementChild;

  var headercheck =
    table.firstElementChild?.lastElementChild?.lastElementChild?.innerHTML ||
    dum;
  var tableHeader = table.firstElementChild.lastElementChild;
  var btnSubmit = document.getElementById("button");

  //Add header to table
  if (checkBox.checked == true) {
    numOfChecks += 1;
    tableHeader.style.backgroundColor = "wheat";
    if (headercheck != "Edit") {
      var DeleteHeader = document.createElement("th");
      DeleteHeader.innerHTML = '<th id="del-header">Delete</th>';
      DeleteHeader.setAttribute("id", "d-h");
      var EditHeader = document.createElement("th");
      EditHeader.innerHTML = '<th id="edit-header">Edit</th>';
      EditHeader.setAttribute("id", "e-h");
      btnSubmit.style.background = "Orange";
      btnSubmit.style.backgroundColor= "Orange";
      btnSubmit.disabled=false;
      tableHeader.appendChild(DeleteHeader);
      tableHeader.appendChild(EditHeader);
    }
  } else {
    numOfChecks -= 1;
    if (numOfChecks === 0) {
      document.getElementById("d-h").remove();
      document.getElementById("e-h").remove();
      btnSubmit.style.background = "Grey";
      btnSubmit.style.backgroundColor= "Grey";
      btnSubmit.disabled= true;
    }
    if (headercheck != "Edit") {
      tableHeader.style.backgroundColor = "#fff";
    }
  }

  var mainRow = getParentByTagName(checkBox, "tr");

  if (checkBox.checked == true) {
    mainRow.style.backgroundColor = "yellow";
    var DeleteBtn = document.createElement("td");
    var EditBtn = document.createElement("td");
    DeleteBtn.innerHTML =
      '<button id="deleted" type="button" onclick="onDeleteRow(this)">Delete</button>';
    EditBtn.innerHTML =
      '<button id="edit" type="button" onclick="onEditRow(this)">Edit</button>';
    mainRow.appendChild(DeleteBtn);
    mainRow.appendChild(EditBtn);
  } else {
    mainRow.style.backgroundColor = "#fff";
    mainRow.deleteCell(-1);
    mainRow.deleteCell(-1);
  }
}

let studentCount = 4;

function addRecord() {
  const studentTableBody = document.querySelector("#myTable tbody");
  const studentName = `Student ${studentCount}`;
  const teacherName = `Teacher ${studentCount}`;
  const approvedName = `Approved`;
  const fall = `Fall`;
  const ta = `TA`;
  const id = `25379${studentCount}`;
  const percent = `100%`;

  // Create a new row for the student
  const newRow = document.createElement("tr");

  newRow.innerHTML = `<td><input type="checkbox" onclick="onClickCheckBox(this)" <br><br></br><img src="down.png" id="expandButton" width="25px" onclick="onExpand(this)" /></td>
                <td>${studentName}</td>
                <td>${teacherName}</td>
                <td>${approvedName}</td>
                <td>${fall}</td>
                <td>${ta}</td>
                <td>${id}</td>
                <td>${percent}</td>
                
            `;

  studentCount++;

  studentTableBody.appendChild(newRow);
  const newExpandedRow = document.createElement("tr");
  newExpandedRow.setAttribute("class", "dropDownTextArea");
  newExpandedRow.classList.toggle("invisible");
  newExpandedRow.innerHTML = `<td colspan="8">
  Advisor:<br /><br />
  Award Details<br />
  Summer 1-2014(TA)<br />
  Budget Number: <br />
  Tuition Number: <br />
  Comments:<br /><br /><br />
  Award Status:<br /><br /><br />
</td>`;
  studentTableBody.append(newExpandedRow);
}
function onExpand(img) {
  
  const selectedRow = getParentByTagName(img, "tr");
  
  const expandedRow = selectedRow.nextElementSibling;
  
  expandedRow.classList.toggle("invisible");
}

function onDeleteRow(deletedRef) {
  var tableHeader = deletedRef.parentElement.parentElement;
  var index = tableHeader.rowIndex;

  // Check if the header row has "Edit" content
  if (index === 0) {
    var headerRow =
      tableHeader.parentElement.parentElement.firstElementChild.lastElementChild
        .lastElementChild.innerHTML;
    if (headerRow === "Edit") {
      var selectedHeader =
        tableHeader.parentElement.parentElement.firstElementChild
          .lastElementChild;

      // Check if there are at least two cells to delete in the header row
      if (selectedHeader.children.length >= 2) {
        selectedHeader.deleteCell(1);
        selectedHeader.deleteCell(1);
      }
    }
  }

  // Delete the selected row
  var table = document.getElementById("myTable");
  table.deleteRow(index);
  table.deleteRow(index);
  numOfChecks -= 1;
  if (numOfChecks === 0) {
    document.getElementById("d-h").remove();
    document.getElementById("e-h").remove();
  }
  alert("Want to delete Student " + index + "Details");
}

function onEditRow(editRef){
  index=(index+1)/2;
  console.log(index)
    let person = prompt(" Edit Student" + index + "Details");
    alert("Student" + index + " has been Edited")
}



