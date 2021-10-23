const ethers = require('ethers');
let wallet;

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

    return wallets;
}

let mnemonic = 'upset fuel enhance depart portion hope core animal innocent will athlete snack';// seed phrase
let derivationPath = "m/44'/60'/0'/0";

const wallets = deriveFiveWalletsFromNode(mnemonic, derivationPath);

async function signTransaction(wallet, toAdress, value) {
    let transaction = {
        nonce: 0,
        gasLimit: 21000,//this is the limit, can not got higher than this number
        gasPrice: ethers.BigNumber.from('0x1'),
        // gasPrice: 1000000000,
        to: toAdress,// this is the address that you are sending ether to
        value: ethers.utils.parseEther(value), //value is the amount of ether that is sent. It must be passed in as a paramater or input box. As a number formatted as a string. ie "1.0"
        // value: '0x16345785d8a0000', //example shown in Hex
        data: '0x',
    };

    const signedTransaction = await wallet.signTransaction(transaction);
    console.log('Signed Transaction:');
    console.log(signedTransaction);
    // console.log(wallets[1]);
    // console.log(wallets[2].address);
    // console.log(value);

    return signedTransaction;

}

signTransaction(wallets[1], wallets[2].address, "2.0");// from specified wallet to address with the amount sent


