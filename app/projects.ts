export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  period: string;
  badge?: string;
  techStack: string[];
  summary: string;
  role: string;
  details: string[];
  troubleshooting?: { title: string; desc: string }[];
  githubUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: 'cve-poc-scanner',
    title: 'CVE-PoC-Scanner',
    subtitle: 'CVE 기반 웹 취약점 자동 진단 도구',
    category: 'Capstone Design',
    period: '2026.03 – 2026.06',
    badge: '학술대회 논문 게재 (제2저자)',
    techStack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Zustand', 'FastAPI', 'MySQL'],
    summary: 'CVE와 OWASP Top 10 기반 PoC를 실제로 실행해 취약점 재현 여부를 검증하는 진단 시스템. 5인 팀 프로젝트로 진행했고 결과를 학술대회 논문으로 게재',
    role: '프론트엔드 UI/UX 구현, 상태 관리 로직 설계, 데이터 전송 구조 설계서 작성',
    details: [
      '「웹 서비스 보안 점검을 위한 CVE 기반 웹 취약점 진단 도구」로 2026 한국정보기술학회 하계 종합학술대회에 제2저자로 게재',
      '백엔드 API 라우트와 OpenAPI 명세를 분석해 프론트엔드 관점의 데이터 전송 구조 설계서를 직접 작성하고, 각 필드의 역할·제약 조건·응답 구조를 정리',
      '공통 입력 → 엔드포인트 → 실행 → 리포트로 이어지는 4단계 진단 흐름을 화면으로 설계하고, 각 단계에서 필요한 입력만 노출되도록 구성',
      '인증이 필요한 대상과 그렇지 않은 대상을 구분해, 로그인 필요를 선택했을 때만 Cookie·Authorization 입력이 나타나도록 조건부 폼 설계',
      '단일 화면에 대량 나열되던 진단 결과를, 설정 패널에서 엔드포인트를 선택하면 해당 결과만 필터링해 보여주는 구조로 리팩터링',
      '기술 스택 진단과 엔드포인트 진단이 동시에 출력될 때 이전 결과가 남는 상태 오염 문제를 고유 식별 키 기반 초기화 로직으로 해결'
    ],
    troubleshooting: [
      {
        title: '동시 진단 결과의 상태 오염',
        desc: '기술 스택 진단과 엔드포인트 진단이 함께 출력될 때 이전 진단의 잔재가 화면에 남아, 사용자가 어떤 대상의 결과를 보고 있는지 알 수 없었습니다. 결과를 고유 식별 키 기준으로 관리하고 대상이 바뀌면 상태를 초기화하도록 바꿔 해결했습니다. 다만 검증은 테스트 환경에서만 이루어져, 실제 서비스 환경에서의 추가 검증은 과제로 남아 있습니다.'
      }
    ],
    githubUrl: 'https://github.com/hwkong7/CVE-PoC-Scanner'
  },
  {
    id: 'pansa',
    title: 'PANSA',
    subtitle: '익명 갈등 중재 및 정산 모바일 앱',
    category: 'Mobile App',
    period: '2026.07 (9일)',
    badge: '교내 해커톤 1위 🏆',
    techStack: ['React Native (Expo)', 'TypeScript', 'Supabase'],
    summary: '재화가 이동하는 갈등 중재/베팅 정산 플랫폼으로 결제 정산 로직의 안전성 확보에 집중한 프로젝트',
    role: '프론트엔드 / 백엔드 (4인 팀)',
    details: [
      '베팅 및 정산 등 쓰기 작업을 13개 서버 RPC로 분리하고, 잔액 검증과 차감을 단일 트랜잭션으로 처리해 재화 일관성 확보',
      'PENDING → OPEN → SETTLED / REJECTED 4단계 도메인 상태 분기 처리',
      'Realtime 구독에 Polling을 이중화(상세 30초, 수락 대기 10초)하여 연결이 끊겨도 상태 갱신이 누락되지 않도록 구성',
      '디자인 토큰과 공용 컴포넌트 8종 설계, SVG 아이콘을 단일 Icon API로 추상화하여 구현체 교체 용이성 확보'
    ],
    troubleshooting: [
      {
        title: '네트워크 불확실성에서의 실시간 상태 정합성',
        desc: '단순 웹소켓 연결 단절 시 데이터가 꼬이는 현상을 방지하기 위해 Polling 백업 로직을 이중화하여 오프라인 퍼스트 수준의 가용성 확보'
      }
    ],
    githubUrl: 'https://github.com/hwkong7/pansa_app'
  },
  {
    id: 'mcm-nomad',
    title: 'MCM Nomad Passport',
    subtitle: '공항 면세 쇼핑 및 여정 통합 웹 앱',
    category: 'Web Application',
    period: '2026.08 (2주)',
    techStack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'React-Query', 'Zustand'],
    summary: '인증, 출발 전, 공항, 도착 후, 마이페이지 등 5개 영역 30여 개 화면을 통합한 웹 앱. 4인 팀에서 전체 190커밋 중 108커밋(57%)을 작성',
    role: '프론트엔드 개발 (인증 화면 전담, 공통 로딩·에러 처리, 상태 복구)',
    details: [
      '서버가 소유한 데이터는 React-Query, 새로고침에도 유지돼야 하는 여정 ID·설정은 Zustand persist로 소유 주체를 기준으로 분리',
      '로컬에 저장한 여정 ID가 서버에서 사라졌을 때 화면이 빈 스켈레톤에 멈추는 문제를, 조회 실패를 감지해 ID를 비우고 탑승권 스캔 화면으로 되돌리는 공통 훅(useClearStaleJourney)으로 해결하고 조회 3곳에 적용',
      '응답을 받지 못한 경우(네트워크·타임아웃)와 서버가 오류를 내려준 경우를 구분해 안내하도록 로그인 에러 분기를 순수 함수로 분리',
      '공통 로딩·에러 컴포넌트(WakingScreen 17개 화면, ErrorState 14개 화면)를 설계해 실패 시 항상 재시도 경로를 노출',
      'Vitest를 도입해 위 두 로직을 테스트 8개로 고정 (화면에서 재현하기 어려운 실패 경로 우선)',
      '아이콘만으로 구성된 하단 네비게이션 등에 aria-label을 부여해 스크린리더에서 항목이 구분되도록 개선'
    ],
    troubleshooting: [
      {
        title: '로컬에 저장한 서버 상태가 무효화되는 문제',
        desc: '여정 ID를 localStorage에 저장해 새로고침에도 유지되게 했으나, 서버에서 해당 여정이 사라지면 조회가 계속 실패해 사용자에게는 앱이 멈춘 것처럼 보였습니다. 조회 실패를 감지해 저장된 ID를 비우고 첫 화면으로 되돌려, 사용자가 스스로 복구할 수 있는 흐름으로 만들었습니다. 로컬에 상태를 들고 있는 환경이라면 어디서든 생길 수 있는 문제라고 보고 있습니다.'
      }
    ],
    githubUrl: 'https://github.com/hwkong7/mcm-nomad-frontend'
  },
  {
    id: 'kgv',
    title: 'KGV (CGV 클론)',
    subtitle: '영화 예매 및 좌석 관리 모바일 앱',
    category: 'Mobile App',
    period: '2025.09 – 2025.12',
    techStack: ['Flutter', 'Firebase', '외부 API 4종'],
    summary: '실시간 예매, 상영관 좌석 선택, 현황 미니맵, 실시간 교통/주차 정보 연동 서비스',
    role: '프론트엔드 (회원가입, 좌석예매, 미니맵, 쿠폰, 외부 API 연동)',
    details: [
      '좌석 종류를 Enum으로 모델링하고 상영관 배치를 데이터화하여 재사용 가능한 SVG 좌석 UI 구축',
      '한눈에 좌석 현황을 파악할 수 있는 미니맵 컴포넌트 설계',
      '영화, 주차, 교통 관련 4종 외부 API 데이터를 결합한 인터랙티브 예매 플로우 개발'
    ],
    githubUrl: 'https://github.com/hwkong7/KGV-Clone'
  },
  {
    id: 'gift-picker',
    title: 'Gift Picker',
    subtitle: '선물 추천 웹 서비스',
    category: 'Web Application',
    period: '개인 프로젝트',
    techStack: ['React 19', 'TypeScript', 'Vite', 'Vercel Functions', 'Supabase'],
    summary: '사용하던 외부 쇼핑 API의 서비스 종료로 기능이 중단되자, 대체 데이터 소스로 마이그레이션하며 호출 비용과 응답 지연까지 함께 개선한 프로젝트',
    role: '1인 단독 개발 (기획, 프론트엔드, 서버리스 API, 배포)',
    details: [
      '기존 쇼핑 API 종료로 추천 기능이 중단되자, 검색 결과 기반 데이터 소스(SerpApi)로 파이프라인을 재구성',
      '정제되지 않은 검색 결과가 그대로 노출되는 문제를 필수 키워드 필터링으로 1차 차단하고, 생성형 AI로 검색어를 정제해 추천 정확도 개선',
      '동일 조건 재검색이 잦다는 점에 착안해 쿼리 기준 캐시(TTL 1시간)를 도입, 유료 API 중복 호출과 응답 지연을 감소',
      '외부 API 의존은 언제든 끊길 수 있다는 전제로 데이터 소스를 교체 가능한 계층으로 분리'
    ],
    troubleshooting: [
      {
        title: '외부 API 서비스 종료로 인한 기능 중단',
        desc: '동일한 대체 API가 없어 데이터 소스 구조부터 다시 설계해야 했습니다. 검색 결과를 수집한 뒤 필터링과 AI 정제를 거치는 파이프라인으로 재구성하고, 캐시 레이어를 두어 비용과 지연을 함께 줄였습니다.'
      }
    ],
    githubUrl: 'https://github.com/hwkong7/gift_picker'
  },
  {
    id: 'snaptidy',
    title: 'SnapTidy',
    subtitle: '이미지 정리 데스크톱 애플리케이션',
    category: 'Desktop App / Open Source',
    period: '개인 프로젝트',
    badge: 'GitHub Public Release',
    techStack: ['Electron', 'React 19', 'JavaScript'],
    summary: '기획부터 구현, 빌드, GitHub 공개 배포까지 단독으로 진행한 데스크톱 앱',
    role: '1인 단독 개발 (기획, UI/UX, Electron-React 통합)',
    details: [
      'Electron의 Main Process와 Renderer Process 간의 데스크톱 파일 시스템 접근 로직 구현',
      '모듈화된 컴포넌트 구조로 리팩터링 및 사용자 경험 개선 지속 진행 중'
    ],
    githubUrl: 'https://github.com/hwkong7/snaptidy'
  }
];
