import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";

export default function superpowers(pi: ExtensionAPI) {
  // Resolve skills directory relative to this extension
  const packageRoot = join(dirname(__dirname));
  const skillsDir = join(packageRoot, "skills");

  // Build the skill reference content once at load time
  const orchestratorSkillPath = join(skillsDir, "superpowers", "SKILL.md");
  let orchestratorContent = "";

  if (existsSync(orchestratorSkillPath)) {
    orchestratorContent = readFileSync(orchestratorSkillPath, "utf-8");
    // Strip YAML frontmatter for injection
    const lines = orchestratorContent.split("\n");
    let inFrontmatter = false;
    let frontmatterEnd = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() === "---") {
        if (inFrontmatter) {
          frontmatterEnd = i + 1;
          break;
        }
        inFrontmatter = true;
      }
    }
    orchestratorContent = lines.slice(frontmatterEnd).join("\n").trim();
  }

  // Auto-trigger: inject the superpowers orchestrator instructions into the system prompt
  // This is the PI equivalent of Claude Code's session-start hook
  pi.on("before_agent_start", async (event, _ctx) => {
    // Don't inject if already present (idempotent)
    if (event.systemPrompt.includes("Superpowers")) {
      return {};
    }

    const superpowersBlock = [
      "",
      "<superpowers>",
      "You have Superpowers — a structured development workflow.",
      "",
      orchestratorContent,
      "</superpowers>",
      "",
    ].join("\n");

    return {
      systemPrompt: event.systemPrompt + superpowersBlock,
    };
  });

  // Register a /superpowers command that shows status and skill list
  pi.registerCommand("superpowers", {
    description: "Show Superpowers status and available skills",
    handler: async (_args, ctx) => {
      const skillDirs = [
        "superpowers",
        "superpowers-brainstorming",
        "superpowers-writing-plans",
        "superpowers-executing-plans",
        "superpowers-subagent-dev",
        "superpowers-tdd",
        "superpowers-debugging",
        "superpowers-verify",
        "superpowers-parallel-agents",
        "superpowers-code-review",
        "superpowers-receiving-review",
        "superpowers-git-worktrees",
        "superpowers-finish-branch",
        "superpowers-writing-skills",
      ];

      const installed: string[] = [];
      const missing: string[] = [];

      for (const name of skillDirs) {
        const skillPath = join(skillsDir, name, "SKILL.md");
        if (existsSync(skillPath)) {
          installed.push(name);
        } else {
          missing.push(name);
        }
      }

      let msg = `⚡ Superpowers v1.0.0 — ${installed.length}/${skillDirs.length} skills loaded\n\n`;
      msg += `Installed: ${installed.join(", ")}\n`;
      if (missing.length > 0) {
        msg += `Missing: ${missing.join(", ")}\n`;
      }
      msg += `\nUse /skill:<name> to invoke a skill directly.`;

      ctx.ui.notify(msg, "info");
    },
  });
}
