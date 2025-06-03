let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const leadsCountEl = document.getElementById("leads-count")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

// Chrome Tabs API will be used to get current tab

function updateLeadsCount() {
    leadsCountEl.textContent = myLeads.length
}

function render(leads) {
    let listItems = ""
    if (leads.length === 0) {
        ulEl.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM17 12H15V15H12V17H15V20H17V17H20V15H17V12Z"/>
                </svg>
                <h3>No leads yet</h3>
                <p>Start adding leads to build your collection</p>
            </div>
        `
    } else {
        for (let i = 0; i < leads.length; i++) {
            listItems += `
                <li>
                    <a target='_blank' href='${leads[i]}'>
                        ${leads[i]}
                    </a>
                </li>
            `
        }
        ulEl.innerHTML = listItems
    }
    updateLeadsCount()
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    if (inputEl.value.trim()) {
        myLeads.push(inputEl.value.trim())
        inputEl.value = ""
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    }
})

tabBtn.addEventListener("click", function() {
    // Use Chrome Tabs API to get current active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

// Enter key functionality
inputEl.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        inputBtn.click()
    }
})

// Initialize
render(myLeads)