Disko Bundle Front
------------------------

Ce répertoire à pour but de servir de Quick Stater chez Disko en donnant une guideline et des bests practices en termes de développement Front.

Le but est d'uniformiser la rédaction du code par le biais du choix d'une nomenclature en utilisant **OOCSS**, **SMACSS**, **BEM** ou **SUIT**.

    - OOCSS : [http://oocss.org/](http://oocss.org/)
    - SMACSS : [https://smacss.com/](https://smacss.com/)
    - BEM : [https://en.bem.info/](https://en.bem.info/method/)
    - SUIT : [https://suitcss.github.io/](https://suitcss.github.io/)

De même, le choix d'un preprocesseur est à choisir, **LESS** ou **SASS**

    - LESS : [http://lesscss.org/](http://lesscss.org/)
    - SASS : [http://sass-lang.com/](http://sass-lang.com/)

SASS et LESS on un type d'écriture assez similaire en indentation, ce qui permet une relecture un organisation du code propre.

Parmis les nombreuses qualités qu'on peut trouver dans ce type d'écriture, s'y ajoute la gestion de variables réutilisables :

```css
**SASS**
$font-stack:    Helvetica, sans-serif;
$primary-color: #333;

body {
 font: 100% $font-stack;
 color: $primary-color;
}

**LESS**
@font-stack:    Helvetica, sans-serif;
@primary-color: #333;

body {
 font: 100% @font-stack;
 color: @primary-color;
}
```

ou encore des Mixins, sortes de fonctions générerent du code en sortie, par le biais de paramètres ou encore de boucles :

```css
**SASS**
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
     -moz-border-radius: $radius;
      -ms-border-radius: $radius;
          border-radius: $radius;
}

.box { @include border-radius(10px); }
```


> **Dans le cas de SASS :**
> Dans le cas de SASS il existe des frameworks autour de cette nomenclature
> qui incluent pas mal d'outils pour faciliter la génération de certains morceaux de codes
> grace aux mixins intégrées.
