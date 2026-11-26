import os
from PIL import Image, ImageDraw

# Create res directory paths
res_dir = r"C:\Users\ndebelem.ZINGSERVER1\Desktop\2026\Irrigation\mobile-app\android\app\src\main\res"

sizes = {
    'mipmap-mdpi': {'icon': 48, 'fore': 108},
    'mipmap-hdpi': {'icon': 72, 'fore': 162},
    'mipmap-xhdpi': {'icon': 96, 'fore': 216},
    'mipmap-xxhdpi': {'icon': 144, 'fore': 324},
    'mipmap-xxxhdpi': {'icon': 192, 'fore': 432},
}

def draw_app_icon(size, is_round=False, transparent_bg=False):
    # Render at 4x for super smooth antialiasing
    scale = 4
    w = size * scale
    img = Image.new("RGBA", (w, w), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    center = w / 2

    if not transparent_bg:
        # Draw background container
        bg_color = (6, 78, 59, 255) # #064e3b (Deep Emerald)
        if is_round:
            draw.ellipse([0, 0, w - 1, w - 1], fill=bg_color)
        else:
            # Rounded rect (squircle)
            corner_radius = int(w * 0.22)
            draw.rounded_rectangle([0, 0, w - 1, w - 1], radius=corner_radius, fill=bg_color)
        
        # Subtle inner border ring
        ring_color = (16, 185, 129, 80) # Emerald accent
        border_w = int(w * 0.02)
        if is_round:
            draw.ellipse([border_w, border_w, w - 1 - border_w, w - 1 - border_w], outline=ring_color, width=border_w)
        else:
            draw.rounded_rectangle([border_w, border_w, w - 1 - border_w, w - 1 - border_w], radius=corner_radius - border_w, outline=ring_color, width=border_w)

    # Draw Water Drop + Leaf emblem
    # 1. Water Drop shape
    drop_top_y = center - w * 0.24
    drop_bottom_y = center + w * 0.24
    drop_radius = w * 0.22

    # Circle at bottom of drop
    drop_cx = center
    drop_cy = center + w * 0.06

    # Draw smooth drop shape using polygon + arcs
    drop_points = []
    # Top tip
    drop_points.append((center, drop_top_y))
    # Tangent to left circle
    drop_points.append((drop_cx - drop_radius, drop_cy))
    # Bottom curve points
    num_steps = 30
    import math
    for i in range(num_steps + 1):
        angle = math.pi + (math.pi * i / num_steps) # from pi to 2pi
        x = drop_cx + drop_radius * math.cos(angle)
        y = drop_cy + drop_radius * math.sin(angle)
        drop_points.append((x, y))
    # Tangent to right
    drop_points.append((center, drop_top_y))

    # Water drop fill (Emerald / Cyan glow)
    drop_fill = (16, 185, 129, 240) # Emerald 500
    draw.polygon(drop_points, fill=drop_fill)

    # Drop outer highlight
    drop_outline = (52, 211, 153, 255) # Emerald 400
    draw.polygon(drop_points, outline=drop_outline, width=int(w * 0.015))

    # 2. Leaf inside droplet
    # Leaf curve
    leaf_color = (163, 230, 53, 255) # Lime 400
    leaf_pts = []
    leaf_tip = (center + w * 0.08, drop_cy - w * 0.12)
    leaf_base = (center - w * 0.08, drop_cy + w * 0.14)
    
    # Left leaf arc
    for i in range(20):
        t = i / 19.0
        x = leaf_base[0] + (leaf_tip[0] - leaf_base[0]) * t - (math.sin(t * math.pi) * w * 0.12)
        y = leaf_base[1] + (leaf_tip[1] - leaf_base[1]) * t
        leaf_pts.append((x, y))
    # Right leaf arc
    for i in range(20, -1, -1):
        t = i / 20.0
        x = leaf_base[0] + (leaf_tip[0] - leaf_base[0]) * t + (math.sin(t * math.pi) * w * 0.05)
        y = leaf_base[1] + (leaf_tip[1] - leaf_base[1]) * t
        leaf_pts.append((x, y))

    draw.polygon(leaf_pts, fill=leaf_color)

    # Leaf center vein line
    vein_color = (6, 78, 59, 200)
    draw.line([leaf_base, leaf_tip], fill=vein_color, width=int(w * 0.012))

    # 3. Telemetry Signal Arcs (top right of drop)
    arc_center = (center + w * 0.18, center - w * 0.18)
    for r_factor, a_w in [(0.10, 0.015), (0.16, 0.015)]:
        r = w * r_factor
        bbox = [arc_center[0] - r, arc_center[1] - r, arc_center[0] + r, arc_center[1] + r]
        draw.arc(bbox, start=290, end=380, fill=(255, 255, 255, 220), width=int(w * a_w))

    # Downsample with Lanczos for super clean icon output
    img = img.resize((size, size), Image.Resampling.LANCZOS)
    return img

print("Generating Android App Icons...")

for folder, dim in sizes.items():
    folder_path = os.path.join(res_dir, folder)
    os.makedirs(folder_path, exist_ok=True)

    # 1. Standard launcher icon
    icon_img = draw_app_icon(dim['icon'], is_round=False)
    icon_img.save(os.path.join(folder_path, "ic_launcher.png"))

    # 2. Round launcher icon
    round_img = draw_app_icon(dim['icon'], is_round=True)
    round_img.save(os.path.join(folder_path, "ic_launcher_round.png"))

    # 3. Foreground launcher icon (for adaptive layers)
    fore_img = draw_app_icon(dim['fore'], transparent_bg=True)
    fore_img.save(os.path.join(folder_path, "ic_launcher_foreground.png"))

    print(f"  [OK] {folder}: ic_launcher ({dim['icon']}px), ic_launcher_foreground ({dim['fore']}px)")

print("All PNG icons generated successfully!")
