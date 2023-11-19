import React from 'react';
import ToolCard from './ToolCard'; // Import the ToolCard component

function MainPage() {
  return (
    <div>
      <div className="header">
        <h1>SpatialGrow Classroom STEM Teacher Resource Generator</h1>
      </div>
      <div className="tool-grid">
        <ToolCard title="Unit Plan Generation" description="Create comprehensive unit plans for your classes." path="/unit-plan" />
        <ToolCard title="Discussion Question Generation" description="Generate engaging discussion questions for any topic." path="/discussion-questions" />
        <ToolCard title="Bell Ringer Generation" description="Description" path="/bell-ringer" />
        <ToolCard title="Group Work Generation" description="Description" path="/group-work" />
        <ToolCard title="Lesson Plan Generation" description="Description" path="/lesson-plan" />
        <ToolCard title="Quiz Generation" description="Description" path="/multiple-choice-quiz" />
        <ToolCard title="Output History" description="Description" path="/output-history" />
        <ToolCard title="Unpack and Align Standards" description="Description" path="/unpack-standards" />
        <ToolCard title="Text Leveler" description="Description" path="/text-lever" />
        <ToolCard title="Youtube Video Question Generation" description="Description" path="/youtube-question" />

      </div>
    </div>
  );
}

export default MainPage;
