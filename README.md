# BP-Wiki Starter

BP-Wiki Starter is the public entry point for BP-Wiki. It gives Obsidian users two things: practical bilingual starter vault structures and a public-safe `Public OS Shell` that explains how an AI-assisted knowledge operating system can be organized without exposing the private production system behind it.

BP-Wiki Starter 是 BP-Wiki 的公开入口。它为 Obsidian 用户提供两层能力：可直接使用的中英双语知识库启动结构，以及公开安全的 `Public OS Shell`，用来解释一套 AI 协同知识操作系统如何组织，但不暴露背后的私有生产系统。

## Positioning

`Public OS Shell` is not a paid V2 content pack and not a copy of the private BP-Wiki vault. It is the shareable operating-system shell of BP-Wiki: the public architecture, folder logic, agent entry contract, minimal Runtime concepts, distribution boundary, and synthetic examples.

`Public OS Shell` 不是付费 V2 内容包，也不是私有 BP-Wiki 知识库的复制品。它是 BP-Wiki 可公开分发的操作系统壳层：公开架构、目录逻辑、Agent 入口契约、最小 Runtime 概念、分发边界和合成示例。

It is designed for people who want to understand the system shape before they import heavier templates, private projects, data connectors, or automation.

它适合那些想先理解系统形态，再决定是否引入更重模板、私有项目、数据连接器或自动化的人。

## Core Philosophy

- Workflow first, folders second. A vault should serve real work: capture, analysis, writing, projects, review, and reuse.
- Human judgment stays central. Agents execute, structure, validate, and maintain boundaries; they do not become the source of truth.
- Public and private versions stay separate. The public shell teaches the operating model; the private brain preserves lived projects, data, decisions, and compounding advantage.
- Synthetic examples are enough for public learning. Real projects, connector state, secrets, decision ledgers, and learning records stay private.
- Runtime should be small and visible. The shell explains context gating, routing, writeback, and review boundaries without forcing a heavy framework.

- 工作流优先，目录其次。知识库首先服务真实工作：收集、分析、写作、项目、复盘和复用。
- 人类判断保持中心位置。Agent 负责执行、结构化、校验和守边界，但不成为事实源。
- 公开版和私有版必须分离。公开壳层讲清操作模型；私有大脑保留真实项目、数据、决策和复利资产。
- 公开学习只需要合成示例。真实项目、连接器状态、密钥、决策账本和学习记录都留在私有系统。
- Runtime 应该小而可见。壳层解释 Context Gate、路由、写回和评审边界，不把用户拖进重框架。

## What It Does

- Install 12 bilingual vault templates.
- Create a starter guide, edition comparison page, and template selector.
- Create a Public OS Shell guide with positioning, philosophy, operating model, and distribution boundary.
- Create a distribution manifest for public/private version control.
- Keep all generated files inside `BP-Wiki Starter/` unless you move them yourself.
- Explain the differences between Free Starter, Public OS Shell, Developer Core, and Private Brain.

## 12 Starter Templates

| Template | Best For |
| --- | --- |
| PARA | Project-driven work and active/archive flow |
| Zettelkasten | Atomic notes and long-term research |
| GTD | Task-heavy workflows |
| Digital Garden | Public writing and evolving ideas |
| LYT + MOC | Topic maps and linked navigation |
| Evergreen Notes | Argument-led permanent notes |
| Inbox + Tags | Fragment-heavy capture workflows |
| Daily + MOC | Time-based and topic-based navigation |
| INKAPA | Chinese PKM workflows extending PARA |
| Cornell Notes | Reading, courses, and study notes |
| MOC Navigation | Flat notes with map-based indexes |
| Progressive Formalization | Fleeting notes to permanent notes |

## Editions

| Edition | For | Includes | Status |
| --- | --- | --- | --- |
| Free Starter | New Obsidian users and knowledge-base builders | 12 bilingual templates, setup guide, edition comparison, sample structure | Free |
| Public OS Shell | Users who want to understand BP-Wiki as an AI-assisted knowledge operating system | Public architecture, README / AGENTS-style operating shell, minimal Runtime concepts, synthetic examples, distribution manifest | Free |
| Developer Core | Advanced users who want reproducible mechanics | Redacted packs, templates, toy projects, shareable skills, and implementation examples | Future public-safe package |
| Private Brain | The user's complete production system | Private projects, skills, data sources, decision records, learning records, connector state | Not distributed |

See [PRICING.md](PRICING.md) for the current distribution boundary.

## Public OS Shell

`Public OS Shell` is the current public-safe BP-Wiki system layer in this plugin.

It gives users a stable way to understand the BP-Wiki operating model:

- how inputs move from inbox to projects and knowledge;
- how agents should load context and avoid instruction pollution;
- how Runtime boundaries keep execution auditable;
- how public packages stay separate from private working memory;
- how future Developer Core packages can add mechanics without leaking the Private Brain.

It is a public architecture shell, not the full private BP-Wiki system.

See [PUBLIC_OS_SHELL.md](PUBLIC_OS_SHELL.md) and [DISTRIBUTION_MANIFEST.public.yml](DISTRIBUTION_MANIFEST.public.yml) for the repository-level shell boundary.

Allowed contents:

- public-safe README / AGENTS-style guidance;
- minimal Runtime explanation;
- empty folder conventions;
- synthetic examples;
- distribution manifest;
- redaction and version-boundary notes.

Not included:

- private projects;
- AI Staging;
- connector configs;
- secrets or local paths;
- private skills;
- real data sources;
- decision ledgers;
- learning logs.

## Distribution Boundary

README + AGENTS can share the operating-system shell. They do not replicate the full private BP-Wiki system.

Public versions are derived distributions. Private Brain remains canonical unless a user explicitly says otherwise.

Public-to-private changes require port-back review. Private-to-public releases require redaction review.

## Privacy

This plugin runs locally inside your vault. Version `1.1.1` does not collect analytics, send telemetry, or connect to external services in the background.

## Commands

- `Install starter kit`
- `Open edition comparison`
- `Open template selector`
- `Open Public OS Shell`

## Manual Installation

Download `main.js`, `manifest.json`, and `styles.css` from the GitHub release that matches the version in `manifest.json`, then place them in:

```text
<your-vault>/.obsidian/plugins/bp-wiki-starter/
```

Restart Obsidian and enable the plugin in Community plugins.

## Official Directory Submission

This repository contains the required files for an Obsidian Community submission:

- `README.md`
- `LICENSE`
- `manifest.json`
- Release assets: `main.js`, `manifest.json`, `styles.css`

## License

The plugin code is licensed under the MIT License. Public OS Shell content generated by this plugin is intended as public-safe starter material.

## Trademark

BP-Wiki Starter is an independent community plugin and is not affiliated with, endorsed by, or sponsored by Obsidian.
