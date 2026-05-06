# Product Brief

STATUS: PRODUCT_BRIEF_READY

## 1. Product Name

Paggawa

## 2. Product Summary

Paggawa is a local skills discovery and job-matching platform for connecting residents with nearby blue-collar workers.

It is designed around the common Filipino referral question:

> "May kakilala ka bang karpintero?"
> "May kakilala ka bang tubero?"
> "May kakilala ka bang electrician?"

The product turns informal local referrals into a structured, searchable, community-aware system where residents can post work needs, workers can discover nearby opportunities, and barangay staff can assist people who are not tech-literate or do not have mobile access.

Paggawa has two connected app surfaces under one shared product system:

1. Paggawa Mobile: a phone/mobile surface for residents and workers.
2. Paggawa Quest: a barangay hall surface for assisted-access workflows.

Paggawa Quest may be tablet-friendly, kiosk-friendly, laptop-friendly, or desktop-friendly. It serves barangay staff who help offline or assisted users participate.

The two surfaces must not become separate repositories, independent systems, or duplicated business logic. The v0.1 prototype should still use one workspace, one shared domain model, one shared mock/local data layer, one shared validation model, and one ADAPT delivery system.

## 3. Core Problem

Many capable skilled workers are known locally but invisible online. They may rely on word of mouth, neighbors, relatives, group chats, or barangay referrals instead of having a searchable digital profile.

Residents often need help quickly but do not know who nearby is available, trustworthy enough to contact, or suited for the job.

Barangays already act as informal referral points, but they usually lack a lightweight system for recording available workers, open job requests, assisted registrations, job status, feedback, and complaint notes.

A purely mobile-first product would leave out non-tech-literate residents, workers without smartphones, and people who need barangay staff to help them participate.

## 4. Product Thesis

Paggawa is not merely a booking app. It is a local trust and discovery layer for skilled work.

The product should make nearby work and nearby labor more visible without pretending to fully certify quality. Barangay participation should mean local registration, identity checking, or community referral only. It must not imply guaranteed work quality.

The first prototype should prove that a resident need can become a visible local job, that nearby workers can respond, that a resident can choose a worker, and that completed work can improve a worker's reputation.

## 5. Target Users

- Resident / Client: A person using Paggawa Mobile to request skilled manual work such as carpentry, plumbing, electrical repair, cleaning, repair, installation, or similar local services.
- Worker: A nearby skilled worker using Paggawa Mobile for visibility and access to local job opportunities.
- Barangay Staff: A staff member using Paggawa Quest to register workers, create assisted job requests, maintain a quest board, and update basic job status for offline or assisted users.
- Referrer: A community member who may recommend a worker, currently treated as a possible future or limited v0.1 role.

## 6. Core User Stories

- As a resident using Paggawa Mobile, I want to post a job request so nearby workers can discover my need.
- As a resident using Paggawa Mobile, I want to browse nearby workers so I can find someone suitable for the job.
- As a resident using Paggawa Mobile, I want my exact address and contact details hidden before match so my privacy is protected.
- As a worker using Paggawa Mobile, I want to see nearby job requests so I can respond to work opportunities.
- As a worker using Paggawa Mobile, I want a profile that shows my skills, service area, completed jobs, and trust signals.
- As barangay staff using Paggawa Quest, I want to create a job request for a resident who cannot use the app.
- As barangay staff using Paggawa Quest, I want to register or view local workers so residents can discover available skills.
- As barangay staff using Paggawa Quest, I want a quest board of open local jobs so assisted work requests are visible and trackable.
- As a resident using Paggawa Mobile, I want to accept a worker response so a match can be created.
- As a resident using Paggawa Mobile, I want to mark work complete and leave feedback so worker reputation can improve over time.

## 7. MVP Scope

The v0.1 MVP should demonstrate:

- resident job posting in Paggawa Mobile
- nearby job browsing for workers in Paggawa Mobile
- nearby worker discovery for residents in Paggawa Mobile
- barangay-assisted job creation in Paggawa Quest
- barangay-assisted worker registration or viewing in Paggawa Quest
- local quest board visibility in Paggawa Quest
- basic worker response and resident acceptance
- match status tracking
- exact address and contact privacy before confirmed match
- simple completion and reputation update
- lightweight trust signals such as Barangay-registered, Identity checked, Community-referred, completed jobs, ratings, reviews, referral count, and unresolved complaint indicators

The MVP should use mock or local data first and remain small enough for a solo developer to build, run, explain, and validate on a personal PC.

## 8. Explicit Non-Goals

The v0.1 prototype must not include:

- payments
- escrow
- real GPS tracking
- full chat
- official LGU integration
- complex dispute resolution
- advanced AI matching
- full native mobile application
- production-grade authentication
- production database
- nationwide deployment logic
- legal certification of worker quality
- claims that barangay registration guarantees quality

## 9. Success Criteria

The first Paggawa prototype is successful if it can clearly demonstrate the core local work loop:

- A resident can create a job request in Paggawa Mobile.
- A worker can browse nearby open jobs in Paggawa Mobile.
- A resident can browse nearby workers in Paggawa Mobile.
- Barangay staff can create a job request on behalf of a resident in Paggawa Quest.
- Barangay staff can register or view local workers in Paggawa Quest.
- Open jobs are visible on the Paggawa Quest barangay quest board.
- A worker can respond to a job.
- A resident can accept a worker and create a match.
- Exact address and contact details are hidden before match.
- A completed job can update worker reputation.

The prototype should be usable and explainable, not production-scale.

## 10. Key Open Questions

1. Should v0.1 include referrers as an active role or keep them as a later trust signal?
2. What default discovery radius should be used for nearby jobs and workers?
3. What is the smallest realistic pilot area for the first demo?
4. Which worker categories should be included first?
5. What minimum information should be required before a job request becomes visible?
6. What information becomes visible only after a confirmed match?
7. How should trust indicators be worded so they help users without overpromising quality?
8. Within Paggawa Quest, should barangay staff have one combined workspace for jobs and workers, or separate views?
9. What is the simplest non-payment matching flow that still feels realistic?
10. What demo scenario best proves the value of barangay-assisted access?

## 11. Recommended First Prototype Scenario

The first prototype should focus on one small barangay-scale scenario:

1. A resident needs a plumber, carpenter, or electrician.
2. The resident creates a job request in Paggawa Mobile with approximate location and job details.
3. A worker browsing nearby jobs in Paggawa Mobile sees the request without exact address or contact details.
4. The worker responds with availability and a short note.
5. The resident reviews the response and accepts the worker.
6. Only after the confirmed match does coordination information become available.
7. Barangay staff can create the same kind of request for an offline resident in Paggawa Quest.
8. Barangay staff can view registered workers and open jobs on the Paggawa Quest quest board.
9. After work is completed, the resident can mark the job complete and leave simple feedback.
10. The worker profile updates with completed work and reputation signals.
