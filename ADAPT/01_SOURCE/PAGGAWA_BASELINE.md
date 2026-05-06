# Paggawa Baseline

## Concept Summary

Paggawa is a local skills discovery and job-matching platform designed to connect people who need skilled manual work with nearby blue-collar workers who may not know how to market themselves online.

The core Filipino problem it addresses is:

> “May kakilala ka bang karpintero?”
> “May kakilala ka bang tubero?”
> “May kakilala ka bang electrician?”

The idea is to turn this informal referral-based discovery process into a structured, accessible, community-aware platform.

---

## Core Problem

Many skilled workers are capable and trusted locally but are invisible online.

Many residents need help but still rely on neighbors, relatives, Facebook groups, group chats, or barangay referrals.

Barangays often act as informal referral points, but there is no structured system to record available workers, open jobs, completed work, complaints, or referrals.

A purely mobile-first platform would exclude non-tech-literate users and people without mobile access.

---

## Product Model

Paggawa has two app surfaces under one shared product system:

1. Paggawa Mobile for resident and worker phone/mobile use.
2. Paggawa Quest for barangay hall assisted-access workflows.

These are not separate repositories, independent systems, or duplicated business logic. They should share the same workspace, domain model, mock/local data layer, validation model, and ADAPT delivery system.

---

## Target Users

- Resident / Client
- Worker
- Barangay Staff
- Referrer

---

## Paggawa Mobile Surface

Residents can post job requests and browse nearby workers.

Workers can browse nearby jobs and respond to opportunities.

Discovery should use approximate location and radius-based visibility.

---

## Paggawa Quest Surface

Barangay staff can:

- register workers
- create job requests for residents
- maintain a local quest board
- update job status
- record feedback or complaint notes

Paggawa Quest should be suitable for barangay hall use and may be tablet-friendly, kiosk-friendly, laptop-friendly, or desktop-friendly.

The barangay acts as an access bridge and local trust anchor, not as a guarantor of work quality.

---

## Trust Model

Trust signals may include:

- barangay-registered
- identity checked
- community-referred
- completed jobs
- reviews
- ratings
- referral count
- no unresolved complaints

---

## MVP Scope

The MVP should prove:

- resident job posting
- nearby job browsing
- nearby worker discovery
- barangay-assisted job creation
- barangay-assisted worker registration
- quest board visibility
- basic matching
- completion and reputation update
- privacy before match

---

## Non-Goals

The early version should not include:

- payments
- escrow
- GPS tracking
- full chat
- official LGU integration
- complex dispute handling
- advanced AI matching
- full native mobile application

---

## First Prototype Objective

The first prototype should demonstrate this loop:

```text
Resident needs skilled work
→ job request is created
→ nearby workers can discover it
→ workers can respond
→ resident can choose
→ barangay can assist offline users
→ quest board shows local work
→ completed work improves worker reputation
```
