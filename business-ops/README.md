# Business Ops Agent Team

You talk to the **Chief of Staff**. The Chief of Staff runs the specialist team and brings you one clear answer.

## How to use

1. Open this folder (`business-ops`) as your Cursor workspace (or add it to the workspace).
2. Tell the Chief of Staff what you need in plain language, for example:
   - "We need a simple offer and price for X"
   - "Draft a 2-week launch plan"
   - "We're burning cash — what do we cut?"
   - "Hire a part-time VA — write the role and interview plan"
3. Expect: **Understood → Plan → Needs from you → Update → Next**

## Org chart

```
You (Owner)
 └── Chief of Staff
      ├── Finance
      ├── Marketing
      ├── Sales
      ├── Operations
      ├── People
      ├── Legal
      ├── Product
      ├── Customer Success
      └── Strategy
```

## Files

| Path | Purpose |
|------|---------|
| `.cursor/rules/chief-of-staff.mdc` | Always-on: agent acts as Chief of Staff |
| `.cursor/skills/chief-of-staff/` | Orchestration playbook |
| `.cursor/agents/*.md` | Specialist subagents |
| `playbooks/business-context.md` | Shared company facts — fill this in |

## Tips

- Fill in `playbooks/business-context.md` once; every specialist will stay aligned.
- Ask for decisions in batches when you can ("approve A or B").
- For contracts and taxes, the team will flag when a real attorney/CPA is required.

## Optional: install agents for all projects

If you want these agents available outside this folder:

```bash
mkdir -p ~/.cursor/agents
cp business-ops/.cursor/agents/*.md ~/.cursor/agents/
```
