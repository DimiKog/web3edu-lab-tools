const input = document.getElementById("addressInput");
const btn = document.getElementById("analyzeBtn");
const analysis = document.getElementById("analysis");

const prefixEl = document.getElementById("prefix");
const hexBodyEl = document.getElementById("hexBody");
const lengthEl = document.getElementById("length");
const checksumEl = document.getElementById("checksum");

btn.addEventListener("click", () => {
  const address = input.value.trim();

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
      ? "Mixed-case (likely checksummed)"
      : "No checksum casing detected";

  analysis.classList.remove("hidden");
});
