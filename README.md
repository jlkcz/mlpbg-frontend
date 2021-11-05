Tento git repozitář obsahuje kompletní (a samostatně funkční coby demo) Javascriptovou aplikaci, která má sloužit jako uživatelsky přívětivé rozhraní pro výběr deskovek, které nabízí k půjčování MKP

Aplikace není určena k samostatnému provozu, ale k integraci do microsite. 

# Integrace do webu/microsite
Výchozí inspirací pro integraci má sloužit ukázkové demo v index.html, samozřejmě se počítá s úpravami 

## Formulář
V případě formuláře je nutné ponechat jeho  `id`, pracují s ním skripty. Stejně tak je nutné ponechat `id` a `name` u všech inputů a checkboxů. HTML strukturu jinak lze změnit, aby vyhovovala potřebám microsite. Selecty jsou ostylované knihovnou Tom-select, detaily o CSS jsou popsány níže

## Tlačítka pro reset/řazení
`button`, které obstarávají reset a řazení musejí mít ponecháno `id`, `class` a `data-sort-by`, jinak lze HTML upravovat dle potřeb

## Seznam her (obdélníčky), grid-item
Seznam her, který je pod formulářem, je generovaný skriptem podle šablony. Ta je ve funkci `fillGridWithData` v souboru `main.js`. Design a HTML v těchto obdélníčcích je ponecháno na MKP. Pro fungování je pouze potřeba, aby každý div měl ponechány následující data:
* `class="grid-item"`
* `onclick="showLightbox(this);"`
* `data-id="${game.id}"`  kde game.id je proměnná doplněná funkcí `fillGridWithData`

Nadřazený `div`, ve kterém se tyto `divy` nachází, musí mít id `grid`

## Vyskakovací okno s detaily
Pří kliknutí na grid-item (obdélníky v seznamu her) je vyvolán modál, který zobrazí detailní informace o hře. Design je ponechán na MKP. 

Generování modálu/lightboxu je ve skriptu `lightbox.js` ve funkci `assembleLightbox`. Všechny použitelné proměnné jsou uvedeny v současném demu. HTML modálu lze jakkoliv měnit

### Videa
Specifickou proměnnou je `videos`. To na rozdíl od ostatních proměnných nenese jasnou hodnotu, ale je to seznam videonávodů k dané hře. Lze z něj pro potřeby modálu generovat HTML (na požádání implementuji, potřebuji ale HTML). 
Každé video má 3 parametry: jazyk (AJ/ČJ, popis a URL), tedy: ČJ, "Návod od Deskofobie", https://www.youtube.com/watch?v=PmQLZelEZlY

## Includované skripty
Aplikace je pro potřeby vývoje rozdělena do několika skriptů a datových souborů
* `applyFilters.js` - funkce definující filtrování
* `basicLightbox.js` - knihovna pro implementaci modálu/lightboxu
* `filterForm.js` - inicializace formuláře pro filtrování - naplnění selectů
* `games.js` - datový skript, nese informace o hrách
* `lightbox.js` - skript, který definuje chování lightboxu/modálu
* `main.js` - hlavní skript, který definuje eventy apod.
* `translations.js` - datový skript, obsahuje překladové tabulky ID-lidsky čitelná data

### Datové skripty - pravidelná aktualizace
Kromě níže uvedených skriptů je teoreticky možné skripty sloučit/minifikovat. Změny se budou dít pouze v případě dalšího vývoje. Ten bude ještě v následujících týdnech pokračovat laděním a implementací pohodlnějšího používání na mobilních zařízeních (při prohlížení modálů/lightboxu)

* games.js - data o hrách, na základě kterých se generuje stránka. Vznikají na backendu (v současnosti na adrese http://mlp.llll.cz ). Data spravuje Jaroslav Rajl. Lze počítat s pravidelnou změnou dat. Lze buď načítat přímo z API (pak hrozí riziko nefunkčnosti při vypnutém API), nebo pravidelně stahovat/aktualizovat z API a držet si vlastní kopii.
* translations.js - překlady některých prvků (kategorií, štítků) v games.js. Vznikají na backendu (v současnosti na adrese http://mlp.llll.cz ). Data spravuje Jaroslav Rajl. Lze počítat s pravidelnou změnou dat. Lze buď načítat přímo z API (pak hrozí riziko nefunkčnosti při vypnutém API), nebo pravidelně stahovat/aktualizovat z API a držet si vlastní kopii.

## Očekávaná CSS
Aplikace je cíleně nenastylovaná. Jediné prozatím používané CSS je CSS nutné pro správnou funkčnost použitých knihoven Tom-select (chytré vybírátko) a basicLightbox (modální okno pro zobrazení detailních informací o hře). Tato CSS je nutné načítat nebo dostatečně stejnou funkčnost implementovat do vlastního CSS. Knihovny lze vyměnit, vyžaduje to ale rozsáhlejší zásah do kódu

## Odstranitelné prvky

### Části formuláře
Lze vytvořit různé verze formuláře, stačí pouze odebírat kontrolní prvky (inputy, checkboxy). Je tak možné mít verzi na jednoduché filtrování (např. pouze štítky). Odebrat prvky stačí v HTML, aplikace si s tím sama poradí.

### Řadící tlačítka
Řadící tlačítka lze odebrat/schovat bez zásahu do kódu, i jednotlivě. Přidání řazení podle jiných parametrů vyžaduje zásah do kódu. Stejně tak reset tlačítko, pokud není žádoucí pro UX


## Očekávaný vizuál
Není. Případný vzhled konzultovat s Jaroslavem Rajlem, aplikace je ale prozatím cíleně nestylovaná, aby ji šlo zařadit do microsite.


# K vyřešení na straně MKP
## Načítání obrázků
U každého obrázku by se měl zobrazovat obrázek hry v dostatečné kvalitě. Knihovna disponuje obrázky pro potřeby katalogu, je možné využít dat z katalogu pro načítání obrázků? 
Pokud ano, jak generovat adresu URL obrázku do dat o hrách. Pokud ne, je backend připraven pro nahrávání fotek v něm. Bylo by ale žádoucí, aby microsite měla kopii těchto fotek u sebe, kvůli rychlejšímu načítání. V takovém případě je nutné vyřešit pravidelný transfer dat.

## Aktualizace stupnic - složitost, délka
Aplikace používá lidsky srozumitelné stupnice složitosti (jednoduchá/složitá) a délky her (krátká/dlouhá). Nynější hodnoty jsou nahodile nastavené vývojářem, bylo by žádoucí je upravit. Dodá Jaroslav Rajl

# Použité knihovny
* [basicLightbox](https://github.com/electerious/basicLightbox) - MIT
* [tom-select](https://github.com/orchidjs/tom-select) - Apache 2.0
* [Vanilla JS Toolkit](https://vanillajstoolkit.com/) - MIT
* [Isotope](https://github.com/metafizzy/isotope) - GNU GPLv3
* (v plánu) [swiped-events](https://github.com/john-doherty/swiped-events) - MIT

