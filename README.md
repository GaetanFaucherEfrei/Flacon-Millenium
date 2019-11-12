# Projet Node - Flacon Millenium 

## Synopsis du Projet :

Le but de notre projet est de réaliser un inventaire/gestionnaire de cave à vin. Dont la finalité sera de permettre à l’utilisateur de gérer son stockage, mais également de tenir à jour des fiches récapitulatives sur ses bouteilles, autant sur la provenance que sur l’avis de l’utilisateur.

## Réflexion sur le Projet :

### Analyser :
Le projet à pour but de répondre à la problématique du nombre de bouteilles qui peut s’avérer difficile à gérer pour un utilisateur, que ce soit pour éviter de passer la date de consommation optimale ou bien de se souvenir des plats pouvant l’accompagner ainsi que des personnes ayant déjà consommés ces dernières durant un repas avec l’utilisateur. 

### Concevoir :
L’idée sera d’implémenter plusieurs fonctionnalités sur notre site : 
- Une page d’authentification (login et inscription), les utilisateurs étants définis par un pseudo unique, un password et une adresse mail unique (utilisateurs stockés dans une base de données).
- Une page d’ajout de bouteille, permettant de rajouter une bouteille en remplissant un formulaire complet (producteurs, cépages, accompagnements, etc.).
- Une page cave à vin, permettant de consulter la liste des bouteilles rentrées par l’utilisateur, pouvant être visualisées selon les différentes catégories des bouteilles (cépages, etc.).
- Une page d’ajout de catégories, permettant de rajouter une catégorie (producteurs, cépages, accompagnements, etc.).*n forum de conseils, permettant aux utilisateurs de demander conseils ou de donner conseil aux autres utilisateurs.
- Un gestionnaire de cave, qui permet de localiser les bouteilles et de gérer son stockage.
- Un historique des consommations, permettant d’analyser les préférences de l’utilisateur pour lui donner des conseils. 



### Planifier : 

Avec 8 semaines avant la présentation du projet, voici la planification des taches en fonctions des participants

### Semaine 1 et 2 :

Etienne : création de la représentation de la cave
Gaëtan : création d’une fiche produit pour la bouteille
Kevin : l’authentification avec stockage sécurisé des mots de passe
Guillaume : création des modèles et structures des bouteilles, cépage, vin, producteurs …

### Semaine 3 et 4 :

Etienne : gestion du stockage des vins
Gaëtan :  liaison avec la base de données pour créer les listes de consultation (bouteilles, vins, producteurs …)
Kevin : Création des modèles et structure pour un forum de discussion
Guillaume : mise en place de la page de créations des cépage, vin, producteur …

### Semaine 5 et 6 :

Etienne : gestion des localisations des bouteilles
Gaëtan : système de recherche dans les listes
Kevin : mise en opération du forum
Guillaume : mise en place de la page d’ajout de bouteille

Les semaine 7 et 8 seront pour revoir le projet et vérifier qu’il est complet et fonctionnel avec la possibilité d’améliorer les fonctionnalités.

### Prototype :

Le prototype devra pouvoir effectuer ces quelques fonctions indispensables :
-	Identification de l’utilisateur
-	Poster un message sur le forum
-	Pouvoir ajouter une bouteille avec les informations concernées
-	Pouvoir rechercher la bouteille
-	Pouvoir changer le statut de la bouteille
