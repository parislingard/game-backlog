const GameList = [];
const tableBody = document.querySelector(".table-body");
const submitBtn = document.querySelector("#submit-btn");
const titleInput = document.querySelector("#title");
const genreInput = document.querySelector("#genre");
const consoleInput = document.querySelector("#console");
const statusSelect = document.querySelector("#status");

submitBtn.onclick = (event) => {
  event.preventDefault();
  if(titleInput.value.trim().length == 0 || genreInput.value.trim().length == 0){
    alert("Fill all the inputs");
  }else{
    addGame(new Game(titleInput.value, genreInput.value, consoleInput.value, (statusSelect.value == "true")));
    titleInput.value = null;
    genreInput.value = null;
    consoleInput.value = null;
    statusSelect.value = null;
  }
  
}

function Game(title, genre, console, status) {
  this.title = title;
  this.genre = genre;
  this.console = console;
  this.status = status;
  this.info = function() {
    return this.title + ", " + this.genre + " currently playing: " + this.playing;
  };
  this.setStatus = function(){
    this.status = !this.status
  }
}

function addGame(game) {
  GameList.push(game);
  console.log("Game Created!", game);
  render();
}


function render() {
  tableBody.innerHTML = "";
  GameList.forEach((game, index) => {
    let tr = document.createElement("tr");

    let td = document.createElement("td");
    td.appendChild(document.createTextNode(index));
    tr.appendChild(td);

    td = document.createElement("td");
    td.appendChild(document.createTextNode(game.title));
    tr.appendChild(td);

    td = document.createElement("td");
    td.appendChild(document.createTextNode(game.genre));
    tr.appendChild(td);
    
    td = document.createElement("td");
    td.appendChild(document.createTextNode(game.console));
    tr.appendChild(td);

    td = document.createElement("td");
    //td.appendChild(document.createTextNode(game.status));
    btn = document.createElement("button");
    btn.classList.add("btn")
    if(!game.status){
      btn.classList.add("btn-outline-info")
      btn.innerHTML = "Playing";
    }else{
      btn.classList.add("btn-success")
      btn.innerHTML = "Finished";
    }
    btn.onclick = () => {
      console.log(game, index);
      //GameList[index].setStatus();
      game.setStatus();
      render();
    };
    td.appendChild(btn);
    tr.appendChild(td);

    td = document.createElement("td");
    btn = document.createElement("button");
    btn.classList.add("btn")
    btn.classList.add("btn-danger")
    btn.innerHTML = "<i class='fas fa-trash-alt'></i>";
    btn.onclick = () => {
      GameList.splice(index, 1);
      render();
    };
    td.appendChild(btn);
    tr.appendChild(td);

    tableBody.appendChild(tr);
  });
}