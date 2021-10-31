Zde bude návod, jak implementovat aplikaci

# Implementace do webu

## Očekávané HTML

## Očekávaná CSS
Aplikace je cíleně nenastylovaná. Jediné prozatím používané CSS je CSS nutné pro správnou funkčnost použitých knihoven Tom-select (chytré vybírátko) a basicLightbox (modální okno pro zobrazení detailních informací o hře). Tato CSS je nutné načítat nebo dostatečně stejnou funkčnost implementovat do vlastního CSS. Knihovny lze vyměnit, vyžaduje to ale rozsáhlejší zásah do kódu

### Úprava .grid-item

### Úprava lightboxu

### Generování 


## Odstranitelné prvky

### Části formuláře
Lze vytvořit různé verze formuláře, stačí pouze odebírat kontrolní prvky (inputy, checkboxy). Je tak možné mít verzi na jednoduché filtrování (např. pouze štítky). Odebrat prvky stačí v HTML, aplikace si s tím sama poradí.

### Řadící tlačítka
Řadící tlačítka lze odebrat/schovat bez zásahu do kódu, i jednotlivě. Přidání řazení podle jiných parametrů vyžaduje zásah do kódu.


## Očekávaný vizuál
Není. Případný vzhled konzultovat s Jaroslavem Rajlem, aplikace je ale prozatím cíleně nestylovaná, aby ji šlo zařadit do microsite.


## Pravidelně měněné "skripty"
Kromě níže uvedených skriptů je teoreticky možné skripty sloučit/minifikovat. Změny se budou dít pouze v případě dalšího vývoje. Ten bude ještě v následujících týdnech pokračovat laděním a implementací pohodlnějšího používání na mobilních zařízeních (při prohlížení modálů/lightboxu)

* games.js - data o hrách, na základě kterých se generuje stránka. Vznikají na backendu (v současnosti na adrese http://mlp.llll.cz ). Data spravuje Jaroslav Rajl. Lze počítat s pravidelnou změnou dat. Lze buď načítat přímo z API (pak hrozí riziko nefunkčnosti při vypnutém API), nebo pravidelně stahovat/aktualizovat z API a držet si vlastní kopii.
* translations.js - překlady některých prvků (kategorií, štítků) v games.js. Vznikají na backendu (v současnosti na adrese http://mlp.llll.cz ). Data spravuje Jaroslav Rajl. Lze počítat s pravidelnou změnou dat. Lze buď načítat přímo z API (pak hrozí riziko nefunkčnosti při vypnutém API), nebo pravidelně stahovat/aktualizovat z API a držet si vlastní kopii.


## Použité knihovny
* [basicLightbox](https://github.com/electerious/basicLightbox) - MIT
* [tom-select](https://github.com/orchidjs/tom-select) - Apache 2.0
* [Vanilla JS Toolkit](https://vanillajstoolkit.com/) - MIT
* [Isotope](https://github.com/metafizzy/isotope) - GNU GPLv3
* (v plánu) [swiped-events](https://github.com/john-doherty/swiped-events) - MIT

