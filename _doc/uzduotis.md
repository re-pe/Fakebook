# Apie sistemą

Socialinio tinklo sistema skirta dalintis informacija. Vartotojams, besinaudojantiems sistema leidžiama įkelti pranešimą (post), jį redaguoti, ištrinti, komentuoti ir pamėgti (like).

## Funkciniai reikalavimai

### FR0. Vartotojai gali prisijungti prie sistemos +

Sistemoje yra galimybė

* [x] prisijungti,
* [x] atsijungti,
* [x] prisijungus matomas vartotojo vardas.

### FR1. Sistemoje pateikiamas pranešimų sąrašas +

* [x] Bendras sąrašas

  Sistemos pagrindiniame lange pateikiamas visų sistemoje registruotų vartotojų pranešimų sąrašas

### FR1a. Pranešime turi būti tokia informacija +

* [ ] Vartotojo profilio nuotrauka
* [x] Vartotojo vardas
* [X] Pranešimo sukūrimo data
* [X] Pranešimo turinys
  * [x] tekstas (privalomas),
  * [ ] nuotraukos
* [x] Pamėgti mygtukas
  * [x] ikona
  * [x] pamėgimų skaičius
* [x] Komentaro mygtukas
  * [x] ikona
  * [x] komentarų skaičius

### FR2. Sistema leidžia administruoti pranešimus

Sistemoje turi būti numatytas:

* [x] Pranešimo kūrimas
* [x] Pranešimo trynimas
* [x] Pranešimo redagavimas (turinys)

### FR3. Sistema leidžia pamėgti pranešimą

* [x] Vartotojas gali pamėgti pranešimą tik vieną kartą.
* [x] Visų pamėgimų skaičius yra matomas šalia pamėgimų mygtuko.

### FR4. Sistema leidžia parašyti komentarą

* [x] Vartotojas gali parašyti neribotą skaičių komentarų.
* [x] Komentarą sudaro:
  * [x] vartotojo nuotrauka,
  * [x] vartotojo vardas,
  * [x] turinys
* [x] Visų komentarų skaičius matomas šalia komentarų mygtuko.

### FR5. Sistemoje egzistuoja galimybė ieškoti

Pranešimų paieška pagal:

* [x] Vartotojo vardą
* [x] Pranešimo turinio fragmentą

## Nefunkciniai reikalavimai

### NFR1. Sistema įgyvendinta naudojant šias technologijas

* [x] PHP programuotojai: PHP (7.4+), Laravel karkasą (8+).

### NFR2. Vartotojo sąsajai įgyvendinti naudoti atitinkamai

* [x] PHP programuotojai: REACT / Laravel Blade

### NFR3. Sistemos duomenys saugomi reliacinėje duomenų bazėje

* [x] MySql duomenų bazė

### NFR4. Kartu su sistema pateikiama sistemos diegimo ir naudojimo dokumentacijos

* [ ] Naudojimo dokumentacija aprašo pagrindinių sistemos funkcijų panaudojimą.
* [ ] Diegimo dokumentacija aprašo kaip įdiegti ir paleisti sistemą (Github, readme.md)
