import {
  TeamId,
  RoundId,
  RoundStatus,
  ROUND_ORDER,
  CompetitionState,
  SubmissionRecord,
  RoundTimerState
} from './types';
import { ROUND_SPECS } from './competitionData';

const STORAGE_KEY = 'fcf_competition_state_v2';
const LEGACY_STORAGE_KEY = 'fcf_competition_state_v1';

export function getInitialTimerState(roundId: RoundId): RoundTimerState {
  return {
    roundId,
    started: false,
    startDatetime: null,
    endDatetime: null,
    submitted: false,
    submissionDatetime: null,
    submissionType: null,
    timeOver: false,
    elapsedSeconds: 0
  };
}

export function getRoundStatus(
  roundId: RoundId,
  timers: Record<RoundId, RoundTimerState>,
  submissions: SubmissionRecord[]
): RoundStatus {
  if (timers[roundId]?.submitted || submissions.some((s) => s.roundId === roundId)) {
    return 'SUBMITTED';
  }

  const idx = ROUND_ORDER.indexOf(roundId);
  if (idx === 0) {
    return 'ACTIVE';
  }

  const prevRoundId = ROUND_ORDER[idx - 1];
  const isPrevSubmitted =
    timers[prevRoundId]?.submitted || submissions.some((s) => s.roundId === prevRoundId);

  if (isPrevSubmitted) {
    return 'ACTIVE';
  }

  return 'LOCKED';
}

export function getInitialState(): CompetitionState {
  const defaultTimers: Record<RoundId, RoundTimerState> = {
    round1_a: getInitialTimerState('round1_a'),
    round1_b: getInitialTimerState('round1_b'),
    round2: getInitialTimerState('round2'),
    round3: getInitialTimerState('round3')
  };

  const defaultEditorCode: Record<RoundId, string> = {
    round1_a: ROUND_SPECS.round1_a.starterCode,
    round1_b: ROUND_SPECS.round1_b.starterCode,
    round2: ROUND_SPECS.round2.starterCode,
    round3: ROUND_SPECS.round3.starterCode
  };

  const defaultStandardInput: Record<RoundId, string> = {
    round1_a: ROUND_SPECS.round1_a.sampleInput,
    round1_b: ROUND_SPECS.round1_b.sampleInput,
    round2: ROUND_SPECS.round2.sampleInput,
    round3: ROUND_SPECS.round3.sampleInput
  };

  const defaultAttempts: Record<RoundId, number> = {
    round1_a: 0,
    round1_b: 0,
    round2: 0,
    round3: 0
  };

  return {
    selectedTeam: null,
    activeRoundId: 'round1_a',
    timers: defaultTimers,
    editorCode: defaultEditorCode,
    standardInput: defaultStandardInput,
    attempts: defaultAttempts,
    submissions: [],
    powerCardEffects: {
      shieldActive: false,
      freezeUntil: null,
      flashbangConstraint: null,
      timeAdjustSeconds: 0,
      history: []
    }
  };
}

export function processExpiredTimersOnLoad(state: CompetitionState): CompetitionState {
  const now = Date.now();
  let modified = false;
  const newSubmissions = [...state.submissions];
  const newTimers = { ...state.timers };

  for (const roundId of ROUND_ORDER) {
    const timer = newTimers[roundId];
    const isSubmitted = timer.submitted || newSubmissions.some((s) => s.roundId === roundId);

    if (timer.started && !isSubmitted && timer.startDatetime) {
      const startTime = new Date(timer.startDatetime).getTime();
      const spec = ROUND_SPECS[roundId];
      const durationMs = spec.durationMinutes * 60 * 1000;
      const adjustMs = roundId === 'round3' ? (state.powerCardEffects?.timeAdjustSeconds || 0) * 1000 : 0;
      const deadlineMs = startTime + durationMs + adjustMs;

      if (now >= deadlineMs) {
        modified = true;
        const code = state.editorCode[roundId] || spec.starterCode;
        const durationSecs = spec.durationMinutes * 60;
        const endIso = new Date(deadlineMs).toISOString();
        const teamName = state.selectedTeam || 'Unassigned';

        const autoRecord: SubmissionRecord = {
          id: `sub_${roundId}_${deadlineMs}`,
          teamId: teamName,
          teamName,
          roundId,
          roundName: spec.roundTitle,
          activityId: spec.activityTitle,
          code,
          submittedAt: endIso,
          submissionType: 'AUTO_TIME_UP',
          score: 0,
          timeLimitSeconds: durationSecs,
          startedAt: timer.startDatetime,
          completedAt: endIso,
          status: 'SUBMITTED',
          team: teamName,
          roundTitle: spec.roundTitle,
          activityTitle: spec.activityTitle,
          startDatetime: timer.startDatetime,
          submissionDatetime: endIso,
          durationSeconds: durationSecs,
          attempts: (state.attempts[roundId] || 0) + 1,
          testResultsSummary: 'Timer expired (00:00 reached) — submission automatically recorded.'
        };

        newSubmissions.unshift(autoRecord);
        newTimers[roundId] = {
          ...timer,
          submitted: true,
          timeOver: true,
          submissionDatetime: endIso,
          submissionType: 'AUTO_TIME_UP',
          elapsedSeconds: durationSecs
        };
      }
    }
  }

  if (modified) {
    state.submissions = newSubmissions;
    state.timers = newTimers;
    saveCompetitionState(state);
  }

  // Ensure activeRoundId is never a LOCKED round
  const statusOfCurrent = getRoundStatus(state.activeRoundId, state.timers, state.submissions);
  if (statusOfCurrent === 'LOCKED') {
    const validRound = ROUND_ORDER.find(
      (r) => getRoundStatus(r, state.timers, state.submissions) === 'ACTIVE'
    ) || 'round1_a';
    state.activeRoundId = validRound;
    saveCompetitionState(state);
  }

  return state;
}

export function loadCompetitionState(): CompetitionState {
  try {
    let raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      raw = localStorage.getItem(LEGACY_STORAGE_KEY);
    }
    if (!raw) return getInitialState();
    const parsed = JSON.parse(raw);
    const initial = getInitialState();

    const editorCode = { ...initial.editorCode, ...(parsed.editorCode || {}) };
    // Auto-update Round 1A if still containing legacy charades token code
    if (editorCode.round1_a && (editorCode.round1_a.includes('gestures') || editorCode.round1_a.includes('FLAGGED') || editorCode.round1_a.includes('token[10]'))) {
      editorCode.round1_a = initial.editorCode.round1_a;
    }
    // Auto-update Round 1B if still containing legacy RLE code
    if (editorCode.round1_b && (editorCode.round1_b.includes('RLE') || editorCode.round1_b.includes('strlen') || editorCode.round1_b.includes('str[105]'))) {
      editorCode.round1_b = initial.editorCode.round1_b;
    }
    // Auto-update Round 3 if still containing legacy Grid Vault code
    if (editorCode.round3 && (editorCode.round3.includes('grid[MAX]') || editorCode.round3.includes('dp[MAX]') || editorCode.round3.includes('energy cost'))) {
      editorCode.round3 = initial.editorCode.round3;
    }

    const standardInput = { ...initial.standardInput, ...(parsed.standardInput || {}) };
    if (standardInput.round1_a && standardInput.round1_a.includes('A B B B C D E')) {
      standardInput.round1_a = '';
    }
    if (standardInput.round1_b && standardInput.round1_b.includes('AAABBBCCDAA')) {
      standardInput.round1_b = initial.standardInput.round1_b;
    }
    if (standardInput.round3 && (standardInput.round3.includes('3 3') || standardInput.round3.includes('1 3 1'))) {
      standardInput.round3 = initial.standardInput.round3;
    }

    const loadedState: CompetitionState = {
      selectedTeam: parsed.selectedTeam || null,
      activeRoundId: parsed.activeRoundId || 'round1_a',
      timers: { ...initial.timers, ...(parsed.timers || {}) },
      editorCode,
      standardInput,
      attempts: { ...initial.attempts, ...(parsed.attempts || {}) },
      submissions: Array.isArray(parsed.submissions) ? parsed.submissions : [],
      powerCardEffects: { ...initial.powerCardEffects, ...(parsed.powerCardEffects || {}) }
    };

    return processExpiredTimersOnLoad(loadedState);
  } catch (err) {
    console.error('Failed to parse saved competition state from localStorage:', err);
    return getInitialState();
  }
}

export function saveCompetitionState(state: CompetitionState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to persist competition state to localStorage:', err);
  }
}

export function exportResultsAsJSON(submissions: SubmissionRecord[], team: TeamId | null): void {
  const payload = {
    team: team || 'Unassigned',
    exportedAt: new Date().toISOString(),
    totalSubmissions: submissions.length,
    submissions
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `FCF_${(team || 'Team').replace(/\s+/g, '_')}_Results_${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportResultsAsCSV(submissions: SubmissionRecord[], team: TeamId | null): void {
  const headers = [
    'Team',
    'Round',
    'Activity',
    'Submission Type',
    'Status',
    'Score',
    'Time Limit(s)',
    'Duration(s)',
    'Attempts',
    'Start Datetime',
    'Submission Datetime',
    'Summary'
  ];

  const rows = submissions.map((s) => [
    `"${s.teamName || s.team || team || ''}"`,
    `"${s.roundName || s.roundTitle || ''}"`,
    `"${s.activityId || s.activityTitle || ''}"`,
    `"${s.submissionType || 'MANUAL'}"`,
    `"${s.status}"`,
    s.score,
    s.timeLimitSeconds || 0,
    s.durationSeconds || 0,
    s.attempts || 1,
    `"${s.startedAt || s.startDatetime || ''}"`,
    `"${s.submittedAt || s.submissionDatetime || ''}"`,
    `"${(s.testResultsSummary || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `FCF_${(team || 'Team').replace(/\s+/g, '_')}_Results_${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

