# 뉴스 타임즈 만들기
https://newspage100.netlify.app/
<img width="1222" alt="image" src="https://github.com/user-attachments/assets/bd123a7b-7aa1-4766-b80e-62f8043ab545">
<img width="1220" alt="image" src="https://github.com/user-attachments/assets/3361d84e-7521-4dd1-ad73-c0213188725a">
<img width="419" alt="image" src="https://github.com/user-attachments/assets/4565eaff-564d-4090-83b5-9817289ea312">
<img width="413" alt="image" src="https://github.com/user-attachments/assets/f97c5007-9ce4-4b58-bab1-a1cf008b1b62">
## 기능 설명
* 유저는 최신 뉴스를 볼 수 있다.
* 뉴스에는 사진, 제목, 내용, 출처,날짜가 있다.
* 뉴스를 sport, tech, business등 카테고리 별로 볼 수 있다.
* 뉴스를 검색할 수 있다.
* pagenation으로 다음 뉴스정보를 받아볼 수 있다.
  
## UI 설명
* 반응형 웹페이지
* 큰 화면에서는 검색 아이콘과 제목 밑에 카테고리가 보이지만,
* 모바일 화면에서는 검색 아이콘과 카테고리 아이콘이 있고 이를 눌러야 카테고리가 보인다.

## 기능 개선
: 실제 구동해 본 후 불편한 기능이나 UI를 수정해 보았다.
* 다른 카테고리를 누르더라도 페이지 기록이 남아서 오류가 생긴다.
  (전체 페이지에서 6 페이지를 보다가 Entertainment를 카테고리를 누른다면 없는 페이지라고 뜬다.)
  -> 다른 카테고리를 누를 시 첫 번째 페이지만 보이도록 수정했다.
*  모바일 버전에서 카테고리를 선택한 후 X 표시를 눌러줘야 사이드 메뉴가 닫히고 기사를 볼 수 있다.
  -> 카테고리 선택 시 자동으로 사이드 메뉴가 닫히도록 수정했다.
* 모바일 버전에서 사이드 메뉴가 나와있을 때 페이지네이션이 보인다.
  
  <img width="413" alt="image" src="https://github.com/user-attachments/assets/69284478-4085-4275-8149-4c5e1c88f668">
  -> z-index 값을 조정해서 보이지 않게 수정했다.
* 기사를 아래로 내리고 다시 위로 스크롤하기 불편했다.
    -> TOP 버튼을 만들어서 맨 위로 올릴 수 있는 기능을 구현했다.
* 카테고리별로 기사를 본 후 전체 기사를 보고 싶을 때 새로고침해야 한다.
    -> All 버튼을 만들어서 전체 기사를 볼 수 있는 기능을 구현했다.
