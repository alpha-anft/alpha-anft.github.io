(async function() {
    await initializeMoralis();
    showInitializePage();
})();

async function onMoralisUserDetected() {
    showPage('page-moralis-user-detected');
}

async function onEthereumBrowserDetected() {
    showPage('page-ethereum-browser-detected');
}

async function onNonEthereumBrowserDetected() {
    showPage('page-non-ethereum-browser-detected');
}


async function onLogOutButton() {
    await moralisLogOut();
    await showInitializePage();
}

async function onProveWalletButton(button) {
    setButtonState(button, false, 'Connecting MetaMask...');
    let isLoggedIn = false;
    try {
        isLoggedIn = await moralisLogin();
    } catch (err) {
        console.error(err);
    }

    if (isLoggedIn) {
        setButtonState(button, false, 'Checking NFTs...');

        const userNFTs = await cloudFunc_getUserNFTsInWalletCount();

        if (userNFTs.userHasNFT) {
            setButtonState(button, false, String(userNFTs.nftCount) + ' NFTs detected!');
            setTimeout(() => {
                showUserHasNFTsPage(userNFTs.nftCount);
            }, 1000);

        } else {
            setButtonState(button, false, 'Success');
            setTimeout(() => {
                showUserHasNoNFTsPage();
            }, 1000);
        }


    } else {
        setButtonState(button, false, 'Failed');
        setTimeout(() => {
            setButtonState(button, true, 'Check my wallet');
        }, 1000);
    }
}


async function onDoNotHaveAWalletButton() {
    showUserHasNoWalletPage();
}
