// connect to Moralis server

async function initializeMoralis() {
    const serverUrl = "https://febmhsqllaac.usemoralis.com:2053/server";
    const appId = "WXh0HlcYBTvEqtGyaZ5WEc9hRHvrXGF0INu6cNVq";
    await Moralis.start({serverUrl, appId});
}


// add from here down
async function moralisAlreadyLoggedInUser() {
    return Moralis.User.current();
}

async function moralisLogin() {
    let user = Moralis.User.current();
    if (!user) {
        user = await Moralis.authenticate();
    }

    if (!user) {
        return false;
    } else {
        return user;
    }
}

async function moralisLogOut() {
    await Moralis.User.logOut();
    console.log("logged out");
}

async function cloudFunc_getUserNFTsInWalletCount() {
    // Comment out lines below to test mocking the cloud response
    const mockResponse = {
        // mock: true,
        // response: {
        //     userHasNFT: true,
        //     nftCount: 43,
        // }
    };

    const result = await Moralis.Cloud.run("getUserNFTsInWalletCount", mockResponse)
        .catch((e) => {
            console.error(e);
        });
    console.log('cloud result: ', result);
    return {
        userHasNFT: result.userHasNFT,
        nftCount: result.nftCount,
    };
}
