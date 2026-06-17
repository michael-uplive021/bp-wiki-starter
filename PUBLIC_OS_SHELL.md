# BP-Wiki Public OS Shell

Public OS Shell is a public-safe BP-Wiki architecture shell. It explains the operating model without exposing the private production system.

Public OS Shell 是公开安全的 BP-Wiki 架构壳层。它解释操作系统思路，不暴露私有生产系统。

## What It Includes

- Public-safe README / AGENTS-style guidance.
- Minimal Runtime concepts.
- Empty folder conventions.
- Synthetic examples only.
- Distribution manifest and redaction boundary.

## What It Excludes

- Private projects.
- AI Staging.
- Connector configs.
- Secrets or local paths.
- Private skills.
- Real data sources.
- Decision ledgers.
- Learning logs.

## Recommended Public Folder Shape

```text
00_Dashboard/
01_Inbox/
02_Projects/
03_Knowledge/
04_Skills/
05_Protocols/
06_System/
AGENTS.md
README.md
Distribution Manifest.md
```

The folders should start mostly empty. Use synthetic examples only.

## Version Boundary

Public OS Shell is a derived distribution.

Private Brain remains canonical unless the user explicitly says the task is operating on a public or developer distribution.

Public-to-private changes require port-back review. Private-to-public releases require redaction review.
