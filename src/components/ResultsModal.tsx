import React, { useState } from 'react';
import { SubmissionRecord, TeamId } from '../types';
import { exportResultsAsCSV, exportResultsAsJSON } from '../storage';
import { Trophy, FileSpreadsheet, FileJson, CheckCircle2, XCircle, Code, ChevronDown, ChevronUp, Clock } from 'lucide-react';

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  team: TeamId | null;
  submissions: SubmissionRecord[];
  onResetAll?: () => void;
}

export const ResultsModal: React.FC<ResultsModalProps> = ({
  isOpen,
  onClose,
  team,
  submissions,
  onResetAll
}) => {
  const [expandedCodeSubId, setExpandedCodeSubId] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalScore = submissions.reduce((acc, s) => acc + (s.score ?? 0), 0);

  return (
    <div
      id="results-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200"
    >
      <div
        id="results-modal"
        className="w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="px-6 py-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-neutral-100 tracking-tight flex items-center gap-2">
                Competition Results & Export
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-800 border border-neutral-700 text-emerald-400 font-mono">
                  {team || 'No Team Assigned'}
                </span>
              </h2>
              <p className="text-xs text-neutral-400">
                Verified local submissions, completion timings, and export data.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              id="export-csv-btn"
              onClick={() => exportResultsAsCSV(submissions, team)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 text-xs font-medium transition cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              Export CSV
            </button>
            <button
              id="export-json-btn"
              onClick={() => exportResultsAsJSON(submissions, team)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 text-xs font-medium transition cursor-pointer"
            >
              <FileJson className="w-3.5 h-3.5 text-blue-400" />
              Export JSON
            </button>
            <button
              id="results-modal-close-btn"
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-200 text-xs px-2.5 py-1.5 rounded border border-neutral-800 bg-neutral-800/60 transition ml-2 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800">
              <span className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">
                Total Score
              </span>
              <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">
                {totalScore} <span className="text-xs text-neutral-500 font-normal">pts</span>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800">
              <span className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">
                Submissions Logged
              </span>
              <div className="text-2xl font-bold text-neutral-200 font-mono mt-1">
                {submissions.length}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800">
              <span className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">
                Assigned Terminal
              </span>
              <div className="text-2xl font-bold text-blue-400 font-mono mt-1">
                {team || '—'}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Recorded Submissions History
            </div>

            {submissions.length === 0 ? (
              <div className="p-8 text-center bg-neutral-950/60 rounded-lg border border-neutral-800/80 text-neutral-500 text-xs">
                No submissions have been finalized on this machine yet. Click "Start" and "Submit" in any round to record attempts.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-950">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-neutral-900/80 text-neutral-400 text-[11px] uppercase border-b border-neutral-800">
                    <tr>
                      <th className="py-2.5 px-3">Team</th>
                      <th className="py-2.5 px-3">Round</th>
                      <th className="py-2.5 px-3">Activity</th>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Score</th>
                      <th className="py-2.5 px-3">Duration</th>
                      <th className="py-2.5 px-3">Timestamp</th>
                      <th className="py-2.5 px-3 text-right">Code</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
                    {submissions.map((s) => {
                      const isExpanded = expandedCodeSubId === s.id;
                      const roundName = s.roundName || s.roundTitle || s.roundId;
                      const activityName = s.activityId || s.activityTitle || '';
                      const teamName = s.teamName || s.team || team || 'Unassigned';
                      const timestamp = (s.submittedAt || s.submissionDatetime || '').replace('T', ' ').slice(0, 19);
                      const isAuto = s.submissionType === 'AUTO_TIME_UP';

                      return (
                        <React.Fragment key={s.id}>
                          <tr className="hover:bg-neutral-900/30">
                            <td className="py-2.5 px-3 text-blue-300 font-semibold">{teamName}</td>
                            <td className="py-2.5 px-3 font-semibold text-neutral-200">{roundName}</td>
                            <td className="py-2.5 px-3 text-neutral-400">{activityName}</td>
                            <td className="py-2.5 px-3">
                              <span
                                className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                  isAuto
                                    ? 'bg-amber-950/80 text-amber-300 border border-amber-800'
                                    : 'bg-blue-950/80 text-blue-300 border border-blue-800'
                                }`}
                              >
                                {isAuto ? 'AUTO' : 'MANUAL'}
                              </span>
                            </td>
                            <td className="py-2.5 px-3">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                                  s.score !== null && s.score > 0
                                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                    : isAuto || s.score === null
                                    ? 'bg-amber-950 text-amber-400 border border-amber-800'
                                    : 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                                }`}
                              >
                                {s.score !== null && s.score > 0 ? (
                                  <CheckCircle2 className="w-3 h-3" />
                                ) : isAuto || s.score === null ? (
                                  <Clock className="w-3 h-3" />
                                ) : (
                                  <XCircle className="w-3 h-3" />
                                )}
                                {s.score === null ? 'SUBMITTED' : s.status}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 font-bold">
                              {s.score !== null ? (
                                <span className={s.score > 0 ? 'text-emerald-400' : 'text-neutral-400'}>
                                  +{s.score}
                                </span>
                              ) : (
                                <span className="text-amber-400 text-[11px] font-mono italic">
                                  Pending Evaluation
                                </span>
                              )}
                            </td>
                            <td className="py-2.5 px-3 text-neutral-400">
                              {Math.floor((s.durationSeconds || 0) / 60)}m {(s.durationSeconds || 0) % 60}s
                            </td>
                            <td className="py-2.5 px-3 text-[11px] text-neutral-500">
                              {timestamp}
                            </td>
                            <td className="py-2.5 px-3 text-right">
                              <button
                                onClick={() => setExpandedCodeSubId(isExpanded ? null : s.id)}
                                className="inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-300 transition"
                              >
                                <Code className="w-3 h-3 text-neutral-400" />
                                {isExpanded ? 'Hide' : 'View'}
                                {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                              </button>
                            </td>
                          </tr>
                          {isExpanded && (
                            <tr>
                              <td colSpan={9} className="p-3 bg-neutral-950/90 border-t border-neutral-800">
                                <div className="space-y-1.5">
                                  <div className="flex items-center justify-between text-[11px] text-neutral-400">
                                    <span className="font-semibold text-neutral-300">Submitted C Program Code ({teamName} - {roundName}):</span>
                                    <span>{s.testResultsSummary || ''}</span>
                                  </div>
                                  <pre className="p-3 bg-black/80 rounded border border-neutral-800 text-[11px] text-neutral-300 font-mono overflow-x-auto max-h-64 whitespace-pre">
                                    {s.code || '(No code was written)'}
                                  </pre>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-950/50 flex items-center justify-between text-xs text-neutral-500">
          <span>Results are stored strictly locally in browser storage for competition integrity.</span>
          {onResetAll && (
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to reset all records for this PC?')) {
                  onResetAll();
                }
              }}
              className="text-red-400 hover:text-red-300 text-[11px] underline cursor-pointer"
            >
              Reset Terminal Data
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

