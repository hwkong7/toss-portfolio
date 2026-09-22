'use client';

import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Bug, Layers, FileText, FlaskConical, ArrowUpRight, X, Copy, Check, Moon, Sun } from 'lucide-react';
import Image from 'next/image';

const EMAIL = 'hwkong7_@naver.com';
import { projects, type Project } from './projects';

const values = [
  {
    icon: Bug,
    label: 'Debugging',
    title: '원인을 근거로 좁혀갑니다',
    desc: '로그와 응답을 직접 확인해 지연인지, 단절인지, 상태가 꼬인 것인지 구분합니다. 추측으로 고치면 같은 문제가 다시 돌아온다고 생각합니다.',
    tone: 'bg-accent-softer text-accent',
  },
  {
    icon: Layers,
    label: 'Abstraction',
    title: '반복되는 판단은 한곳으로 모읍니다',
    desc: '같은 처리를 여러 화면에 흩어두면 화면이 늘어날수록 같은 고민을 반복하게 됩니다. 공통 훅이나 모듈로 옮겨 기준을 하나만 두려고 합니다.',
    tone: 'bg-[#F3F1FF] text-[#7C5CFF] dark:bg-[#7C5CFF]/15 dark:text-[#A48CFF]',
  },
  {
    icon: FlaskConical,
    label: 'Testing',
    title: '실패하는 경로를 먼저 덮습니다',
    desc: '네트워크 오류 구분, 무효해진 로컬 상태 복구처럼 화면에서 재현하기 번거로운 로직을 Vitest로 고정합니다.',
    tone: 'bg-[#EDF9F0] text-[#12A66B] dark:bg-[#12A66B]/15 dark:text-[#3DD68C]',
  },
  {
    icon: FileText,
    label: 'Documentation',
    title: '만들기 전에 구조를 적습니다',
    desc: 'API 명세와 데이터 흐름을 먼저 정리해 설계서로 남깁니다. 어떤 값이 어디서 와서 어디로 가는지 아는 상태에서 시작합니다.',
    tone: 'bg-[#FFF6E5] text-[#F59E0B] dark:bg-[#F59E0B]/15 dark:text-[#FBBF4A]',
  },
];

type Tech = { name: string; color: string; match: string[] };

/**
 * 기술 스택. match는 projects.ts의 techStack 표기와 맞춘다.
 * 사용한 프로젝트 수는 하드코딩하지 않고 프로젝트 데이터에서 계산한다.
 */
const techGroups: { label: string; items: Tech[] }[] = [
  {
    label: 'Frontend',
    items: [
      { name: 'React', color: '#149ECA', match: ['React 19'] },
      { name: 'TypeScript', color: '#3178C6', match: ['TypeScript'] },
      { name: 'Next.js', color: '#8B95A1', match: ['Next.js 16'] },
      { name: 'Tailwind CSS', color: '#38BDF8', match: ['Tailwind CSS'] },
      { name: 'Zustand', color: '#E2A23B', match: ['Zustand'] },
      { name: 'React Query', color: '#FF4154', match: ['React-Query'] },
      { name: 'Vite', color: '#9B6BFF', match: ['Vite'] },
    ],
  },
  {
    label: 'Mobile · Desktop',
    items: [
      { name: 'React Native', color: '#61DAFB', match: ['React Native (Expo)'] },
      { name: 'Flutter', color: '#02569B', match: ['Flutter'] },
      { name: 'Electron', color: '#47848F', match: ['Electron'] },
    ],
  },
  {
    label: 'Backend · Infra',
    items: [
      { name: 'Supabase', color: '#3ECF8E', match: ['Supabase'] },
      { name: 'Firebase', color: '#FFCA28', match: ['Firebase'] },
      { name: 'FastAPI', color: '#009688', match: ['FastAPI'] },
      { name: 'MySQL', color: '#4479A1', match: ['MySQL'] },
      { name: 'Vercel', color: '#8B95A1', match: ['Vercel Functions'] },
    ],
  },
  {
    label: 'Testing',
    items: [{ name: 'Vitest', color: '#6E9F18', match: ['Vitest'] }],
  },
];

const allTech = techGroups.flatMap((g) => g.items);
const usesTech = (p: Project, tech: Tech) => p.techStack.some((t) => tech.match.includes(t));

const navItems = [
  { id: 'about', label: '소개' },
  { id: 'values', label: '일하는 방식' },
  { id: 'stack', label: '기술' },
  { id: 'projects', label: '프로젝트' },
  { id: 'logs', label: '문제 해결' },
  { id: 'credentials', label: '그 외 이력' },
];

const credentials = [
  {
    year: '2026.03 – 06',
    title: '2026 한국정보기술학회 하계 종합학술대회 논문 게재',
    detail:
      '「웹 서비스 보안 점검을 위한 CVE 기반 웹 취약점 진단 도구」 공동저자(제2저자) · 캡스톤디자인 — CVE와 OWASP Top 10 기반 PoC 점검 시스템',
  },
  {
    year: '2025.06',
    title: '2025 한국정보기술학회 하계 종합학술대회 논문경진대회 은상',
    detail: '「Unity 엔진 기반 외계 행성 내 생존 어드벤처 게임 개발」 공동저자',
  },
  {
    year: '2025.07',
    title: '네이버 커넥트재단 부스트캠프 웹·모바일 베이직 과정 수료',
    detail: '',
  },
  {
    year: '',
    title: '국립금오공과대학교 컴퓨터공학부',
    detail: '재학 · 2027.02 졸업 예정',
  },
];

const logs = [
  {
    tag: 'Debugging',
    title: '앱이 반복해서 종료되던 원인 찾기',
    body: '실디바이스 테스트 중 앱이 계속 꺼졌지만 화면만으로는 원인을 알 수 없었습니다. Logcat 전체 로그를 모아 분석해 네트워크 요청 타이밍, 상태 초기화 누락, 잘못된 값 전달 예외 세 가지를 각각 확인하고 수정했습니다.',
  },
  {
    tag: 'Git',
    title: '잘못된 병합 상태에서 작업 복구하기',
    body: '여러 브랜치를 병합하다 충돌과 함께 의도하지 않은 커밋 상태가 만들어졌습니다. 충돌 파일만 고쳐서는 이전 상태로 돌아갈 수 없어, git reflog로 HEAD가 움직인 이력을 따라가며 병합 직전의 정상 커밋을 찾았습니다. 그 시점으로 작업 상태를 되돌린 뒤 브랜치를 정리하고, 팀원들의 변경사항을 다시 확인하며 병합했습니다.',
  },
  {
    tag: 'Data Consistency',
    title: '동시에 예매하면 좌석 수가 어긋날 수 있던 문제',
    body: '잔여 좌석을 읽고 그 값을 빼서 다시 쓰는 방식이면, 두 사람이 동시에 예매할 때 한쪽의 감소가 덮어써질 수 있었습니다. Firestore Transaction 안에서 최신 값을 다시 읽고 감소시키도록 바꾸고, 예약 인원이 잔여 좌석보다 많은 경우를 먼저 막았습니다.',
  },
  {
    tag: 'Error Handling',
    title: '장애 원인이 화면에서 구분되지 않던 문제',
    body: '백엔드 콜드스타트로 첫 응답이 수십 초까지 지연되는 환경에서, 비밀번호 오류와 네트워크 타임아웃이 같은 문구로 표시됐습니다. 응답 status가 없는 경우와 서버가 반환한 오류를 나눠 안내하도록 분기하고, 그 로직을 순수 함수로 분리해 테스트로 고정했습니다.',
  },
];

export default function PortfolioPage() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [techFilter, setTechFilter] = useState<Tech | null>(null);
  const active = useActiveSection(navItems.map((n) => n.id));

  // 상단 스크롤 진행률 바
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  const visibleProjects = techFilter ? projects.filter((p) => usesTech(p, techFilter)) : projects;

  const pickTech = (tech: Tech) => {
    setTechFilter((cur) => (cur?.name === tech.name ? null : tech));
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  // 모달은 Esc로도 닫을 수 있어야 하고, 열려 있는 동안 뒤 배경이 스크롤되면 안 된다.
  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [selected]);

  return (
    <div className="min-h-screen bg-bg text-fg antialiased">
      <header className="print-hidden sticky top-0 z-40 border-b border-line bg-bg/85 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[15px] font-bold tracking-tight">신혜원 포트폴리오</span>
            <span className="sm:hidden">
              <ThemeToggle />
            </span>
          </div>
          <div className="flex min-w-0 items-center gap-4">
            {/* 좁은 화면에서는 숨기지 않고 가로로 넘겨서 본다 */}
            <nav className="-mx-6 flex min-w-0 gap-1 overflow-x-auto px-6 text-[14px] font-medium [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
              {navItems.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  aria-current={active === n.id ? 'true' : undefined}
                  className={`relative shrink-0 whitespace-nowrap rounded-lg px-2.5 py-1.5 transition-colors ${
                    active === n.id ? 'text-fg' : 'text-fg3 hover:text-fg'
                  }`}
                >
                  {active === n.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-lg bg-chip"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {n.label}
                </a>
              ))}
            </nav>
            <span className="hidden sm:inline-flex">
              <ThemeToggle />
            </span>
          </div>
        </div>
        <motion.div
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent"
          aria-hidden="true"
        />
      </header>

      <main className="mx-auto max-w-4xl px-6 pb-24">
        {/* 소개 */}
        <section id="about" className="scroll-mt-16 print-block grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="min-w-0">
          <p className="rise text-[15px] font-semibold text-accent">Frontend Developer</p>

          <h1
            style={{ animationDelay: '0.08s' }}
            className="rise mt-4 text-[28px] font-extrabold leading-[1.3] tracking-[-0.03em] break-keep sm:text-[38px] md:text-[52px]"
          >
            복잡한 요구사항을
            <br />
            단순한 구조로 만듭니다.
          </h1>

          <p
            style={{ animationDelay: '0.16s' }}
            className="rise mt-7 max-w-[38rem] text-[17px] leading-[1.75] text-fg2"
          >
            React와 TypeScript로 웹을 만듭니다. 화면이 잘 될 때만큼{' '}
            <strong className="font-semibold text-fg">네트워크가 끊기거나 저장된 상태가 서버와 어긋났을 때</strong>{' '}
            어떻게 동작할지를 같이 설계하는 편입니다. 최근에는 그런 처리를 테스트로 고정하는 데 관심이 있습니다.
          </p>

          <div style={{ animationDelay: '0.24s' }} className="rise mt-9 flex flex-wrap gap-2.5">
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="https://github.com/hwkong7"
              target="_blank"
              rel="noreferrer"
              className="print-url inline-flex items-center gap-2 rounded-xl bg-fg px-5 py-3 text-[15px] font-semibold text-bg"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
              GitHub
            </motion.a>
            <CopyEmail />
          </div>
          </div>

          <div style={{ animationDelay: '0.3s' }} className="rise print-block min-w-0">
            <ProjectCollage />
          </div>
        </section>

        <TechMarquee />

        {/* 일하는 방식 */}
        <Section id="values" eyebrow="How I Work" title="이런 기준으로 개발합니다">
          <div className="grid gap-3 sm:grid-cols-2">
            {values.map((v, i) => (
              <div
                key={v.title}
                style={{ animationDelay: `${i * 0.06}s` }}
                className="rise rise-scroll print-block rounded-2xl bg-muted p-7"
              >
                <div className={`inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 ${v.tone}`}>
                  <v.icon className="h-4 w-4" aria-hidden="true" />
                  <span className="text-[12px] font-bold tracking-wide">{v.label}</span>
                </div>
                <h3 className="mt-4 text-[17px] font-bold tracking-tight">{v.title}</h3>
                <p className="mt-2.5 text-[15px] leading-[1.7] text-fg2">{v.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 기술 스택 */}
        <Section id="stack" eyebrow="Tech Stack" title="이런 기술로 만들어요">
          <p className="print-hidden -mt-4 mb-6 text-[15px] text-fg3">
            기술을 누르면 그 기술을 쓴 프로젝트만 모아볼 수 있어요.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {techGroups.map((g, gi) => (
              <div
                key={g.label}
                style={{ animationDelay: `${gi * 0.06}s` }}
                className="rise rise-scroll print-block rounded-2xl bg-muted p-6"
              >
                <p className="text-[13px] font-bold tracking-wide text-fg3">{g.label}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((t) => {
                    const count = projects.filter((p) => usesTech(p, t)).length;
                    const on = techFilter?.name === t.name;
                    return (
                      <motion.button
                        key={t.name}
                        type="button"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => pickTech(t)}
                        aria-pressed={on}
                        aria-label={`${t.name}, 프로젝트 ${count}개 보기`}
                        className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-[14px] font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                          on ? 'bg-fg text-bg' : 'bg-card text-fg shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-none'
                        }`}
                      >
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: t.color }} aria-hidden="true" />
                        {t.name}
                        <span className={`text-[12px] font-medium ${on ? 'text-bg/60' : 'text-fg3'}`}>{count}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 프로젝트 */}
        <Section id="projects" eyebrow="Projects" title="만든 것들">
          <p className="print-hidden -mt-4 mb-6 text-[15px] text-fg3">
            카드를 누르면 맡은 역할과 문제 해결 과정을 볼 수 있어요.
          </p>

          {techFilter && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="print-hidden mb-4 flex items-center justify-between gap-3 rounded-xl bg-accent-softer px-4 py-3"
            >
              <p className="text-[14px] text-fg2">
                <span className="font-bold text-accent">{techFilter.name}</span> 사용 프로젝트 {visibleProjects.length}개
              </p>
              <button
                type="button"
                onClick={() => setTechFilter(null)}
                className="rounded-lg px-2.5 py-1 text-[13px] font-semibold text-fg2 transition-colors hover:bg-card"
              >
                전체 보기
              </button>
            </motion.div>
          )}

          <div className="print-hidden grid gap-3 sm:grid-cols-2">
            {visibleProjects.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelected(p)}
                aria-label={`${p.title} 상세 보기`}
                style={{ animationDelay: `${i * 0.05}s` }}
                className="rise rise-scroll group flex w-full min-w-0 flex-col rounded-2xl bg-card p-7 text-left shadow-[0_1px_3px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.04)] transition-[box-shadow,transform] duration-200 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.10)] active:translate-y-0 active:scale-[0.985] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg dark:shadow-none dark:ring-1 dark:ring-white/[0.06] dark:hover:ring-white/[0.12]"
              >
                <div className="print-hidden relative -mx-7 -mt-7 mb-6 h-[150px] overflow-hidden rounded-t-2xl">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 420px"
                      className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className={`h-full w-full bg-gradient-to-br ${p.cover ?? 'from-[#F2F4F6] to-[#E5E8EB]'}`}>
                      <span className="absolute bottom-4 left-6 text-[52px] font-extrabold leading-none text-white/70">
                        {p.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {p.badge && (
                  <span className="mb-3 self-start rounded-md bg-accent-soft px-2 py-1 text-[12px] font-bold text-accent">
                    {p.badge}
                  </span>
                )}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[20px] font-bold tracking-tight">{p.title}</h3>
                  <ArrowUpRight
                    className="mt-1 h-5 w-5 shrink-0 text-fg4 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-1 text-[14px] text-fg3">{p.subtitle} · {p.period}</p>
                <p className="mt-4 flex-1 text-[15px] leading-[1.7] text-fg2">{p.summary}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.techStack.map((t) => (
                    <span
                      key={t}
                      className={`rounded-md px-2 py-1 text-[12px] font-medium ${
                        techFilter?.match.includes(t) ? 'bg-accent-soft text-accent' : 'bg-chip text-fg2'
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          {/* 인쇄(PDF)에서는 모달을 열 수 없으므로 상세 내용을 펼쳐서 출력한다 */}
          <div className="hidden space-y-5 print:block">
            {projects.map((p) => (
              <article key={p.id} className="print-block rounded-xl border border-[#E5E8EB] p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[17px] font-bold">{p.title}</h3>
                  <span className="text-[11px] text-fg3">{p.period}</span>
                </div>
                <p className="mt-1 text-[13px] text-fg2">
                  {p.subtitle}
                  {p.badge ? ` · ${p.badge}` : ''}
                </p>
                <p className="mt-2 text-[13px] leading-[1.7] text-fg">{p.summary}</p>
                {p.image && (
                  <img src={p.image} alt="" className="mt-3 w-[62%] rounded-lg border border-[#E5E8EB]" />
                )}
                <p className="mt-2 text-[12px] text-fg2">
                  <span className="font-bold">담당 역할 </span>
                  {p.role}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {p.techStack.map((t) => (
                    <span key={t} className="rounded bg-chip px-1.5 py-0.5 text-[10px] text-fg2">{t}</span>
                  ))}
                </div>
                <ul className="mt-3 list-outside list-disc space-y-1 pl-4 text-[12px] leading-[1.7] text-fg2">
                  {p.details.map((d, idx) => (
                    <li key={idx}>{d}</li>
                  ))}
                </ul>
                {p.troubleshooting?.map((t, idx) => (
                  <div key={idx} className="mt-3 rounded-lg bg-accent-softer p-3">
                    <p className="text-[12px] font-bold text-accent">문제 해결 · {t.title}</p>
                    <p className="mt-1 text-[11px] leading-[1.7] text-fg2">{t.desc}</p>
                  </div>
                ))}
                {p.githubUrl && (
                  <p className="mt-3 break-all text-[10px] text-fg3">Repository: {p.githubUrl}</p>
                )}
              </article>
            ))}
          </div>
        </Section>

        {/* 문제 해결 기록 */}
        <Section id="logs" eyebrow="Troubleshooting" title="막혔던 순간들">
          <div className="space-y-3">
            {logs.map((l, i) => (
              <div
                key={l.title}
                style={{ animationDelay: `${i * 0.06}s` }}
                className="rise rise-scroll print-block rounded-2xl bg-muted p-7"
              >
                <span className="text-[13px] font-bold text-accent">{l.tag}</span>
                <h3 className="mt-2 text-[18px] font-bold tracking-tight">{l.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.75] text-fg2">{l.body}</p>
              </div>
            ))}
          </div>
        </Section>
        {/* 교육 · 수상 */}
        <Section id="credentials" eyebrow="Education & Awards" title="그 외 이력">
          <ul className="divide-y divide-line">
            {credentials.map((c) => (
              <li key={c.title} className="print-block flex gap-4 py-4">
                <span className="w-12 shrink-0 pt-0.5 text-[14px] font-semibold text-fg3">
                  {c.year}
                </span>
                <span className="min-w-0">
                  <span className="block text-[16px] font-bold">{c.title}</span>
                  {c.detail && (
                    <span className="mt-1 block text-[14px] leading-[1.6] text-fg2">{c.detail}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      </main>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 backdrop-blur-[2px] sm:items-center sm:p-6"
          onClick={() => setSelected(null)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-card p-7 sm:rounded-3xl"
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="닫기"
              className="absolute right-5 top-5 rounded-full p-1.5 text-fg3 transition-colors hover:bg-chip hover:text-fg"
            >
              <X className="h-5 w-5" />
            </button>

            {selected.image && (
              <div className="relative -mx-7 -mt-7 mb-6 h-[220px] overflow-hidden rounded-t-3xl">
                <Image src={selected.image} alt="" fill sizes="576px" className="object-cover object-center" />
              </div>
            )}

            {selected.badge && (
              <span className="inline-block rounded-md bg-accent-soft px-2 py-1 text-[12px] font-bold text-accent">
                {selected.badge}
              </span>
            )}
            <h2 id="modal-title" className="mt-3 text-[26px] font-extrabold tracking-tight">
              {selected.title}
            </h2>
            <p className="mt-1 text-[14px] text-fg3">
              {selected.subtitle} · {selected.period}
            </p>

            <div className="mt-6 rounded-2xl bg-muted p-5">
              <p className="text-[13px] font-bold text-fg3">담당 역할</p>
              <p className="mt-1.5 text-[15px] leading-[1.7] text-fg">{selected.role}</p>
            </div>

            <h3 className="mt-7 text-[15px] font-bold">한 일</h3>
            <ul className="mt-3 space-y-2.5">
              {selected.details.map((d, idx) => (
                <li key={idx} className="flex gap-2.5 text-[15px] leading-[1.7] text-fg2">
                  <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-fg4" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>

            {selected.troubleshooting?.map((t, idx) => (
              <div key={idx} className="mt-6 rounded-2xl bg-accent-softer p-5">
                <p className="text-[13px] font-bold text-accent">문제 해결</p>
                <p className="mt-1.5 text-[15px] font-bold">{t.title}</p>
                <p className="mt-2 text-[14px] leading-[1.75] text-fg2">{t.desc}</p>
              </div>
            ))}

            {selected.githubUrl && (
              <motion.a
                whileTap={{ scale: 0.98 }}
                href={selected.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-7 flex items-center justify-center gap-2 rounded-xl bg-fg px-5 py-3.5 text-[15px] font-semibold text-bg"
              >
                저장소 보러가기 <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </motion.a>
            )}
          </motion.div>
        </div>
      )}

      <footer className="print-hidden border-t border-line py-10 text-center text-[13px] text-fg3">
        신혜원 · hwkong7_@naver.com
      </footer>
    </div>
  );
}

/** 섹션 제목 묶음 — 작은 라벨 + 큰 제목 */
function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-16 border-t border-line py-14 sm:py-20">
      <div className="rise rise-scroll mb-8">
        <p className="text-[14px] font-semibold text-accent">{eyebrow}</p>
        <h2 className="mt-2 text-[24px] font-extrabold tracking-[-0.02em] break-keep sm:text-[32px]">{title}</h2>
      </div>
      {children}
    </section>
  );
}

/** 메일 앱이 없어도 주소를 바로 쓸 수 있도록 복사 버튼으로 제공한다 */
function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // 클립보드가 막힌 환경에서는 메일 앱으로 넘긴다
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <span className="inline-flex max-w-full flex-wrap items-center gap-1 rounded-xl bg-chip p-1">
      <button
        type="button"
        onClick={copy}
        aria-label={`이메일 주소 ${EMAIL} 복사하기`}
        className="inline-flex max-w-full items-center gap-2 break-all rounded-lg px-4 py-2 text-left text-[14px] font-semibold text-fg2 transition-colors hover:bg-card active:scale-[0.98] sm:text-[15px]"
      >
        {copied ? (
          <Check className="h-4 w-4 text-[#12A66B] dark:text-[#3DD68C]" aria-hidden="true" />
        ) : (
          <Copy className="h-4 w-4" aria-hidden="true" />
        )}
        {EMAIL}
      </button>
      <a
        href={`mailto:${EMAIL}`}
        className="print-hidden rounded-lg px-3 py-2 text-[14px] font-semibold text-fg3 transition-colors hover:bg-card hover:text-fg2"
      >
        메일 쓰기
      </a>
      <span aria-live="polite" className="sr-only">
        {copied ? '이메일 주소를 복사했습니다' : ''}
      </span>
    </span>
  );
}

/**
 * 소개 영역 표지.
 * 아래에서 소개할 프로젝트 화면들을 겹쳐 보여준다.
 * 추상적인 장식 대신 실제로 만든 것을 첫 화면에 두기 위한 구성.
 */
function ProjectCollage() {
  const shots = projects.filter((p) => p.image).slice(0, 6);
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // 스크롤할수록 두 열이 서로 반대로 흘러, 페이지가 움직이고 있다는 감각을 준다
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const up = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const down = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40]);

  return (
    <div ref={ref} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#F4F8FF] via-[#EEF2FF] to-[#F8F4FF] dark:from-[#141B2B] dark:via-[#16172A] dark:to-[#1C1628] p-6 sm:p-8">
      <div className="grid grid-cols-2 gap-3">
        {shots.map((p, i) => (
          <motion.div key={p.id} style={{ y: i % 2 === 0 ? up : down }} className="min-w-0">
          <div
            style={{ animationDelay: `${0.35 + i * 0.07}s` }}
            className={`rise min-w-0 overflow-hidden rounded-xl bg-card shadow-[0_4px_14px_rgba(20,40,80,0.10)] ${
              i % 2 === 0 ? 'translate-y-0' : 'translate-y-4'
            }`}
          >
            {/* 표지용 장식이므로 스크린리더에서는 건너뛴다 */}
            <Image
              src={p.image as string}
              alt=""
              width={480}
              height={270}
              sizes="(max-width: 1024px) 45vw, 230px"
              className="h-auto w-full object-cover"
            />
          </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/** 화면 중앙 근처에 걸친 섹션을 현재 위치로 본다 */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return active;
}

/**
 * 다크모드 토글.
 * 첫 페인트 전 테마는 layout.tsx의 인라인 스크립트가 정하고, 여기서는 그 결과를 읽어온다.
 * 저장된 선택이 없으면 시스템 설정 변경을 따라간다.
 */
function ThemeToggle() {
  // <html>의 dark 클래스가 진실의 원천. 클래스 변화를 구독해 아이콘을 맞춘다.
  const dark = useSyncExternalStore(subscribeTheme, () => document.documentElement.classList.contains('dark'), () => null);

  // 직접 고른 적이 없다면 OS 설정이 바뀔 때 따라간다
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem('theme')) return;
      } catch {}
      applyTheme(e.matches);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = () => {
    const next = !dark;
    applyTheme(next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl text-fg2 transition-colors hover:bg-chip hover:text-fg"
    >
      {dark !== null && (
        <motion.span
          key={dark ? 'sun' : 'moon'}
          initial={{ y: 14, opacity: 0, rotate: -40 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 26 }}
        >
          {dark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
        </motion.span>
      )}
    </button>
  );
}

function subscribeTheme(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => mo.disconnect();
}

function applyTheme(dark: boolean) {
  const root = document.documentElement;
  root.classList.add('theme-switching');
  root.classList.toggle('dark', dark);
  root.style.colorScheme = dark ? 'dark' : 'light';
  window.setTimeout(() => root.classList.remove('theme-switching'), 350);
}

/** 소개 아래로 흐르는 기술 띠. 목록을 두 번 이어 붙여 끊김 없이 순환시킨다. */
function TechMarquee() {
  const names = allTech.map((t) => t);
  return (
    <div
      className="print-hidden relative -mx-6 overflow-hidden py-5 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
      aria-label={`사용 기술: ${names.map((t) => t.name).join(', ')}`}
      role="img"
    >
      <div className="marquee flex w-max">
        {[...names, ...names].map((t, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="flex items-center gap-2 whitespace-nowrap pr-9 text-[15px] font-semibold text-fg3"
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: t.color }} />
            {t.name}
          </span>
        ))}
      </div>
    </div>
  );
}