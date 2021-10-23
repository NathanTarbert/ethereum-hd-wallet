const ethers = require('ethers');

function restoreHDNode(mnemonic) {
    return ethers.utils.HDNode.fromMnemonic(mnemonic);
}

let mnemonic = 'upset fuel enhance depart portion hope core animal innocent will athlete snack';
console.log(restoreHDNode(mnemonic));
