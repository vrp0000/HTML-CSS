var home = document.querySelector(".container");
let taskList = [];

var addTask = (event) => {
  let id = event.target.className.split(" ");
  id = id[id.length - 1];
  document.querySelector(".subTask-popupadd").classList.add(id);
  popup($(".subTask-popup"));
};

var popup = (node, id = "") => {
  home.classList.add("blur");
  node.css({ display: "flex" });
};

var close = (node, id = 0) => {
  node.css({ display: "none" });
  home.classList.remove("blur");
  document.querySelector(".subTask-popupadd").classList.remove(id);
};

var deleteTask = (event) => {
  let id = event.target.className.split(" ");
  id = id[id.length - 1];
  var element = $("#" + id);
  element.remove();
  taskList.forEach((element, index) => {
    if (element.category === id) {
      taskList.splice(index, 1);
    }
  });
};

//List Add popup

document.querySelector(".btn").addEventListener("click", () => {
  popup($(".category-popup"));
});

//Card add
$(".category-popupadd").click((event) => {
  let category = document.querySelector(".category-popuptextbox").value;
  taskList.push({ category: category, subTask: [] });
  var content = document.querySelector(".content");
  var card = document.createElement("div");
  card.className = "card " + category;
  card.id = category;

  card.innerHTML = `
    <div class="card-heading"> ${category}<hr/></div>
    <div class="cntnt-hdr2 cntnt-hdr2-${category}">
      <ol class="list-${category}"></ol>
    </div>
    <div class="cntnt-hdr3">
      <div class="delete far fa-trash-alt ${category}" onClick=deleteTask(event)>
        </div>
      <div class="iconadd fas fa-plus-circle ${category}" onClick=addTask(event)>
        </div>
    </div>`;
  content.append(card);

  close($(".category-popup"), category);
});

//close category popup
$(".category-popupclose").on("click", () => {
  close($(".category-popup"));
});

//SubTask Add popup
$(".subTask-popupadd").on("click", () => {
  let categoryArr = event.target.className.split(" ");
  let getCategory = categoryArr[categoryArr.length - 1];
  let index = 0;
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].category == getCategory) {
      index = i;
      break;
    }
  }
  taskList[index].subTask.push($(".subTask-popuptextbox").val());
  let entry = document.createElement("li");
  entry.innerText = `${$(".subTask-popuptextbox").val()}`;
  entry.id = $(".subTask-popuptextbox").val();
  let completedButton = document.createElement("button");
  completedButton.className = "mark completed-" + getCategory;
  completedButton.setAttribute("onclick", "completed(event)");
  completedButton.innerText = "Mark Done";
  entry.append(completedButton);
  document.querySelector(".list-" + getCategory).append(entry);

  close($(".subTask-popup"), getCategory);
});

var completed = (event) => {
  console.log("classname = ", event.target.parentElement.id);
  var element = event.target.parentElement.id;
  console.log(element);
  $("#" + element).addClass("task-done ");

  console.log("event", event.target);
  for (var item of taskList) {
    for (let i = 0; i < item.subTask.length; i++) {
      if (item.subTask[i] === element) {
        console.log(
          "Present at " + i + " array index = " + taskList.indexOf(item)
        );
        taskList[taskList.indexOf(item)].subTask.splice(i, 1);
      }
    }
  }
  event.target.style.display = "none";
  // $("#" + element).remove();
};

//close subTask popup

$(".subTask-popupclose").on("click", () => {
  close($(".subTask-popup"));
});
