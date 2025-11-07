const dataArray = data.toReversed();
const customWorksDataArray = customWorksData;
let itemsToShow = 6; // Number of items to show initially
let itemsPerLoad = 6; // Number of items to load on each click
const loadMoreBtn = document.querySelectorAll('.loadMore');

function ourWorks() {
    if (dataArray.length > 0) {
        const wrapper = document.querySelector(".before-after-wrapper");
        const beforeLabel = 'До';
        const afterLabel = 'Після';
        let fullBox = '';
        if (wrapper) {
            dataArray.forEach(e => {
                let sliderBox = `
                            <div id="${e.category}" class="slider-container" data-key="${e.id}">
                                <div class="before-image">
                                    <img src="${e.beforeUrl}" alt="Before Image">
                                    <div class="before-text">${beforeLabel}</div>
                                </div>
                                <div class="after-image">
                                    <img src="${e.afterUrl}" alt="After Image">
                                    <div class="after-text">${afterLabel}</div>
                                </div>
                                <div class="slider-handle" id="sliderHandle"></div>
                                <div class="slider-line">
                                    <div class="pulse-container">
                                        <svg role="presentation" focusable="false" fill="none" width="50" height="50" viewBox="0 0 50 50">
                                            <g>
                                            <rect width="50" height="50" rx="25" fill="#ffffff"></rect>
                                            <path d="m19.25 19-6 6 6 6m11.5 0 6-6-6-6" stroke="#000000" stroke-width=".75" stroke-linecap="square"></path>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </div> `;
                fullBox += sliderBox;
            });
            wrapper.innerHTML = fullBox;
        }
    }
};

function customWorks() {
    if (customWorksDataArray.length > 0) {
        const wrapper = document.querySelector(".custom-works-wrapper");
        let fullBox = '';
        if (wrapper) {
            customWorksDataArray.forEach(e => {
                let imgBox = `
                            <div id="${e.category}" class="img-container" data-key="${e.id}">
                                <div class="image">
                                    <img src="${e.url}" alt="Image">
                                </div>
                            </div>`
                fullBox += imgBox;
            })
            wrapper.innerHTML = fullBox;
        }
    }
}

function showItems(block, loadMoreBtn) {
    let items = document.querySelectorAll(block);

    for (let i = 0; i < itemsToShow && i < items.length; i++) {
        items[i].classList.add('visible');
    }
    // Hide the button if all items are visible
    if (itemsToShow >= items.length) {
        loadMoreBtn.style.display = 'none';
    }
}

loadMoreBtn.forEach((e, i) => {
    e.addEventListener('click', () => {
        itemsToShow += itemsPerLoad;
        i == 0 ? showItems('.slider-container', loadMoreBtn[0]) : showItems('.img-container', loadMoreBtn[1]);
    });
})



// Initial display
ourWorks();
customWorks();
setTimeout(() => { showItems('.slider-container', loadMoreBtn[0]) }, 500);
setTimeout(() => { showItems('.img-container', loadMoreBtn[1]) }, 500);


