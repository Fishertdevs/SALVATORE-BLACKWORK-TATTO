---
name: Package firewall recovery
description: Replit package-install behavior when the firewall blocks a dependency tarball.
---

When the Replit package firewall rejects a dependency tarball during a frozen workspace install, update the blocked direct dependency to a current compatible release and retry the frozen install.

**Why:** Retrying the unchanged lockfile repeats the same 403 and leaves workspace package links incomplete, which can make an otherwise valid app fail with missing executables.

**How to apply:** Identify the direct package declaration that owns the blocked dependency, update only that dependency, then rerun the workspace install before starting the managed workflow.