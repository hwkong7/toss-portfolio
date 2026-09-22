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
  /** 카드 커버 이미지 (public 기준 경로) */
  image?: string;
  /** 커버 이미지가 없을 때 쓰는 배경 */
  cover?: string;
}

export const projects: Project[] = [
  {
    id: 'cve-poc-scanner',
    title: 'CVE-PoC-Scanner',
    image: '/projects/cve.png',
    cover: 'from-[#E8F3FF] to-[#D6E9FF]',
    subtitle: 'CVE 기반 웹 취약점 자동 진단 도구',
    category: 'Capstone Design',
    period: '2026.03 – 2026.06',
    badge: '학술대회 논문 게재 (제2저자)',
    techStack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Zustand', 'React Router', 'FastAPI', 'MySQL'],
    summary: 'CVE와 OWASP Top 10 기반 PoC를 실제로 실행해 취약점 재현 여부를 검증하는 진단 시스템. 4인 팀 프로젝트로 진행했고 결과를 학술대회 논문으로 게재',
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
    image: '/projects/pansa.png',
    cover: 'from-[#F3F1FF] to-[#E7E2FF]',
    subtitle: '익명 갈등 중재 및 정산 모바일 앱',
    category: 'Mobile App',
    period: '2026.06 – 2026.07',
    badge: '교내 해커톤 1위',
    techStack: ['React Native (Expo)', 'TypeScript', 'Supabase', 'React Navigation'],
    summary: '재화가 이동하는 갈등 중재/베팅 정산 플랫폼으로 결제 정산 로직의 안전성 확보에 집중한 프로젝트',
    role: '프론트엔드 중심, 백엔드 일부 병행 (4인 팀) — 화면 구현과 함께 베팅·정산 등 쓰기 로직을 서버 RPC로 작성',
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
    period: '2026.08.09 – 08.22',
    techStack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'React-Query', 'Zustand', 'Vitest'],
    summary: '인증, 출발 전, 공항, 도착 후, 마이페이지 등 5개 영역 30여 개 화면을 통합한 웹 앱. 4인 팀에서 인증 화면과 공통 로딩·에러 처리를 맡았습니다',
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
    image: '/projects/mcm-nomad.png',
    githubUrl: 'https://github.com/hwkong7/mcm-nomad-frontend'
  },
  {
    id: 'kgv',
    title: 'KGV (CGV 클론)',
    image: '/projects/kgv.png',
    cover: 'from-[#FFF1F0] to-[#FFE0DE]',
    subtitle: '영화 예매 및 좌석 관리 모바일 앱',
    category: 'Mobile App',
    period: '2025.09 – 2025.12',
    techStack: ['Flutter', 'Firebase', 'Naver Maps API', 'KOBIS API', '서울 열린데이터 API', 'Google Calendar API'],
    summary: '상영 시간 조회부터 관람 인원 선택, 좌석 예매, 결제까지 이어지는 예매 플로우를 구현한 4인 팀 프로젝트',
    role: '프론트엔드 (회원가입/로그인, 관람 인원 선택, 좌석 예매, 미니맵, 쿠폰, 외부 API 연동)',
    details: [
      '좌석 위치와 종류를 UI 코드에 하드코딩하지 않고 좌석 모델·레이아웃 데이터로 분리해, 상영관마다 배치가 달라도 같은 렌더링 구조를 재사용하도록 구성',
      'SWEETBOX·우대석·Light Zone 등 좌석 종류에 따라 다른 에셋을 반환하도록 렌더링을 분기하고, Light Zone은 CustomPainter로 별도 구현',
      '관람 인원 수를 기준으로 선택 가능한 좌석 수를 검증하고, 좌석 선택이 바뀔 때 총 금액이 함께 갱신되도록 상태 흐름을 연결',
      '권종별 가격 계산을 화면에서 분리해 TicketPrice 모듈로 옮겨, 가격 정책이 바뀌어도 화면 코드를 수정하지 않도록 구성',
      '상영 시간 조회를 Service로 분리하고 FutureBuilder로 로딩·오류·데이터 없음 상태를 각각 처리',
      '예매 완료 시 잔여 좌석 감소를 Firestore Transaction으로 처리하고, 잔여 좌석보다 예약 인원이 많으면 음수가 되지 않도록 검증',
      '영화, 주차, 교통 관련 4종 외부 API를 예매 플로우에 결합'
    ],
    troubleshooting: [
      {
        title: '동시 예매 시 잔여 좌석이 잘못 갱신될 수 있던 문제',
        desc: '잔여 좌석을 조회한 뒤 그 값을 빼서 다시 쓰는 방식이면, 두 사람이 동시에 예매할 때 한쪽의 감소가 덮어써질 수 있었습니다. Firestore Transaction 안에서 최신 좌석 수를 다시 읽고 감소시키도록 바꾸고, 예약 인원이 잔여 좌석보다 많은 경우를 먼저 막았습니다.'
      },
      {
        title: '잘못된 병합 상태에서 작업 복구',
        desc: '여러 브랜치를 병합하다 충돌과 함께 의도하지 않은 커밋 상태가 만들어졌습니다. 충돌 파일만 고쳐서는 이전 상태로 돌아갈 수 없어, git reflog로 HEAD가 움직인 이력을 따라가며 병합 직전의 정상 커밋을 찾아 작업 상태를 되돌린 뒤 브랜치를 다시 정리했습니다.'
      }
    ],
    githubUrl: 'https://github.com/hwkong7/KGV-Clone'
  },
  {
    id: 'gift-picker',
    title: 'Gift Picker',
    image: '/projects/gift-picker.png',
    cover: 'from-[#FFF6E5] to-[#FFEAC2]',
    subtitle: '선물 추천 웹 서비스',
    category: 'Web Application',
    period: '개인 프로젝트',
    techStack: ['React 19', 'TypeScript', 'Vite', 'Vercel Functions', 'Supabase', 'Gemini API', 'SerpApi'],
    summary: '요정 캐릭터가 질문을 건네며 원하는 선물을 찾아주는 웹 서비스. 사용하던 쇼핑 API의 서비스 종료로 기능이 중단되자 대체 데이터 소스로 옮기고, 호출 비용과 응답 지연까지 함께 개선했습니다',
    role: '1인 단독 개발 (기획, 프론트엔드, 서버리스 API, 배포)',
    details: [
      '기존 쇼핑 API 종료로 추천 기능이 중단되자, 검색 결과 기반 데이터 소스(SerpApi)로 파이프라인을 재구성',
      '정제되지 않은 검색 결과가 그대로 노출되는 문제를 필수 키워드 필터링으로 1차 차단하고, 생성형 AI로 검색어를 정제해 추천 정확도 개선',
      '동일 조건 재검색이 잦다는 점에 착안해 쿼리 기준 캐시(TTL 1시간)를 도입, 유료 API 중복 호출과 응답 지연을 감소',
      '외부 API 의존은 언제든 끊길 수 있다는 전제로 데이터 소스를 교체 가능한 계층으로 분리',
      '카테고리 선택 → 질문 응답 → 상품 추천으로 이어지는 대화형 흐름을 설계하고, 검색이 필요 없는 카테고리는 추천 단계를 건너뛰도록 분기',
      '사용해 본 분들에게서 추천 상품이 의도와 어긋날 때가 있다는 피드백을 받아, 검색어 정제 방식과 결과 필터링 기준을 다듬는 작업을 진행 중'
    ],
    troubleshooting: [
      {
        title: '외부 API 서비스 종료로 인한 기능 중단',
        desc: '동일한 대체 API가 없어 데이터 소스 구조부터 다시 설계해야 했습니다. 검색 결과를 수집한 뒤 필터링과 AI 정제를 거치는 파이프라인으로 재구성하고, 캐시 레이어를 두어 비용과 지연을 함께 줄였습니다.'
      },
      {
        title: '추천 결과가 의도와 어긋나는 문제 (개선 진행 중)',
        desc: '실제로 써 본 분들에게서 검색한 것과 맞지 않는 상품이 섞여 나온다는 이야기를 들었습니다. 검색 결과를 그대로 쓰지 않고 AI로 검색어를 정제하고 있지만, 정제된 검색어가 넓게 잡히면 관련 없는 상품까지 따라온다고 보고 있습니다. 현재는 카테고리별로 필수 키워드 조건을 다르게 두고, 추천 전 결과를 한 번 더 거르는 방향으로 정확도를 높이는 작업을 하고 있습니다.'
      }
    ],
    githubUrl: 'https://github.com/hwkong7/gift_picker'
  },
  {
    id: 'snaptidy',
    title: 'SnapTidy',
    image: '/projects/snaptidy.png',
    cover: 'from-[#EDF9F0] to-[#D8F2E2]',
    subtitle: '이미지 정리 데스크톱 애플리케이션',
    category: 'Desktop App / Open Source',
    period: '개인 프로젝트',
    badge: 'GitHub Public Release',
    techStack: ['Electron', 'React 19', 'JavaScript'],
    summary: '로컬 사진을 정리해주는 데스크톱 앱. 기획부터 구현, 빌드, 공개 배포까지 단독으로 진행',
    role: '1인 단독 개발 (기획, UI/UX, Electron-React 통합, 빌드/배포)',
    details: [
      '파일 시스템 접근은 Main Process가 맡고 Renderer는 IPC로 필요한 작업만 요청하도록 나눠, UI 코드와 파일 처리 로직의 결합도를 낮춤',
      '이미지를 한 번에 모두 불러와 렌더링하던 구조를 바꿔, 미리보기는 썸네일을 쓰고 필요한 시점에 처리하도록 개선',
      '파일 삭제·이동 후 화면이 실제 파일 상태와 어긋나던 문제를, 작업 성공 후 목록을 다시 조회해 갱신하도록 수정',
      '경로를 문자열로 직접 이어 붙이다 구분자와 공백 때문에 파일을 찾지 못하던 문제를 path 모듈 사용으로 해결',
      '화면 표시용 데이터(썸네일·이름)와 파일 작업용 원본 경로를 한 구조에서 구분해 관리',
      'electron-builder 진입점 경로 불일치로 빌드가 실패하던 문제를 오류 로그를 따라가며 해결',
      '사진 정리에서 범위를 넓혀, 흩어진 로컬 데이터를 분석하고 안전하게 정리하도록 돕는 Digital Cleanup Assistant 방향으로 2.0을 준비 중'
    ],
    troubleshooting: [
      {
        title: '화면의 목록과 실제 파일 상태가 어긋나던 문제',
        desc: '파일을 삭제하거나 옮긴 뒤에도 화면에는 이전 목록이 남아 있었습니다. 파일 작업의 성공 여부만 확인하고 화면 상태를 갱신하지 않은 것이 원인이라, 작업이 끝난 뒤 폴더 목록을 다시 조회해 반영하도록 바꿨습니다. 로컬 상태와 실제 상태가 갈라지면 사용자는 앱을 믿을 수 없게 된다고 생각합니다.'
      }
    ],
    githubUrl: 'https://github.com/hwkong7/snaptidy'
  }
];