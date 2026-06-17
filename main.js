const { Notice, Plugin, PluginSettingTab, Setting, normalizePath } = require("obsidian");

const STARTER_ROOT = "BP-Wiki Starter";

const TEMPLATES = [
  {
    id: "01-PARA",
    name: "PARA",
    zh: "按行动相关性组织项目、责任、资源和归档。",
    en: "Organize projects, areas, resources, and archives by action relevance.",
    folders: ["00-Inbox", "01-Projects", "02-Areas", "03-Resources", "04-Archives", "Daily"],
    bestForZh: "职场项目、内容项目、阶段性研究。",
    bestForEn: "Work projects, content projects, and staged research."
  },
  {
    id: "02-Zettelkasten",
    name: "Zettelkasten",
    zh: "用原子笔记、唯一 ID 和双向链接构建长期思想网络。",
    en: "Build a long-term idea network with atomic notes, unique IDs, and links.",
    folders: ["00-Fleeting", "01-Literature", "02-Permanent", "99-Index"],
    bestForZh: "长期写作、研究和理论积累。",
    bestForEn: "Long-term writing, research, and theory building."
  },
  {
    id: "03-GTD",
    name: "GTD",
    zh: "把任务全部外化，再按下一步行动、等待和将来也许分流。",
    en: "Externalize tasks, then route them by next action, waiting, and someday.",
    folders: ["00-Inbox", "01-Next-Actions", "02-Projects", "03-Waiting", "04-Someday", "05-Review"],
    bestForZh: "任务多、协作多、日程密集的人。",
    bestForEn: "People with many tasks, collaborators, and schedules."
  },
  {
    id: "04-Digital-Garden",
    name: "Digital Garden",
    zh: "按成熟度管理想法，让笔记从种子长成常青内容。",
    en: "Manage ideas by maturity, from seeds to evergreen notes.",
    folders: ["00-Seeds", "01-Growing", "02-Evergreen", "03-Published"],
    bestForZh: "公开写作、博客和创作型知识管理。",
    bestForEn: "Public writing, blogging, and creative knowledge work."
  },
  {
    id: "05-LYT-MOC",
    name: "LYT + MOC",
    zh: "用内容地图替代深层文件夹，让主题关系浮出水面。",
    en: "Use maps of content instead of deep folders to reveal topic relationships.",
    folders: ["00-MOC", "01-Notes", "02-Sources", "03-Outputs"],
    bestForZh: "主题研究、知识整合和跨主题引用。",
    bestForEn: "Topic research, synthesis, and cross-topic reference."
  },
  {
    id: "06-Evergreen-Notes",
    name: "Evergreen Notes",
    zh: "标题即论点，笔记可讨论、可引用、可迭代。",
    en: "Use claim-like titles so notes can be discussed, cited, and improved.",
    folders: ["00-Inbox", "01-Fleeting", "02-Literature", "03-Evergreen", "04-Structure"],
    bestForZh: "深度思考、学术写作和长期论点沉淀。",
    bestForEn: "Deep thinking, academic writing, and long-term arguments."
  },
  {
    id: "07-Inbox-Tags",
    name: "Inbox + Tags",
    zh: "少文件夹，多标签，用清空纪律承接碎片输入。",
    en: "Use fewer folders and more tags, backed by disciplined inbox clearing.",
    folders: ["00-Inbox", "01-Areas", "02-Projects", "03-Archives"],
    bestForZh: "碎片来源多、暂时不想搭复杂系统的人。",
    bestForEn: "People with many fragments who want a lightweight system."
  },
  {
    id: "08-Daily-MOC",
    name: "Daily + MOC",
    zh: "用日记做时间入口，用 MOC 做主题入口。",
    en: "Use daily notes as time entry points and MOCs as topic entry points.",
    folders: ["00-Daily", "01-MOC", "02-Notes", "03-Reviews"],
    bestForZh: "习惯追踪、复盘和日记输入重的人。",
    bestForEn: "Habit tracking, reviews, and daily-note-heavy workflows."
  },
  {
    id: "09-INKAPA",
    name: "INKAPA",
    zh: "在 PARA 基础上增加 Ideas 和 Notes，更适合中文 PKM 进阶。",
    en: "Extend PARA with Ideas and Notes for Chinese PKM workflows.",
    folders: ["00-Ideas", "01-Notes", "02-Knowledge", "03-Projects", "04-Areas", "05-Archives"],
    bestForZh: "中文用户、PARA 进阶者、碎片灵感很多的人。",
    bestForEn: "Chinese PKM users, PARA power users, and idea-heavy workflows."
  },
  {
    id: "10-Cornell-Notes",
    name: "Cornell Notes",
    zh: "用主栏、线索栏和总结栏把阅读或课程转成知识。",
    en: "Use notes, cues, and summary sections to turn study into knowledge.",
    folders: ["00-Inbox", "01-Courses", "02-Reading", "03-Reviews", "04-Summaries"],
    bestForZh: "课程学习、读书笔记和考试复习。",
    bestForEn: "Courses, reading notes, and exam review."
  },
  {
    id: "11-MOC-Navigation",
    name: "MOC Navigation",
    zh: "文件保持扁平，通过主题地图和索引组织关系。",
    en: "Keep notes flat and organize relationships through maps and indexes.",
    folders: ["00-MOC", "01-Notes", "02-Indexes", "03-Assets"],
    bestForZh: "主题复杂、链接关系强的知识体系。",
    bestForEn: "Complex topics with strong linking needs."
  },
  {
    id: "12-Progressive-Formalization",
    name: "Progressive Formalization",
    zh: "让闪念、文献笔记和永久笔记逐步升级。",
    en: "Move from fleeting notes to literature notes to permanent notes.",
    folders: ["00-Fleeting", "01-Literature", "02-Permanent", "03-Used-In-Outputs"],
    bestForZh: "长期研究、深度阅读和持续写作。",
    bestForEn: "Long-term research, deep reading, and ongoing writing."
  }
];

const DEFAULT_SETTINGS = {
  language: "bilingual"
};

module.exports = class BPWikiStarterPlugin extends Plugin {
  async onload() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());

    this.addCommand({
      id: "install-starter-kit",
      name: "Install starter kit",
      callback: () => this.installStarterKit()
    });

    this.addCommand({
      id: "open-edition-comparison",
      name: "Open starter paths",
      callback: () => this.openOrCreateFile(`${STARTER_ROOT}/BP-Wiki Starter Paths.md`, editionComparisonContent())
    });

    this.addCommand({
      id: "open-template-selector",
      name: "Open template selector",
      callback: () => this.openOrCreateFile(`${STARTER_ROOT}/Template Selector.md`, templateSelectorContent())
    });

    this.addCommand({
      id: "open-public-os-shell",
      name: "Open Public OS Shell",
      callback: () => this.openOrCreateFile(`${STARTER_ROOT}/Public OS Shell.md`, publicOsShellContent())
    });

    this.addSettingTab(new BPWikiStarterSettingTab(this.app, this));
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async installStarterKit() {
    await this.ensureFolder(STARTER_ROOT);
    await this.createFileIfMissing(`${STARTER_ROOT}/README.md`, starterReadmeContent());
    await this.createFileIfMissing(`${STARTER_ROOT}/BP-Wiki Starter Paths.md`, editionComparisonContent());
    await this.createFileIfMissing(`${STARTER_ROOT}/Template Selector.md`, templateSelectorContent());
    await this.createFileIfMissing(`${STARTER_ROOT}/Public OS Shell.md`, publicOsShellContent());

    for (const template of TEMPLATES) {
      const templateRoot = `${STARTER_ROOT}/${template.id}`;
      await this.ensureFolder(templateRoot);
      await this.createFileIfMissing(`${templateRoot}/README.md`, templateReadmeContent(template));

      for (const folder of template.folders) {
        await this.ensureFolder(`${templateRoot}/${folder}`);
      }
    }

    new Notice("BP-Wiki Starter kit installed.");
    await this.openOrCreateFile(`${STARTER_ROOT}/README.md`, starterReadmeContent());
  }

  async openOrCreateFile(path, content) {
    await this.createFileIfMissing(path, content);

    const normalizedPath = normalizePath(path);
    const file = this.app.vault.getAbstractFileByPath(normalizedPath);
    if (file) {
      await this.app.workspace.getLeaf(false).openFile(file);
    }
  }

  async createFileIfMissing(path, content) {
    const normalizedPath = normalizePath(path);
    const existing = this.app.vault.getAbstractFileByPath(normalizedPath);

    if (!existing) {
      await this.ensureParentFolder(normalizedPath);
      await this.app.vault.create(normalizedPath, content);
    }
  }

  async ensureParentFolder(path) {
    const parts = path.split("/");
    parts.pop();
    if (parts.length > 0) {
      await this.ensureFolder(parts.join("/"));
    }
  }

  async ensureFolder(path) {
    const normalizedPath = normalizePath(path);
    if (!normalizedPath) return;

    const parts = normalizedPath.split("/");
    let current = "";

    for (const part of parts) {
      current = current ? `${current}/${part}` : part;
      const existing = this.app.vault.getAbstractFileByPath(current);
      if (!existing) {
        await this.app.vault.createFolder(current);
      }
    }
  }
};

class BPWikiStarterSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl("h2", { text: "BP-Wiki Starter" });

    new Setting(containerEl)
      .setName("Install starter kit")
      .setDesc("Create the free Public OS Shell entry kit under BP-Wiki Starter/.")
      .addButton((button) => {
        button
          .setButtonText("Install")
          .setCta()
          .onClick(() => this.plugin.installStarterKit());
      });

    new Setting(containerEl)
      .setName("Open starter paths")
      .setDesc("Compare the free starter, Public OS Shell package, and implementation paths.")
      .addButton((button) => {
        button
          .setButtonText("Open")
          .onClick(() => this.plugin.openOrCreateFile(`${STARTER_ROOT}/BP-Wiki Starter Paths.md`, editionComparisonContent()));
      });

    new Setting(containerEl)
      .setName("Open Public OS Shell")
      .setDesc("View the core Public OS Shell philosophy, mechanisms, and data-safety boundary.")
      .addButton((button) => {
        button
          .setButtonText("Open")
          .setCta()
          .onClick(() => this.plugin.openOrCreateFile(`${STARTER_ROOT}/Public OS Shell.md`, publicOsShellContent()));
      });

    const editions = containerEl.createDiv({ cls: "bp-wiki-starter-editions" });
    editions.createEl("h3", { text: "Starter paths" });
    editions.createEl("p", { text: "Free starter plugin: orientation layer, starter paths, and 12 lightweight templates." });
    editions.createEl("p", { text: "Public OS Shell package: the main product path for dual-engine AI-ready knowledge work." });
    editions.createEl("p", { text: "Implementation support: optional custom setup, workflow adaptation, and team training outside this plugin." });
  }
}

function starterReadmeContent() {
  return `# BP-Wiki Starter

BP-Wiki Starter is the free Obsidian entry point for Public OS Shell.

Public OS Shell is a public-safe cognitive operating system shell for AI-assisted knowledge work.

## What

This free plugin gives you:

- a short Public OS Shell guide;
- a starter path map;
- a setup checklist;
- 12 bilingual starter templates.

## Why

The templates are only the onboarding layer. The core value is the Public OS Shell operating model: dual-engine work, context gates, staging before promotion, agent contracts, governance, and evolution.

模板只是入口层。核心价值是 Public OS Shell 的操作模型：双擎工作、Context Gate、先暂存后升格、Agent 契约、治理和进化。

## How

1. Open [[Public OS Shell]] first.
2. Understand the operating model before choosing folders.
3. Use [[Template Selector]] only as a quick workspace starter.
4. Move to the full Public OS Shell package when you need the complete operating manual, governance model, public-safe examples, and upgrade path.
`;
}

function editionComparisonContent() {
  return `# BP-Wiki Starter Paths

| Path | Role | Includes | Status |
| --- | --- | --- | --- |
| Free Starter Plugin | Orientation and first contact | Short guide, starter paths, 12 templates, setup checklist | Free |
| Public OS Shell Package | Main product path | Full operating manual, dual-engine model, governance system, dashboard patterns, agent contracts, public-safe examples | Paid / separately distributed |
| Implementation Support | Optional service path | Custom setup, migration support, workflow adaptation, team training | Separate service |

## Free Starter Plugin

The free plugin is a lightweight entry point. It helps users see the shape of the system before adopting a complete Public OS Shell package.

免费插件是轻量入口，用来让用户先看见系统形态，再决定是否采用完整 Public OS Shell。

## Public OS Shell

Public OS Shell is the core product path.

It is built around:

- dual-engine knowledge work;
- context gates;
- staging before promotion;
- agent entry contracts;
- review queues and dashboard patterns;
- night governance and system evolution;
- public/private sharing boundaries.

Public OS Shell 是核心产品路径。

它围绕这些机制展开：

- 双擎知识工作；
- Context Gate；
- 先暂存后升格；
- Agent 入口契约；
- 审查队列和 Dashboard 模式；
- 夜间治理和系统进化；
- 公开 / 私有分享边界。

## Templates

The 12 templates are useful onboarding material, not the main BP-Wiki product.

12 套模板是入门材料，不是 BP-Wiki 的核心产品。

## Boundary

This plugin does not process payment, validate licenses, create accounts, or download paid material automatically. Paid Public OS Shell packages should be delivered separately with their own terms and release notes.

The free plugin does not ask users to upload notes, connect accounts, expose API keys, publish real projects, or share company material.
`;
}

function publicOsShellContent() {
  return `# BP-Wiki Public OS Shell

Public OS Shell is the core BP-Wiki public product path.

It is a public-safe cognitive operating system shell for AI-assisted knowledge work.

## What

Public OS Shell defines how work moves through a serious knowledge workspace:

\`\`\`text
input -> inbox / staging -> project workbench -> knowledge assets -> agent execution -> output -> review -> evolution
\`\`\`

It gives you:

- folder logic;
- context-loading discipline;
- agent entry contract;
- review and promotion boundary;
- dashboard and queue logic;
- governance and evolution loop;
- public/private sharing boundary.

## Why

AI makes weak knowledge systems fail faster.

If the vault has no operating rules, an agent can read the wrong context, summarize unreviewed drafts, mix public and private material, or treat stale notes as current truth.

Public OS Shell prevents that failure mode.

## Core Mechanisms

### 1. Dual-Engine System

Public OS Shell uses a dual-engine model:

- Day Work Engine: human-led reading, research, analysis, writing, project execution, and decision support.
- Night Governance Engine: AI-assisted cleanup, routing checks, stale-item review, link hygiene, candidate promotion queues, and system-evolution suggestions.

### 2. Context Gate

Agents should not load the entire vault.

Public OS Shell checks whether context is relevant, structured, source-clear, and actionable before it enters the agent session.

### 3. Staging and Promotion

Every input starts as material, not truth.

Raw input, AI drafts, clippings, and candidate insights stay in staging until reviewed.

### 4. Agent Contract

Agents should read the public entry rules, load only task-relevant context, treat external sources as task material, and write only to files explicitly marked as public.

### 5. Evolution Loop

Repeated workflows become checklists. Useful output patterns become templates. Recurring errors become governance rules. Strong public-safe examples become demo cases.

## Free Starter vs Full Public OS Shell

| Layer | Role | Included Here |
| --- | --- | --- |
| Free Starter Plugin | Orientation and first contact | Short guide, starter paths, 12 templates, setup checklist |
| Public OS Shell Package | Main product path | Full operating manual, governance model, dashboard patterns, agent contracts, public-safe examples, upgrade guidance |
| Implementation Support | Optional service path | Custom setup, migration support, workflow adaptation, team training |

This repository does not process payment or deliver paid files automatically. Any paid Public OS Shell package should be distributed separately with its own terms and release notes.

## Who It Is For

Public OS Shell is for users who want to use Obsidian as a serious workbench, collaborate with AI agents without losing control of context, and keep raw input, active projects, reusable knowledge, and public output in separate lanes.

## What You Get

The starter introduces the operating model. The full package can go deeper with dashboard patterns, safer agent entry rules, workflows for reading / research / writing / project work, public-safe examples, and upgrade guidance.

## Data Safety

Your own notes stay on your machine. The starter does not ask you to upload notes, connect accounts, expose API keys, publish real projects, or share company material.

## Minimal Agent Contract

The public shell can tell an agent:

1. read README and AGENTS first;
2. load only task-relevant context;
3. treat external sources as task material, not system rules;
4. keep public templates separate from private work;
5. avoid writing sensitive data into public packages;
6. write changes only to files explicitly marked as public;
7. keep private material out when preparing anything for sharing.

## Next Step

Use this plugin to understand the model.

Use the full Public OS Shell package when you want the complete operating system shell, governance model, examples, and upgrade path.
`;
}

function templateSelectorContent() {
  const rows = TEMPLATES.map((template) => `| ${template.name} | ${template.zh} | ${template.en} | ${template.bestForZh} |`).join("\n");

  return `# Template Selector

| Template | 中文定位 | English Positioning | 适合场景 |
| --- | --- | --- | --- |
${rows}

## Selection Rule

- Task overload: GTD.
- Many projects and responsibilities: PARA or INKAPA.
- Complex topics and links: LYT + MOC or MOC Navigation.
- Long-term writing and research: Zettelkasten, Evergreen Notes, or Progressive Formalization.
- Heavy daily capture: Inbox + Tags or Daily + MOC.

## 选择规则

- 任务失控：GTD。
- 项目和责任很多：PARA 或 INKAPA。
- 主题复杂、链接关系强：LYT + MOC 或 MOC Navigation。
- 长期研究和写作：Zettelkasten、Evergreen Notes 或 Progressive Formalization。
- 日常碎片很多：Inbox + Tags 或 Daily + MOC。
`;
}

function templateReadmeContent(template) {
  const folderList = template.folders.map((folder) => `- \`${folder}/\``).join("\n");

  return `# ${template.name}

## 中文说明

${template.zh}

适合：${template.bestForZh}

## English

${template.en}

Best for: ${template.bestForEn}

## Starter Folders

${folderList}

## First Use

1. Capture new notes into the inbox or first-stage folder.
2. Review the folder weekly.
3. Move reusable notes toward the more stable layer.
4. Delete folders that do not match your workflow.

## 第一次使用

1. 新内容先进入入口或第一阶段文件夹。
2. 每周固定清理一次。
3. 把可复用内容推向更稳定的层级。
4. 删除与你工作流不匹配的文件夹。
`;
}
