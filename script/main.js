const loadissues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((json) => displayIssues(json.data))
};

const displayIssues = (issues) => {
    const issueCardContainer = document.getElementById("issue-Card-Container");
    issueCardContainer.innerHTML = "";

    for (let issue of issues) {
        const issuediv = document.createElement("div")
        issuediv.innerHTML = `
        
        `;

        issueCardContainer.append(issuediv);
    }
};


loadissues();  

