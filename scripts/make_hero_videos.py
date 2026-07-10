from pathlib import Path
import math

import cv2
import numpy as np
from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "videos"
WIDTH = 960
HEIGHT = 540
FPS = 24
DURATION_SECONDS = 5
TOTAL_FRAMES = FPS * DURATION_SECONDS

JOBS = [
    {
        "source": "public/images/frad-field-hero.jpg",
        "output": "frad-field-loop.mp4",
        "focal": (0.45, 0.52),
    },
    {
        "source": "public/images/frad-programme-outreach.jpg",
        "output": "frad-programme-loop.mp4",
        "focal": (0.52, 0.48),
    },
    {
        "source": "public/images/frad-water-access.jpg",
        "output": "frad-water-loop.mp4",
        "focal": (0.50, 0.50),
    },
]


def load_rgb(path: Path) -> np.ndarray:
    image = Image.open(path)
    image = ImageOps.exif_transpose(image).convert("RGB")
    return np.asarray(image)


def frame_from_image(image: np.ndarray, index: int, focal: tuple[float, float]) -> np.ndarray:
    img_h, img_w = image.shape[:2]
    progress = index / max(TOTAL_FRAMES - 1, 1)
    eased = 0.5 - 0.5 * math.cos(progress * math.pi)
    zoom = 1.02 + eased * 0.08
    scale = max(WIDTH / img_w, HEIGHT / img_h) * zoom
    resized_w = max(WIDTH, int(round(img_w * scale)))
    resized_h = max(HEIGHT, int(round(img_h * scale)))

    resized = cv2.resize(image, (resized_w, resized_h), interpolation=cv2.INTER_CUBIC)
    overflow_x = max(resized_w - WIDTH, 0)
    overflow_y = max(resized_h - HEIGHT, 0)
    focal_x, focal_y = focal
    drift_x = math.sin(progress * math.pi * 2) * 0.035
    drift_y = math.cos(progress * math.pi * 2) * 0.035
    crop_center_x = min(max(0.5 + (focal_x - 0.5) * 0.35 + drift_x, 0), 1)
    crop_center_y = min(max(0.5 + (focal_y - 0.5) * 0.35 + drift_y, 0), 1)
    x = int(round(overflow_x * crop_center_x))
    y = int(round(overflow_y * crop_center_y))
    x = min(max(x, 0), overflow_x)
    y = min(max(y, 0), overflow_y)

    frame = resized[y : y + HEIGHT, x : x + WIDTH]
    return cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)


def open_writer(path: Path) -> cv2.VideoWriter:
    for codec in ("avc1", "H264", "mp4v"):
        writer = cv2.VideoWriter(
            str(path),
            cv2.VideoWriter_fourcc(*codec),
            FPS,
            (WIDTH, HEIGHT),
        )
        if writer.isOpened():
            return writer
        writer.release()
    raise RuntimeError(f"Could not open a video writer for {path}")


def render(job: dict[str, object]) -> None:
    source = ROOT / str(job["source"])
    output = OUT_DIR / str(job["output"])
    focal = job["focal"]
    assert isinstance(focal, tuple)

    image = load_rgb(source)
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    writer = open_writer(output)

    try:
        for index in range(TOTAL_FRAMES):
            writer.write(frame_from_image(image, index, focal))
    finally:
        writer.release()

    print(f"Generated {output.relative_to(ROOT)}")


def main() -> None:
    for job in JOBS:
        render(job)


if __name__ == "__main__":
    main()
