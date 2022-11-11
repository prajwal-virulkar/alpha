//const api_url = "<heroku_app_url>"
const api_url = "https://alpha-project-flask.herokuapp.com/users"
function loadData(records = []) {
    var table_data = "";
    for (let i = 0; i < records.length; i++) {
        table_data += `<tr>`;
        table_data += `<td>${records[i].name}</td>`;
        table_data += `<td>${records[i].age}</td>`;
        table_data += `<td>${records[i].contact}</td>`;
        table_data += `<td>${records[i].class}</td>`;
        table_data += `<td>`;
        table_data += `<a href="edit.html?id=${records[i]._id}"><button class="btn btn-primary">Edit</button></a>`;
        table_data += '&nbsp;&nbsp;';
        table_data += `<button class="btn btn-danger" onclick=deleteData('${records[i]._id}')>Delete</button>`;
        table_data += `</td>`;
        table_data += `</tr>`;
    }
    //console.log(table_data);
    document.getElementById("tbody").innerHTML = table_data;
}
function getData() {
    fetch(api_url)
        .then((response) => response.json())
        .then((data) => {
            console.table(data);
            loadData(data);
        });
}
function getDataById(id) {
    fetch(`${api_url}/${id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            document.getElementById("name").value = data.name;
            document.getElementById("age").value = data.age;
            document.getElementById("mobile no.").value = data.contact;
            document.getElementById("lass").value = data.class;
        })
}
function postData() {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var contact = document.getElementById("contact").value;
    var lass = document.getElementById("class").value;
    data = { name: name, age: age, contact: contact, lass: lass };
   
   
    fetch(api_url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            window.location.href = "index.html";
        })
}
function putData() {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var contact = document.getElementById("contact").value;
    var lass = document.getElementById("class").value;
    data = { name: name, age: age, contact: contact, lass: lass };
    fetch(api_url, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then((data) => {
            console.table(data);
            window.location.href = "index.html";
        })
}
function deleteData(id) {
	console.log(JSON.stringify({"id": id}));
	
	user_input = confirm("Are you sure you want to delete this record?");
	if(user_input) {
		fetch(api_url+"?id="+id, {
			method: "DELETE",
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			//params: JSON.stringify({"?id": id})
		})
		.then((response) => response.json())
		.then((data) => { 
			console.log(data); 
			// window.location.reload();
		window.location.href = "index.html";

		})
	}
}