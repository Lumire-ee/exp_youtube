# 1. Git 브랜치 생성 및 사용 가이드
### 1-1 브랜치 생성
- 새로운 작업을 시작할 때 **반드시 브랜치를 생성**해주세요
- 브랜치 생성 명령어:
  ```bash
  git checkout -b <브랜치명>
  ```
예시: git checkout -b feat/jaehun

### 1-2 브랜치 네이밍 규칙
- 기능 개발: feat/<이름>
- 버그 수정: fix/<이름>
- 기타 작업: chore/<이름>

# 2. 커밋 규칙
### 2-1 작업 단위로 커밋
- 작업 완료 후, **작업 단위**로 커밋을 작성해주세요
- 커밋 메시지 규칙 **[feat]**, **[style]**, **[chore]** 등 접두사를 활용해주세요
  >접두사를 제외한 내용은 한글로 작성해주세요

# 3. Pull Request(PR) 규칙
### 3-1 PR 생성 방법
- GitHub에서 **Pull Request** 탭으로 이동 -> **New Pull Request** 클릭
- PR 제목과 설명을 작성해주세요
  ```bash
  - 검색창 UI 구현
  - YouTube API 연동 및 검색 결과 표시 기능 추가
  ```
### 3-2 PR 병합
- 코드 리뷰가 완료되면 **dev** 브랜치로 병합 후 다시 한번 검토 후 **main** 브랜치로 병합하겠습니다
- 병합이 완료되면 브랜치를 정리해주세요
- 로컬 브랜치 삭제
  ```bash
  git branch -d <브랜치명>
  ```
- 원격 브랜치 삭제
  ```bash
  git push origin --delete <브랜치명>
  ```

# 4. 작업 전/후 체크리스트
### 4-1 작업 전
- 시작 전에 항상 **최신 상태로 동기화** 해주세요
  ```bash
  git pull origin dev
  또는
  git pull origin main
  ```
### 4-2 작업 후
- 다시 한번 검토 후 PR을 생성해주세요

# 5. 설치 및 실행 방법
1. 레포지토리 클론:
   ```bash
   git clone <repository-url>
   ```
2. 패키지 설치
   ```bash
   npm install
   ```
3. 개발 서버 실행
   ```bash
   npm start
   ```



