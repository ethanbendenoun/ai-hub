import type { Guide } from "./types";

// Guides are defined inline for simplicity - no MDX compilation needed
// Each guide is a self-contained object with all content
export const GUIDES: Guide[] = [
  {
    slug: "claude-code",
    title: "Claude Code",
    description:
      "L'agent IA de developpement qui comprend votre codebase et execute des commandes directement dans votre terminal.",
    icon: "Terminal",
    category: "Agent de Code",
    strengths: [
      "Comprend le contexte de tout un projet (pas juste un fichier)",
      "Execute des commandes shell, git, npm directement",
      "Edite plusieurs fichiers en une seule operation",
      "Supporte les MCP servers pour etendre ses capacites",
      "Mode Plan pour les taches complexes",
    ],
    useCases: [
      "Developper une feature complete de A a Z",
      "Refactoring a grande echelle",
      "Debugging complexe multi-fichiers",
      "Setup de projets et configuration",
      "Revue de code et amelioration de qualite",
    ],
    tips: [
      "Utilisez CLAUDE.md pour donner du contexte permanent a Claude",
      "Lancez le en mode Plan d'abord pour les grosses taches",
      "Utilisez les skills (/commit, /review-pr) pour des workflows rapides",
      "Configurez des hooks pour automatiser les validations",
      "Pensez a utiliser les agents en parallele pour aller plus vite",
    ],
    difficulty: "intermediaire",
    lastUpdated: "2026-03-14",
    content: `## Qu'est-ce que Claude Code ?

Claude Code est un outil en ligne de commande (CLI) qui agit comme un agent IA autonome pour le developpement logiciel. Contrairement a un simple chatbot, il peut **lire vos fichiers, executer des commandes, et modifier votre code** directement.

## Comment commencer

1. **Installez Claude Code** : \`npm install -g @anthropic-ai/claude-code\`
2. **Lancez-le dans votre projet** : \`cd mon-projet && claude\`
3. **Decrivez ce que vous voulez** : "Ajoute une page de login avec validation email"
4. Claude analyse votre codebase, propose un plan, et execute les modifications

## Fonctionnalites cles

### Mode Agent
Claude Code peut enchainer des actions de maniere autonome : lire des fichiers, chercher du code, editer, executer des tests, corriger les erreurs... le tout sans intervention.

### CLAUDE.md
Creez un fichier \`CLAUDE.md\` a la racine de votre projet pour donner des instructions permanentes : conventions de code, stack technique, commandes de build, etc.

### Skills (Slash Commands)
- \`/commit\` - Cree un commit Git avec un message pertinent
- \`/review-pr\` - Revue de pull request detaillee
- \`/simplify\` - Simplifie et optimise le code modifie

### MCP Servers
Etendez les capacites de Claude en connectant des services externes (GitHub, Slack, bases de donnees...) via le protocole MCP.

## Astuces avancees

- **Agents en parallele** : Claude peut lancer des sous-agents pour traiter plusieurs taches simultanement
- **Worktrees** : Isolez les modifications dans un worktree Git temporaire
- **Hooks** : Automatisez des actions avant/apres chaque commande
- **Memory** : Claude se souvient de vos preferences entre les sessions`,
  },
  {
    slug: "claude-ai",
    title: "Claude (claude.ai)",
    description:
      "L'assistant conversationnel d'Anthropic - ideal pour la reflexion, l'analyse et la creation de contenu.",
    icon: "MessageSquare",
    category: "Assistant IA",
    strengths: [
      "Raisonnement approfondi et nuance",
      "Gestion de tres longs documents (200K tokens)",
      "Creation de contenu de haute qualite",
      "Analyse et synthese complexe",
      "Projects pour organiser ses conversations",
    ],
    useCases: [
      "Analyse de documents longs (rapports, contrats)",
      "Brainstorming et ideation",
      "Redaction d'articles, emails, presentations",
      "Aide a la decision avec analyse multi-criteres",
      "Apprentissage et explication de concepts complexes",
    ],
    tips: [
      "Utilisez les Projects pour regrouper les conversations par theme",
      "Joignez des fichiers pour que Claude les analyse en profondeur",
      "Soyez precis dans vos prompts : contexte + objectif + format attendu",
      "Utilisez les Artifacts pour generer du code, des documents, des schemas",
      "Explorez le mode 'thinking' pour voir le raisonnement de Claude",
    ],
    difficulty: "debutant",
    lastUpdated: "2026-03-14",
    content: `## Qu'est-ce que Claude ?

Claude est l'assistant IA conversationnel cree par Anthropic, accessible sur claude.ai. C'est votre partenaire de reflexion pour tout ce qui est analyse, creation et resolution de problemes.

## Points forts

### Fenetre de contexte massive
Avec 200K tokens, Claude peut analyser des documents entiers - livres, codes source, rapports financiers - en une seule conversation.

### Projects
Organisez vos conversations par theme. Chaque Project peut avoir des instructions personnalisees et des fichiers de reference que Claude consulte automatiquement.

### Artifacts
Claude peut generer du contenu interactif : pages web, graphiques, documents, code executable - directement dans la conversation.

## Comment bien l'utiliser

### Structure de prompt efficace
\`\`\`
Contexte : [Qui vous etes et le contexte]
Objectif : [Ce que vous voulez accomplir]
Format : [Comment vous voulez le resultat]
Contraintes : [Limites a respecter]
\`\`\`

### Techniques avancees
- **Chain of Thought** : Demandez a Claude d'expliquer son raisonnement etape par etape
- **Few-shot** : Donnez 2-3 exemples du resultat attendu
- **Role-play** : "Agis comme un expert en marketing digital..."`,
  },
  {
    slug: "perplexity",
    title: "Perplexity",
    description:
      "Le moteur de recherche IA qui cite ses sources - ideal pour la recherche et la veille.",
    icon: "Search",
    category: "Recherche IA",
    strengths: [
      "Reponses sourcees avec citations verifiables",
      "Recherche web en temps reel",
      "Mode Focus pour cibler les sources (Academic, YouTube, Reddit...)",
      "Collections pour organiser ses recherches",
      "API disponible pour l'automatisation",
    ],
    useCases: [
      "Veille technologique et actualites",
      "Recherche approfondie sur un sujet",
      "Verification de faits et fact-checking",
      "Comparaison de produits/services",
      "Synthese de multiples sources",
    ],
    tips: [
      "Utilisez le mode Pro pour des recherches plus approfondies",
      "Creez des Collections par theme de veille",
      "Utilisez les Focus modes : Academic pour la recherche, Reddit pour les avis...",
      "Posez des questions de suivi pour approfondir un point",
      "Partagez vos recherches via les liens de partage",
    ],
    difficulty: "debutant",
    lastUpdated: "2026-03-14",
    content: `## Qu'est-ce que Perplexity ?

Perplexity est un moteur de recherche augmente par l'IA. Contrairement a Google, il **synthetise les informations** de multiples sources et vous donne une reponse structuree avec des citations.

## Pourquoi c'est puissant pour la veille IA

1. **Temps reel** : Perplexity cherche sur le web en direct, pas dans un dataset fige
2. **Sources citees** : Chaque affirmation est liee a sa source - vous pouvez verifier
3. **Collections** : Sauvegardez vos recherches par theme (ex: "Agents IA", "LLMs", "Business IA")

## Modes de Focus

- **All** : Recherche web generale
- **Academic** : Articles scientifiques et papers
- **YouTube** : Contenu video
- **Reddit** : Discussions communautaires
- **Writing** : Mode redaction sans recherche web

## Perplexity vs ChatGPT Search vs Google

| Critere | Perplexity | ChatGPT | Google |
|---------|-----------|---------|--------|
| Sources citees | Toujours | Parfois | Liens |
| Temps reel | Oui | Oui | Oui |
| Suivi conversationnel | Oui | Oui | Non |
| Mode academique | Oui | Non | Scholar |`,
  },
  {
    slug: "perplexity-computer",
    title: "Perplexity Computer",
    description:
      "L'agent qui controle votre navigateur pour executer des taches web a votre place.",
    icon: "Monitor",
    category: "Agent Web",
    strengths: [
      "Controle le navigateur de maniere autonome",
      "Execute des taches web complexes (reservations, achats, recherches)",
      "Capture d'ecran pour verification visuelle",
      "Peut interagir avec n'importe quel site web",
      "Combine recherche + action",
    ],
    useCases: [
      "Remplir des formulaires automatiquement",
      "Comparer des prix sur plusieurs sites",
      "Effectuer des recherches multi-sites",
      "Automatiser des taches web repetitives",
      "Tester des sites et interfaces web",
    ],
    tips: [
      "Soyez tres precis dans vos instructions etape par etape",
      "Verifiez toujours les actions sensibles (achats, envois)",
      "Combinez avec Perplexity Search pour recherche + action",
      "Utilisez-le pour la veille : il peut naviguer et extraire des infos",
      "Ideale pour les demos et les preuves de concept",
    ],
    difficulty: "intermediaire",
    lastUpdated: "2026-03-14",
    content: `## Qu'est-ce que Perplexity Computer ?

Perplexity Computer est un **agent qui controle votre navigateur**. Vous lui donnez une tache, et il navigue, clique, remplit des formulaires et execute des actions a votre place.

## Comment ca marche

1. Vous decrivez la tache : "Va sur Booking.com et trouve un hotel a Paris pour 2 nuits en avril sous 150 euros"
2. L'agent ouvre le navigateur, navigue, interagit avec le site
3. Il vous montre des captures d'ecran a chaque etape
4. Vous validez ou corrigez

## Cas d'usage concrets

### Veille concurrentielle
"Va sur les sites de mes 3 concurrents et fais-moi un tableau comparatif de leurs prix"

### Automatisation administrative
"Connecte-toi a mon espace client, telecharge les 3 dernieres factures"

### Test utilisateur
"Teste le parcours d'inscription de mon site et note les points de friction"

## Limites actuelles

- Necessite une supervision pour les actions sensibles
- Peut etre bloque par les CAPTCHAs
- Performance variable selon la complexite du site`,
  },

  // ═══════════════════════════════════════
  // NOUVEAUX GUIDES ENRICHIS
  // ═══════════════════════════════════════

  {
    slug: "mac-mini-agents",
    title: "Mac Mini + Armee d'Agents",
    description:
      "Comment deployer une flotte de Mac Mini pour faire tourner des agents IA 24/7 et automatiser votre business.",
    icon: "Server",
    category: "Infrastructure IA",
    strengths: [
      "Mac Mini M4 : le meilleur rapport performance/prix pour les agents",
      "Faible consommation (7W idle, 40W charge) = 24/7 economique",
      "macOS stable + support natif des frameworks IA (MLX, Ollama)",
      "Scalabilite : ajoutez des machines selon vos besoins",
      "SSH + VNC pour gestion a distance complete",
    ],
    useCases: [
      "Farm de Claude Code pour developpement parallele",
      "Agents de veille/scraping qui tournent en continu",
      "Pipeline de traitement de donnees automatise",
      "Serveur d'API IA prive (modeles locaux + cloud)",
      "Automatisation de taches business repetitives",
    ],
    tips: [
      "Commencez avec 1 Mac Mini M4 (16GB) a ~700 euros",
      "Utilisez tmux/screen pour gerer plusieurs agents dans un terminal",
      "Mettez en place un monitoring (Uptime Kuma, Grafana) des le debut",
      "Automatisez les mises a jour et redemarrages avec launchd",
      "Gardez un budget API sous controle avec des limites par agent",
    ],
    difficulty: "avance",
    lastUpdated: "2026-03-14",
    content: `## La tendance 2025-2026 : les fermes d'agents

La communaute IA a decouverte qu'un Mac Mini M4 est la **machine ideale** pour faire tourner des agents IA en continu. Faible cout, faible consommation, puissance suffisante, et macOS super stable.

## Pourquoi le Mac Mini ?

### Rapport cout/performance
- **Mac Mini M4 16GB** : ~700 euros — fait tourner Claude Code, Ollama, scripts Python
- **Mac Mini M4 Pro 32GB** : ~1400 euros — multi-agents + modeles locaux (Llama 3, Mistral)
- **Consommation** : 7-40W = ~5 euros/mois d'electricite pour un fonctionnement 24/7

### Comparaison avec les alternatives
| Option | Prix | Performance | Conso | Stabilite |
|--------|------|-------------|-------|-----------|
| Mac Mini M4 | 700€ | Excellente | 7-40W | Tres stable |
| VPS Cloud | 50-200€/mois | Variable | N/A | Bonne |
| PC Linux DIY | 500-1000€ | Bonne | 100-300W | Variable |
| Raspberry Pi | 100€ | Faible | 5-15W | Bonne |

## Setup pas-a-pas

### Etape 1 : Configuration initiale
1. **Deballez et connectez** votre Mac Mini (ecran pas necessaire apres setup)
2. **Activez le partage d'ecran** : Preferences Systeme > Partage > Gestion a distance
3. **Activez SSH** : Preferences Systeme > Partage > Session a distance
4. **Desactivez la mise en veille** : Preferences Systeme > Batterie > Jamais

### Etape 2 : Installation des outils
\`\`\`
# Homebrew (gestionnaire de paquets)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Node.js + Claude Code
brew install node
npm install -g @anthropic-ai/claude-code

# Python + outils
brew install python
pip install langchain crewai

# Ollama (modeles locaux)
brew install ollama
ollama pull llama3.2
\`\`\`

### Etape 3 : Lancer un agent en daemon
\`\`\`
# Creez un service launchd pour votre agent
# ~/Library/LaunchAgents/com.aihub.agent.plist

# Ou plus simplement avec tmux :
tmux new-session -d -s agent1 "claude code --task 'Surveille les commits et lance les tests'"
tmux new-session -d -s agent2 "python agent_veille.py"
\`\`\`

### Etape 4 : Monitoring
- **Uptime Kuma** : surveillance de vos agents (self-hosted, gratuit)
- **Logs** : redirigez les sorties vers des fichiers dates
- **Alertes** : notifications Slack/Discord si un agent plante

## Architectures type

### Solo developer (1 Mac Mini)
- 1 agent Claude Code pour le dev
- 1 agent de veille (scraping RSS + analyse)
- Ollama pour les taches rapides locales

### Petite equipe (3 Mac Mini)
- Machine 1 : Dev agents (Claude Code x3 en parallele)
- Machine 2 : Agents de donnees (scraping, analyse, rapports)
- Machine 3 : API serveur + modeles locaux (Ollama)

### Scale-up (5-10 Mac Mini)
- Load balancer pour distribuer les taches
- Queue de jobs (Redis/Bull) pour orchestrer
- Dashboard centralise pour monitorer

## Pour aller plus loin

- Explorez **Docker** sur Mac (via Colima) pour containeriser vos agents
- Testez **Kubernetes** (minikube) pour l'orchestration a grande echelle
- Combinez agents cloud (Claude API) + modeles locaux (Ollama) pour optimiser les couts
- Mettez en place un **proxy API** pour centraliser et limiter les appels`,
  },
  {
    slug: "skills-claude-mcp",
    title: "Skills Claude Code + MCP",
    description:
      "Guide complet sur les skills, serveurs MCP, et comment creer vos propres outils pour decupler la puissance de Claude Code.",
    icon: "Sparkles",
    category: "Skills & Outils",
    strengths: [
      "Skills = slash commands qui automatisent des workflows complexes",
      "MCP = protocole standard pour connecter n'importe quel service",
      "Creez vos propres skills personnalisees en quelques minutes",
      "Ecosysteme grandissant : GitHub, Slack, DB, APIs...",
      "Composabilite : combinez skills + MCP pour des agents surpuissants",
    ],
    useCases: [
      "Automatiser les commits, PR reviews, deployements",
      "Connecter Claude a votre base de donnees, CRM, ou API interne",
      "Creer des workflows de code review automatiques",
      "Generer des rapports depuis des sources multiples",
      "Construire des agents specialises avec des outils sur-mesure",
    ],
    tips: [
      "Commencez par les skills builtin (/commit, /review-pr, /simplify)",
      "Utilisez le Skill Creator (/skill-creator) pour creer les votres",
      "Verifiez le MCP Registry pour les serveurs communautaires",
      "Testez chaque skill isolement avant de les combiner",
      "Documentez vos skills dans CLAUDE.md pour que Claude sache les utiliser",
    ],
    difficulty: "intermediaire",
    lastUpdated: "2026-03-14",
    content: `## C'est quoi une Skill ?

Une skill Claude Code est un **mini-programme** declenche par une slash command (\`/\`). Quand vous tapez \`/commit\`, Claude ne se contente pas de commiter — il analyse vos changements, redige un message pertinent, et cree le commit proprement.

## Skills integerees

### Les essentielles
- \`/commit\` — Analyse les changements staged/unstaged, genere un message de commit descriptif, commite
- \`/review-pr\` — Revue complete d'une Pull Request avec suggestions
- \`/simplify\` — Revoit le code modifie pour simplifier, optimiser, eviter les repetitions

### Skills de productivite
- \`/pdf\` — Lire, creer, fusionner, extraire des PDFs
- \`/xlsx\` — Manipuler des fichiers Excel (lecture, edition, formules)
- \`/docx\` — Creer et editer des documents Word
- \`/schedule\` — Creer des taches planifiees

## Creer votre propre Skill

### Avec le Skill Creator
1. Tapez \`/skill-creator\` dans Claude Code
2. Decrivez ce que votre skill doit faire
3. Le Creator genere le code, les tests, et la documentation
4. Testez et iterez

### Structure d'une skill
\`\`\`
.claude/skills/
  ma-skill/
    skill.md        # Instructions pour Claude
    trigger.json    # Quand declencher la skill
    tests/          # Tests automatises
\`\`\`

### Exemple : Skill de deploiement
\`\`\`
# skill.md
Quand l'utilisateur tape /deploy :
1. Lance les tests (npm test)
2. Si les tests passent, build le projet (npm run build)
3. Deploie sur Vercel (vercel --prod)
4. Notifie sur Slack avec l'URL de deploiement
\`\`\`

## MCP : Model Context Protocol

### C'est quoi ?
MCP est un **protocole ouvert** qui permet a Claude de se connecter a des services externes. Imaginez des "plugins" universels que n'importe quel outil IA peut utiliser.

### Comment ca marche
\`\`\`
Claude Code <--MCP--> Serveur MCP <--> Service externe
                                       (GitHub, Slack, DB, API...)
\`\`\`

### Serveurs MCP populaires
- **GitHub** : Lire/creer des issues, PRs, gerer les repos
- **Slack** : Envoyer des messages, lire des channels
- **PostgreSQL/MySQL** : Requeter votre base de donnees
- **Google Drive** : Lire et creer des documents
- **Brave Search** : Recherche web
- **Filesystem** : Acces etendu aux fichiers

### Installer un serveur MCP
\`\`\`
# Dans votre fichier de config Claude Code (.claude/settings.json)
{
  "mcp_servers": {
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "votre-token" }
    }
  }
}
\`\`\`

### Le MCP Registry
Visitez le **MCP Registry** pour decouvrir tous les serveurs disponibles. La communaute en cree de nouveaux chaque semaine. Vous pouvez aussi publier les votres !

## Combiner Skills + MCP = Superpouvoir

### Exemple : Agent de veille automatique
1. **MCP Brave Search** pour chercher les dernieres news IA
2. **Skill personnalisee** \`/veille\` qui structure les resultats
3. **MCP Slack** pour poster le resume dans votre channel #ia-news
4. **MCP Google Drive** pour archiver dans un spreadsheet

### Exemple : Pipeline de dev automatise
1. **Skill** \`/feature\` qui cree une branche, code la feature
2. **MCP GitHub** pour creer la PR automatiquement
3. **Skill** \`/review-pr\` pour la revue de code
4. **MCP Slack** pour notifier l'equipe

## Pour aller plus loin

- **Multi-agents + Skills** : Un agent superviseur qui delegue des taches a des agents specialises, chacun avec ses propres skills
- **Skills chainables** : Creez des workflows ou une skill en appelle une autre
- **Evaluations** : Testez vos skills avec des benchmarks automatises via le Skill Creator`,
  },
  {
    slug: "setup-agent-complet",
    title: "Setup Complet d'un Agent IA",
    description:
      "De zero a un agent fonctionnel : architecture, frameworks, deploiement, et les erreurs a eviter.",
    icon: "Cpu",
    category: "Guide Pratique",
    strengths: [
      "Comprendre l'architecture agent (planification, execution, outils)",
      "Choisir le bon framework (Claude Code, LangChain, CrewAI, OpenAI SDK)",
      "Configurer un agent sur Mac Mini ou serveur",
      "Definir des skills et des workflows",
      "Monitorer et debugger un agent en production",
    ],
    useCases: [
      "Monter un agent de veille automatique",
      "Creer un agent de trading / analyse",
      "Deployer des workers sur Mac Mini",
      "Automatiser des taches business repetitives",
      "Construire un pipeline agent multi-etapes",
    ],
    tips: [
      "Commencez petit : un agent, une tache, un outil",
      "Testez en local avant de deployer",
      "Loggez TOUT : chaque decision, chaque action de l'agent",
      "Definissez des garde-fous clairs (budget, limites d'actions)",
      "Iterez : ameliorez les prompts en fonction des resultats",
    ],
    difficulty: "avance",
    lastUpdated: "2026-03-14",
    content: `## La ruee vers les agents IA

2025-2026, c'est l'ere des **agents IA**. Plus question de juste "chatter" avec une IA - on les fait **agir**. Des entreprises deploient des armees de Mac Mini pour faire tourner des agents Claude Code 24/7.

## Architecture d'un agent

\`\`\`
[Objectif] --> [Planification] --> [Execution] --> [Verification]
                    |                    |               |
              [LLM Reasoning]    [Outils/APIs]    [LLM Evaluation]
                    |                    |               |
              [Decomposition]    [Actions reelles]  [Retry si echec]
\`\`\`

## Les 4 frameworks majeurs

### 1. Claude Code / Agent SDK (Anthropic)
- **Pour qui** : Developpeurs qui veulent un agent puissant out-of-the-box
- **Forces** : Integration native avec le filesystem, git, terminal, MCP
- **Particularite** : L'agent le plus "naturel" — il comprend votre projet comme un humain
- **Setup** : \`npm install -g @anthropic-ai/claude-code\`
- **Quand l'utiliser** : Developpement, DevOps, automatisation technique

### 2. OpenAI Agents SDK
- **Pour qui** : Ceux deja dans l'ecosysteme OpenAI
- **Forces** : API simple, modeles GPT-4/o1, plugins
- **Particularite** : Bon pour les agents conversationnels
- **Setup** : \`pip install openai-agents\`
- **Quand l'utiliser** : Chatbots, assistants client, agents simples

### 3. LangChain / LangGraph
- **Pour qui** : Ceux qui veulent un controle granulaire et des pipelines complexes
- **Forces** : Flexibilite maximale, graphs d'execution, ecosysteme riche
- **Particularite** : Courbe d'apprentissage plus raide, mais tres puissant
- **Setup** : \`pip install langchain langgraph\`
- **Quand l'utiliser** : Pipelines de donnees, agents multi-etapes, RAG

### 4. CrewAI
- **Pour qui** : Multi-agents collaboratifs
- **Forces** : Agents avec des roles definis qui collaborent en equipe
- **Particularite** : Metaphore d'une equipe — chaque agent a un role
- **Setup** : \`pip install crewai\`
- **Quand l'utiliser** : Projets necessitant plusieurs perspectives

## Guide pas-a-pas : Votre premier agent

### Etape 1 : Definir l'objectif
Soyez **ultra-precis**. Pas "un agent qui m'aide", mais :
- "Un agent qui surveille les nouveaux repos GitHub sur le theme 'AI agents' et m'envoie un resume quotidien sur Slack"

### Etape 2 : Choisir les outils
Pour notre exemple :
- **Recherche GitHub** : API GitHub ou MCP GitHub
- **Analyse** : LLM (Claude API)
- **Notification** : MCP Slack ou webhook

### Etape 3 : Ecrire le prompt systeme
\`\`\`
Tu es un agent de veille specialise dans les agents IA.
Chaque jour a 9h :
1. Cherche les repos GitHub crees dans les 24h avec les tags "agent", "AI agent", "autonomous"
2. Filtre ceux qui ont plus de 10 stars
3. Pour chacun, resume en 2 phrases : ce que c'est + pourquoi c'est interessant
4. Formate en message Slack avec des emojis
5. Envoie dans #ia-veille
\`\`\`

### Etape 4 : Implementer
\`\`\`
# Avec Claude Code, c'est aussi simple que :
claude --task "Setup un cron job qui execute ce workflow de veille GitHub chaque matin"
\`\`\`

### Etape 5 : Tester et iterer
- Lancez l'agent en mode "dry run" (sans envoyer sur Slack)
- Verifiez la qualite des resumes
- Ajustez les filtres et le prompt
- Passez en production

## Les erreurs a eviter

1. **Trop d'autonomie trop vite** : Commencez en supervision, puis relacez
2. **Pas de logs** : Impossible de debugger sans traces
3. **Pas de limites** : Un agent sans budget/limite peut faire des degats
4. **Prompts vagues** : Soyez ultra-precis sur les objectifs et contraintes
5. **Pas de fallback** : Prevoyez ce qui se passe si l'API est down
6. **Over-engineering** : Un script Python de 50 lignes > un systeme multi-agents complexe

## Ou trouver des taches pour vos agents

- **Automatisation personnelle** : Emails, calendrier, to-do lists, veille
- **Freelance** : Prospection, generation de contenus, reporting client
- **Dev** : Tests, revue de code, documentation, deployment
- **Data** : Scraping, nettoyage, analyse, visualisation
- **Business** : CRM, facturation, support client, onboarding

## Pour aller plus loin

- Explorez les **multi-agents** : un superviseur qui delegue a des specialistes
- Testez l'**evaluation automatique** : l'agent s'auto-evalue et s'ameliore
- Mettez en place un **feedback loop** : les resultats alimentent l'amelioration du prompt`,
  },
  {
    slug: "automatisation-profit",
    title: "Generer du Profit avec l'IA",
    description:
      "Strategies concretes pour monetiser l'IA : automatisation, agents, services et produits. De 0 a 10K euros/mois.",
    icon: "DollarSign",
    category: "Business IA",
    strengths: [
      "Identifier les opportunites de monetisation les plus rentables",
      "Automatiser des services existants pour x5-x10 la productivite",
      "Creer des produits IA (SaaS, APIs, bots) avec peu de code",
      "Reduire les couts operationnels de 60-80%",
      "Scaler avec des agents autonomes qui travaillent 24/7",
    ],
    useCases: [
      "Freelance augmente par IA (x5 productivite)",
      "Agence d'automatisation IA (2-10K par client)",
      "SaaS vertical avec couche IA",
      "Trading et analyse financiere automatisee",
      "Service de veille et analyse IA",
    ],
    tips: [
      "Cherchez les taches repetitives a forte valeur ajoutee",
      "Vendez le resultat, pas la technologie",
      "Commencez par automatiser VOS propres taches",
      "Documentez vos workflows pour les repliquer",
      "Le vrai ROI est dans la combinaison d'outils, pas un seul",
    ],
    difficulty: "intermediaire",
    lastUpdated: "2026-03-14",
    content: `## L'opportunite historique

On est au debut d'une revolution comparable a Internet en 1995. Ceux qui maitrisent les outils IA maintenant auront un avantage **massif** dans les 5 prochaines annees.

## Les 7 modeles de monetisation

### 1. Freelance Augmente — Le plus rapide
Utilisez l'IA pour multiplier votre productivite et facturer plus :
- **Developpeur + Claude Code** : Livrez en 2h ce qui prend 2 jours → facturez le prix de 2 jours
- **Redacteur + Claude** : Produisez 10x plus de contenu de qualite
- **Analyste + Perplexity** : Recherche en minutes au lieu d'heures
- **Designer + Midjourney/DALL-E** : Maquettes en minutes
- **Revenu potentiel** : 3K-15K euros/mois selon votre expertise

### 2. Agence d'Automatisation IA — Le plus lucratif
Vendez des solutions d'automatisation aux PME :
- **Etape 1** : Auditez les processus repetitifs du client (gratuit)
- **Etape 2** : Proposez l'automatisation avec un ROI clair
- **Etape 3** : Implementez avec Claude Code + Make/Zapier + MCP
- **Etape 4** : Facturez la maintenance mensuelle
- **Pricing** : 2000-10000 euros par workflow + 200-500 euros/mois de maintenance
- **Exemple** : Automatiser le support client d'une e-boutique = 5000 euros + 300/mois

### 3. SaaS Vertical avec IA — Le plus scalable
Creez un logiciel IA specialise pour un secteur :
- **Immobilier** : Estimation automatique + generation d'annonces
- **Juridique** : Analyse de contrats, detection de clauses
- **Sante** : Prise de notes medicales, synthese de dossiers
- **E-commerce** : Descriptions produits, SEO, support client
- **Revenu potentiel** : 0 a 50K+/mois (mais prend du temps)

### 4. Vente de Templates et Workflows
- **Templates Claude Code** : Workflows pre-configures pour des taches specifiques
- **Skills MCP** : Plugins a vendre sur des marketplaces
- **Prompts engineeres** : Collections de prompts pro pour des metiers
- **Revenu potentiel** : 500-5K euros/mois en revenus passifs

### 5. Formation et Consulting IA
- Formez des equipes a utiliser les outils IA
- Pricing : 1000-5000 euros par journee de formation
- En ligne : cours video, workshops, coaching

### 6. Trading et Finance Automatisee
- Agents d'analyse de marche 24/7
- Sentiment analysis sur les reseaux sociaux
- Arbitrage et detection d'opportunites
- **Attention** : Risque eleve, necessite de l'expertise

### 7. Contenu et Media Augmente
- Chaines YouTube generees/assistees par IA
- Newsletters IA automatisees avec analyse
- Podcasts avec recherche et scripts IA
- **Revenu** : Monetisation via sponsors, affiliation, abonnements

## Le stack recommande pour demarrer

| Outil | Role | Cout |
|-------|------|------|
| Claude Code | Developpement + automatisation | ~20$/mois |
| Claude AI | Strategie, analyse, contenu | Inclus |
| Perplexity Pro | Recherche et veille | ~20$/mois |
| Make/Zapier | Integration et workflows | 0-30$/mois |
| Mac Mini M4 | Agents 24/7 | ~700$ (one-time) |

## Plan d'action concret

### Semaine 1-2 : Foundation
- Maitrisez Claude Code (suivez le guide sur ce site)
- Identifiez 3 taches que vous faites souvent et qui peuvent etre automatisees

### Semaine 3-4 : Premier revenu
- Automatisez votre propre travail
- Proposez le service a 1-2 clients/contacts
- Documentez le workflow

### Mois 2-3 : Scale
- Systematisez votre offre
- Deployez des agents sur Mac Mini
- Lancez votre premier produit/service IA

## Pour aller plus loin

- Rejoignez des communautes d'entrepreneurs IA (Twitter/X, Discord)
- Suivez les tendances sur AI Hub (ce site !)
- Combinez plusieurs modeles : freelance + agence + produit
- N'attendez pas que ce soit parfait — lancez, iterez, ameliorez`,
  },
];

export function getAllGuides(): Omit<Guide, "content">[] {
  return GUIDES.map(({ content, ...rest }) => rest);
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getGuidesByCategory(category: string): Omit<Guide, "content">[] {
  return getAllGuides().filter((g) => g.category === category);
}
