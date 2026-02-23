import re, json, os

with open(r'c:\Users\Vitalii\Desktop\новий сайт\-.WordPress.2026-02-22.xml', 'rb') as f:
    raw = f.read()
text = raw.decode('utf-8', errors='replace')

items = re.findall(r'<item>(.*?)</item>', text, re.DOTALL)

# ---- PRODUCTS ----
products = []
for item in items:
    type_m = re.search(r'<wp:post_type><!\[CDATA\[product\]\]>', item)
    status_m = re.search(r'<wp:status><!\[CDATA\[publish\]\]>', item)
    if not type_m or not status_m:
        continue

    link_m = re.search(r'<link>(.*?)</link>', item)
    link = link_m.group(1).strip() if link_m else ''
    if '/ru/' in link:
        continue  # skip Russian duplicates

    title_m = re.search(r'<title><!\[CDATA\[(.*?)\]\]>', item)
    slug_m = re.search(r'<wp:post_name><!\[CDATA\[(.*?)\]\]>', item)
    content_m = re.search(r'<content:encoded><!\[CDATA\[(.*?)\]\]>', item, re.DOTALL)
    rm_desc_m = re.search(r'_rank_math_description.*?<!\[CDATA\[(.*?)\]\]>', item, re.DOTALL)
    rm_title_m = re.search(r'_rank_math_title.*?<!\[CDATA\[(.*?)\]\]>', item, re.DOTALL)
    price_m = re.search(r'<wp:meta_key><!\[CDATA\[_price\]\]>.*?<wp:meta_value><!\[CDATA\[(.*?)\]\]>', item, re.DOTALL)
    
    # categories
    cats = re.findall(r'<category domain="product_cat" nicename="(.*?)"', item)
    cat_names = re.findall(r'<category domain="product_cat"[^>]*><!\[CDATA\[(.*?)\]\]>', item)

    title = title_m.group(1).strip() if title_m else ''
    slug = slug_m.group(1) if slug_m else ''
    content_raw = content_m.group(1).strip() if content_m else ''
    content_clean = re.sub(r'<[^>]+>', ' ', content_raw)
    content_clean = re.sub(r'\s+', ' ', content_clean).strip()[:400]

    # Determine product type for UI
    is_accessory = any(c in title.upper() for c in ['БАТАРЕЙК', 'ФІЛЬТР', 'ТАБЛЕТК', 'ТЕСТЕР', 'УТРИМУВ', 'ЩІТК', 'ВКЛАДИШ'])

    products.append({
        'id': len(products) + 1,
        'title': title,
        'slug': slug,
        'description': content_clean,
        'seoTitle': title,
        'seoDescription': '',
        'price': price_m.group(1) if price_m else '',
        'categorySlug': cats[0] if cats else '',
        'categoryName': cat_names[0] if cat_names else '',
        'isAccessory': is_accessory,
        'image': f'/images/products/{slug}.jpg',
    })

print(f'Products: {len(products)}')

# ---- CATEGORIES ----
cat_section = re.findall(
    r'<wp:term_taxonomy><!\[CDATA\[product_cat\]\]>.*?<wp:term_name><!\[CDATA\[(.*?)\]\]>.*?<wp:term_slug><!\[CDATA\[(.*?)\]\]>',
    text, re.DOTALL
)
# Also from wp:term blocks
cat_blocks = re.findall(
    r'<wp:term>.*?<wp:term_taxonomy><!\[CDATA\[product_cat\]\]>.*?<wp:term_slug><!\[CDATA\[(.*?)\]\]>.*?<wp:term_name><!\[CDATA\[(.*?)\]\]>.*?</wp:term>',
    text, re.DOTALL
)
categories = []
seen = set()
for slug, name in cat_blocks:
    if slug not in seen and name not in ('Accessories',):
        seen.add(slug)
        categories.append({'slug': slug, 'name': name})

print(f'Categories: {len(categories)}')

# ---- BLOG POSTS ----
posts = []
for item in items:
    type_m = re.search(r'<wp:post_type><!\[CDATA\[post\]\]>', item)
    status_m = re.search(r'<wp:status><!\[CDATA\[publish\]\]>', item)
    if not type_m or not status_m:
        continue

    link_m = re.search(r'<link>(.*?)</link>', item)
    link = link_m.group(1).strip() if link_m else ''
    if '/ru/' in link:
        continue

    title_m = re.search(r'<title><!\[CDATA\[(.*?)\]\]>', item)
    slug_m = re.search(r'<wp:post_name><!\[CDATA\[(.*?)\]\]>', item)
    content_m = re.search(r'<content:encoded><!\[CDATA\[(.*?)\]\]>', item, re.DOTALL)
    date_m = re.search(r'<wp:post_date><!\[CDATA\[(.*?)\]\]>', item)
    rm_desc_m = re.search(r'rank_math_description.*?<!\[CDATA\[(.*?)\]\]>', item, re.DOTALL)
    rm_title_m = re.search(r'rank_math_title.*?<!\[CDATA\[(.*?)\]\]>', item, re.DOTALL)

    title = title_m.group(1).strip() if title_m else ''
    slug = slug_m.group(1) if slug_m else ''
    content_raw = content_m.group(1).strip() if content_m else ''
    content_clean = re.sub(r'<[^>]+>', ' ', content_raw)
    content_clean = re.sub(r'\s+', ' ', content_clean).strip()
    excerpt = content_clean[:200] + '...' if len(content_clean) > 200 else content_clean

    posts.append({
        'id': len(posts) + 1,
        'title': title,
        'slug': slug,
        'content': content_raw,
        'excerpt': excerpt,
        'date': date_m.group(1)[:10] if date_m else '',
        'seoTitle': rm_title_m.group(1) if rm_title_m else title,
        'seoDescription': rm_desc_m.group(1) if rm_desc_m else excerpt[:160],
        'image': f'/images/blog/{slug}.jpg',
    })

print(f'Blog posts: {len(posts)}')

# Save all files
out_dir = r'c:\Users\Vitalii\Desktop\новий сайт\pochuti-vse\src\data'
os.makedirs(out_dir, exist_ok=True)

with open(os.path.join(out_dir, 'products.json'), 'w', encoding='utf-8') as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

with open(os.path.join(out_dir, 'categories.json'), 'w', encoding='utf-8') as f:
    json.dump(categories, f, ensure_ascii=False, indent=2)

with open(os.path.join(out_dir, 'posts.json'), 'w', encoding='utf-8') as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)

print('All JSON files saved!')
