import re, json

XML1 = r'c:\Users\Vitalii\Desktop\новий сайт\-.WordPress.2026-02-22.xml'
XML2 = r'c:\Users\Vitalii\Desktop\новий сайт\-.WordPress.2026-02-22 (1).xml'
PRODUCTS_JSON = r'c:\Users\Vitalii\Desktop\новий сайт\pochuti-vse\src\data\products.json'

def extract_tag(item, tag, cdata=True):
    if cdata:
        m = re.search(r'<' + tag + r'><!\[CDATA\[(.*?)\]\]></' + tag + r'>', item, re.DOTALL)
    else:
        m = re.search(r'<' + tag + r'>(.*?)</' + tag + r'>', item, re.DOTALL)
    return m.group(1).strip() if m else ''

# Build ID->URL from XML2 (all media attachments - NO CDATA for wp:post_id)
with open(XML2, 'rb') as f:
    raw2 = f.read()
text2 = raw2.decode('utf-8', errors='replace')
items2 = re.findall(r'<item>(.*?)</item>', text2, re.DOTALL)
id_to_url = {}
for item in items2:
    # wp:post_id has no CDATA in XML2
    pid = extract_tag(item, r'wp:post_id', cdata=False)
    url = extract_tag(item, r'wp:attachment_url', cdata=True)
    if pid and url:
        id_to_url[pid] = url

print('XML2 attachments mapped:', len(id_to_url))

# Also try XML1 attachments (with CDATA)
with open(XML1, 'rb') as f:
    raw1 = f.read()
text1 = raw1.decode('utf-8', errors='replace')
items1 = re.findall(r'<item>(.*?)</item>', text1, re.DOTALL)
for item in items1:
    if not re.search(r'<wp:post_type><!\[CDATA\[attachment\]\]>', item):
        continue
    pid_cdata = extract_tag(item, r'wp:post_id', cdata=True)
    pid_plain = extract_tag(item, r'wp:post_id', cdata=False)
    pid = pid_cdata or pid_plain
    url = extract_tag(item, r'wp:attachment_url', cdata=True)
    if pid and url:
        id_to_url[pid] = url
print('Total attachments (both XMLs):', len(id_to_url))

# Map each product -> image URL via _thumbnail_id
slug_to_image = {}
for item in items1:
    if not re.search(r'<wp:post_type><!\[CDATA\[product\]\]>', item):
        continue
    if not re.search(r'<wp:status><!\[CDATA\[publish\]\]>', item):
        continue
    link_m = re.search(r'<link>(.*?)</link>', item)
    if link_m and '/ru/' in link_m.group(1):
        continue

    slug = extract_tag(item, r'wp:post_name')
    if not slug:
        continue

    # _thumbnail_id in postmeta (CDATA)
    thumb_m = re.search(
        r'<wp:meta_key><!\[CDATA\[_thumbnail_id\]\]>.*?<wp:meta_value><!\[CDATA\[(\d+)\]\]>',
        item, re.DOTALL
    )
    if thumb_m:
        tid = thumb_m.group(1)
        img_url = id_to_url.get(tid, '')
        slug_to_image[slug] = img_url
        if img_url:
            print('OK:', slug[:30], '->', img_url[-50:])
        else:
            print('MISS tid=' + tid + ':', slug[:30])
    else:
        # Fallback: first product image in content
        img_m = re.search(
            r'https?://sluh-apparat\.vn\.ua/wp-content/uploads/[^\s"\'<>]+\.(?:jpg|jpeg|png|webp)',
            item, re.I
        )
        slug_to_image[slug] = img_m.group(0) if img_m else ''

found = sum(1 for v in slug_to_image.values() if v)
print('Products with images:', found, '/', len(slug_to_image))

# Update products.json
with open(PRODUCTS_JSON, 'r', encoding='utf-8') as f:
    products = json.load(f)

for p in products:
    url = slug_to_image.get(p['slug'], '')
    p['image'] = url if url else ''

with open(PRODUCTS_JSON, 'w', encoding='utf-8') as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

print('Saved products.json')
