import re
import os

html_path = r'd:\Dr.App\index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract CSS
style_match = re.search(r'<style>(.*?)</style>', content, re.DOTALL)
if style_match:
    with open(r'd:\Dr.App\style.css', 'w', encoding='utf-8') as f:
        f.write(style_match.group(1).strip())

# Extract JS
script_match = re.search(r'<script>(.*?)</script>(?=\s*</body>)', content, re.DOTALL)
if script_match:
    with open(r'd:\Dr.App\script.js', 'w', encoding='utf-8') as f:
        f.write(script_match.group(1).strip())

if style_match and script_match:
    # Build new HTML safely
    new_html = content[:style_match.start()] + '<link rel="stylesheet" href="style.css">' + content[style_match.end():]
    
    # regex find script again
    script_match2 = re.search(r'<script>.*?</script>(?=\s*</body>)', new_html, re.DOTALL)
    if script_match2:
        final_html = new_html[:script_match2.start()] + '<script src="script.js"></script>' + new_html[script_match2.end():]
        
        with open(r'd:\Dr.App\index.html', 'w', encoding='utf-8') as f:
            f.write(final_html)
        print('SUCCESS: Extracted style.css and script.js, updated index.html.')
    else:
        print('FAILED: Could not find script tag in intermediate HTML.')
else:
    print('FAILED: Could not find style or script tags in initial HTML.')
