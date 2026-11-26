import urllib.request
import urllib.parse
import re

query = 'dribbble Agriculture Monitoring Dashboard Ahmad Faizien 27373110'
url = 'https://html.duckduckgo.com/html/?q=' + urllib.parse.quote(query)
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    links = re.findall(r'https://cdn\.dribbble\.com/[^\s"\'&<>]+', html)
    print("Found DDG links:", len(links))
    for l in links[:10]:
        print("Link:", l)
except Exception as e:
    print("Error:", e)
