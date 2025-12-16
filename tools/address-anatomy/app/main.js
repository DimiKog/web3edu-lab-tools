const input = document.getElementById("addressInput");
const btn = document.getElementById("analyzeBtn");
const analysis = document.getElementById("analysis");

const prefixEl = document.getElementById("prefix");
const hexBodyEl = document.getElementById("hexBody");
const lengthEl = document.getElementById("length");
const checksumEl = document.getElementById("checksum");
const walletBtn = document.getElementById("walletBtn");
const toLowerBtn = document.getElementById("toLower");
const toUpperBtn = document.getElementById("toUpper");
const toChecksumBtn = document.getElementById("toChecksum");
const representationNote = document.getElementById("representationNote");

btn.addEventListener("click", () => {
  const address = normalizeAddress(input.value);

  if (!address.startsWith("0x") || address.length < 10) {
    alert("Please enter a valid Ethereum address.");
    return;
  }

  prefixEl.textContent = address.slice(0, 2);
  hexBodyEl.textContent = address.slice(2);
  lengthEl.textContent = address.length;

  const hasUpper = /[A-F]/.test(address);
  const hasLower = /[a-f]/.test(address);

  checksumEl.textContent =
    hasUpper && hasLower
      ? "Mixed-case (EIP-55 checksum)"
      : "Lowercase / uppercase only (no checksum)";

  analysis.classList.remove("hidden");
});

// Wallet auto-fill (independent of Analyze)
walletBtn.addEventListener("click", async () => {
  if (!window.ethereum) {
    alert("No Web3 wallet detected.");
    return;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    if (accounts.length > 0) {
      input.value = accounts[0];
    }
  } catch (err) {
    console.error(err);
    alert("Wallet access was denied.");
  }
});

function currentAddress() {
  return input.value.trim();
}

function analyzeCurrent() {
  const addr = normalizeAddress(currentAddress());
  if (!addr) return;
  btn.click();
}

function normalizeAddress(addr) {
  const original = addr;
  const trimmed = addr.trim();

  if (original !== trimmed && representationNote) {
    representationNote.textContent = "ℹ️ Extra whitespace was removed from the address input. This commonly happens when copying/pasting.";
  }

  return trimmed;
}

toLowerBtn.addEventListener("click", () => {
  if (!currentAddress()) return;
  input.value = currentAddress().toLowerCase();
});

toUpperBtn.addEventListener("click", () => {
  if (!currentAddress()) return;
  input.value = currentAddress().toUpperCase();
});

toChecksumBtn.addEventListener("click", () => {
  try {
    const addr = normalizeAddress(currentAddress());
    if (!addr) return;

    if (!window.ethers || !window.ethers.utils) {
      alert("ethers.js is required for checksum conversion.");
      return;
    }

    // ethers.js accepts valid lowercase/uppercase addresses and returns EIP-55
    input.value = window.ethers.utils.getAddress(addr);
    analyzeCurrent();
  } catch (e) {
    console.error(e);
    alert("Invalid address format. Check prefix (0x) and length (40 hex characters).");
  }
});