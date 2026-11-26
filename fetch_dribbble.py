import urllib.request
import re
import os

url = 'https://dribbble.com/shots/27373110-Agriculture-Monitoring-Dashboard'
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
req = urllib.request.Request(url, headers=headers)
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    print("Fetched HTML, length:", len(html))
    title = re.findall(r'<title>(.*?)</title>', html)
    print("Title:", title)
    links = re.findall(r'https://cdn\.dribbble\.com/userupload/\d+/showcase/\w+\.\w+', html)
    if not links:
        links = re.findall(r'https://cdn\.dribbble\.com/[^\s"\'<>]+', html)
    print("Found links:", len(links))
    img_links = [l for l in links if any(ext in l.lower() for ext in ['.png', '.jpg', '.jpeg', '.webp'])]
    print("Found image links:", len(img_links))
    for i, img in enumerate(img_links[:5]):
        print(f"[{i}] {img}")
        # Download image
        ext = img.split('.')[-1].split('?')[0]
        out_path = f"dribbble_img_{i}.{ext}"
        urllib.request.urlretrieve(img, out_path)
        print(f"Downloaded to {out_path}")
except Exception as e:
    print("Error:", e)
