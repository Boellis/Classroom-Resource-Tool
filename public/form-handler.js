document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
});

function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => { data[key] = value });

    const formType = form.id.replace('Form', '');
    const prompt = createPrompt(data, formType);
    fetchChatGPTResponse(prompt, form.id);
}

function createPrompt(data, formType) {
    switch (formType) {
        case 'unitPlan':
            return `Create a comprehensive unit plan for the following details:\nGrade Level: ${data.gradeLevel}\nTopic: ${data.topic}\nUnit Title: ${data.unitTitle}\nObjectives: ${data.outcomes}\n There should be ${data.numberOfLessons} lessons in the unit. Include sections for lesson topics, activities, and assessment methods. The unit should take ${data.numberOfDays} days to complete.`;
        case 'lessonPlan':
            return `Generate a detailed lesson plan for:\nGrade Level: ${data.gradeLevel}\nTopic: ${data.topic}\nLesson Title: ${data.lessonTitle}\Learning Outcomes: ${data.outcomes}\nPlease structure the plan with an introduction, main activity, and a conclusion. The lesson plan should align with the standrds: ${data.standards}.`;
        case 'discussionQuestion':
            return `Create a set of discussion questions for the topic '${data.topic}'. Target audience is ${data.gradeLevel} grade students. Focus on critical thinking and engagement. The type of questions you generate should be ${data.questionType}. The questions should be based on the teaching style ${data.teachingStyle}.`;
        case 'multipleChoiceQuiz':
            return `Develop a multiple-choice quiz for the topic: '${data.topic}' targeted at ${data.gradeLevel} grade students. Here is a description of the topic being discussed, but feel free to elaborate for more detail: ${data.description}.Include ${data.numberOfQuestions} questions, each with four options and indicate the correct answer. The questions should align with the following educational standards: ${data.standards}`;
        case 'bellRinger':
            return `Create a bell ringer activity for a ${data.gradeLevel} grade class on the topic of '${data.topic}'. The activity should be engaging and concise, suitable for the beginning of a class session. The students will have ${data.timeLimit} minutes to complete the bell ringer.`;
        case 'textLeveler':
            return `Adjust the following text to suit a ${data.gradeLevel} grade reading level:\nText: "${data.textInput}"\nMaintain the core information while ensuring readability for the specified grade level.`;
        case 'youtubeQuestion':
            return `Generate a set of ${data.numberOfQuestions} educational questions based on the YouTube video at '${data.videoUrl}'. Target the questions at ${data.gradeLevel} grade students, focusing on key learning points from the video. The type of questions generated should be ${data.questionType}.`;
        case 'groupWork':
            return `Plan a group work activity for ${data.groupSize} students in a ${data.gradeLevel} grade class. The topic of the activity is '${data.groupTopic}'. Include objectives, roles, and a brief outline of the activity flow. The group work should be able to be completed within ${data.timeLimit} minutes.`;
        case 'unpackStandards':
            return `Unpack the following educational standard for a teacher teaching ${data.gradeLevel} grade:\nStandard: "${data.standardText}"\nProvide a breakdown of key goals, suggested teaching approaches, and assessment methods.`;
        default:
            return `Generate content for ${formType}: ` + Object.entries(data).map(([key, value]) => `\n${key}: ${value}`).join('');
    }
}


function fetchChatGPTResponse(prompt, formId) {
    const apiEndpoint = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
    const apiKey = 'Open_API_KEY_HERE'; // Replace with your actual API key

    showLoading(true, formId);

    fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: 2048
        })
    })
    .then(response => response.json())
    .then(data => {
        showLoading(false, formId);
        displayResponse(data.choices[0].text, formId);
        addToHistory(data.choices[0].text, formId);
    })
    .catch(error => {
        showLoading(false, formId);
        console.error('Error:', error);
    });
}

function displayResponse(response, formId) {
    const outputDiv = document.getElementById(formId + 'Output');
    if (outputDiv) {
        outputDiv.innerHTML = convertTextToHTML(response);
    } else {
        console.error('No output div found for formId:', formId);
    }
}

function showLoading(show, formId) {
    const loadingDiv = document.getElementById(formId + 'Loading');
    loadingDiv.style.display = show ? 'block' : 'none';
}

function addToHistory(response, formId) {
    const outputHistory = JSON.parse(localStorage.getItem('outputHistory')) || [];
    const newEntry = { response, formId, timestamp: new Date().toISOString() };
    outputHistory.push(newEntry);
    localStorage.setItem('outputHistory', JSON.stringify(outputHistory));
}

function convertTextToHTML(text) {
    // Here we simply replace line breaks with <br> elements
    // Additional formatting logic would be added here if necessary
    return text.replace(/\n/g, '<br>');
}
