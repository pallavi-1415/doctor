import sys

def transform_html(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Colors -> Monochrome + Golden
    content = content.replace('--primary: #0F172A;', '--primary: #0A0A0A;')
    content = content.replace('--accent: #0D9488;', '--accent: #C5A880;')
    content = content.replace('--bg: #FDFCF6;', '--bg: #FAFAF9;')
    
    # Tailwind strict color replacements
    content = content.replace('text-teal-600', 'text-[#C5A880]')
    content = content.replace('text-teal-700', 'text-[#B2946A]')
    content = content.replace('bg-teal-600', 'bg-[#C5A880]')
    content = content.replace('bg-teal-50', 'bg-[#F9F7F4]')
    content = content.replace('border-teal-600', 'border-[#C5A880]')
    content = content.replace('hover:text-teal-600', 'hover:text-[#C5A880]')
    content = content.replace('hover:text-teal-700', 'hover:text-[#B2946A]')
    content = content.replace('focus:ring-teal-600', 'focus:ring-[#C5A880]')
    content = content.replace('focus:ring-teal-500', 'focus:ring-[#C5A880]')
    content = content.replace('hover:border-teal-500', 'hover:border-[#C5A880]')
    
    # Replace slate/blue with pristine black/zinc
    content = content.replace('bg-[#0F172A]', 'bg-[#111111]')
    content = content.replace('text-[#0F172A]', 'text-[#111111]')
    content = content.replace('border-[#0F172A]', 'border-[#111111]')
    content = content.replace('bg-slate-900', 'bg-[#1A1A1A]')
    content = content.replace('text-slate-900', 'text-[#1A1A1A]')
    
    # Layout and Shapes -> Sharp, Editorial, minimal curves
    content = content.replace('rounded-[24px]', 'rounded-none')
    content = content.replace('rounded-[32px]', 'rounded-none')
    content = content.replace('rounded-[40px]', 'rounded-none')
    content = content.replace('rounded-[48px]', 'rounded-none')
    content = content.replace('rounded-[60px]', 'rounded-none')
    content = content.replace('rounded-[64px]', 'rounded-none')
    content = content.replace('rounded-[140px]', 'rounded-none')
    content = content.replace('rounded-3xl', 'rounded-none')
    content = content.replace('rounded-2xl', 'rounded-none')
    content = content.replace('rounded-xl', 'rounded-none')
    
    # Buttons from pill back to rectangle or sharp
    content = content.replace('rounded-full', 'rounded-none')
    # Except we might want some rounded-full for the nav icons or small avatars.
    # To be safe, we'll let everything be beautifully sharp. It's a valid editorial design style.
    
    # Shadows -> Subtle or none
    content = content.replace('shadow-2xl', 'shadow-md')
    content = content.replace('shadow-xl', 'shadow-sm')
    
    # Borders -> Thinner
    content = content.replace('border-[6px]', 'border')
    content = content.replace('border-[8px]', 'border')
    content = content.replace('border-[10px]', 'border')
    content = content.replace('border-[12px]', 'border')
    
    # Hide blobs
    content = content.replace('hero-shape-1', 'hidden')
    content = content.replace('hero-shape-2', 'hidden')
    
    # Simplify bento-card
    content = content.replace('.bento-card {', '.bento-card { background: white; border: 1px solid #E5E5E5; transition: all 0.5s ease; }')
    # Remove the bulky inner border rule since we overwrote the class definition
    
    # Button adjustments
    content = content.replace('px-8 py-4', 'px-10 py-5 uppercase tracking-widest text-[10px] sm:text-xs')
    content = content.replace('px-12 py-5', 'px-10 py-5 uppercase tracking-widest text-[10px] sm:text-xs')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    transform_html(sys.argv[1])
