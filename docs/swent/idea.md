---
title: Idea
date: 2025-09-12 11:09:00
tags:
  - EPFL
  - CS-311
  - Kotlin
---

## DogLink

### Pitch

Many dog owners struggle to give their dogs enough companionship and daily walks due to busy work schedules or health constraints. At the same time, many dog lovers are unable to keep dogs themselves because of housing rules or financial limits, but would love the chance to spend time with them. **DogLink** bridges this gap by connecting dog owners with dog enthusiasts who can help with walking, playtime, and companionship.

Beyond that, DogLink provides a dedicated community where dog owners can share posts and videos, access reliable veterinary information, and keep track of their dogs’ health records. It creates a trusted space for social connection, practical support, and better care for dogs.

### Features

1. **Dog-walking and playtime matching**: Connect owners with local dog lovers for walking, play visits, or group dog-walking events.
2. **Dog community feed**: Share photos and short videos, follow other owners, and engage socially through likes and comments.
3. **Veterinary services**:
    * Online consultations with partnered vets (using camera & microphone)
    * Nearby veterinary clinic map with navigation
    * Ratings and reviews of vets and clinics
4. **Dog health records (offline-ready)**: Track vaccination, deworming, and check-up schedules with built-in offline reminders.
5. **Dog activities & meetups**: Organize or join local group walks, meetups, or dog-friendly events.

### Requirements

* **Split App Model:**
    * Local storage: dog health records, offline reminders, cached posts
    * Cloud storage (Firebase): accounts, posts, walking services, clinic data, dog info sync

* **User Support:**
    * All users are dog lovers by default.
    * “Dog owner” is inferred when a user adds at least one dog (no separate account type).
    * Each dog has its own profile (breed, sex, DOB, temperament, health/vaccines, photos, notes).
    * Every dog must be linked to at least one owner; multiple co-owners are supported.
    * Ownership roles: primary owner, co-owner, foster, and sitter (optional); changes are recorded over time to preserve history.
    * Activities & history: users can log walks, playdates, training, vet visits, etc.; associate activities with specific dogs and participants to build personal and per-dog timelines.
    * Social & discovery: follow both people and dogs; discover nearby playmates; share updates.
    * Privacy & permissions: configurable visibility (public, followers, owners-only, private) for dog profiles and activities; editing rights belong to primary/co-owners, with limited permissions for sitters/fosters.

* **Sensor Use:**
    * **GPS**: Track dog-walking routes and locate nearby clinics/events
    * **Camera & Microphone**: Capture photos/videos for sharing; enable online vet consultations
    * **Accelerometer**: Combine with GPS for dog-walk activity reports

* **Offline Mode:**
    * **Fully offline**: Dog health records with reminders
    * Cached access: previously viewed posts and clinic information
    * Offline dog-walk tracking stored locally until synced online
    * Offline drafts: save posts or consultation questions for later publishing
