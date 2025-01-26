'use client';

import { InteractiveButton } from './InteractiveButton';
import { ModeControls } from './ModeControls';
import { KochControls } from './KochControls';
import { ControlPanel } from './ControlPanel';
import { QualityControls } from './QualityControls';
import { CharacterDisplay } from './CharacterDisplay';
import { CharacterGrid } from './CharacterGrid';
import { ScoreDisplay } from './ScoreDisplay';
import { History } from './History';
import { PerformanceGraph } from './PerformanceGraph';
import { Notification } from './Notification';
import { AvailableChars } from './AvailableChars';
import { PresetSelector } from './PresetSelector';

const MorseUI = ({
  isPlaying,
  onTogglePlay,
  currentLevel,
  onLevelChange,
  groupSize,
  onGroupSizeChange,
  frequency,
  onFrequencyChange,
  advanceThreshold,
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
  onShuffleKoch,
  onResetKoch,
  qsbAmount,
  onQsbChange,
  qrmAmount,
  onQrmChange,
  presets,
  currentPreset,
  onPresetChange
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-2">
      <Notification notification={notification} />

      <div className="max-w-lg mx-auto">
        <div className="text-center mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Morse Code Trainer
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            {currentPreset?.name || 'Loading...'}
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl p-3 space-y-3 border border-gray-700">
          <InteractiveButton
            onClick={onTogglePlay}
            className={`w-full py-3 rounded-lg font-semibold text-lg ${
              isPlaying ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            {isPlaying ? 'Stop' : 'Start'}
          </InteractiveButton>

          <PresetSelector
            presets={presets}
            currentPreset={currentPreset}
            onPresetChange={onPresetChange}
          />

          <ModeControls
            headCopyMode={headCopyMode}
            onHeadCopyMode={onHeadCopyMode}
            hideChars={hideChars}
            onHideChars={onHideChars}
          />

          {!hideChars && (
            <>
              {currentPreset?.id === 'koch' && (
                <KochControls
                  onShuffleKoch={onShuffleKoch}
                  onResetKoch={onResetKoch}
                />
              )}

              {headCopyMode && isPlaying && !showAnswer && (
                <InteractiveButton
                  onClick={onShowAnswer}
                  className="w-full py-2 rounded-lg bg-yellow-600 hover:bg-yellow-700"
                >
                  Show Answer
                </InteractiveButton>
              )}

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
              />

              <QualityControls
                qsbAmount={qsbAmount}
                onQsbChange={onQsbChange}
                qrmAmount={qrmAmount}
                onQrmChange={onQrmChange}
              />

              <AvailableChars
                availableChars={availableChars}
                consecutiveCorrect={consecutiveCorrect}
                advanceThreshold={advanceThreshold}
              />
            </>
          )}

          <CharacterDisplay
            headCopyMode={headCopyMode}
            showAnswer={showAnswer}
            userInput={userInput}
            currentGroupSize={currentGroupSize}
            currentGroup={currentGroup}
          />

          <CharacterGrid
            availableChars={availableChars}
            onCharacterInput={onCharacterInput}
            currentPreset={currentPreset}
          />

          <ScoreDisplay score={score} />

          {!hideChars && (
            <>
              <History history={history} />
              {performanceData.length > 0 && (
                <PerformanceGraph performanceData={performanceData} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MorseUI;
