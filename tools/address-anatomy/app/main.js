const input = document.getElementById("addressInput");
const btn = document.getElementById("analyzeBtn");
const analysis = document.getElementById("analysis");

const hexBodyEl = document.getElementById("hexBody");
const addrLengthEl = document.getElementById("addrLength");
const checksumEl = document.getElementById("checksum");
const walletBtn = document.getElementById("walletBtn");
const toLowerBtn = document.getElementById("toLower");
const toUpperBtn = document.getElementById("toUpper");
const toChecksumBtn = document.getElementById("toChecksum");
const representationNote = document.getElementById("representationNote");

function setActiveButton(activeBtn) {
  [toLowerBtn, toUpperBtn, toChecksumBtn].forEach(btn =>
    btn.classList.remove("active")
  );
  if (activeBtn) activeBtn.classList.add("active");
}

function setButtonsDisabled(disabled) {
  [toLowerBtn, toUpperBtn, toChecksumBtn].forEach(btn => {
    btn.disabled = disabled;
  });
}

setButtonsDisabled(true);

function runAnalysis(address) {
  const normalized = normalizeAddress(address);

  if (!/^0x[0-9a-fA-F]{40}$/.test(normalized)) {
    alert("Please enter a valid Ethereum address (0x + 40 hex characters).");
    return false;
  }

  const body = normalized.slice(2);
  hexBodyEl.textContent = body;

  // Semantic explanation only (no duplication of values)
  addrLengthEl.textContent = "40 chars";

  const hasUpper = /[A-F]/.test(body);
  const hasLower = /[a-f]/.test(body);

  if (checksumEl) {
    checksumEl.textContent =
      hasUpper && hasLower
        ? "Mixed-case (EIP-55 checksum)"
        : "Lowercase / uppercase only (no checksum)";
  }

  analysis.classList.remove("hidden");
  setButtonsDisabled(false);
  return true;
}

btn.addEventListener("click", () => {
  runAnalysis(input.value);
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
  const addr = currentAddress();
  if (!addr) return;
  runAnalysis(addr);
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

  input.value = normalizeAddress(currentAddress()).toLowerCase();
  setActiveButton(toLowerBtn);
  analyzeCurrent();
});

toUpperBtn.addEventListener("click", () => {
  if (!currentAddress()) return;

  const addr = normalizeAddress(currentAddress());
  const body = addr.startsWith("0x") ? addr.slice(2) : addr;
  input.value = "0x" + body.toUpperCase();
  setActiveButton(toUpperBtn);
  analyzeCurrent();
});

toChecksumBtn.addEventListener("click", () => {
  try {
    let addr = normalizeAddress(currentAddress());
    if (!addr) return;

    if (!window.ethers || !window.ethers.utils) {
      alert("ethers.js is required for checksum conversion.");
      return;
    }

    addr = addr.toLowerCase();
    const checksummed = window.ethers.utils.getAddress(addr);

    input.value = checksummed;
    setActiveButton(toChecksumBtn);
    analyzeCurrent();
  } catch (e) {
    console.error(e);
    alert("Invalid Ethereum address. Checksum conversion failed.");
  }
});