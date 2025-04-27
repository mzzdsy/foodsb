#!/usr/bin/env python3

import os
import sys
from cairosvg import svg2png

def convert_svg_to_png(svg_path, output_path=None):
    """
    Convert an SVG file to PNG format.
    
    Args:
        svg_path (str): Path to the input SVG file
        output_path (str, optional): Path for the output PNG file. If not provided,
                                   will use the same name as input with .png extension
    """
    if not os.path.exists(svg_path):
        print(f"Error: Input file '{svg_path}' does not exist.")
        return False
    
    if not output_path:
        # Replace .svg extension with .png
        output_path = os.path.splitext(svg_path)[0] + '.png'
    
    try:
        with open(svg_path, 'rb') as svg_file:
            svg_data = svg_file.read()
            svg2png(bytestring=svg_data, write_to=output_path)
        print(f"Successfully converted '{svg_path}' to '{output_path}'")
        return True
    except Exception as e:
        print(f"Error converting file: {str(e)}")
        return False

def main():
    if len(sys.argv) < 2:
        print("Usage: python svg_to_png.py <svg_file> [output_file]")
        sys.exit(1)
    
    svg_path = sys.argv[1]
    output_path = sys.argv[2] if len(sys.argv) > 2 else None
    
    success = convert_svg_to_png(svg_path, output_path)
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main() 