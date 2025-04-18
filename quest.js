function Quest(Name,Priority){
    this.name = Name;
    this.priority = Priority;
    this.date = new Date().toLocaleString();

    this.bilgi = function(){
        return `${this.name} - ${this.priority} - ${this.date}`;
    };
}

function SaveQuests(){
    let QuestList = document.getElementById("QuestList").children;
    let Quests = [];

    for(let quest of QuestList){
        let name = quest.querySelector("span").textContent;
        let priority = quest.getAttribute("data-priority")
        let date = quest.getAttribute("data-date")

        Quests.push(new Quest(name,priority,date));
    }

    localStorage.setItem("Quests", JSON.stringify(Quests));
}

function LoadQuests(){
    let SavedQuests = localStorage.getItem("Quests");

    if(SavedQuests){
        let Quests = JSON.parse(SaveQuests);
        Quests.forEach(quest => (new Quest(quest.name,quest.priority,quest.date)));
    }
}

function AddQuest(quest){
    let QuestList = document.getElementById("QuestList")

    let listquest = document.createElement("li")
    listquest.classList.add("list-group-item","d-flexd","justify-content-between","align-items-center");
    listquest.setAttribute("data-priority",quest.priority);
    listquest.setAttribute("data-date",quest.date);

    let span = document.createElement("span")
    span.innerHTML = quest.name;

    let div = document.createElement("div")
    let infobtn = document.createElement("button")
    
    infobtn.classList.add("btn","btn-primary","btn-sm","me-2")
    infobtn.textContent = "Get Info";

    infobtn.addEventListener("click",() =>{
       
    })
    let delbtn = document.createElement("button");
    delbtn.classList.add("btn","btn-danger","btn-sm");
    delbtn.innerHTML = "Delete"

    delbtn.addEventListener("click",() =>{
        listquest.remove();
    })

    div.appendChild(infobtn);
    div.appendChild(delbtn);
    listquest.appendChild(span);
    listquest.appendChild(div);
    QuestList.appendChild(listquest);

    SaveQuests();
}




let AddQuestButton = document.getElementById("AddQuestBtn");


AddQuestButton.addEventListener("click",() =>{
    
    let QuestNameInput = document.getElementById("QuestName").value;
    let QuestPriority = document.getElementById("priority").value;

    print(QuestNameInput)
    if(!QuestNameInput){
        alert("Enter a Quest name!!");
        return;
    }
    let newquest = new Quest(QuestNameInput,QuestPriority);
    AddQuest(newquest);
    document.getElementById("QuestName").value = "";
});

document.addEventListener("DOMContentLoaded",LoadQuests)