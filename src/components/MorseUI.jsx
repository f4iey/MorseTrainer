'use client';

import { Activity, History as HistoryIcon, Radio, Music } from 'lucide-react';
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

const BetaBanner = () => (
  <div className="fixed top-0 left-0 right-0 bg-yellow-500/90 text-black py-2 px-4 text-center font-semibold z-50">
    BETA - IN DEVELOPMENT 🚧
  </div>
);

const MainButton = ({ isPlaying, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full py-4 rounded-lg font-semibold text-lg transition-all
      ${isPlaying
        ? 'bg-red-500 hover:bg-red-600'
        : 'bg-green-500 hover:bg-green-600'}`}
  >
    {isPlaying ? 'Stop' : 'Start'}
  </button>
);

const ModeToggle = ({ label, isActive, onToggle }) => (
  <div>
    <div className="text-sm mb-2">{label}</div>
    <button
      onClick={onToggle}
      className={`w-full px-4 py-2 rounded transition-colors ${
        isActive ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-600 hover:bg-gray-700'
      }`}
    >
      {isActive ? 'On' : 'Off'}
    </button>
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
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4">
      <BetaBanner />

      {notification && (
        <div className={`fixed top-14 left-4 right-4 bg-${notification.color}-500
          text-white px-4 py-3 rounded-lg shadow-lg z-40 text-center
          animate-fade-in-down`}>
          {notification.message}
        </div>
      )}

      <div className="max-w-2xl mx-auto mt-16">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">Morse Code Trainer</h1>
          <p className="text-gray-400">{currentPreset?.name || 'Loading...'}</p>
        </div>

        <div className="space-y-4">
          <MainButton isPlaying={isPlaying} onClick={onTogglePlay} />

          <AnimatedSection title="Training Settings" icon={<Radio size={20} />} defaultOpen={true}>
            <div className="space-y-4">
              <PresetDropdown
                presets={presets}
                currentPreset={currentPreset}
                onPresetChange={onPresetChange}
              />

              <div className="grid grid-cols-2 gap-4">
                <ModeToggle
                  label="Head Copy Mode"
                  isActive={headCopyMode}
                  onToggle={onHeadCopyMode}
                />
                <ModeToggle
                  label="Compact Mode"
                  isActive={hideChars}
                  onToggle={onHideChars}
                />
              </div>
            </div>
          </AnimatedSection>

          <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-4">
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
                className="w-full mt-4 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-700"
              >
                Show Answer
              </InteractiveButton>
            )}
          </div>

          <AnimatedSection title="Audio Settings" icon={<Music size={20} />} defaultOpen={false}>
            <div className="space-y-4">
              <ControlPanel
                currentLevel={currentLevel}
                onLevelChange={onLevelChange}
                groupSize={groupSize}
                onGroupSizeChange={onGroupSizeChange}
                frequency={frequency}
                onFrequencyChange={onFrequencyChange}
                wpm={wpm}
                onWpmChange={onWpmChange}
                maxLevel={maxLevel}
                advanceThreshold={advanceThreshold}
                onAdvanceThresholdChange={onAdvanceThresholdChange}
                consecutiveCorrect={consecutiveCorrect}
              />

              <QualityControls
                qsbAmount={qsbAmount}
                onQsbChange={onQsbChange}
                qrmAmount={qrmAmount}
                onQrmChange={onQrmChange}
              />
            </div>
          </AnimatedSection>

          <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-4">
            <CharacterGrid
              availableChars={availableChars}
              onCharacterInput={onCharacterInput}
              currentPreset={currentPreset}
            />
          </div>

          <AnimatedSection title="Performance" icon={<Activity size={20} />} defaultOpen={true}>
            <div className="space-y-4">
              <ScoreDisplay score={score} />
              <AvailableChars
                availableChars={availableChars}
                consecutiveCorrect={consecutiveCorrect}
                advanceThreshold={advanceThreshold}
              />
            </div>
          </AnimatedSection>

          {!hideChars && (
            <AnimatedSection title="History" icon={<HistoryIcon size={20} />} defaultOpen={false}>
              <div className="space-y-4">
                <History history={history} />
                {performanceData.length > 0 && (
                  <PerformanceGraph performanceData={performanceData} />
                )}
              </div>
            </AnimatedSection>
          )}
        </div>
      </div>
    </div>
  );
};

export default MorseUI;