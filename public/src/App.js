import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import BellRinger from './BellRingers';
import DiscussionQuestions from './DiscussionQuestions';
import GroupWork from './GroupWork';
import LessonPlanGenerator from './LessonPlanGenerator';
import MultipleChoiceQuiz from './MultipleChoiceQuiz';
import OutputHistory from './OutputHistory';
import TextLever from './TextLeveler';
import UnpackStandards from './UnpackStandards';
import YoutubeQuestion from './YoutubeQuestion';

import UnitPlanGenerator from './UnitPlanGenerator'; // Import UnitPlanGenerator
// ... import other components

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/unit-plan" element={<UnitPlanGenerator />} />
        <Route path="/bell-ringer" element={<BellRinger />} />
        <Route path="/discussion-questions" element={<DiscussionQuestions />} />
        <Route path="/group-work" element={<GroupWork />} />
        <Route path="/lesson-plan" element={<LessonPlanGenerator />} />
        <Route path="/multiple-choice-quiz" element={<MultipleChoiceQuiz />} />
        <Route path="/output-history" element={<OutputHistory />} />
        <Route path="/unpack-standards" element={<UnpackStandards />} />
        <Route path="/text-leveler" element={<TextLever />} />
        <Route path="/youtube-question" element={<YoutubeQuestion />} />

        {/* ... other routes */}
      </Routes>
    </Router>
  );
}

export default App;