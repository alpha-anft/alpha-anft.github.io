function hideAllPages() {
    var pages = document.querySelectorAll('.page-content');
    for (var i = 0; i < pages.length; i++) {
        pages[i].classList.add('hidden');
    }
}

async function showInitializePage() {
    hideDisconnectWalletButton();
    showPage('page-initializing');
    document.querySelectorAll("#check-my-wallet-button")
        .forEach(button => {
            setButtonState(button, true, 'Check my wallet');
        });

    const provider = await detectEthereumProvider({
        mustBeMetaMask: true,
    })

    if (provider) {
        const hasCurrentUser = await moralisAlreadyLoggedInUser();
        if (hasCurrentUser) {
            onMoralisUserDetected();
        } else {
            onEthereumBrowserDetected(provider);
        }
    } else {
        onNonEthereumBrowserDetected();
    }
}

function showDisconnectWalletButton() {
    document.getElementById("disconnect-wallet-button-container").classList.remove('hidden');
}

function hideDisconnectWalletButton() {
    document.getElementById("disconnect-wallet-button-container").classList.add('hidden');
}

function showUserHasNoWalletPage() {
    hideDisconnectWalletButton();
    document.querySelector('.dynamic-page-content.user-has-no-wallet')
        .classList.remove('hidden');
    showPage('page-main');
    populateCollection(document.getElementById("anft-collection-container"), 18);
}

function showUserHasNoNFTsPage() {
    showDisconnectWalletButton();
    document.querySelector('.dynamic-page-content.user-has-no-nfts')
        .classList.remove('hidden');

    showPage('page-main');
    populateCollection(document.getElementById("anft-collection-container"), 18);
}

function showUserHasNFTsPage(numberOfNFts) {
    showDisconnectWalletButton();
    document.querySelector('.dynamic-page-content.user-has-nfts')
        .classList.remove('hidden');
    document.getElementById("user-nft-count-text").innerText = numberOfNFts;

    showPage('page-main');
    populateCollection(document.getElementById("anft-collection-container"), 18);
}

function showPage(page) {
    hideAllPages();
    const _page = document.getElementById(page);
    if (!_page) {
        throw new Error("No page to show for id " + page);
    }
    _page.classList.remove('hidden');
}

function setButtonState(button, enabled, text) {
    const buttonTextWrapper = button.querySelector('.button-text-wrapper');
    if (enabled) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
    if (text) {
        buttonTextWrapper.innerHTML = text;
    }
}

function setEnterButtonState(state) {
    switch (state) {
        case 'initial':
            document.getElementById("enter-button-text").innerHTML = "Enter";
            document.getElementById("enter-button").disabled = false;
            break;
        case 'loading':
            document.getElementById("enter-button-text").innerHTML = "Loading...";
            document.getElementById("enter-button").disabled = true;
            break;
        case 'success':
            document.getElementById("enter-button-text").innerHTML = "Success!";
            document.getElementById("enter-button").disabled = true;
            break;
        case 'error':
            document.getElementById("enter-button-text").innerHTML = "Error!";
            document.getElementById("enter-button").disabled = false;
            break;
    }
}
function assertEnterButtonState(state) {
    const buttonText = document.getElementById("enter-button-text").innerHTML;
    if (buttonText === state) {
        return true;
    } else {
        return false;
    }
}

