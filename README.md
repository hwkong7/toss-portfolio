# 신혜원.dev — Frontend Portfolio

> 복잡한 요구사항을 **단순한 구조와 명확한 코드**로 만듭니다.

프론트엔드 개발자 신혜원의 개인 포트폴리오 웹사이트입니다.
프로젝트 소개에서 그치지 않고, 각 프로젝트에서 **실제로 마주쳤던 문제와 해결 과정(Troubleshooting)** 을 함께 기록하는 것을 목표로 만들었습니다.

<br />

## ✨ 주요 기능

| 섹션 | 설명 |
| --- | --- |
| **About** | 개발자 소개 및 지향점, GitHub · Email 바로가기 |
| **Core Engineering Values** | 디버깅 · 시각적 추상화 · API 문서화 · Git 전략 등 4가지 개발 가치관 |
| **Featured Projects** | 5개 프로젝트 카드 — 클릭 시 상세 모달로 역할 · 기술 스택 · 구현 내용 확인 |
| **Troubleshooting Logs** | 프로젝트에서 실제로 해결한 문제와 접근 방식을 별도 섹션으로 정리 |

<br />

## 🛠 기술 스택

| 구분 | 사용 기술 |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| UI | React 19, Tailwind CSS 4 |
| Icon | lucide-react |
| Lint | ESLint 9 (`eslint-config-next`) |

<br />

## 📁 프로젝트 구조

```
toss-portfolio/
├── app/
│   ├── layout.tsx      # 루트 레이아웃 · 폰트 · 메타데이터
│   ├── page.tsx        # 포트폴리오 전체 페이지 (섹션 + 프로젝트 모달)
│   ├── globals.css     # Tailwind 및 전역 스타일
│   └── favicon.ico
├── public/             # 정적 에셋
├── next.config.ts
└── tsconfig.json
```

프로젝트 데이터는 `app/page.tsx` 내부의 `projects` 배열에서 관리하며,
`Project` 인터페이스에 맞춰 객체를 추가하면 카드와 상세 모달이 자동으로 렌더링됩니다.

<br />

## 🚀 실행 방법

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 으로 접속합니다.

```bash
npm run build   # 프로덕션 빌드
npm run start   # 빌드 결과 실행
npm run lint    # 코드 검사
```

<br />

## 📌 소개된 프로젝트

| 프로젝트 | 설명 | 비고 |
| --- | --- | --- |
| **CVE-PoC-Scanner** | CVE 기반 웹 취약점 자동 진단 도구 | 학술대회 논문 채택 (공동저자) |
| **PANSA** | 익명 갈등 중재 및 정산 모바일 앱 | 교내 해커톤 1위 🏆 |
| **MCM Nomad Passport** | 공항 면세 쇼핑 및 여정 통합 웹 앱 | 34개 화면 구축 |
| **KGV** | 영화 예매 및 좌석 관리 모바일 앱 | 외부 API 4종 연동 |
| **SnapTidy** | 이미지 정리 데스크톱 애플리케이션 | 1인 개발 · GitHub 공개 배포 |

<br />

## 📮 Contact

- GitHub — [@hwkong7](https://github.com/hwkong7)
