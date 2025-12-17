/*
  Network Identifier — Web3Edu Lab Tool
  ------------------------------------
  Read-only tool to identify the blockchain network
  the user's wallet is currently connected to.
*/

const connectBtn = document.getElementById("connectBtn");
const refreshBtn = document.getElementById("refreshBtn");
const networkInfoSection = document.getElementById("networkInfo");

const networkNameEl = document.getElementById("networkName");
const chainIdDecEl = document.getElementById("chainIdDec");
const chainIdHexEl = document.getElementById("chainIdHex");
const nativeCurrencyEl = document.getElementById("nativeCurrency");

let provider = null;

/* Known networks (extendable) */
const NETWORKS = {
    1: {
        name: "Ethereum Mainnet",
        currency: "ETH",
    },
    11155111: {
        name: "Sepolia Testnet",
        currency: "ETH",
    },
    1337: {
        name: "Local / Development Network",
        currency: "ETH",
    },
    2024: {
        name: "Web3Edu Besu Network",
        currency: "EDU",
    },
    424242: {
        name: "Besu EduNet",
        currency: "EDU-D",
    },
};

/* ---------- Core logic ---------- */

async function connectWallet() {
    if (!window.ethereum) {
        alert("No Web3 wallet detected.");
        return;
    }

    try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        provider = new ethers.providers.Web3Provider(window.ethereum);
        refreshBtn.disabled = false;
        await loadNetworkInfo();
    } catch (err) {
        console.error("Wallet connection failed:", err);
    }
}

async function loadNetworkInfo() {
    if (!window.ethereum) return;

    // Always read chainId directly from wallet (authoritative)
    const chainIdHex = await window.ethereum.request({
        method: "eth_chainId",
    });

    const chainIdDec = parseInt(chainIdHex, 16);
    const known = NETWORKS[chainIdDec];

    networkNameEl.textContent = known
        ? known.name
        : "Unknown / Custom Network";

    chainIdDecEl.textContent = chainIdDec;
    chainIdHexEl.textContent = chainIdHex;

    nativeCurrencyEl.textContent = known
        ? known.currency
        : "Unknown";

    networkInfoSection.classList.remove("hidden");
}

/* ---------- Event bindings ---------- */

connectBtn.addEventListener("click", connectWallet);
refreshBtn.addEventListener("click", loadNetworkInfo);

/* ---------- Network change handling ---------- */

if (window.ethereum) {
    window.ethereum.on("chainChanged", () => {
        // Recreate provider to avoid ethers network caching
        provider = new ethers.providers.Web3Provider(window.ethereum);
        loadNetworkInfo();
    });
}