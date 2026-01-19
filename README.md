## Time Capsule Project

### Overview

This project is a **Time Capsule built as a static website**, with **Storacha as the storage backend**.

A Time Capsule is a digital artifact created at a specific moment in time and intentionally preserved for the future. Once sealed, its contents are immutable. The capsule can be shared, verified, and revisited later, with cryptographic proof that it has not changed since it was created.

This project demonstrates how Storacha enables this through **content addressing, UCAN based authorization, and immutable storage**, while keeping the application itself simple and static.

---

## What We Are Building

We are building a static website called **Time Capsule** that allows a creator to:

* prepare a message, media, or small website intended for the future
* define when the capsule is meant to be opened
* upload the capsule to Storacha as immutable content
* receive a content CID that acts as a permanent fingerprint
* share a public link that can be verified by anyone

The site itself contains the logic that determines whether the capsule is sealed or opened based on time. Storacha guarantees that once uploaded, the content cannot be altered without changing its CID.

---

## What This Project Is Not

This project is **not**:

* a traditional hosting setup
* a database driven application
* a secret or encrypted vault
* a mutable storage system

The goal is **verifiability and permanence**, not secrecy.

---

## Core Concepts Demonstrated

This project intentionally focuses on fundamental Storacha concepts:

* content addressing and CIDs
* immutable uploads
* upload versus storage
* UCAN based delegation
* static site deployment backed by decentralized storage

Everything in this repository exists to reinforce those ideas.

---

## Project Structure

The Time Capsule is represented as a small static site with explicit metadata.

```
time-capsule/
  index.html        # UI and time based reveal logic
  capsule.json      # metadata describing the capsule
  message.md        # the message or content to the future
  assets/           # optional images or media
  README.md
```

Each file plays a specific role in making this a real time capsule rather than a generic upload.

---

## The Capsule Metadata

The `capsule.json` file defines the meaning of the capsule.

Example:

```json
{
  "title": "A Message to the Future",
  "created_at": "2026-01-19T10:00:00Z",
  "open_at": "2030-01-01T00:00:00Z",
  "description": "This capsule was sealed in 2026 and intended to be opened in 2030."
}
```

This metadata is uploaded alongside the site and becomes part of the immutable record. Any change to it produces a new CID.

---

## How Time Works in This Project

Storacha does not enforce time locks.

Instead:

* the capsule is sealed by immutability
* the CID proves when and what was uploaded
* the website logic checks the current date
* before the open date, the capsule remains sealed
* after the open date, the content is revealed

This mirrors real world time capsules. The trust comes from **immutability and verifiable history**, not secrecy.

---

## Why Storacha Is the Right Fit

Storacha provides exactly what a time capsule needs:

* immutable storage
* content addressed identifiers
* verifiable proof of existence
* UCAN based authorization for uploads

Once the capsule is uploaded, Storacha guarantees that its contents cannot be silently modified.

---

## Upload Flow Overview

At a high level, the workflow is:

1. Create the Time Capsule locally
2. Generate an Agent and Space
3. Upload the capsule files to Storacha
4. Receive a content CID
5. Share the CID or gateway link as proof

The content CID becomes the capsule’s permanent identifier.

---

## Authorization Model

Uploads to Storacha are authorized using UCANs.

In this project:

* the Space is the authority
* an Agent is delegated permission to upload
* the delegation is cryptographically signed
* each upload includes proof of authorization

This ensures uploads are explicit, verifiable, and auditable.

---

## Who This Project Is For

This project is designed for:

* developers new to Storacha
* developers new to content addressing
* anyone curious about decentralized storage
* readers who want a practical, end to end example

No prior Storacha experience is required.

---

# Building a Storacha Backed Static Website

The accompanying blog will walk through:

* creating the project from scratch
* understanding the Time Capsule model
* preparing static site files
* setting up Storacha access
* uploading content
* understanding the returned CID
* verifying the capsule

Each step builds on the previous one without shortcuts.

---

## Final Goal

By the end of this project, you will have:

* a real Time Capsule
* stored immutably on Storacha
* backed by cryptographic proof
* accessible as a static website
* verifiable by anyone, anytime

This is not just storage.
This is publishing a moment in time.

