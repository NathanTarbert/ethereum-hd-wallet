const ethers = require('ethers');

async function createAndSaveWalletAsJSON(password) {
    const wallet = await ethers.Wallet.createRandom().encrypt(password);
    console.log(wallet);
}

createAndSaveWalletAsJSON('Kingsland University');