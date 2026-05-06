# Domain Model

STATUS: DRAFT

## Core Entities

The initial Paggawa prototype should use a lightweight domain model.

---

## User

Represents a person using the system.

Possible roles:

- resident
- worker
- barangay_staff
- admin

---

## WorkerProfile

Represents a skilled worker’s public/service profile.

Used for:

- skill discovery
- worker browsing
- reputation display
- barangay registration
- completed work history

---

## JobRequest

Represents a resident’s need for skilled work.

A job request can be created by:

- a resident through the mobile app
- barangay staff on behalf of a resident

---

## JobResponse

Represents a worker’s response to an open job request.

A response may include:

- message
- estimated price
- availability
- request for more details

---

## Match

Represents an accepted connection between a resident job request and a worker.

A match is the point where further coordination can happen.

Exact contact/address information should only be exposed after a confirmed match.

---

## Barangay

Represents the local community unit where assisted access and quest board flows are managed.

---

## Review

Represents feedback after a completed job.

Used for reputation tracking.

---

## ComplaintNote

Represents a basic complaint or concern record.

This is not a full dispute-resolution system in v0.1.
