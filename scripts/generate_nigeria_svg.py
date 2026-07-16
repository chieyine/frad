import urllib.request
import json

urls = [
    "https://raw.githubusercontent.com/qedsoftware/geojson_data/master/nigeria-states.geojson",
    "https://raw.githubusercontent.com/qedsoftware/geojson_data/main/nigeria-states.geojson",
    "https://raw.githubusercontent.com/temikeezy/nigeria-geojson-data/master/states.geojson",
    "https://raw.githubusercontent.com/temikeezy/nigeria-geojson-data/main/states.geojson",
    "https://raw.githubusercontent.com/horlabyc/nigeria-states-GeoJSON/master/nigeria_states.geojson",
    "https://raw.githubusercontent.com/horlabyc/nigeria-states-GeoJSON/main/nigeria_states.geojson",
    "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/nigeria/nigeria-states.json"
]

data = None
for url in urls:
    print("Trying:", url)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'})
        with urllib.request.urlopen(req, timeout=8) as response:
            content = response.read().decode('utf-8')
            parsed = json.loads(content)
            if 'features' in parsed or 'objects' in parsed:
                print("SUCCESS with URL:", url)
                data = parsed
                break
    except Exception as e:
        print("Failed:", e)

if not data:
    raise RuntimeError("Could not fetch GeoJSON from known URLs")

features = data.get('features')
if not features and 'objects' in data:
    print("Found TopoJSON, converting or extracting...")
    # if it's topojson, we might need a quick converter, but let's check
    raise RuntimeError("Received TopoJSON instead of GeoJSON features")

print(f"Loaded {len(features)} states.")

min_lng, max_lng = 999, -999
min_lat, max_lat = 999, -999

for feat in features:
    geom = feat.get('geometry')
    if not geom: continue
    coords_list = geom['coordinates']
    if geom['type'] == 'Polygon':
        coords_list = [coords_list]
    for poly in coords_list:
        for ring in poly:
            for pt in ring:
                if isinstance(pt, list) and len(pt) >= 2 and isinstance(pt[0], (int, float)):
                    lng, lat = pt[0], pt[1]
                    if lng < min_lng: min_lng = lng
                    if lng > max_lng: max_lng = lng
                    if lat < min_lat: min_lat = lat
                    if lat > max_lat: max_lat = lat

print(f"Bounding box: lng [{min_lng}, {max_lng}], lat [{min_lat}, {max_lat}]")

width = 760
height = 610

def project(lng, lat):
    x = 20 + (lng - min_lng) / (max_lng - min_lng) * width
    y = 20 + (max_lat - lat) / (max_lat - min_lat) * height
    return round(x, 1), round(y, 1)

states_data = []

for feat in features:
    props = feat.get('properties', {})
    # Check common state name properties
    name = (props.get('state_name') or props.get('state') or props.get('name') or 
            props.get('NAME_1') or props.get('NAME') or props.get('shapeName') or 
            props.get('statename') or props.get('StateName') or 'Unknown')
    geom = feat.get('geometry')
    if not geom: continue
    coords_list = geom['coordinates']
    if geom['type'] == 'Polygon':
        coords_list = [coords_list]
    
    path_strings = []
    largest_poly = max(coords_list, key=lambda p: len(p[0]) if p and len(p)>0 else 0)
    ext_ring = largest_poly[0]
    cx = sum(project(pt[0], pt[1])[0] for pt in ext_ring if isinstance(pt, list) and len(pt)>=2) / len(ext_ring)
    cy = sum(project(pt[0], pt[1])[1] for pt in ext_ring if isinstance(pt, list) and len(pt)>=2) / len(ext_ring)

    for poly in coords_list:
        for ring in poly:
            if not ring: continue
            pts = [project(pt[0], pt[1]) for pt in ring if isinstance(pt, list) and len(pt)>=2]
            if not pts: continue
            p_str = f"M {pts[0][0]} {pts[0][1]} " + " ".join(f"L {p[0]} {p[1]}" for p in pts[1:]) + " Z"
            path_strings.append(p_str)
    
    full_path = " ".join(path_strings)
    states_data.append({
        "name": name,
        "path": full_path,
        "centroid": {"x": round(cx, 1), "y": round(cy, 1)}
    })

states_data.sort(key=lambda s: s['name'])

ts_content = f"""// Auto-generated real geographic SVG paths for all States + FCT of Nigeria
// Projected from exact natural boundaries to viewBox="0 0 800 650"

export interface NigeriaStatePath {{
  name: string;
  path: string;
  centroid: {{ x: number; y: number }};
}}

export const NIGERIA_STATE_PATHS: NigeriaStatePath[] = {json.dumps(states_data, indent=2)};
"""

with open('/Users/macbookpro/Documents/fradwebsite/components/interactive/NigeriaStateData.ts', 'w') as f:
    f.write(ts_content)

print("Successfully generated /Users/macbookpro/Documents/fradwebsite/components/interactive/NigeriaStateData.ts with", len(states_data), "states!")
