import os
from cairosvg import svg2png

def convert_svg_to_png(input_path, output_path, color):
    with open(input_path, 'r') as f:
        svg_content = f.read()
    
    # 替换颜色
    svg_content = svg_content.replace('currentColor', color)
    
    # 转换为PNG
    svg2png(bytestring=svg_content.encode('utf-8'),
            write_to=output_path,
            output_width=48,
            output_height=48)

def main():
    icons = ['camera', 'chat', 'star', 'person']
    normal_color = '#999999'
    active_color = '#9b6bff'
    
    for icon in icons:
        input_path = f'static/tabbar/{icon}.svg'
        
        # 生成普通状态图标
        output_path = f'static/tabbar/{icon}.png'
        convert_svg_to_png(input_path, output_path, normal_color)
        
        # 生成激活状态图标
        output_path = f'static/tabbar/{icon}-active.png'
        convert_svg_to_png(input_path, output_path, active_color)
        
        # 删除SVG文件
        os.remove(input_path)

if __name__ == '__main__':
    main() 