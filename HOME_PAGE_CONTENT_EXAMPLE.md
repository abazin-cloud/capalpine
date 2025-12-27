# Exemple de contenu pour la Page d'accueil

Ce document contient un exemple de structure de données pour créer la page d'accueil dans Sanity Studio.

## Instructions

1. Ouvrez Sanity Studio (`http://localhost:3000/studio`)
2. Allez dans **Pages** → **Page d'accueil**
3. Créez le document si nécessaire
4. Remplissez les sections suivantes avec le contenu ci-dessous

## Structure de contenu recommandée

### Section Hero

- **Titre principal**: `Cap Alpine`
- **Description**: `CapAlpine rassemble des passionnés d'Alpine A110 autour de moments authentiques : balades, cafés, événements, et discussions entre membres. On privilégie la qualité : itinéraires soignés, groupes à taille humaine, et respect de chacun.`
- **Bouton principal**:
  - Label: `Comment adhérer`
  - Lien: Référencez une page "Adhésion" (créez-la si nécessaire)
- **Bouton secondaire**:
  - Label: `Nos événements`
  - Lien: Référencez la page "Page Événements" (eventsPage)
- **Image hero**: Uploadez une image de bannière (ex: voiture Alpine A110, paysage montagneux)

### Section "L'esprit Cap Alpine"

- **Titre de section**: `L'esprit Cap Alpine`
- **Texte d'introduction**: `Notre association se base sur trois valeurs fondamentales qui guident chacune de nos actions et rencontres.`
- **Valeurs** (3 items):
  1. **Passion**
     - Description: `Notre amour commun pour l'Alpine A110 nous unit et crée des liens durables entre membres.`
     - Icône: `Heart`
  2. **Authenticité**
     - Description: `Nous privilégions les moments vrais, les échanges sincères et les expériences authentiques.`
     - Icône: `Sparkles`
  3. **Respect**
     - Description: `Chaque membre compte, chaque itinéraire est soigné, chaque sortie est pensée pour le plaisir de tous.`
     - Icône: `Users`

### Section "Pourquoi adhérer ?"

- **Titre de section**: `Pourquoi adhérer ?`
- **Avantages** (3-4 items):
  1. **Événements exclusifs**
     - Description: `Accédez à des balades, rassemblements et événements réservés aux membres.`
     - Icône: `Calendar`
  2. **Communauté bienveillante**
     - Description: `Rejoignez un groupe de passionnés partageant les mêmes valeurs et la même passion.`
     - Icône: `Users`
  3. **Itinéraires soignés**
     - Description: `Profitez de routes sélectionnées avec soin pour maximiser votre plaisir de conduite.`
     - Icône: `Route`
  4. **Support technique**
     - Description: `Bénéficiez de conseils et d'entraide pour l'entretien et l'amélioration de votre Alpine.`
     - Icône: `Award`
- **Bouton CTA optionnel**:
  - Label: `En savoir plus`
  - Lien: Référencez une page "Adhésion" ou "À propos"

### Section "Nos partenaires"

- **Titre de section**: `Nos partenaires`
- **Introduction**: `Nous remercions nos partenaires qui nous accompagnent dans nos aventures.`
- **Liste des partenaires**: Ajoutez 3-6 partenaires avec:
  - Nom du partenaire
  - Logo (image)
  - URL du site web (optionnel)
  - Niveau de partenariat (Principal, Secondaire, Supporter)

**Exemple de partenaires**:
- Alpine (Principal)
- Un garage local (Secondaire)
- Un magasin de pièces (Supporter)

### Section "Derniers événements"

- **Titre de section**: `Derniers événements`
- **Introduction**: `Découvrez nos prochains rendez-vous et événements.`
- **Label du bouton**: `Voir tous les événements`

> **Note**: Les événements sont automatiquement récupérés depuis les documents "Événements". Les 3 plus récents ou prochains seront affichés.

### Section CTA final

- **Titre**: `Rejoignez-nous dès aujourd'hui`
- **Description**: `Devenez membre de Cap Alpine et vivez des expériences inoubliables avec d'autres passionnés.`
- **Bouton**:
  - Label: `Adhérer maintenant`
  - Lien: Référencez la page "Adhésion"

## SEO

Dans l'onglet SEO:
- **Title**: `Cap Alpine - Association de passionnés Alpine A110`
- **Description**: `Rejoignez Cap Alpine, l'association qui rassemble les passionnés d'Alpine A110 autour de balades, événements et moments authentiques.`
- **Image OG**: Uploadez une image représentative (1200x630px recommandé)

## Notes importantes

1. **Références de pages**: Assurez-vous que les pages référencées existent dans Sanity (ex: page "Adhésion", "Page Événements")
2. **Images**: Toutes les images doivent avoir un texte alternatif descriptif pour l'accessibilité
3. **Événements**: Créez au moins 3 événements dans Sanity pour qu'ils s'affichent sur la page d'accueil
4. **Sections vides**: Si une section n'a pas de contenu, elle ne s'affichera pas automatiquement

## Structure JSON (référence)

Voici la structure JSON complète pour référence (ne pas copier directement, utilisez l'interface Sanity Studio):

```json
{
  "_type": "homePage",
  "hero": {
    "title": "Cap Alpine",
    "description": "CapAlpine rassemble des passionnés d'Alpine A110 autour de moments authentiques : balades, cafés, événements, et discussions entre membres. On privilégie la qualité : itinéraires soignés, groupes à taille humaine, et respect de chacun.",
    "primaryCTA": {
      "label": "Comment adhérer",
      "href": {
        "_type": "reference",
        "_ref": "page-adhesion-id"
      }
    },
    "secondaryCTA": {
      "label": "Nos événements",
      "href": {
        "_type": "reference",
        "_ref": "eventsPage-id"
      }
    },
    "heroImage": {
      "asset": {
        "_type": "reference",
        "_ref": "image-asset-id"
      },
      "altText": "Cap Alpine - Association de montagne"
    }
  },
  "spirit": {
    "heading": "L'esprit Cap Alpine",
    "body": "Notre association se base sur trois valeurs fondamentales qui guident chacune de nos actions et rencontres.",
    "values": [
      {
        "_key": "value1",
        "title": "Passion",
        "description": "Notre amour commun pour l'Alpine A110 nous unit et crée des liens durables entre membres.",
        "icon": "Heart"
      },
      {
        "_key": "value2",
        "title": "Authenticité",
        "description": "Nous privilégions les moments vrais, les échanges sincères et les expériences authentiques.",
        "icon": "Sparkles"
      },
      {
        "_key": "value3",
        "title": "Respect",
        "description": "Chaque membre compte, chaque itinéraire est soigné, chaque sortie est pensée pour le plaisir de tous.",
        "icon": "Users"
      }
    ]
  },
  "membershipBenefits": {
    "heading": "Pourquoi adhérer ?",
    "benefits": [
      {
        "_key": "benefit1",
        "title": "Événements exclusifs",
        "description": "Accédez à des balades, rassemblements et événements réservés aux membres.",
        "icon": "Calendar"
      },
      {
        "_key": "benefit2",
        "title": "Communauté bienveillante",
        "description": "Rejoignez un groupe de passionnés partageant les mêmes valeurs et la même passion.",
        "icon": "Users"
      },
      {
        "_key": "benefit3",
        "title": "Itinéraires soignés",
        "description": "Profitez de routes sélectionnées avec soin pour maximiser votre plaisir de conduite.",
        "icon": "Route"
      },
      {
        "_key": "benefit4",
        "title": "Support technique",
        "description": "Bénéficiez de conseils et d'entraide pour l'entretien et l'amélioration de votre Alpine.",
        "icon": "Award"
      }
    ],
    "optionalCTA": {
      "label": "En savoir plus",
      "href": {
        "_type": "reference",
        "_ref": "page-adhesion-id"
      }
    }
  },
  "partners": {
    "heading": "Nos partenaires",
    "intro": "Nous remercions nos partenaires qui nous accompagnent dans nos aventures.",
    "partnersList": [
      {
        "_key": "partner1",
        "name": "Alpine",
        "logo": {
          "asset": {
            "_type": "reference",
            "_ref": "image-asset-id"
          },
          "altText": "Logo Alpine"
        },
        "href": "https://www.alpinecars.com",
        "tier": "primary"
      }
    ]
  },
  "events": {
    "heading": "Derniers événements",
    "intro": "Découvrez nos prochains rendez-vous et événements.",
    "ctaLabel": "Voir tous les événements"
  },
  "finalCTA": {
    "heading": "Rejoignez-nous dès aujourd'hui",
    "description": "Devenez membre de Cap Alpine et vivez des expériences inoubliables avec d'autres passionnés.",
    "button": {
      "label": "Adhérer maintenant",
      "href": {
        "_type": "reference",
        "_ref": "page-adhesion-id"
      }
    }
  },
  "seo": {
    "title": "Cap Alpine - Association de passionnés Alpine A110",
    "description": "Rejoignez Cap Alpine, l'association qui rassemble les passionnés d'Alpine A110 autour de balades, événements et moments authentiques.",
    "noIndex": false
  }
}
```

## Prochaines étapes

1. Créez la page "Adhésion" dans Sanity si elle n'existe pas
2. Créez au moins 3 événements pour qu'ils s'affichent sur la page d'accueil
3. Uploadez les images nécessaires (hero, logos partenaires)
4. Testez la page d'accueil sur `http://localhost:3000`

