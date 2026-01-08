간단한 Electron 기반의 데스크톱 애플리케이션 템플릿입니다.
이 저장소에는 UI와 메인 프로세스 코드, 그리고 기본 빌드/실행 스크립트가 포함되어 있습니다.

## 주요 기능
# JSON Viewer

간단한 Electron 기반의 JSON 뷰어 템플릿입니다.
로컬 JSON 파일을 열거나 편집, 검색 및 포맷 기능을 제공합니다.

## 주요 기능
- 텍스트 편집기(붙여넣기/열기) 기반 JSON 뷰어
- 검색 및 포맷(정렬) 기능
- `preload.js`를 통한 안전한 브리지 구조

## 요구 사항
- Node.js (v16 이상 권장)
- npm

## 빠른 시작
1. 의존성 설치

```bash
npm install
```

2. 개발 모드 실행

```bash
npm start
```

앱이 실행되면 로컬 파일을 열거나 편집 영역에 JSON을 붙여넣어 사용하세요.

## 파일 개요
- `main.js` — Electron 메인 프로세스 진입점
- `preload.js` — 메인과 렌더러 간 브리지(안전한 노출)
- `renderer.js` — 렌더러 측 로직 (UI 핸들링)
- `index.html` — 뷰(앱 UI)
- `style.css` — 기본 스타일
- `package.json` — 스크립트 및 빌드 설정

## 빌드 및 패키징
`electron-builder`가 설정되어 있는 경우 AppImage 등으로 패키징할 수 있습니다

```bash
npm run dist
```

생성된 아티팩트는 `dist/` 디렉터리에서 확인하세요.

## 사용 가능한 스크립트
- `npm start` : 개발용으로 Electron 앱 실행
- `npm run dist` : 배포용 패키지 생성 (설정된 경우)

## 프로젝트 구조(요약)

```
/
├── index.html
├── main.js
├── renderer.js
├── preload.js
├── package-lock.json
├── package.json
├── README.md
├── renderer.js
└── style.css
```

## 라이선스
MIT