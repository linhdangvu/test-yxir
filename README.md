## Project de surveillance des activités

Cette une application qui aide des entreprise à

- Surveiller des produits - `Liste des produits`
- Surveiller des KPIs - `Graphique KPI`
- Cartes de location d'entreprise - `Carte`
- Surveiller des activités - `Activité de surveillance`.

Dans cette application, on peut:

- **Afficher**, **Ajouter**, **Supprimer** les widgets dans `Tableau de bord`
- **Afficher**, **Ajouter**, **Supprimer** des graphiques KPI dans `Graphique KPI`
- **Afficher**, **Ajouter**, **Modifier**, **Supprimer** des produits dans `Liste des produits`
- **Afficher** un map dans `Carte`
- **Afficher** un graphique de surveillance d'activités dans `Activité de surveillance`
- **Se connecter**, **Déconnecter** et **S'inscrire** pour authentification `Firebase Authentification`. Pour le moment, j'ai déactivé la fonction vérifier l'email sur Firebase pour qu'on peux s'inscrire avec des fauxe email.

**Langage utilisé**: ReactJS, NextJS, Typescript, Tailwind, Firesbase (pour des données et authentification)

**Exemple pour login**:

- Email: test@yxir.com
- Pass: Abcde@12345

### Architecture

    ├── ...
    ├── src
    │   ├── app            # Router de l'application
    │   |   ├── auth
    │   |   |   ├── login
    │   |   |   ├── signup
    │   |   ├── carte
    │   |   ├── kpi
    │   |   ├── monitor
    │   |   └── product-list
    │   ├── components     # composants pour réutilisable
    │   |   ├── app        # composants de l'appiclation
    │   |   |   ├── carte
    │   |   |   ├── dashboard
    │   |   |   ├── kpi
    │   |   |   └── product-list
    │   |   └── base # composant de base
    │   |   |   ├── button
    │   |   |   ├── chart
    │   |   |   ├── dropdown
    │   |   |   └── loading
    │   |   |   ├── modal
    │   |   |   ├── sidebar
    │   |   |   └── table
    │   ├── data           # données temporaire pour l'example
    │   |   |   └── charts
    │   |   |   └── map
    │   |   |   └── tables
    │   ├── hooks           # fonctions pour réutilisable
    │   └── interface       # type pour data sur Firestore
    │   └── utils           # tools (firebase api)
    └── ...
