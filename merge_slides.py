import re

# 메인 HTML 파일 읽기
with open('index.html', 'r', encoding='utf-8') as f:
    main_html = f.read()

# 슬라이드 파일들 읽기
slide_parts = []
for i in range(1, 5):
    try:
        with open(f'slides-part{i}.html', 'r', encoding='utf-8') as f:
            slide_parts.append(f.read())
    except FileNotFoundError:
        print(f"slides-part{i}.html 파일을 찾을 수 없습니다.")

# 모든 슬라이드 합치기
all_slides = '\n'.join(slide_parts)

# 메인 HTML에서 </section> 다음에 슬라이드를 삽입
# 마지막 </section> 태그를 찾아서 그 다음에 추가
pattern = r'(</section>\s*)(</div>\s*</div>)'
replacement = r'\1' + all_slides + r'\n        \2'

updated_html = re.sub(pattern, replacement, main_html)

# 업데이트된 HTML 저장
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(updated_html)

print("✅ 슬라이드가 성공적으로 통합되었습니다!")
print(f"   - 추가된 슬라이드 파트: {len(slide_parts)}개")
