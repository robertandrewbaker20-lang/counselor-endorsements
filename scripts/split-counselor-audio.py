#!/usr/bin/env python3
"""Split the combined counselor recording into per-product clips.

Reads public/audio/counselor-voice.wav. Adjust SPLIT_POINTS if the
segment boundaries need tuning (seconds).
"""

from __future__ import annotations

import shutil
import struct
import subprocess
import wave
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "audio" / "counselor-voice.wav"
CONVERTED = ROOT / "public" / "audio" / "_counselor-full.wav"
OUT_DIR = ROOT / "public" / "audio" / "products"

# Midpoints between long pauses detected in the ~33s recording (4 products).
# Reorder product slugs below if a clip doesn't match its product.
SPLIT_POINTS = [
    ("pine-cone-fresh", 0.0, 6.30),
    ("bark-bites", 6.30, 11.10),
    ("knot-b-gone", 11.10, 23.25),
    ("ozark-mountain-air", 23.25, 32.80),
]


def convert_to_wav(source: Path, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        ["afconvert", "-f", "WAVE", "-d", "LEI16@16000", str(source), str(dest)],
        check=True,
    )


def write_segment(
    samples: list[int], rate: int, start: float, end: float, dest: Path
) -> None:
    i0 = max(0, int(start * rate))
    i1 = min(len(samples), int(end * rate))
    chunk = samples[i0:i1]

    with wave.open(str(dest), "wb") as out:
        out.setnchannels(1)
        out.setsampwidth(2)
        out.setframerate(rate)
        out.writeframes(struct.pack(f"<{len(chunk)}h", *chunk))


def main() -> None:
    source = SOURCE
    if not source.exists():
        raise SystemExit(f"Source audio not found: {source}")

    convert_to_wav(source, CONVERTED)

    with wave.open(str(CONVERTED), "rb") as w:
        rate = w.getframerate()
        raw = w.readframes(w.getnframes())
        samples = struct.unpack(f"<{len(raw) // 2}h", raw)

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    for slug, start, end in SPLIT_POINTS:
        dest = OUT_DIR / f"{slug}.wav"
        write_segment(samples, rate, start, end, dest)
        print(f"Wrote {dest.name}: {start:.2f}s–{end:.2f}s ({end - start:.2f}s)")

    # Keep a converted copy next to the product clips.
    shutil.copy2(CONVERTED, ROOT / "public" / "audio" / "counselor-voice-full.wav")
    print("Done.")


if __name__ == "__main__":
    main()
