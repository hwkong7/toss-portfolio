'use client';

import React, { useEffect, useState } from 'react';
import { 
  Mail, ExternalLink, Code, Bug, Layers, 
  Sparkles, Shield, Terminal, ChevronRight, X, FileText
} from 'lucide-react';

interface Project {
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

export default function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // 모달은 Esc로도 닫을 수 있어야 하고, 열려 있는 동안 뒤 배경이 스크롤되면 안 된다.
  useEffect(() => {
    if (!selectedProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const projects: Project[] = [
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

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#191F28] font-sans antialiased">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <span className="font-bold text-lg tracking-tight text-[#1B64DA]">신혜원.dev</span>
          <nav className="flex gap-6 text-sm font-medium text-gray-600">
            <a href="#about" className="hover:text-black transition">About</a>
            <a href="#core-values" className="hover:text-black transition">Values</a>
            <a href="#projects" className="hover:text-black transition">Projects</a>
            <a href="#troubleshooting" className="hover:text-black transition">Troubleshooting</a>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-24">
        <section id="about" className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Frontend Developer
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            복잡한 요구사항을 <br />
            <span className="text-[#3182F6]">단순한 구조와 명확한 코드</span>로 만듭니다.
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            안녕하세요, 프론트엔드 개발자 <strong>신혜원</strong>입니다.<br />
            Figma를 통한 시각적 UI 설계부터 백엔드 API 명세 분석, 네트워크/Logcat 기반 디버깅까지 
            사용자 경험과 데이터 정합성을 동시에 확보하는 개발을 지향합니다.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a 
              href="https://github.com/hwkong7" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </a>
            <a 
              href="mailto:lime040909@gmail.com" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
            >
              <Mail className="w-4 h-4" /> Email Contact
            </a>
          </div>
        </section>

        <section id="core-values" className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Core Engineering Values</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#3182F6] flex items-center justify-center">
                <Bug className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg">근거 기반의 원인 추적 & 디버깅</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Android Logcat, 네트워크 타임아웃, 예외 로그를 다각도로 분석하여 지연·단절·상태 꼬임의 근본 원인을 파악하고 정합성을 유지합니다.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg">Figma to Code & 시각적 추상화</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                아이디어를 Figma로 시각화한 후, Enum 기반 상태 모델링과 단일 Icon API 추상화를 통해 확장성 높은 UI 컴포넌트로 구현합니다.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg">API 명세 분석 및 데이터 문서화</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                개발 시작 전 백엔드 API 명세와 데이터 흐름을 다각도로 분석하여 '프론트엔드 데이터 전송 구조 설계서'를 작성하고 개발 효율을 극대화합니다.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg">실패 경로를 테스트로 고정</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                네트워크 오류 구분, 무효해진 로컬 상태 복구처럼 화면에서 재현하기 번거로운 로직을 Vitest로 먼저 덮습니다. 일관된 Git 브랜치 전략과 PR 기반 리뷰로 변경 이력을 남깁니다.
              </p>
            </div>
          </div>
        </section>

        <section id="projects" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Featured Projects</h2>
            <p className="text-sm text-gray-500">프로젝트 카드를 클릭하면 상세 트러블슈팅과 해결 과정을 볼 수 있습니다.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedProject(p)}
                aria-label={`${p.title} 상세 보기`}
                className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between space-y-4 text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3182F6] focus-visible:ring-offset-2"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md">
                      {p.category}
                    </span>
                    {p.badge && (
                      <span className="text-xs font-bold px-2.5 py-1 bg-blue-50 text-[#3182F6] rounded-md">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#3182F6] transition flex items-center justify-between">
                    {p.title}
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition" />
                  </h3>
                  <p className="text-sm text-gray-500">{p.subtitle}</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{p.summary}</p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {p.techStack.map((tech) => (
                      <span key={tech} className="text-xs px-2 py-0.5 bg-gray-50 text-gray-600 rounded border border-gray-100">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section id="troubleshooting" className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Real-World Troubleshooting Logs</h2>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
            <div className="border-b border-gray-100 pb-4 space-y-2">
              <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Case 01. Debugging</span>
              <h3 className="font-bold text-lg">Android Logcat 로그 분석 기반의 앱 반복 종료 원인 규명</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                실디바이스 테스트 중 원인을 알 수 없는 앱 재부팅 문제 발생 ➡️ Android Studio Logcat 전체 로그를 수집·분석하여 
                <strong>'네트워크 요청 타이밍 이슈'</strong>, <strong>'상태 초기화 누락'</strong>, <strong>'잘못된 값 전달 예외'</strong> 3가지를 명확히 규명하고 정상화.
              </p>
            </div>

            <div className="border-b border-gray-100 pb-4 space-y-2">
              <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">Case 02. Git & Version Control</span>
              <h3 className="font-bold text-lg">Git Merge 오류 격리 분석 및 브랜치 재구성</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                긴 오류 코드와 함께 병합이 실패하는 현상 발생 ➡️ 단순 설정 문제인지 충돌 문제인지 원인 재현 테스트 실시. 
                이후 작업 단위를 격리한 신규 브랜치로 충돌 요소를 분리 재구성하여 안전하게 병합 완료.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-purple-500 uppercase tracking-wider">Case 03. Error Handling</span>
              <h3 className="font-bold text-lg">장애 원인이 화면에서 구분되지 않던 문제</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                백엔드 콜드스타트로 첫 응답이 수십 초까지 지연되는 환경에서, <strong>비밀번호 오류와 네트워크 타임아웃이 같은 문구</strong>로 표시돼 
                사용자도 개발자도 원인을 알 수 없었음 ➡️ 응답 status가 없는 경우와 서버가 반환한 오류를 구분해 안내하도록 분기하고, 
                해당 로직을 순수 함수로 분리한 뒤 <strong>테스트로 고정</strong>.
              </p>
            </div>
          </div>
        </section>
      </main>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-xl relative"
          >
            <button 
              onClick={() => setSelectedProject(null)}
              aria-label="닫기"
              className="absolute top-4 right-4 text-gray-400 hover:text-black p-1 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>

            <div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-[#3182F6] rounded-md">
                {selectedProject.category}
              </span>
              <h2 id="project-modal-title" className="text-2xl font-extrabold text-gray-900 mt-2">{selectedProject.title}</h2>
              <p className="text-sm text-gray-500">{selectedProject.subtitle} ({selectedProject.period})</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-sm text-gray-900">담당 역할</h3>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedProject.role}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-sm text-gray-900">핵심 기여 및 성과</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1.5">
                {selectedProject.details.map((d, idx) => (
                  <li key={idx} className="leading-relaxed">{d}</li>
                ))}
              </ul>
            </div>

            {selectedProject.troubleshooting && (
              <div className="space-y-2 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <h3 className="font-bold text-sm text-[#3182F6] flex items-center gap-1.5">
                  <Bug className="w-4 h-4" /> 문제 해결 (Troubleshooting)
                </h3>
                {selectedProject.troubleshooting.map((t, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="text-sm font-bold text-gray-800">{t.title}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{t.desc}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end pt-2">
              {selectedProject.githubUrl && (
                <a 
                  href={selectedProject.githubUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
                >
                  Repository 보러가기
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-gray-100 py-8 text-center text-xs text-gray-400">
        © 2026 Shin Hyewon. Built with React & Tailwind CSS.
      </footer>
    </div>
  );
}