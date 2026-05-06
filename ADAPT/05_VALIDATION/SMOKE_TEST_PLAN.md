# Smoke Test Plan

## Purpose

This smoke test verifies that the Paggawa prototype demonstrates the core MVP loop.

---

## Smoke Tests

### App Load

- [ ] App loads without runtime error.
- [ ] Main navigation is visible.
- [ ] Surface switcher is visible.
- [ ] User can switch between Paggawa Mobile and Paggawa Quest.
- [ ] Shared mock/local data is visible in both surfaces.

### Paggawa Mobile Resident Flow

- [ ] Paggawa Mobile Resident dashboard loads.
- [ ] Resident can create a job request.
- [ ] Resident can view own job requests.
- [ ] Resident can browse worker profiles.

### Paggawa Mobile Worker Flow

- [ ] Paggawa Mobile Worker dashboard loads.
- [ ] Worker can view nearby jobs.
- [ ] Worker can respond to a job.

### Paggawa Quest Flow

- [ ] Paggawa Quest workspace/dashboard loads.
- [ ] Barangay staff can view quest board.
- [ ] Barangay staff can create assisted job request.
- [ ] Barangay staff can view worker registry.

### Match Flow

- [ ] Worker response appears to resident.
- [ ] Resident can accept a worker.
- [ ] Job changes to matched status.

### Completion Flow

- [ ] Matched job can be marked completed.
- [ ] Resident can leave review.
- [ ] Worker reputation updates.

### Privacy

- [ ] Exact address is not visible before match.
- [ ] Contact details are not visible before match.

### Persistence

- [ ] If local storage is used, mock/local data persists after refresh.
