import re, json, os

XML_PATH = r'c:\Users\Vitalii\Desktop\новий сайт\-.WordPress.2026-02-22.xml'
PRODUCTS_JSON = r'c:\Users\Vitalii\Desktop\новий сайт\pochuti-vse\src\data\products.json'

with open(XML_PATH, 'rb') as f:
    raw = f.read()
text = raw.decode('utf-8', errors='replace')

items = re.findall(r'<item>(.*?)</item>', text, re.DOTALL)

# Step 1: Build map of post_id -> attachment_url (for all attachments/images)
id_to_url = {}
for item in items:
    type_m = re.search(r'<wp:post_type><!\[CDATA\[attachment\]\]>', item)
    if not type_m:
        continue
    post_id_m = re.search(r'<wp:post_id><!\[CDATA\[(\d+)\]\]>', item)
    attach_url_m = re.search(r'<wp:attachment_url><!\[CDATA\[(.*?)\]\]>', item)
    if post_id_m and attach_url_m:
        id_to_url[post_id_m.group(1)] = attach_url_m.group(1).strip()

print(f'Found {len(id_to_url)} attachments')

# Step 2: For each product, find thumbnail_id → resolve to URL
product_slug_to_image = {}
for item in items:
    type_m = re.search(r'<wp:post_type><!\[CDATA\[product\]\]>', item)
    status_m = re.search(r'<wp:status><!\[CDATA\[publish\]\]>', item)
    if not type_m or not status_m:
        continue
    link_m = re.search(r'<link>(.*?)</link>', item)
    link = link_m.group(1).strip() if link_m else ''
    if '/ru/' in link:
        continue

    slug_m = re.search(r'<wp:post_name><!\[CDATA\[(.*?)\]\]>', item)
    slug = slug_m.group(1) if slug_m else ''
    if not slug:
        continue

    # Look for _thumbnail_id in meta
    thumb_id_m = re.search(
        r'<wp:meta_key><!\[CDATA\[_thumbnail_id\]\]>\s*<wp:meta_value><!\[CDATA\[(\d+)\]\]>',
        item, re.DOTALL
    )
    if thumb_id_m:
        tid = thumb_id_m.group(1)
        if tid in id_to_url:
            product_slug_to_image[slug] = id_to_url[tid]
        else:
            product_slug_to_image[slug] = ''
    else:
        # fallback: try first image URL from content
        img_m = re.search(r'https?://sluh-apparat\.vn\.ua/wp-content/uploads/[^\s"<>]+\.(?:jpg|jpeg|png|webp)', item, re.I)
        product_slug_to_image[slug] = img_m.group(0) if img_m else ''

print(f'Products with images: {sum(1 for v in product_slug_to_image.values() if v)}')

# Step 3: Update products.json
with open(PRODUCTS_JSON, 'r', encoding='utf-8') as f:
    products = json.load(f)

updated = 0
for p in products:
    url = product_slug_to_image.get(p['slug'], '')
    if url:
        p['image'] = url
        updated += 1
    else:
        p['image'] = ''  # clear placeholder so fallback is used

with open(PRODUCTS_JSON, 'w', encoding='utf-8') as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

print(f'Updated {updated} product images. Saved to products.json')
