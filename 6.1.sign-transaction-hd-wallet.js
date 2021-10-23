const ethers = require('ethers');

function deriveFiveWalletsFromHdNode(mnemonic, derivationPath) {
    let wallets = [];

    for(let index = 0; index < 5; index++) {
        let hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic).derivePath(derivationPath + index);
        console.log("Derivation path", hdNode.path);
        console.log("Address", hdNode.address);
        console.log("Private key", hdNode.privateKey);
        let wallet = new ethers.Wallet(hdNode.privateKey);
        wallets.push(wallet);
    }

    return wallets;
}

let mnemonic = 'upset fuel enhance depart portion hope core animal innocent will athlete snack';
let derivationPath = "m/44'/60'/0'/0";

deriveFiveWalletsFromHdNode(mnemonic, derivationPath);

async function signTransaction(wallet, toAddress, value) {
    let transaction = {
        nonce: 0,
        gasLimit: 21000,
        gasPrice: ethers.BigNumber.from('0x1'),
        to: toAddress,
        value: ethers.utils.parseEther(value),
        data: '0x',
    }
    const signedTransaction = await wallet.signTransaction(transaction);
    console.log("Signed Transaction:");
    console.log(signedTransaction);
    return signedTransaction;
}
