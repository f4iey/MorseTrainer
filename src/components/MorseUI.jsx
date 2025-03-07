'use client';

import { Activity, History as HistoryIcon, Radio, Music, Zap, Settings } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
import { PresetDropdown } from './PresetDropdown';
import { ControlPanel } from './ControlPanel';
import { QualityControls } from './QualityControls';
import { CharacterDisplay } from './CharacterDisplay';
import { CharacterGrid } from './CharacterGrid';
import { ScoreDisplay } from './ScoreDisplay';
import { History } from './History';
import { PerformanceGraph } from './PerformanceGraph';
import { AvailableChars } from './AvailableChars';
import { InteractiveButton } from './InteractiveButton';
import { AudioControls } from './AudioControls';
import { LevelProgress } from './LevelProgress';
import { Notification } from './Notification';

const BetaBanner = () => (
  <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-yellow-500/90 via-yellow-400/90 to-yellow-500/90 text-black py-3 px-4 text-center font-bold z-50 shadow-lg backdrop-blur-sm">
    <div className="flex items-center justify-center gap-3">
      <span className="animate-bounce">🚧</span>
      <span>BETA VERSION - IN DEVELOPMENT</span>
      <span className="animate-bounce">🚧</span>
    </div>
  </div>
);

const MainButton = ({ isPlaying, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full py-8 rounded-2xl font-bold text-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg border border-white/5 ${
      isPlaying
        ? 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600'
        : 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600'
    }`}
  >
    <div className="flex items-center justify-center gap-3">
      <Zap size={28} className={isPlaying ? 'animate-pulse' : ''} />
      <span>{isPlaying ? 'Stop Practice' : 'Start Practice'}</span>
    </div>
  </button>
);

const ModeToggle = ({ label, description, isActive, onToggle }) => (
  <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4">
    <div className="flex flex-col gap-3">
      <div>
        <div className="text-base font-semibold text-gray-200">{label}</div>
        {description && (
          <div className="text-sm text-gray-400 mt-1">{description}</div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onToggle}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent
            transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
            ${isActive ? 'bg-blue-500' : 'bg-gray-600'}`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg
              transition duration-200 ease-in-out ${isActive ? 'translate-x-5' : 'translate-x-0'}`}
          />
        </button>
        <span className="text-sm text-gray-400">
          {isActive ? 'On' : 'Off'}
        </span>
      </div>
    </div>
  </div>
);

const MorseUI = ({
  isPlaying,
  onTogglePlay,
  currentLevel,
  onLevelChange,
  groupSize,
  onGroupSizeChange,
  frequency,
  onFrequencyChange,
  wpm,
  onWpmChange,
  availableChars,
  consecutiveCorrect,
  userInput,
  currentGroupSize,
  score,
  history,
  maxLevel,
  notification,
  onCharacterInput,
  performanceData,
  headCopyMode,
  onHeadCopyMode,
  hideChars,
  onHideChars,
  showAnswer,
  onShowAnswer,
  currentGroup,
  qsbAmount,
  onQsbChange,
  qrmAmount,
  onQrmChange,
  presets,
  currentPreset,
  onPresetChange,
  advanceThreshold,
  onAdvanceThresholdChange
}) => {
  const showTrainingSettings = !hideChars;
  const showAudioSettings = !hideChars;
  const showPerformance = true;
  const showHistory = true;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <BetaBanner />

      {notification && (
        <Notification
          message={notification.message}
          color={notification.color}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            Morse Code Trainer
          </h1>
          <p className="text-xl font-medium text-gray-400">
            {currentPreset?.name || 'Loading...'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Core Training */}
          <div className="space-y-8">
            <MainButton isPlaying={isPlaying} onClick={onTogglePlay} />

            <AnimatedSection title="Practice Area" icon={Radio} defaultOpen={true}>
              <div className="space-y-6">
                <CharacterDisplay
                  headCopyMode={headCopyMode}
                  showAnswer={showAnswer}
                  userInput={userInput}
                  currentGroupSize={currentGroupSize}
                  currentGroup={currentGroup}
                />

                {headCopyMode && isPlaying && !showAnswer && (
                  <InteractiveButton
                    onClick={onShowAnswer}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-lg font-medium shadow-lg"
                  >
                    Show Answer
                  </InteractiveButton>
                )}
              </div>
            </AnimatedSection>

            <AnimatedSection title="Character Input" icon={Settings} defaultOpen={true}>
              <CharacterGrid
                availableChars={availableChars}
                onCharacterInput={onCharacterInput}
                currentPreset={currentPreset}
              />
            </AnimatedSection>

            <div className="grid grid-cols-2 gap-6">
              <ModeToggle
                label="Head Copy Mode"
                description="Hide the text while practicing"
                isActive={headCopyMode}
                onToggle={onHeadCopyMode}
              />
              <ModeToggle
                label="Compact Mode"
                description="Simplify the interface"
                isActive={hideChars}
                onToggle={onHideChars}
              />
            </div>
          </div>

          {/* Right Column - Stats and Settings */}
          <div className="space-y-8">
            {showPerformance && (
              <AnimatedSection title="Performance" icon={Activity} defaultOpen={true}>
                <div className="space-y-6">
                  <ScoreDisplay score={score} />
                  <LevelProgress
                    consecutiveCorrect={consecutiveCorrect}
                    advanceThreshold={advanceThreshold}
                  />
                  {performanceData.length > 0 && (
                    <PerformanceGraph performanceData={performanceData} />
                  )}
                </div>
              </AnimatedSection>
            )}

            {showAudioSettings && (
              <AnimatedSection title="Audio Settings" icon={Music} defaultOpen={false}>
                <div className="space-y-6">
                  <AudioControls
                    frequency={frequency}
                    onFrequencyChange={onFrequencyChange}
                    wpm={wpm}
                    onWpmChange={onWpmChange}
                  />
                  <QualityControls
                    qsbAmount={qsbAmount}
                    onQsbChange={onQsbChange}
                    qrmAmount={qrmAmount}
                    onQrmChange={onQrmChange}
                  />
                </div>
              </AnimatedSection>
            )}

            {showTrainingSettings && (
              <AnimatedSection title="Training Settings" icon={Settings} defaultOpen={!isPlaying}>
                <div className="space-y-6">
                  <PresetDropdown
                    presets={presets}
                    currentPreset={currentPreset}
                    onPresetChange={onPresetChange}
                  />
                  <ControlPanel
                    currentLevel={currentLevel}
                    onLevelChange={onLevelChange}
                    groupSize={groupSize}
                    onGroupSizeChange={onGroupSizeChange}
                    maxLevel={maxLevel}
                    advanceThreshold={advanceThreshold}
                    onAdvanceThresholdChange={onAdvanceThresholdChange}
                    consecutiveCorrect={consecutiveCorrect}
                  />
                  <AvailableChars
                    availableChars={availableChars}
                    consecutiveCorrect={consecutiveCorrect}
                    advanceThreshold={advanceThreshold}
                  />
                </div>
              </AnimatedSection>
            )}

            {showHistory && (
              <AnimatedSection title="History" icon={HistoryIcon} defaultOpen={false}>
                <div className="space-y-6">
                  <History history={history} />
                </div>
              </AnimatedSection>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MorseUI;