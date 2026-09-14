'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bug, Layers, FileText, FlaskConical, ArrowUpRight, X, Copy, Check } from 'lucide-react';
import Image from 'next/image';

const EMAIL = 'hwkong7_@naver.com';
import { projects, type Project } from './projects';

const values = [
  {
    icon: Bug,
    label: 'Debugging',
    title: '원인을 근거로 좁혀갑니다',
    desc: '로그와 응답을 직접 확인해 지연인지, 단절인지, 상태가 꼬인 것인지 구분합니다. 추측으로 고치면 같은 문제가 다시 돌아온다고 생각합니다.',
    tone: 'bg-[#F4F8FF] text-[#3182F6]',
  },
  {
    icon: Layers,
    label: 'Abstraction',
    title: '반복되는 판단은 한곳으로 모읍니다',
    desc: '같은 처리를 여러 화면에 흩어두면 화면이 늘어날수록 같은 고민을 반복하게 됩니다. 공통 훅이나 모듈로 옮겨 기준을 하나만 두려고 합니다.',
    tone: 'bg-[#F3F1FF] text-[#7C5CFF]',
  },
  {
    icon: FlaskConical,
    label: 'Testing',
    title: '실패하는 경로를 먼저 덮습니다',
    desc: '네트워크 오류 구분, 무효해진 로컬 상태 복구처럼 화면에서 재현하기 번거로운 로직을 Vitest로 고정합니다.',
    tone: 'bg-[#EDF9F0] text-[#12A66B]',
  },
  {
    icon: FileText,
    label: 'Documentation',
    title: '만들기 전에 구조를 적습니다',
    desc: 'API 명세와 데이터 흐름을 먼저 정리해 설계서로 남깁니다. 어떤 값이 어디서 와서 어디로 가는지 아는 상태에서 시작합니다.',
    tone: 'bg-[#FFF6E5] text-[#F59E0B]',
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
    <div className="min-h-screen bg-white text-[#191F28] antialiased">
      <header className="print-hidden sticky top-0 z-40 border-b border-[#F2F4F6] bg-white/85 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <span className="text-[15px] font-bold tracking-tight">신혜원 포트폴리오</span>
          <nav className="flex gap-5 text-[14px] font-medium text-[#8B95A1]">
            <a href="#about" className="transition-colors hover:text-[#191F28]">소개</a>
            <a href="#values" className="transition-colors hover:text-[#191F28]">일하는 방식</a>
            <a href="#projects" className="transition-colors hover:text-[#191F28]">프로젝트</a>
            <a href="#logs" className="transition-colors hover:text-[#191F28]">문제 해결</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 pb-24">
        {/* 소개 */}
        <section id="about" className="print-block grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
          <p className="rise text-[15px] font-semibold text-[#3182F6]">Frontend Developer</p>

          <h1
            style={{ animationDelay: '0.08s' }}
            className="rise mt-4 text-[38px] font-extrabold leading-[1.28] tracking-[-0.03em] sm:text-[52px]"
          >
            복잡한 요구사항을
            <br />
            단순한 구조로 만듭니다.
          </h1>

          <p
            style={{ animationDelay: '0.16s' }}
            className="rise mt-7 max-w-[38rem] text-[17px] leading-[1.75] text-[#4E5968]"
          >
            React와 TypeScript로 웹을 만듭니다. 화면이 잘 될 때만큼{' '}
            <strong className="font-semibold text-[#191F28]">네트워크가 끊기거나 저장된 상태가 서버와 어긋났을 때</strong>{' '}
            어떻게 동작할지를 같이 설계하는 편입니다. 최근에는 그런 처리를 테스트로 고정하는 데 관심이 있습니다.
          </p>

          <div style={{ animationDelay: '0.24s' }} className="rise mt-9 flex flex-wrap gap-2.5">
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="https://github.com/hwkong7"
              target="_blank"
              rel="noreferrer"
              className="print-url inline-flex items-center gap-2 rounded-xl bg-[#191F28] px-5 py-3 text-[15px] font-semibold text-white"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
              GitHub
            </motion.a>
            <CopyEmail />
          </div>
          </div>

          <div style={{ animationDelay: '0.3s' }} className="rise print-block">
            <StateSyncArt />
          </div>
        </section>

        {/* 일하는 방식 */}
        <Section id="values" eyebrow="How I Work" title="이런 기준으로 개발합니다">
          <div className="grid gap-3 sm:grid-cols-2">
            {values.map((v, i) => (
              <div
                key={v.title}
                style={{ animationDelay: `${i * 0.06}s` }}
                className="rise rise-scroll print-block rounded-2xl bg-[#F9FAFB] p-7"
              >
                <div className={`inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 ${v.tone}`}>
                  <v.icon className="h-4 w-4" aria-hidden="true" />
                  <span className="text-[12px] font-bold tracking-wide">{v.label}</span>
                </div>
                <h3 className="mt-4 text-[17px] font-bold tracking-tight">{v.title}</h3>
                <p className="mt-2.5 text-[15px] leading-[1.7] text-[#4E5968]">{v.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 프로젝트 */}
        <Section id="projects" eyebrow="Projects" title="만든 것들">
          <p className="print-hidden -mt-4 mb-6 text-[15px] text-[#8B95A1]">
            카드를 누르면 맡은 역할과 문제 해결 과정을 볼 수 있어요.
          </p>

          <div className="print-hidden grid gap-3 sm:grid-cols-2">
            {projects.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelected(p)}
                aria-label={`${p.title} 상세 보기`}
                style={{ animationDelay: `${i * 0.05}s` }}
                className="rise rise-scroll group flex w-full flex-col rounded-2xl bg-white p-7 text-left shadow-[0_1px_3px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.04)] transition-[box-shadow,transform] duration-200 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.10)] active:translate-y-0 active:scale-[0.985] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3182F6] focus-visible:ring-offset-2"
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
                  <span className="mb-3 self-start rounded-md bg-[#E8F3FF] px-2 py-1 text-[12px] font-bold text-[#3182F6]">
                    {p.badge}
                  </span>
                )}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[20px] font-bold tracking-tight">{p.title}</h3>
                  <ArrowUpRight
                    className="mt-1 h-5 w-5 shrink-0 text-[#C4CBD3] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#3182F6]"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-1 text-[14px] text-[#8B95A1]">{p.subtitle} · {p.period}</p>
                <p className="mt-4 flex-1 text-[15px] leading-[1.7] text-[#4E5968]">{p.summary}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.techStack.map((t) => (
                    <span key={t} className="rounded-md bg-[#F2F4F6] px-2 py-1 text-[12px] font-medium text-[#6B7684]">
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
                  <span className="text-[11px] text-[#8B95A1]">{p.period}</span>
                </div>
                <p className="mt-1 text-[13px] text-[#4E5968]">
                  {p.subtitle}
                  {p.badge ? ` · ${p.badge}` : ''}
                </p>
                <p className="mt-2 text-[13px] leading-[1.7] text-[#191F28]">{p.summary}</p>
                {p.image && (
                  <img src={p.image} alt="" className="mt-3 w-[62%] rounded-lg border border-[#E5E8EB]" />
                )}
                <p className="mt-2 text-[12px] text-[#4E5968]">
                  <span className="font-bold">담당 역할 </span>
                  {p.role}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {p.techStack.map((t) => (
                    <span key={t} className="rounded bg-[#F2F4F6] px-1.5 py-0.5 text-[10px] text-[#4E5968]">{t}</span>
                  ))}
                </div>
                <ul className="mt-3 list-outside list-disc space-y-1 pl-4 text-[12px] leading-[1.7] text-[#4E5968]">
                  {p.details.map((d, idx) => (
                    <li key={idx}>{d}</li>
                  ))}
                </ul>
                {p.troubleshooting?.map((t, idx) => (
                  <div key={idx} className="mt-3 rounded-lg bg-[#F4F8FF] p-3">
                    <p className="text-[12px] font-bold text-[#3182F6]">문제 해결 · {t.title}</p>
                    <p className="mt-1 text-[11px] leading-[1.7] text-[#4E5968]">{t.desc}</p>
                  </div>
                ))}
                {p.githubUrl && (
                  <p className="mt-3 break-all text-[10px] text-[#8B95A1]">Repository: {p.githubUrl}</p>
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
                className="rise rise-scroll print-block rounded-2xl bg-[#F9FAFB] p-7"
              >
                <span className="text-[13px] font-bold text-[#3182F6]">{l.tag}</span>
                <h3 className="mt-2 text-[18px] font-bold tracking-tight">{l.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.75] text-[#4E5968]">{l.body}</p>
              </div>
            ))}
          </div>
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
            className="relative max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-white p-7 sm:rounded-3xl"
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="닫기"
              className="absolute right-5 top-5 rounded-full p-1.5 text-[#8B95A1] transition-colors hover:bg-[#F2F4F6] hover:text-[#191F28]"
            >
              <X className="h-5 w-5" />
            </button>

            {selected.image && (
              <div className="relative -mx-7 -mt-7 mb-6 h-[220px] overflow-hidden rounded-t-3xl">
                <Image src={selected.image} alt="" fill sizes="576px" className="object-cover object-center" />
              </div>
            )}

            {selected.badge && (
              <span className="inline-block rounded-md bg-[#E8F3FF] px-2 py-1 text-[12px] font-bold text-[#3182F6]">
                {selected.badge}
              </span>
            )}
            <h2 id="modal-title" className="mt-3 text-[26px] font-extrabold tracking-tight">
              {selected.title}
            </h2>
            <p className="mt-1 text-[14px] text-[#8B95A1]">
              {selected.subtitle} · {selected.period}
            </p>

            <div className="mt-6 rounded-2xl bg-[#F9FAFB] p-5">
              <p className="text-[13px] font-bold text-[#8B95A1]">담당 역할</p>
              <p className="mt-1.5 text-[15px] leading-[1.7] text-[#191F28]">{selected.role}</p>
            </div>

            <h3 className="mt-7 text-[15px] font-bold">한 일</h3>
            <ul className="mt-3 space-y-2.5">
              {selected.details.map((d, idx) => (
                <li key={idx} className="flex gap-2.5 text-[15px] leading-[1.7] text-[#4E5968]">
                  <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#C4CBD3]" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>

            {selected.troubleshooting?.map((t, idx) => (
              <div key={idx} className="mt-6 rounded-2xl bg-[#F4F8FF] p-5">
                <p className="text-[13px] font-bold text-[#3182F6]">문제 해결</p>
                <p className="mt-1.5 text-[15px] font-bold">{t.title}</p>
                <p className="mt-2 text-[14px] leading-[1.75] text-[#4E5968]">{t.desc}</p>
              </div>
            ))}

            {selected.githubUrl && (
              <motion.a
                whileTap={{ scale: 0.98 }}
                href={selected.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-7 flex items-center justify-center gap-2 rounded-xl bg-[#191F28] px-5 py-3.5 text-[15px] font-semibold text-white"
              >
                저장소 보러가기 <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </motion.a>
            )}
          </motion.div>
        </div>
      )}

      <footer className="print-hidden border-t border-[#F2F4F6] py-10 text-center text-[13px] text-[#8B95A1]">
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
    <section id={id} className="border-t border-[#F2F4F6] py-14 sm:py-20">
      <div className="rise rise-scroll mb-8">
        <p className="text-[14px] font-semibold text-[#3182F6]">{eyebrow}</p>
        <h2 className="mt-2 text-[28px] font-extrabold tracking-[-0.02em] sm:text-[32px]">{title}</h2>
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
    <span className="inline-flex items-center gap-1 rounded-xl bg-[#F2F4F6] p-1">
      <button
        type="button"
        onClick={copy}
        aria-label={`이메일 주소 ${EMAIL} 복사하기`}
        className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[15px] font-semibold text-[#4E5968] transition-colors hover:bg-white active:scale-[0.98]"
      >
        {copied ? (
          <Check className="h-4 w-4 text-[#12A66B]" aria-hidden="true" />
        ) : (
          <Copy className="h-4 w-4" aria-hidden="true" />
        )}
        {EMAIL}
      </button>
      <a
        href={`mailto:${EMAIL}`}
        className="print-hidden rounded-lg px-3 py-2 text-[14px] font-semibold text-[#8B95A1] transition-colors hover:bg-white hover:text-[#4E5968]"
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
 * 저장된 상태가 서버와 어긋났을 때 첫 화면으로 되돌리는 흐름을 도식으로 그렸다.
 * 장식이면서 동시에 아래 프로젝트에서 반복되는 주제를 미리 보여주는 역할을 한다.
 */
function StateSyncArt() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#F4F8FF] via-[#EEF4FF] to-[#F7F3FF] p-8">
      <svg viewBox="0 0 340 260" className="h-auto w-full" role="img" aria-label="저장된 상태와 서버 상태가 어긋났을 때 첫 화면으로 복구되는 흐름 도식">
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 z" fill="#B0C4E4" />
          </marker>
        </defs>

        {/* 로컬 */}
        <rect x="14" y="26" width="132" height="86" rx="16" fill="#fff" />
        <text x="32" y="54" fontSize="12" fontWeight="700" fill="#8B95A1">저장된 상태</text>
        <rect x="32" y="66" width="76" height="9" rx="4.5" fill="#D9E5F7" />
        <rect x="32" y="83" width="52" height="9" rx="4.5" fill="#E8EEF7" />

        {/* 서버 */}
        <rect x="194" y="26" width="132" height="86" rx="16" fill="#fff" />
        <text x="212" y="54" fontSize="12" fontWeight="700" fill="#8B95A1">서버 상태</text>
        <rect x="212" y="66" width="60" height="9" rx="4.5" fill="#E8EEF7" />
        <rect x="212" y="83" width="80" height="9" rx="4.5" fill="#E8EEF7" />

        {/* 어긋남 */}
        <line x1="152" y1="69" x2="188" y2="69" stroke="#B0C4E4" strokeWidth="2" strokeDasharray="5 5" />
        <circle cx="170" cy="69" r="13" fill="#fff" />
        <path d="M170 62 v8" stroke="#F04452" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="170" cy="75.5" r="1.5" fill="#F04452" />

        {/* 복구 화살표 */}
        <path
          d="M80 120 V150 Q80 166 96 166 H244 Q260 166 260 150 V120"
          fill="none"
          stroke="#B0C4E4"
          strokeWidth="2"
          markerEnd="url(#arrow)"
        />

        {/* 복구 결과 */}
        <rect x="60" y="186" width="220" height="54" rx="16" fill="#3182F6" />
        <text x="170" y="210" fontSize="13" fontWeight="700" fill="#fff" textAnchor="middle">
          첫 화면으로 되돌리기
        </text>
        <text x="170" y="228" fontSize="11" fill="#CFE0FF" textAnchor="middle">
          사용자가 스스로 복구할 수 있게
        </text>
      </svg>
    </div>
  );
}
