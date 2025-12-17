# Network Identifier — Web3Edu Lab Tool

## Overview

**Network Identifier** is an educational, read‑only lab tool that helps students understand
**which blockchain network their wallet is currently operating on**.

The tool focuses on the concept of **network context** in Ethereum‑compatible systems
and highlights the role of the `chainId` as the authoritative identifier of a blockchain network.

This lab does **not** send transactions, switch networks, or modify wallet settings.

---

## Learning Objectives

After completing this lab, students should be able to:

- Understand the difference between a wallet **account** and a **network**
- Explain what a `chainId` is and why it matters
- Identify the active blockchain network using wallet data
- Recognize that the same address can exist on multiple networks with different balances

---

## What the Tool Shows

When a wallet is connected, the tool displays:

- Network name (if known)
- Chain ID (decimal and hexadecimal)
- Native currency of the network

Known networks include:

- Ethereum Mainnet
- Sepolia Testnet
- Web3Edu Besu Network
- Unknown / custom networks

---

## Educational Notes

- The wallet address remains the same across networks
- The **network context** determines:
  - where balances exist
  - where transactions are recorded
- Changing RPC endpoints is not sufficient — the `chainId` defines network identity

---

## How to Use

1. Open the lab in a browser
2. Click **Connect Wallet**
3. Observe the detected network information
4. Switch networks in your wallet
5. Click **Refresh Network Info** or observe automatic updates

---

## Safety & Scope

- ✔ Read‑only
- ✔ No transactions
- ✔ No network switching
- ✔ Safe for classroom use

---

## Part of Web3Edu Labs

This tool is part of **Lab‑01: Identity & Context**, together with:

- Address Anatomy
- Network Identifier
- Identity Scope

Both tools aim to build a correct mental model of identity and context in Web3 systems.

---

# Αναγνώριση Δικτύου — Web3Edu Lab Tool (GR)

## Επισκόπηση

Το **Network Identifier** είναι ένα εκπαιδευτικό εργαλείο εργαστηρίου, μόνο για ανάγνωση,
το οποίο βοηθά τους φοιτητές να κατανοήσουν
**σε ποιο blockchain δίκτυο λειτουργεί τη δεδομένη στιγμή το πορτοφόλι τους**.

Το εργαλείο εστιάζει στην έννοια του **πλαισίου δικτύου (network context)**
σε Ethereum‑συμβατά συστήματα και αναδεικνύει τον ρόλο του `chainId`
ως το αυθεντικό αναγνωριστικό ενός blockchain δικτύου.

Το εργαστήριο **δεν** αποστέλλει συναλλαγές,
δεν αλλάζει δίκτυα και δεν τροποποιεί ρυθμίσεις πορτοφολιού.

---

## Μαθησιακοί Στόχοι

Με την ολοκλήρωση του εργαστηρίου, οι φοιτητές θα μπορούν να:

- Διακρίνουν τη διαφορά μεταξύ **λογαριασμού πορτοφολιού** και **δικτύου**
- Εξηγούν τι είναι το `chainId` και γιατί είναι σημαντικό
- Αναγνωρίζουν το ενεργό blockchain δίκτυο χρησιμοποιώντας δεδομένα από το πορτοφόλι
- Κατανοούν ότι η ίδια διεύθυνση μπορεί να υπάρχει σε πολλαπλά δίκτυα με διαφορετικά υπόλοιπα

---

## Τι Παρουσιάζει το Εργαλείο

Μετά τη σύνδεση του πορτοφολιού, το εργαλείο εμφανίζει:

- Το όνομα του δικτύου (εφόσον είναι γνωστό)
- Το Chain ID (σε δεκαδική και δεκαεξαδική μορφή)
- Το εγγενές νόμισμα του δικτύου

Υποστηριζόμενα δίκτυα περιλαμβάνουν:

- Ethereum Mainnet
- Sepolia Testnet
- Web3Edu Besu Network
- Άγνωστα / προσαρμοσμένα δίκτυα

---

## Εκπαιδευτικές Παρατηρήσεις

- Η διεύθυνση του πορτοφολιού παραμένει ίδια σε όλα τα δίκτυα
- Το **πλαίσιο δικτύου** καθορίζει:
  - πού βρίσκονται τα υπόλοιπα
  - σε ποιο blockchain καταγράφονται οι συναλλαγές
- Η αλλαγή RPC endpoint δεν είναι αρκετή —
  το `chainId` καθορίζει την ταυτότητα του δικτύου

---

## Τρόπος Χρήσης

1. Ανοίξτε το εργαστήριο σε φυλλομετρητή
2. Πατήστε **Σύνδεση Πορτοφολιού**
3. Παρατηρήστε τις πληροφορίες του δικτύου
4. Αλλάξτε δίκτυο στο πορτοφόλι
5. Πατήστε **Ανανέωση Πληροφοριών Δικτύου** ή παρατηρήστε την αυτόματη ενημέρωση

---

## Ασφάλεια & Πεδίο Χρήσης

- ✔ Μόνο για ανάγνωση
- ✔ Χωρίς συναλλαγές
- ✔ Χωρίς αλλαγή δικτύων
- ✔ Ασφαλές για χρήση σε μάθημα

---

## Μέρος των Web3Edu Labs

Το εργαλείο αποτελεί μέρος του **Lab‑01: Ταυτότητα & Πλαίσιο**, μαζί με τα:

- Network Identifier
- Address Anatomy
- Identity Scope

Στόχος των εργαλείων είναι η δημιουργία ενός σωστού νοητικού μοντέλου
για την ταυτότητα και το πλαίσιο λειτουργίας στα Web3 συστήματα.
