import axios from "axios";
import ethers from "ethers";

// Using LooksRare Public API,
// get all the tokens that were minted by dingaling.eth
// for the collection: 0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258
// Docs: https://api.looksrare.org/api/documentation

console.log("lets starts");

var provider = new ethers.providers.JsonRpcProvider("https://cloudflare-eth.com");

const collectionAddress = "0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258";
const userAddress = await provider.resolveName("dingaling.eth");

let mintedTokens = [];

let cursor = null;

do {
    try {
        var res = await axios.get(`https://api.looksrare.org/api/v1/events?collection=${collectionAddress}&to=${userAddress}&type=MINT&pagination[cursor]=${cursor}`);
        for (let i = 0; i < res.data.data.length; i++) {
            mintedTokens.push(res.data.data[i].token.tokenId);
            cursor = res.data.data[i].id;
        }
    } catch (err) {
        throw Error(err);
    }
} while (res.data.data.length);

console.log(mintedTokens);