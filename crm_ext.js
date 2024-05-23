const inputel = document.querySelector("#input-el");
const saveel = document.querySelector("#save-el");
const ulel = document.querySelector("#ul-el");
const delel=document.querySelector("#del-el");
const save_tab_el=document.querySelector("#save_tab-el");
let leads = [];
const leads_local_str=JSON.parse(localStorage.getItem("leads"));
if(leads_local_str){
    leads=leads_local_str;
    render(leads);
}
save_tab_el.addEventListener("click",function(){
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        leads.push(tabs[0].url);
        localStorage.setItem("leads",JSON.stringify(leads));
        render(leads);
    })
})

delel.addEventListener("dblclick",function(){
    localStorage.clear();
    leads = [];
    render(leads);
});

saveel.addEventListener("click", function () {
    leads.push(inputel.value);
    inputel.value = "";
    localStorage.setItem("leads",JSON.stringify(leads));
    console.log(localStorage.getItem("leads"));
    render(leads);
});

function render(leads) {
    let listitem = "";
    for (let i = 0; i < leads.length; i++) {
        console.log(leads[i]);  
        listitem += 
        `<li>
             <a href="${leads[i]}" target='_blank'>
                ${leads[i]}
            </a>
        </li><hr>
    `;
    }
    ulel.innerHTML = listitem;
}
