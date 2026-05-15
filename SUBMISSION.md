# Obsidian Community Submission

Use this file when submitting BP-Wiki Starter through the Obsidian Community developer dashboard.

## Repository

Suggested repository:

```text
https://github.com/michael-uplive021/bp-wiki-starter
```

## Plugin Metadata

```json
{
  "id": "bp-wiki-starter",
  "name": "BP-Wiki Starter",
  "author": "Jie Huang",
  "description": "Create bilingual starter vaults for knowledge work with 12 templates, setup guides, and optional BP-Wiki Pro upgrade paths.",
  "repo": "michael-uplive021/bp-wiki-starter"
}
```

## Pricing Label

Recommended label: `Optional payments`

Reason: the Free Starter plugin works without payment, while BP-Wiki Pro and Custom services may be offered as optional paid upgrades outside the plugin.

Planned pricing:

| Edition | Price |
| --- | ---: |
| Free Starter | Free |
| Pro Runtime Individual | $9/month or $79/year |
| Pro Runtime Professional | $19/month or $179/year |
| Custom Implementation | From $1,500 or RMB 9,800 |

Version `1.0.1` does not activate payments, accounts, license validation, or network downloads. Pricing is disclosed for product transparency.

## Payment Link

Manual early-access payment and inquiry channel:

```text
https://paypal.me/michael061394
```

This is also listed as the manifest `fundingUrl`. The plugin remains free and does not run an in-plugin checkout or subscription system in version `1.0.1`.

## Required Release

Create a GitHub release with:

```text
Tag: 1.0.1
Release name: 1.0.1
```

Attach:

- `main.js`
- `manifest.json`
- `styles.css`

## Disclosure Text

BP-Wiki Starter is free to use. Optional paid BP-Wiki Pro and Custom services may be offered outside this plugin through PayPal or a future checkout provider. Version `1.0.1` does not require payment, does not require an account, does not make network requests, does not include telemetry, and does not update itself.

## Dashboard Submission Steps

1. Go to `https://community.obsidian.md`.
2. Sign in with your Obsidian account.
3. Connect the GitHub account that owns the repository.
4. Open the developer dashboard.
5. Choose `Plugins`, then `New plugin`.
6. Submit the GitHub repository URL.
7. Confirm the developer policies and maintenance responsibility.
8. Run the automated review.
9. If the review passes, publish the plugin.

## Forum Announcement Draft

Title:

```text
BP-Wiki Starter: 12 bilingual starter vault templates for Obsidian
```

Body:

```text
BP-Wiki Starter is a free bilingual plugin for creating starter vault structures in Obsidian.

It includes 12 templates: PARA, Zettelkasten, GTD, Digital Garden, LYT + MOC, Evergreen Notes, Inbox + Tags, Daily + MOC, INKAPA, Cornell Notes, MOC Navigation, and Progressive Formalization.

The goal is simple: help users choose a workflow-based vault structure before they overbuild their system.

The plugin also explains the differences between Free Starter, BP-Wiki Pro Runtime, and Custom Implementation.
```
