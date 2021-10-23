const ethers = require('ethers');
let wallet;
let toAdress;
// let value;

var http_port = process.env.HTTP_PORT || 3001;
var initialPeers = process.env.PEERS ? process.env.PEERS.split(',') : [];


function deriveFiveWalletsFromNode(mnemonic, derivationPath) {
    let wallets = [];

    for(let index = 0; index < 5; index++) {
        let hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic).derivePath(derivationPath + index);

        console.log('Derivation path', hdNode.path);
        console.log('Address', hdNode.address);
        console.log('Private key', hdNode.privateKey);
        console.log('===================');

        wallet = new ethers.Wallet(hdNode.privateKey);
        wallets.push(wallet);
    }

    wallet = wallets[1];
    toAdress = wallet.address;
    // value = wallet.privateKey;
    return wallets;
}

let mnemonic = 'upset fuel enhance depart portion hope core animal innocent will athlete snack';
let derivationPath = "m/44'/60'/0'/0";

deriveFiveWalletsFromNode(mnemonic, derivationPath);

async function signTransaction(wallet, toAdress, value) {
    let transaction = {
        nonce: 0,
        gasLimit: 21000,
        gasPrice: ethers.BigNumber.from('0x1'),
        // gasPrice: 1000000000,
        to: toAdress,
        value: ethers.utils.parseEther(value),
        // value: '0x16345785d8a0000',
        data: '0x',
    };

    const signedTransaction = await wallet.signTransaction(transaction);
    console.log('Signed Transaction:');
    console.log(signedTransaction);

    return signedTransaction;

}
signTransaction(wallet, toAdress, "2.0");


