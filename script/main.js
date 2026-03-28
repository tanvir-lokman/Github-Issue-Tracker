const cardModal = getEliment('cardModal');

const showIssueCardModal = async (id) => {
    cardModal.innerHTML = '';
    cardModal.showModal();

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data = await res.json();
    const card = data.data;

    const statusStyle = card.status === 'open' ? 'bg-[#00A96E]' : 'bg-[#EF4444]';
    const issueDate = new Date(card.createdAt).toLocaleDateString('en-US')

    const priorityStyle = {
        high: 'bg-[#EF4444] ',
        low: 'bg-[#9CA3AF]',
        medium: 'bg-[#F59E0B]',
    };

    const modal = document.createElement('div');

    modal.innerHTML = `
         <div class="modal-box w-full md:min-w-150">
             <h3 class="text-2xl font-bold">${card.title}</h3>
                <div class="flex sm:flex-row flex-col sm:items-center text-sm sm:gap-5 gap-1 my-3">
                   <li class="${statusStyle} capitalize rounded-full w-20 flex items-center justify-center py-1 text-white font-medium list-none">
                      ${card.status}
                   </li>
                   <li class="list-inside font-medium text-gray-500 capitalize">
                      Opened by ${card.author.replaceAll('_', ' ')}
                   </li>
                   <li class="list-inside font-medium text-gray-500">${issueDate}</li>
                </div>
             <!-- card badges -->
             <div class="flex items-center flex-wrap gap-2 mt-4 py-1">
                ${card.labels.map((l) =>
        `<div class="px-3 py-1 rounded-full font-medium badge-sm uppercase ${labelStyles[l.replaceAll(' ', '_')].color}">
                        ${labelStyles[l.replaceAll(' ', '_')].icon} ${l}
                     </div>`).join('')
        }
             </div>
             <p class="text-gray-500 text-sm py-5">${card.description}</p>
             <div class="bg-[#F8FAFC] p-3">
                <div class="flex items-start justify-between">
                     <h2 class="flex gap-2 items-center text-gray-500">Assignee: 
                        <span class="text-zinc-800 font-semibold capitalize">
                           ${removeSpace(card.assignee) === '' ? 'N/A' : card.assignee.replaceAll('_', ' ')}
                        </span>
                     </h2>
                     <h2 class="flex gap-2 items-center text-gray-500">Priority: 
                        <span class="px-5 uppercase py-1 text-sm rounded-full text-white ${priorityStyle[card.priority]}">
                           ${card.priority}
                        </span>
                     </h2>
                </div>
             </div>
             <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn btn-primary px-7">Close</button>
                </form>
             </div>
         </div>
      `;

    cardModal.appendChild(modal);
};

const getEliment = (id) => document.getElementById(id);
const removeSpace = (text) => text.trim().replaceAll(' ', '');

const loadingSpinner = (isLoading) => {
    const spinner = getEliment('loadingSpinner');
    if (isLoading) {
        spinner.classList.remove('hidden')
        spinner.classList.add('flex')
    } else {
        spinner.classList.add('hidden')
        spinner.classList.remove('flex')
    }
}
const issueNotFound = (isFound) => {
    const notFound = getEliment('issueNotFound');
    if (!isFound) {
        notFound.classList.add('hidden')
        notFound.classList.remove('flex')
    } else {
        notFound.classList.remove('hidden')
        notFound.classList.add('flex')
    }
}

const priorityStyle = {
    high: 'bg-[#FEECEC] text-[#EF4444]',
    low: 'bg-[#EEEFF2] text-[#9CA3AF]',
    medium: 'bg-[#FFF6D1] text-[#F59E0B]',
};

const labelStyles = {
    bug: {
        color: 'bg-[#FEECEC] text-[#EF4444] border border-[#FECACA]',
        icon: `<i class="fa-solid fa-bug"></i>`
    },
    help_wanted: {
        color: 'bg-[#FFF8DB] text-[#D97706] border border-[#FDE68A]',
        icon: `<i class="fa-solid fa-hands-helping"></i>`
    },
    enhancement: {
        color: 'bg-[#DEFCE8] text-[#00A96E] border border-[#BBF7D0]',
        icon: `<i class="fa-solid fa-rocket"></i>`
    },
    good_first_issue: {
        color: 'bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD]',
        icon: `<i class="fa-solid fa-seedling"></i>`
    },
    documentation: {
        color: 'bg-[#F3E8FF] text-[#9333EA] border border-[#E9D5FF]',
        icon: `<i class="fa-solid fa-book"></i>`
    },
};


const issueCard = (item) => {
    const card = document.createElement('div');
    const cardBorderStyle = item.status === 'open' ? '#00A96E' : '#A855F7';
    const cardStatusIcon = item.status === 'open' ? '../assets/Open-Status.png' : '../assets/Closed-Status.png'
    const issueDate = new Date(item.createdAt).toLocaleDateString('en-US')
    card.className = `card w-full bg-base-100 card-xs shadow-sm hover:-translate-y-1 ease-in-out duration-300 
                      border-t-3 p-4 border-[${cardBorderStyle}]`;

    card.innerHTML = `
      <div class="card-body" onclick="showIssueCardModal('${item.id}')">
          <!-- card top -->
          <div class="flex items-center gap-2 justify-between w-full">
              <img src=${cardStatusIcon} alt="Status" class="size-7" />
              <div class="uppercase py-1 font-medium text-[12px] px-7 rounded-full ${priorityStyle[item.priority]}">
                  ${item.priority}
              </div>
          </div>

          <!-- card middle -->
          <div class="py-3 border-b border-gray-200">
              <h2 class="font-semibold text-xl">${item.title}</h2>
              <p class="text-gray-500 text-sm text-ellipsis font-medium mt-2">
                ${item.description.length > 80 ? item.description.slice(0, 80) + '...' : item.description}
              </p>

              <!-- card badges -->
              <div class="flex items-center flex-wrap gap-2 mt-4 py-1">
                  ${item.labels
            .map((l) =>
                `<div class="px-3 py-1 rounded-full font-medium badge-sm uppercase ${labelStyles[l.replaceAll(' ', '_')].color}">
                            ${labelStyles[l.replaceAll(' ', '_')].icon} ${l}
                        </div>`).join('')
        }
              </div>
          </div>

          <!-- card bottom -->
          <div class="mt-2">
              <h2 class="font-medium text-[14px] text-gray-500">#${item.id} by ${item.author}</h2>
              <h2 class="font-medium text-[14px] text-gray-500">${issueDate}</h2>
          </div>
      </div>`;

    return card;
};

const issueCardContainer = getEliment('issueCardContainer');
const tabButtons = document.querySelectorAll('.tabButton');
const totalIssues = getEliment('totalIssueCount');
let currentSelectedTab = 'all';

const fetchAllData = async () => {
    loadingSpinner(true);
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();
    loadingSpinner(false);

    return data.data;
};

const searchData = async (text) => {
    loadingSpinner(true);
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`);
    const data = await res.json();
    loadingSpinner(false);
    return data.data;
};

const renderCards = async () => {
    issueCardContainer.innerHTML = '';

    const data = await fetchAllData();

    const filterData =
        currentSelectedTab === 'all' ? data : data.filter((d) => d.status === currentSelectedTab);
    totalIssues.innerText = `${filterData.length} issues`;

    if (filterData) {
        filterData.forEach((item) => {
            issueCardContainer.appendChild(issueCard(item));
        });
        issueNotFound(false);
    }

    tabButtons.forEach((btn) => {
        btn.classList.remove('btn-primary', 'border-none');
        if (btn.getAttribute('data-value') === currentSelectedTab) {
            btn.classList.add('btn-primary', 'border-none');
        }
    });
};

// tab menu buttons
tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        currentSelectedTab = btn.getAttribute('data-value');
        renderCards();
    });
});

// search options
const searchBtn = getEliment('searchBtn');
const searchInput = getEliment('searchInput');

searchBtn.addEventListener('click', async () => {
    if (!removeSpace(searchInput.value).length) return;
    issueCardContainer.innerHTML = '';

    const data = await searchData(searchInput.value);
    totalIssues.innerText = `${data.length} issues`;

    if (data.length) {
        data.forEach((item) => {
            issueCardContainer.appendChild(issueCard(item));
        });
        issueNotFound(false);
    } else {
        issueNotFound(true);
    }
});

renderCards();