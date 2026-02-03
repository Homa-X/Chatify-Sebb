# Presentation: CSRF Fix Explanation

## Slide 1: Introduction / Introduktion
**Farsi:**
Salam Sebastian. Man mikhahamesh dar morede moshkele CSRF va rah-hale shoma tozih bedam ta neshon bedam ke motavajeh shodam.

**Svenska:**
Hej Sebastian. Jag vill förklara CSRF-problemet och din lösning för att visa att jag förstår det.

---

## Slide 2: The Problem / Problemet
**Farsi:**
Moshkel in bud ke Server **CSRF token** ro logham kardan username va password niaz dasht. Man faghat on ro tooye Header miferestadam, vali Server ontori ghabol nemikard.

**Svenska:**
Problemet var att servern behövde **CSRF-token** tillsammans med användarnamn och lösenord. Jag skickade den bara i Headern, men servern accepterade inte det.

---

## Slide 3: The Solution / Lösningen
**Farsi:**
Shoma code ro taghir dadid ta `csrfToken` ro Aval az server begirim. Bad, vaghti mikhaim Login ya Register konim, in token ro **dakhel-e Body** (hamrah ba username/password) miferestim.

**Svenska:**
Du ändrade koden för att hämta `csrfToken` först. Sen, när vi loggar in eller registrerar oss, skickar vi token **inuti Body** (tillsammans med användarnamn/lösenord).

---

---

## Slide 4: Detailed Fix Explanation / Detaljerad förklaring
**Farsi:**
Moalem (Sebastian) in karo kard:
1.  **`src/App.jsx`**:
    *   **Khatte 9**: `import { getCSRF } ...`
    *   **Khatte 16-20**: `fetchCSRF` ro seda zad ta token ro begire.
    *   **Khatte 29-30**: `csrfToken` ro be `Login` va `Register` pass dad.

2.  **`src/pages/Register.jsx`**:
    *   **Khatte 7**: `csrfToken` ro gozasht tooye `useState` kenar-e username.
    *   Vaghti `register(form)` seda zadeh mishe (khatte 14), token hamrah ba baghie data mire.

**Svenska:**
Läraren (Sebastian) gjorde så här:
1.  **`src/App.jsx`**:
    *   **Rad 9**: `import { getCSRF } ...`
    *   **Rad 16-20**: Anropade `fetchCSRF` för att hämta token.
    *   **Rad 29-30**: Skickade `csrfToken` till `Login` och `Register`.

2.  **`src/pages/Register.jsx`**:
    *   **Rad 7**: Lade till `csrfToken` i `useState` bredvid användarnamnet.
    *   När `register(form)` anropas (rad 14), skickas token med resten av datan.

---

## Slide 5: Project Structure / Projektstruktur
**Farsi:**
*   **`src/main.jsx`**: Noghte shoro barname (Startpunkten).
*   **`src/App.jsx`**: Modiriat Route-ha va gereftan CSRF Token.
*   **`src/components/`**: Ajza-ye koochak mesle `SideNav` (Menu) va `Guard` (Mohafez).
*   **`src/pages/`**: Safhe-haye asli (`Login`, `Register`, `Chat`, `Profile`).
*   **`src/lib/api.js`**: Tanzimat Axios baraye ertebat ba Server.
*   **`src/lib/auth.js`**: Tab-e-haye Login/Register va zakhire token.

**Svenska:**
*   **`src/main.jsx`**: Startpunkten för applikationen.
*   **`src/App.jsx`**: Hanterar Routes och hämtar CSRF-token.
*   **`src/components/`**: Små komponenter som `SideNav` (Meny) och `Guard` (Skydd).
*   **`src/pages/`**: Huvudsidorna (`Login`, `Register`, `Chat`, `Profile`).
*   **`src/lib/api.js`**: Axios-inställningar för serverkommunikation.
*   **`src/lib/auth.js`**: Funktioner för inloggning/registrering och token-lagring.

---

## Slide 6: Conclusion / Slutsats
**Farsi:**
Mamnoon baraye komak. Alan fahmidam ke chera "403 Forbidden" migereftam. Bayad Token hamishe tooye Body mibod.

**Svenska:**
Tack för hjälpen. Nu förstår jag varför jag fick "403 Forbidden". Token var tvungen att vara i Body.
