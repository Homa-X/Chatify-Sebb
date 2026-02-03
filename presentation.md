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

## Slide 4: Key Code Changes / Viktiga kodändringar
**Farsi:**
Dar `App.jsx`, ma `getCSRF()` mizanim va token ro zakhire mikonim.
Dar `Login.jsx` va `Register.jsx`, token ro be onvane bakhshi az form miferestim:
`{ username, password, csrfToken }`

**Svenska:**
I `App.jsx` hämtar vi `getCSRF()` och sparar token.
I `Login.jsx` och `Register.jsx` skickar vi token som en del av formuläret:
`{ username, password, csrfToken }`

---

## Slide 5: Conclusion / Slutsats
**Farsi:**
Mamnoon baraye komak. Alan fahmidam ke chera "403 Forbidden" migereftam. Bayad Token hamishe tooye Body mibod.

**Svenska:**
Tack för hjälpen. Nu förstår jag varför jag fick "403 Forbidden". Token var tvungen att vara i Body.
