import sys, os, re

sys.stdout.reconfigure(encoding='utf-8')

BASE = os.path.dirname(os.path.abspath(__file__))
index_path = os.path.join(BASE, 'index.html')
app_path = os.path.join(BASE, 'app.js')
css_path = os.path.join(BASE, 'styles.css')

print("=" * 60)
print("🔍 RUNNING FULL VALIDATION FOR misspbeauty_parlor")
print(f"Base Directory: {BASE}")
print("=" * 60)

with open(index_path, 'r', encoding='utf-8') as f:
    html = f.read()

with open(app_path, 'r', encoding='utf-8') as f:
    js = f.read()

with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

tests = []

def run_test(name, condition, error_msg):
    if condition:
        print(f"  ✅ [PASS] {name}")
        tests.append(True)
    else:
        print(f"  ❌ [FAIL] {name}: {error_msg}")
        tests.append(False)

print("\n--- 1. BRAND IDENTITY & STRICT PROHIBITIONS ---")
run_test("No 'Rejoice Nkomo' in index.html", "Rejoice Nkomo" not in html, "Found forbidden name 'Rejoice Nkomo' in index.html")
run_test("No 'Rejoice Nkomo' in app.js", "Rejoice Nkomo" not in js, "Found forbidden name 'Rejoice Nkomo' in app.js")
run_test("No 'Rejoice Nkomo' in styles.css", "Rejoice Nkomo" not in css, "Found forbidden name 'Rejoice Nkomo' in styles.css")
run_test("Brand name misspbeauty_parlor present", "misspbeauty_parlor" in html and "misspbeauty_parlor" in js, "Missing brand name misspbeauty_parlor")
run_test("EcoCash recipient 0785505967 present", "0785505967" in html and "0785505967" in js, "EcoCash number 0785505967 not found")
run_test("Primary WhatsApp 263785505967 configured", "263785505967" in js, "Primary WhatsApp number not configured")

print("\n--- 2. HERO SPOTLIGHT & COLOR SWATCHES ---")
run_test("Hero spotlight image tag present", 'id="hero-spotlight-img"' in html, "Missing #hero-spotlight-img")
run_test("8 Color Swatches in Hero Spotlight", 
         all(dot in html for dot in ['dot-1b', 'dot-613', 'dot-99j', 'dot-ombre', 'dot-choco', 'dot-maroon', 'dot-brown', 'dot-ginger']),
         "Missing one or more color dots in hero spotlight")
run_test("Hero dots have changeSpotlightColor onclick", 'changeSpotlightColor' in html, "Missing changeSpotlightColor in index.html")
run_test("changeSpotlightColor function in app.js", "function changeSpotlightColor" in js, "Missing changeSpotlightColor function definition")
run_test("New colors in COLOR_SWATCHES", 
         all(c in js for c in ['Chocolate Brown', 'Maroon', 'Chestnut Brown', 'Ginger']),
         "Missing new color entries in COLOR_SWATCHES")
run_test("Hair-1 has 8 color options", 
         "'Chocolate Brown'" in js and "'Maroon'" in js and "'Chestnut Brown'" in js and "'Ginger'" in js,
         "Hair-1 product missing new color variants")

print("\n--- 3. AFRICAN TRADITIONAL & LOBOLA SECTION ---")
run_test("African Traditional section in index.html", 'id="african-section"' in html, "Missing #african-section in index.html")
run_test("African Traditional filter pill", 'data-category="african"' in html, "Missing african filter pill")
run_test("African Traditional products in app.js", 
         'id: \'african-1\'' in js and 'id: \'african-2\'' in js and 'id: \'african-3\'' in js,
         "Missing african-1, african-2, or african-3 products in app.js")

print("\n--- 4. BRAND AGENTS & RUNNERS DIRECTORY ---")
run_test("Brand Agents section in index.html", 'id="agents"' in html, "Missing #agents section")
run_test("SHEIN Agent Card present", "SHEIN Agent" in html, "Missing SHEIN agent card")
run_test("Avon Agent Card present", "Avon Agent" in html, "Missing Avon agent card")
run_test("Inuka Agent Card present", "Inuka Agent" in html, "Missing Inuka agent card")
run_test("International Brands Card present", "International Brands" in html, "Missing International Brands card")
run_test("Agents How It Works present", "How It Works" in html, "Missing How It Works block")

print("\n--- 5. ECOCASH ADVERTISING SYSTEM & SOCIALS ---")
run_test("Advertise modal present", 'id="advertise-modal"' in html, "Missing #advertise-modal")
run_test("Ad step indicators present", 'id="ad-step-1"' in html and 'id="ad-step-2"' in html, "Missing ad step elements")
run_test("TikTok input field in advertise modal", 'id="ad-tiktok"' in html, "Missing #ad-tiktok input field")
run_test("Instagram input field in advertise modal", 'id="ad-instagram"' in html, "Missing #ad-instagram input field")
run_test("Facebook input field in advertise modal", 'id="ad-facebook"' in html, "Missing #ad-facebook input field")
run_test("formatSocialLink function in app.js", 'function formatSocialLink' in js, "Missing formatSocialLink in app.js")
run_test("initAdvertisingSystem wired", 'initAdvertisingSystem' in js, "Missing initAdvertisingSystem in app.js")
run_test("checkAdExpirations function", 'checkAdExpirations' in js, "Missing checkAdExpirations in app.js")
run_test("submitEcoCashAdvert function", 'submitEcoCashAdvert' in js, "Missing submitEcoCashAdvert in app.js")

print("\n--- 6. STYLES & PRESENTATION ---")
run_test("Color dot CSS classes present", 
         all(cls in css for cls in ['.dot-choco', '.dot-maroon', '.dot-brown', '.dot-ginger', '.dot-ankara', '.dot-kente', '.dot-shweshwe', '.dot-chitenge']),
         "Missing one or more new .dot-* classes in styles.css")
run_test("Brand agents styles present", '.brand-agents-section' in css and '.agent-brand-card' in css, "Missing brand agent styles in styles.css")
run_test("African section styles present", '.african-section' in css, "Missing .african-section styles in styles.css")
run_test("Ad social pills styles present", '.ad-social-pill' in css and '.ad-social-tiktok' in css and '.ad-social-instagram' in css, "Missing social pills styles in styles.css")

print("\n" + "=" * 60)
passed_count = sum(tests)
total_count = len(tests)
print(f"SUMMARY: {passed_count}/{total_count} CHECKS PASSED ({(passed_count/total_count)*100:.1f}%)")
print("=" * 60)

if passed_count == total_count:
    print("🎉 ALL CHECKS PASSED WITH 100% SUCCESS!")
    sys.exit(0)
else:
    print(f"⚠️ {total_count - passed_count} CHECKS FAILED! Please inspect errors above.")
    sys.exit(1)
