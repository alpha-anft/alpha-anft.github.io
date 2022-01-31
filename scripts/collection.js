
function populateCollection(container, numberOfImages) {
    if (container.children.length > 0) {
        // Already populated
        return;
    }

    for (let i = 1; i <= numberOfImages; i++) {
        const imageCard = document.createElement('div');
        imageCard.classList.add('collection-image-card');
        imageCard.innerHTML = `
            <img class="image" src="./anti-nft-symbol-images/anft-${i}.png" alt="anti nft symbol image #${i}">
            <div class="collection-image-card-footer">
                <div class="title-row">
                    <div class="left-column">
                        <p class="supertitle">aNFT Collection</p>
                        <h4 class="title">#${i}</h4>
                    </div>
                    <div class="right-column">
                        <p class="supertitle">Price</p>
                        <h4 class="price"><img width="14" height="14" border="0" src="./assets/eth-symbol.svg" /> 0 <span class="text-spacing-circle">●</span> Free</h4>
                    </div>
                </div>
                <div class="link-row">
                    <a href="./anti-nft-symbol-images/anft-${i}.png" target="_blank">PNG</a>
                    <a href="./anti-nft-symbol-images/anft-${i}.svg" target="_blank">SVG</a>
                </div>
            </div>
        `;
        container.appendChild(imageCard);
    }
}
