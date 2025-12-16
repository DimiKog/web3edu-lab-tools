# Address Anatomy

## Purpose
This tool helps learners **visualize and understand the structure of an Ethereum address**.

It focuses on representation and meaning, not blockchain execution.

---

## Concepts illustrated
- hexadecimal encoding
- fixed-length addresses (20 bytes / 40 hex chars)
- `0x` prefix
- checksum casing (EIP-55)
- relationship to public keys (conceptual)
- multiple textual representations of the same address (lowercase / uppercase / checksummed)

---

## Interactive features

This tool includes interactive controls that allow learners to experiment with different **textual representations** of the same Ethereum address.

### Address representation buttons

After entering or loading an address, learners can use the following buttons:

- **lowercase**  
  Converts the address to lowercase. This format is widely accepted but carries **no checksum information**.

- **UPPERCASE**  
  Converts the address to uppercase. This is also valid on-chain but provides **no protection against typing errors**.

- **Checksummed (EIP-55)**  
  Converts the address to its EIP-55 checksummed form (mixed-case).  
  This representation encodes a checksum using letter casing, allowing wallets and tools to **detect accidental typing mistakes** made by humans.

All three representations refer to the **same on-chain identity**.  
The blockchain treats them as identical; the checksum exists purely as a **human-safety feature** at the tooling layer.

---

## Used in labs
- Lab 01 — Wallets, Keys & Web3 Identity

---

## Network requirements
None.  
This tool performs **no blockchain calls**.

---

## Notes for educators
- This tool is exploratory, not evaluative
- Encourage students to paste **their own wallet address**
- Use it as a discussion starter about identity and irreversibility
- Use the representation buttons to explicitly demonstrate that checksum casing improves error detection, not cryptographic security
