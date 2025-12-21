# 🔐 Message Encryptor — Web3Edu Tool

This tool demonstrates **confidential message encryption** using Ethereum wallet keys.

It allows anyone to encrypt a message for a specific wallet address,
such that **only the owner of that wallet can decrypt it**.

---

## What this tool demonstrates

- Public-key encryption using wallet keys
- Confidentiality without blockchain usage
- Wallets as cryptographic primitives
- Off-chain Web3 security mechanisms

---

## What this tool does NOT do

- ❌ No transactions
- ❌ No smart contracts
- ❌ No gas usage
- ❌ No message delivery
- ❌ No storage

---

## How it works (high-level)

1. The sender provides a receiver Ethereum address
2. The wallet exposes the receiver’s **encryption public key**
3. The message is encrypted locally in the browser
4. The encrypted payload can only be decrypted by the receiver

---

## Important limitation (by design)

⚠️ **MetaMask limitation (important for learners):**

MetaMask can only provide encryption public keys for accounts that exist **inside your own wallet**.

This means:
- You cannot encrypt a message for an arbitrary external address.
- To simulate a receiver, you must **create or switch to another account in MetaMask**.
- This is a wallet security constraint, not a limitation of cryptography or Ethereum.

This tool is intentionally designed this way to demonstrate how wallet-based encryption works in practice.
---

## Requirements

- Modern browser (Chrome / Firefox / Brave)
- MetaMask or compatible wallet
- Wallet must support `eth_getEncryptionPublicKey`

---

## Encrypted payload

The output of this tool is a JSON object containing:
- `version`
- `nonce`
- `ephemPublicKey`
- `ciphertext`

➡️ **You must share the full JSON payload with the receiver.**

The receiver’s wallet uses this entire payload to decrypt the message.

---

## Related labs

- Lab 02 — Encrypted Messages & Privacy

---

## 🇬🇷 Ελληνική Περιγραφή

Το εργαλείο αυτό επιδεικνύει **κρυπτογράφηση μηνυμάτων** με χρήση κλειδιών πορτοφολιού Ethereum.

Επιτρέπει την κρυπτογράφηση ενός μηνύματος για μια συγκεκριμένη διεύθυνση,
ώστε **μόνο ο κάτοχος του αντίστοιχου πορτοφολιού** να μπορεί να το αποκρυπτογραφήσει.

---

### Τι επιδεικνύει το εργαλείο

- Κρυπτογράφηση με δημόσιο κλειδί πορτοφολιού
- Εμπιστευτικότητα χωρίς χρήση blockchain
- Τα πορτοφόλια ως κρυπτογραφικές οντότητες
- Off‑chain μηχανισμούς ασφάλειας Web3

---

### Τι ΔΕΝ κάνει το εργαλείο

- ❌ Δεν εκτελεί συναλλαγές
- ❌ Δεν χρησιμοποιεί smart contracts
- ❌ Δεν καταναλώνει gas
- ❌ Δεν αποθηκεύει ή αποστέλλει μηνύματα

---

### Πώς λειτουργεί (υψηλού επιπέδου)

1. Ο αποστολέας εισάγει τη διεύθυνση του παραλήπτη
2. Το πορτοφόλι αποκαλύπτει το **δημόσιο κλειδί κρυπτογράφησης**
3. Το μήνυμα κρυπτογραφείται τοπικά στον browser
4. Το κρυπτογραφημένο payload μπορεί να αποκρυπτογραφηθεί μόνο από τον παραλήπτη

---

### ⚠️ Σημαντικός περιορισμός (εκπαιδευτικός)

Το MetaMask μπορεί να παρέχει δημόσιο κλειδί κρυπτογράφησης **μόνο για λογαριασμούς που υπάρχουν στο δικό σας πορτοφόλι**.

Αυτό σημαίνει ότι:
- Δεν μπορείτε να κρυπτογραφήσετε μήνυμα για τυχαία εξωτερική διεύθυνση
- Για προσομοίωση παραλήπτη πρέπει να δημιουργήσετε ή να αλλάξετε λογαριασμό στο MetaMask
- Ο περιορισμός αυτός αφορά την ασφάλεια του πορτοφολιού και όχι την κρυπτογραφία

---

### Κρυπτογραφημένο Payload

Το αποτέλεσμα του εργαλείου είναι ένα JSON αντικείμενο που περιλαμβάνει:
- `version`
- `nonce`
- `ephemPublicKey`
- `ciphertext`

➡️ **Πρέπει να μοιραστείτε ολόκληρο το JSON με τον παραλήπτη**, ώστε να μπορέσει να αποκρυπτογραφήσει το μήνυμα.