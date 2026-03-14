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
Claude peut generer du contenu interactif : pages web, graphiques, documents, code executab - directement dans la conversation.

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
  {
    slug: "agents-ia-setup",
    title: "Setup un Agent IA",
    description:
      "Guide complet pour configurer et deployer votre propre armee d'agents IA autonomes.",
    icon: "Cpu",
    category: "Guide Pratique",
    strengths: [
      "Comprendre l'architecture agent (planification, execution, outils)",
      "Choisir le bon framework (Claude Code, LangChain, CrewAI...)",
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

## Les frameworks populaires

### Claude Code / Agent SDK
- **Pour qui** : Developpeurs qui veulent un agent puissant out-of-the-box
- **Forces** : Integration native avec le filesystem, git, terminal
- **Setup** : \`npm install -g @anthropic-ai/claude-code\`

### LangChain / LangGraph
- **Pour qui** : Ceux qui veulent un controle granulaire
- **Forces** : Flexibilite, ecosysteme riche, graphs d'execution
- **Setup** : \`pip install langchain langgraph\`

### CrewAI
- **Pour qui** : Multi-agents collaboratifs
- **Forces** : Agents avec des roles definis qui collaborent
- **Setup** : \`pip install crewai\`

## Le setup Mac Mini

La tendance 2026 : acheter des Mac Mini M4 pour faire tourner des agents en continu.

### Pourquoi Mac Mini ?
- Rapport performance/prix imbattable
- Faible consommation electrique (fonctionne 24/7)
- macOS stable pour les agents
- Peut faire tourner des modeles locaux (Ollama) + agents cloud

### Configuration type
1. Mac Mini M4 Pro (32GB RAM)
2. Claude Code en daemon
3. Supervision via SSH + logs
4. Taches planifiees avec cron/launchd

## Skills : le secret des bons agents

Un agent sans skills, c'est comme un employe sans outils. Les skills definissent **ce que l'agent sait faire** :

- **Skills de recherche** : Chercher sur le web, dans des bases de donnees
- **Skills de code** : Lire/ecrire des fichiers, executer des scripts
- **Skills de communication** : Envoyer des emails, poster sur Slack
- **Skills de donnees** : Analyser des CSVs, creer des graphiques

### Ou trouver des skills ?
- **MCP Servers** : protocole standard pour connecter des outils (GitHub, Slack, DB...)
- **Claude Code Skills** : slash commands integrees (/commit, /review-pr...)
- **Plugins communautaires** : Ecosysteme grandissant sur GitHub
- **Custom** : Creez vos propres skills avec le Skill Creator

## Erreurs a eviter

1. **Trop d'autonomie trop vite** : Commencez en supervision, puis relacez
2. **Pas de logs** : Impossible de debugger sans traces
3. **Pas de limites** : Un agent sans budget/limite peut faire des degats
4. **Prompts vagues** : Soyez ultra-precis sur les objectifs et contraintes`,
  },
  {
    slug: "automatisation-profit",
    title: "Generer du profit avec l'IA",
    description:
      "Strategies concretes pour monetiser l'IA : automatisation, agents, services et produits.",
    icon: "DollarSign",
    category: "Business IA",
    strengths: [
      "Identifier les opportunites de monetisation",
      "Automatiser des services existants",
      "Creer des produits IA (SaaS, APIs, bots)",
      "Reduire les couts operationnels",
      "Scaler avec des agents autonomes",
    ],
    useCases: [
      "Freelance augmente par IA (x5 productivite)",
      "Agence d'automatisation IA",
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

On est au debut d'une revolution comparable a Internet en 1995. Ceux qui maitrisent les outils IA maintenant auront un avantage **massif**.

## Les modeles de monetisation

### 1. Freelance augmente
Utilisez l'IA pour multiplier votre productivite :
- **Developpeur + Claude Code** : Livrez en 2h ce qui prend 2 jours
- **Redacteur + Claude** : Produisez 10x plus de contenu de qualite
- **Analyste + Perplexity** : Recherche en minutes au lieu d'heures

### 2. Agence d'automatisation
Vendez des solutions d'automatisation aux PME :
- Audit des processus repetitifs du client
- Setup d'agents IA pour automatiser
- Maintenance et amelioration continue
- **Pricing** : 2000-10000 euros / workflow automatise

### 3. Produits IA
- **SaaS vertical** : IA specialisee pour un secteur (immobilier, sante, juridique...)
- **API/Service** : Exposez vos agents comme service
- **Templates/Skills** : Vendez des workflows pre-configures

### 4. Trading et finance
- Agents d'analyse de marche 24/7
- Sentiment analysis sur les reseaux sociaux
- Arbitrage et detection d'opportunites

## Le stack recommande pour commencer

1. **Claude Code** pour le developpement
2. **Perplexity** pour la recherche
3. **Claude AI** pour la strategie et l'analyse
4. **Make/Zapier + MCP** pour les integrations
5. **Mac Mini** pour les agents 24/7`,
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
