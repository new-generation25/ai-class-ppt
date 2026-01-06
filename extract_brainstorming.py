import PyPDF2
import json

def extract_pdf_content(pdf_path):
    """PDF 파일에서 텍스트 내용을 추출합니다."""
    with open(pdf_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        
        content = {
            'total_pages': len(pdf_reader.pages),
            'pages': []
        }
        
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text = page.extract_text()
            
            content['pages'].append({
                'page_number': page_num + 1,
                'text': text
            })
        
        return content

if __name__ == '__main__':
    pdf_path = '1-1 AI 공모사업 1주차 브레인스토밍 실습.pdf'
    
    try:
        content = extract_pdf_content(pdf_path)
        
        # JSON 파일로 저장
        with open('brainstorming_content.json', 'w', encoding='utf-8') as f:
            json.dump(content, f, ensure_ascii=False, indent=2)
        
        # 콘솔에 출력
        print(f"총 페이지 수: {content['total_pages']}")
        print("\n" + "="*80 + "\n")
        
        for page in content['pages']:
            print(f"[페이지 {page['page_number']}]")
            print(page['text'])
            print("\n" + "="*80 + "\n")
            
    except Exception as e:
        print(f"오류 발생: {str(e)}")
