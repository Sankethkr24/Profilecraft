export const generateProfileHTML = (profile = {}) => {
  const {
    name = 'Profile Craft User',
    headline = 'Professional Profile',
    bio = '',
    phone = '',
    email = '',
    location = '',
    age = '',
    height = '',
    caste = '',
    education = [],
    experience = [],
    skills = [],
  } = profile;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${name} - Profile</title>
        <style>
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            padding: 30px;
            color: #2D3436;
            background-color: #FFFFFF;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #6C5CE7;
            padding-bottom: 20px;
            margin-bottom: 20px;
          }
          .name {
            font-size: 28px;
            font-weight: bold;
            color: #4834D4;
            margin: 0;
          }
          .headline {
            font-size: 16px;
            color: #636E72;
            margin-top: 5px;
          }
          .meta-row {
            margin-top: 10px;
            font-size: 14px;
            color: #6C5CE7;
          }
          .section {
            margin-bottom: 25px;
          }
          .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #6C5CE7;
            border-bottom: 1px solid #DFE6E9;
            padding-bottom: 5px;
            margin-bottom: 10px;
          }
          .bio {
            font-size: 14px;
            line-height: 1.6;
          }
          .list-item {
            font-size: 14px;
            margin-bottom: 5px;
          }
          .skill-tag {
            display: inline-block;
            background-color: #F3E5F5;
            color: #8E44AD;
            padding: 5px 12px;
            border-radius: 12px;
            font-size: 12px;
            margin-right: 5px;
            margin-bottom: 5px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="name">${name}</h1>
          <div class="headline">${headline}</div>
          <div class="meta-row">
            ${phone ? `📱 ${phone} &nbsp;|&nbsp; ` : ''}
            ${email ? `✉️ ${email} &nbsp;|&nbsp; ` : ''}
            ${location ? `📍 ${location}` : ''}
          </div>
          ${age || height || caste ? `
            <div class="meta-row">
              ${age ? `Age: ${age} &nbsp;|&nbsp; ` : ''}
              ${height ? `Height: ${height} &nbsp;|&nbsp; ` : ''}
              ${caste ? `Community: ${caste}` : ''}
            </div>
          ` : ''}
        </div>

        ${bio ? `
          <div class="section">
            <div class="section-title">About</div>
            <div class="bio">${bio}</div>
          </div>
        ` : ''}

        ${experience && experience.length > 0 ? `
          <div class="section">
            <div class="section-title">Experience</div>
            ${experience.map(exp => `<div class="list-item">• ${exp}</div>`).join('')}
          </div>
        ` : ''}

        ${education && education.length > 0 ? `
          <div class="section">
            <div class="section-title">Education</div>
            ${education.map(edu => `<div class="list-item">• ${edu}</div>`).join('')}
          </div>
        ` : ''}

        ${skills && skills.length > 0 ? `
          <div class="section">
            <div class="section-title">Skills & Expertise</div>
            <div>
              ${skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
            </div>
          </div>
        ` : ''}
      </body>
    </html>
  `;
};
