const { Notice, Plugin, PluginSettingTab, Setting, normalizePath } = require("obsidian");

const STARTER_ROOT = "BP-Wiki Starter";
const AFDIAN_URL = "https://ifdian.net/item/e2f39c10505211f1a93452540025c377";
const PAYPAL_URL = "https://paypal.me/michael061394";

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
      name: "Open edition comparison",
      callback: () => this.openOrCreateFile(`${STARTER_ROOT}/BP-Wiki Editions.md`, editionComparisonContent())
    });

    this.addCommand({
      id: "open-template-selector",
      name: "Open template selector",
      callback: () => this.openOrCreateFile(`${STARTER_ROOT}/Template Selector.md`, templateSelectorContent())
    });

    this.addCommand({
      id: "open-v2-early-access",
      name: "Open V2 early access",
      callback: () => this.openOrCreateFile(`${STARTER_ROOT}/V2 Early Access.md`, v2EarlyAccessContent())
    });

    this.addCommand({
      id: "open-rmb-payment-page",
      name: "Open RMB payment page",
      callback: () => this.openPaymentLink(AFDIAN_URL, "Opening RMB early access payment page.")
    });

    this.addCommand({
      id: "open-paypal-payment-page",
      name: "Open PayPal payment page",
      callback: () => this.openPaymentLink(PAYPAL_URL, "Opening PayPal payment page.")
    });

    this.addSettingTab(new BPWikiStarterSettingTab(this.app, this));
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  openPaymentLink(url, message) {
    window.open(url, "_blank");
    new Notice(message);
  }

  async installStarterKit() {
    await this.ensureFolder(STARTER_ROOT);
    await this.createFileIfMissing(`${STARTER_ROOT}/README.md`, starterReadmeContent());
    await this.createFileIfMissing(`${STARTER_ROOT}/BP-Wiki Editions.md`, editionComparisonContent());
    await this.createFileIfMissing(`${STARTER_ROOT}/Template Selector.md`, templateSelectorContent());
    await this.createFileIfMissing(`${STARTER_ROOT}/V2 Early Access.md`, v2EarlyAccessContent());

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
      .setDesc("Create 12 bilingual template structures under BP-Wiki Starter/.")
      .addButton((button) => {
        button
          .setButtonText("Install")
          .setCta()
          .onClick(() => this.plugin.installStarterKit());
      });

    new Setting(containerEl)
      .setName("Open edition comparison")
      .setDesc("Compare Free Starter, Pro Runtime, and Custom Implementation.")
      .addButton((button) => {
        button
          .setButtonText("Open")
          .onClick(() => this.plugin.openOrCreateFile(`${STARTER_ROOT}/BP-Wiki Editions.md`, editionComparisonContent()));
      });

    new Setting(containerEl)
      .setName("Open V2 early access")
      .setDesc("View the RMB early access pack, optional updates, payment links, and installation steps.")
      .addButton((button) => {
        button
          .setButtonText("Open")
          .setCta()
          .onClick(() => this.plugin.openOrCreateFile(`${STARTER_ROOT}/V2 Early Access.md`, v2EarlyAccessContent()));
      });

    new Setting(containerEl)
      .setName("RMB payment")
      .setDesc("Open the Afdian page for RMB payment via Alipay or WeChat Pay.")
      .addButton((button) => {
        button
          .setButtonText("Afdian")
          .onClick(() => this.plugin.openPaymentLink(AFDIAN_URL, "Opening RMB payment page."));
      });

    new Setting(containerEl)
      .setName("International payment")
      .setDesc("Open the PayPal.Me page for international payment.")
      .addButton((button) => {
        button
          .setButtonText("PayPal")
          .onClick(() => this.plugin.openPaymentLink(PAYPAL_URL, "Opening PayPal payment page."));
      });

    const editions = containerEl.createDiv({ cls: "bp-wiki-starter-editions" });
    editions.createEl("h3", { text: "Editions" });
    editions.createEl("p", { text: "Free Starter: 12 bilingual templates and setup guides." });
    editions.createEl("p", { text: "V2 Early Access Pack: RMB 99 one-time download for the current Pro Runtime pack." });
    editions.createEl("p", { text: "V2 Early Access + Updates: RMB 199 for the current pack plus 3 months of minor updates." });
    editions.createEl("p", { text: "Custom Implementation: Project-based service from $1,500 or RMB 9,800 for migration, tailoring, training, and support." });
    editions.createEl("p", { text: "RMB payment: ifdian.net/item/e2f39c10505211f1a93452540025c377. International payment: paypal.me/michael061394." });
  }
}

function starterReadmeContent() {
  return `# BP-Wiki Starter

BP-Wiki Starter helps you choose and install a knowledge-base structure before you commit to a heavier system.

BP-Wiki Starter 帮你在投入复杂系统前，先选择并安装一套适合自己的知识库结构。

## Start Here

1. Open [[Template Selector]].
2. Choose one structure based on your current friction.
3. Use the generated folder as a starter, then delete what you do not need.
4. Read [[V2 Early Access]] if you need the Pro Runtime pack or a custom implementation.

## Core Idea

Do not ask "which folder is perfect?" Ask "what workflow should this vault support?"

不要先问“完美目录是什么”。先问“这个知识库要服务哪种工作流？”
`;
}

function editionComparisonContent() {
  return `# BP-Wiki Editions

| Edition | For | Includes | Payment |
| --- | --- | --- | --- |
| Free Starter | New Obsidian users and knowledge-base builders | 12 bilingual templates, setup guide, edition comparison, sample structure | Free |
| V2 Early Access Pack | Individual business analysts, researchers, BP and decision-support workers | Current Pro Runtime Pack, installation guide, dashboard/workbench setup, business templates | RMB 99 one-time download |
| V2 Early Access + Updates | Users who want the current pack plus short-cycle improvements | Current Pro Runtime Pack plus 3 months of minor content-pack updates | RMB 199 |
| Custom Implementation | Teams, consultants, and advanced knowledge workers | Private diagnosis, migration, Runtime tailoring, template customization, training and support | Project-based service from $1,500 or RMB 9,800 |

## Free Starter

Free Starter gives you a clean structure and a practical starting point.

免费版提供干净的结构和可直接使用的起点。

## V2 Pro Runtime

Pro Runtime turns a starter vault into a working business analysis system.

Pro 版把基础知识库升级为可运行的商业分析工作台。

RMB early access:

- V2 Early Access Pack: RMB 99 one-time download.
- V2 Early Access + Updates: RMB 199 for the current pack plus 3 months of minor updates.

人民币早鸟价：

- V2 早鸟下载包：99 元，一次支持后获取当前版本。
- V2 早鸟更新包：199 元，当前版本 + 3 个月小版本更新。

## Custom Implementation

Custom Implementation is for teams or advanced users who need migration, tailoring, and training.

私人订制适合需要迁移、裁剪和培训的团队或重度用户。

Planned starting price: from $1,500 or RMB 9,800.

计划起步价：1,500 美元起或人民币 9,800 元起。

## Payment Status

Version 1.0.4 does not activate in-plugin checkout, accounts, license validation, or network downloads. RMB payment uses the Afdian item page, and international payment uses PayPal.

1.0.4 版本不启用插件内付款、账号、授权验证或网络下载。人民币付款使用爱发电商品页，国际付款使用 PayPal。

## Early Access Payment

Early BP-Wiki Pro access and Custom Implementation inquiries can use:

[ifdian.net/item/e2f39c10505211f1a93452540025c377](https://ifdian.net/item/e2f39c10505211f1a93452540025c377)

[paypal.me/michael061394](https://paypal.me/michael061394)

These are external manual payment channels, not automated in-plugin subscription or license systems.

早期 Pro 访问和私人订制咨询可使用：

[ifdian.net/item/e2f39c10505211f1a93452540025c377](https://ifdian.net/item/e2f39c10505211f1a93452540025c377)

[paypal.me/michael061394](https://paypal.me/michael061394)

这是外部手动付款 / 咨询入口，不是插件内自动订阅或授权系统。
`;
}

function v2EarlyAccessContent() {
  return `# BP-Wiki V2 Early Access

V2 is delivered as a Pro Runtime Pack, not as a separate paid plugin binary.

V2 以 Pro Runtime 内容包交付，不作为另一个付费插件二进制文件交付。

## What You Get

- Current BP-Wiki Pro Runtime Pack.
- Dual-engine workflow map.
- Project Workbench setup guide.
- Dashboard queue setup guide.
- Inbox governance checklist.
- Business analysis templates.
- V2 installation and update instructions.

## 你会获得什么

- 当前版本的 BP-Wiki Pro Runtime 内容包。
- 双引擎工作流地图。
- 项目 Workbench 搭建说明。
- Dashboard 队列搭建说明。
- Inbox 治理检查表。
- 商业分析模板。
- V2 安装与更新说明。

## RMB Early Access

| Option | Price | Includes |
| --- | ---: | --- |
| V2 Early Access Pack | RMB 99 | Current Pro Runtime Pack download |
| V2 Early Access + Updates | RMB 199 | Current pack plus 3 months of minor updates |
| Custom Implementation | From RMB 9,800 | Private diagnosis, migration, tailoring, training, and support |

## 人民币早鸟方案

| 方案 | 价格 | 包含内容 |
| --- | ---: | --- |
| V2 早鸟下载包 | 99 元 | 当前版本 Pro Runtime Pack 下载 |
| V2 早鸟更新包 | 199 元 | 当前版本 + 3 个月小版本更新 |
| 私人订制 | 9,800 元起 | 诊断、迁移、裁剪、培训和支持 |

## Payment Links

- RMB / 人民币: [Afdian V2 item](https://ifdian.net/item/e2f39c10505211f1a93452540025c377)
- International / 国际: [PayPal](https://paypal.me/michael061394)

## Installation Flow

1. Install BP-Wiki Starter from the Obsidian Community plugin directory.
2. Open the RMB or PayPal payment link above.
3. After payment, Afdian sends an automatic reply with delivery instructions.
4. Receive \`BP-Wiki-Pro-Runtime-Pack-v2.0.0.zip\` through the Afdian order message or PayPal follow-up.
5. Unzip the pack, drag the whole folder into your vault, and open \`00_START_HERE.md\`.
6. Keep this plugin enabled for starter templates, edition comparison, and upgrade instructions.

## 安装流程

1. 从 Obsidian 插件市场安装 BP-Wiki Starter。
2. 打开上方人民币或 PayPal 付款入口。
3. 付款后，爱发电会自动回复交付说明。
4. 通过爱发电订单消息或 PayPal 后续消息获取 \`BP-Wiki-Pro-Runtime-Pack-v2.0.0.zip\`。
5. 解压内容包，把整个文件夹拖入你的 vault，然后打开 \`00_START_HERE.md\`。
6. 保留本插件，用于模板、版本差异和升级说明。

## Delivery Note

Current early access delivery uses Afdian automatic reply plus order-message pack delivery. Full automatic download requires a stable download link or Afdian collection content.

当前早鸟交付采用爱发电自动回复 + 订单消息发包。真正自动下载还需要稳定下载链接或爱发电作品集内容承载。

## Boundary

The free plugin does not include the paid Pro Runtime Pack files. The paid pack is delivered after payment through the external payment channel.

免费插件不包含付费 Pro Runtime 内容包文件。付费内容包会在付款后通过外部付款渠道交付。
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
