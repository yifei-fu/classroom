// frontend mock data for development
import {CourseDetails} from './type';

export const sampleCourseDetails: CourseDetails = {
  id: 'id',
  role: 'student',
  name: 'CS130 - Software Engineering',
  description: 'Structured programming, program specification, program proving, modularity, abstract data types, composite design, software tools, software control systems, program testing, team programming.',
  school: 'UCLA',
  term: 'Spring 2019',
  instructor: {
    username: 'eggert',
    firstName: 'Paul',
    lastName: 'Eggert',
    email: 'eggert@ucla.edu',
    role: 'instructor',
  },
  studentJoinSecret: '5srs',
  TAJoinSecret: '50avg',
  posts: [
    {
      id: 'id',
      title: 'The final presentation date',
      tags: [
        'Project',
        'Final presentation',
      ],
      content: 'Is it confirmed that the presentation is on May 31st or June 7th? Thanks!',
      author: {
        username: 'Anonymous',
        firstName: 'Anonymous',
        lastName: ' ',
        role: 'student',
      },
      creationTime: 'Fri June 7 2019 16:36:30 GMT-0700 (Pacific Daylight Time)',
      comments: [
        {
          content: 'We will begin them on the 31st and continue into the 7th if needed, as we need time on the 7th to do a review for the final. The order would be randomly selected. For the Gzip and Juvenile court teams, they will be presenting in class Monday of week 10, as decided by Professor Eggert. The TAs are going to be discussing with Professor Eggert tomorrow to begin making the final earlier so we can begin final review this week so more teams can do final presentations next week instead.',
          author: {
            username: 'User',
            firstName: 'Davis',
            lastName: 'Cho',
            role: 'TA',
          },
          creationTime: 'Fri May 24 2019 17:00:00 GMT-0700 (Pacific Daylight Time)',
        },
        {
          content: 'Compared to covering the materials of the last two lectures in the final review, it is much more preferable to do the presentations on Week 10.',
          author: {
            username: 'Anonymous',
            firstName: 'Anonymous',
            lastName: ' ',
            role: 'student',
          },
          creationTime: 'Fri May 31 2019 17:00:00 GMT-0700 (Pacific Daylight Time)',
        },
        {
          content: 'Still think there is not enough time to finish the project in week 9. Really need another week to work on.',
          author: {
            username: 'Anonymous',
            firstName: 'Anonymous',
            lastName: ' ',
            role: 'student',
          },
          creationTime: 'Fri May 17 2019 17:00:00 GMT-0700 (Pacific Daylight Time)',
        },
        {
          content: 'Feel free to bring this up with the professor tomorrow as he would likely listen to the students more than us lowly TAs :c We will also try to convince him as well',
          author: {
            username: 'User',
            firstName: 'Davis',
            lastName: 'Cho',
            role: 'TA',
          },
          creationTime: 'Fri May 10 2019 17:00:00 GMT-0700 (Pacific Daylight Time)',
        },
      ],
    },
    {
      id: 'id',
      title: 'Davis’s OH Today? Which room?',
      tags: [
        'TA',
        'Office hour',
      ],
      content: 'Davis’s OH Today? Which room?',
      author: {
        username: 'Anonymous',
        firstName: 'Anonymous',
        lastName: '',
        role: 'student',
      },
      creationTime: 'Fri May 31 2019 16:36:30 GMT-0700 (Pacific Daylight Time)',
      comments: [
        {
          content: 'I was at engVI common area, as mentioned on CCLE. Is there something urgent? Feel free to email me.',
          author: {
            username: 'User',
            firstName: 'Davis',
            lastName: 'Cho',
            role: 'TA',
          },
          creationTime: 'Fri May 3 2019 17:00:00 GMT-0700 (Pacific Daylight Time)',
        },
      ],
    },
    {
      id: 'id',
      title: 'Final Report -- Pending Tasks',
      tags: [
        'Project',
        'Final report',
      ],
      content: 'Do we include a Pending Tasks section in our final report? Or should we do something like Future roadmap instead?',
      author: {
        username: 'User',
        firstName: 'Detective',
        lastName: 'Pikachu',
        role: 'student',
      },
      creationTime: 'Fri May 26 2019 16:36:30 GMT-0700 (Pacific Daylight Time)',
      comments: [
        {
          content: 'Future Work section would make more sense in this case. ',
          author: {
            username: 'User',
            firstName: 'Davis',
            lastName: 'Cho',
            role: 'TA',
          },
          creationTime: 'Fri May 19 2019 17:00:00 GMT-0700 (Pacific Daylight Time)',
        },
      ],
    },
    {
      id: 'id',
      title: 'Question about final presentation',
      tags: [
        'Project',
        'Final presentation',
      ],
      content: 'I just found out that I might be out of town for the 10th week discussion and I was wondering what that would mean for my project grade. Would I miss out on all 4 of the percent if I missed the presentation or is there someway for me to make that up or compensate for my tardiness.',
      author: {
        username: 'User',
        firstName: 'Anonymous',
        lastName: '',
        role: 'student',
      },
      creationTime: 'Fri June 3 2019 16:36:30 GMT-0700 (Pacific Daylight Time)',
      comments: [
        {
          content: 'You may do a final presentation week 9 instead if your team is fine with that. Otherwise, we would have to work something out with the professor then.',
          author: {
            username: 'User',
            firstName: 'Davis',
            lastName: 'Cho',
            role: 'TA',
          },
          creationTime: 'Fri June 6 2019 17:00:00 GMT-0700 (Pacific Daylight Time)',
        },
      ],
    },
    {
      id: 'id',
      title: '"How Amazon Web Services Uses Formal Methods" Article',
      tags: [
        'Reading',
      ],
      content: 'How do we view this article for free? I cannot seem to find a free download option.',
      author: {
        username: 'User',
        firstName: 'Anonymous',
        lastName: '',
        role: 'student',
      },
      creationTime: 'Fri May 29 2019 16:36:30 GMT-0700 (Pacific Daylight Time)',
      comments: [
        {
          content: 'I think it should open up if you are using the school internet? ',
          author: {
            username: 'User',
            firstName: 'Anonymous',
            lastName: '',
            role: 'student',
          },
          creationTime: 'Sat May 26 2019 17:00:00 GMT-0700 (Pacific Daylight Time)',
        },
      ],
    },
    {
      id: 'id',
      title: 'Midterm Report',
      tags: [
        'Project',
        'Midterm report',
      ],
      content: 'Could the TA please put up a description of what they want for the midterm report? Thanks!',
      author: {
        username: 'User',
        firstName: 'Anonymous',
        lastName: '',
        role: 'student',
      },
      creationTime: 'Sun May 27 2019 16:36:30 GMT-0700 (Pacific Daylight Time)',
      comments: [
        {
          content: 'The report would be due on Sunday, May 26 2019. The description for the same can be obtained here (@108).',
          author: {
            username: 'User',
            firstName: 'Davis',
            lastName: 'Cho',
            role: 'TA',
          },
          creationTime: 'Fri May 28 2019 17:00:00 GMT-0700 (Pacific Daylight Time)',
        },
      ],
    },

    {
      id: 'id',
      title: 'The final presentation date',
      tags: [
        'Project',
        'Final presentation',
      ],
      content: 'Is it confirmed that the presentation is on May 31st or June 7th? Thanks!',
      author: {
        username: 'Anonymous',
        firstName: 'Anonymous',
        lastName: ' ',
        role: 'student',
      },
      creationTime: 'Fri June 7 2019 16:36:30 GMT-0700 (Pacific Daylight Time)',
      comments: [
        {
          content: 'We will begin them on the 31st and continue into the 7th if needed, as we need time on the 7th to do a review for the final. The order would be randomly selected. For the Gzip and Juvenile court teams, they will be presenting in class Monday of week 10, as decided by Professor Eggert. The TAs are going to be discussing with Professor Eggert tomorrow to begin making the final earlier so we can begin final review this week so more teams can do final presentations next week instead.',
          author: {
            username: 'User',
            firstName: 'Davis',
            lastName: 'Cho',
            role: 'TA',
          },
          creationTime: 'Fri May 24 2019 17:00:00 GMT-0700 (Pacific Daylight Time)',
        },
        {
          content: 'Compared to covering the materials of the last two lectures in the final review, it is much more preferable to do the presentations on Week 10.',
          author: {
            username: 'Anonymous',
            firstName: 'Anonymous',
            lastName: ' ',
            role: 'student',
          },
          creationTime: 'Fri May 31 2019 17:00:00 GMT-0700 (Pacific Daylight Time)',
        },
        {
          content: 'Still think there is not enough time to finish the project in week 9. Really need another week to work on.',
          author: {
            username: 'Anonymous',
            firstName: 'Anonymous',
            lastName: ' ',
            role: 'student',
          },
          creationTime: 'Fri May 17 2019 17:00:00 GMT-0700 (Pacific Daylight Time)',
        },
        {
          content: 'Feel free to bring this up with the professor tomorrow as he would likely listen to the students more than us lowly TAs :c We will also try to convince him as well',
          author: {
            username: 'User',
            firstName: 'Davis',
            lastName: 'Cho',
            role: 'TA',
          },
          creationTime: 'Fri May 10 2019 17:00:00 GMT-0700 (Pacific Daylight Time)',
        },
      ],
    },

    {
      id: 'id',
      title: 'The final presentation date',
      tags: [
        'Project',
        'Final presentation',
      ],
      content: 'Is it confirmed that the presentation is on May 31st or June 7th? Thanks!',
      author: {
        username: 'Anonymous',
        firstName: 'Anonymous',
        lastName: ' ',
        role: 'student',
      },
      creationTime: 'Fri June 7 2019 16:36:30 GMT-0700 (Pacific Daylight Time)',
      comments: [
        {
          content: 'We will begin them on the 31st and continue into the 7th if needed, as we need time on the 7th to do a review for the final. The order would be randomly selected. For the Gzip and Juvenile court teams, they will be presenting in class Monday of week 10, as decided by Professor Eggert. The TAs are going to be discussing with Professor Eggert tomorrow to begin making the final earlier so we can begin final review this week so more teams can do final presentations next week instead.',
          author: {
            username: 'User',
            firstName: 'Davis',
            lastName: 'Cho',
            role: 'TA',
          },
          creationTime: 'Fri May 24 2019 17:00:00 GMT-0700 (Pacific Daylight Time)',
        },
        {
          content: 'Compared to covering the materials of the last two lectures in the final review, it is much more preferable to do the presentations on Week 10.',
          author: {
            username: 'Anonymous',
            firstName: 'Anonymous',
            lastName: ' ',
            role: 'student',
          },
          creationTime: 'Fri May 31 2019 17:00:00 GMT-0700 (Pacific Daylight Time)',
        },
        {
          content: 'Still think there is not enough time to finish the project in week 9. Really need another week to work on.',
          author: {
            username: 'Anonymous',
            firstName: 'Anonymous',
            lastName: ' ',
            role: 'student',
          },
          creationTime: 'Fri May 17 2019 17:00:00 GMT-0700 (Pacific Daylight Time)',
        },
        {
          content: 'Feel free to bring this up with the professor tomorrow as he would likely listen to the students more than us lowly TAs :c We will also try to convince him as well',
          author: {
            username: 'User',
            firstName: 'Davis',
            lastName: 'Cho',
            role: 'TA',
          },
          creationTime: 'Fri May 10 2019 17:00:00 GMT-0700 (Pacific Daylight Time)',
        },
      ],
    },

    {
      id: 'id',
      title: 'There are two links for submitting Midterm Presentations?',
      tags: [
        'Project',
        'Midterm presentation'
      ],
      content: 'I see two links for midterm presentation submission, 1) "Week 16"/"Midterm Presentation Slides", 2) "Homework Assignments"/"Midterm presentation slides". It hass been noted that we should submit using option #2 (@97). Just want to make sure. ',
      author: {
        username: 'User',
        firstName: 'Anonymous',
        lastName: '',
        role: 'student',
      },
      creationTime: 'Fri May 30 2019 16:36:30 GMT-0700 (Pacific Daylight Time)',
      comments: [
        {
          content: 'Please use the one under the "Midterm Presentation" section.',
          author: {
            username: 'User',
            firstName: 'Davis',
            lastName: 'Cho',
            role: 'TA',
          },
          creationTime: 'Sat May 25 2019 17:00:00 GMT-0700 (Pacific Daylight Time)',
        },
      ],
    },

    {
      id: 'id',
      title: 'The final presentation date',
      tags: [
        'Project',
        'Final presentation',
      ],
      content: 'Is it confirmed that the presentation is on May 31st or June 7th? Thanks!',
      author: {
        username: 'Anonymous',
        firstName: 'Anonymous',
        lastName: ' ',
        role: 'student',
      },
      creationTime: 'Fri June 7 2019 16:36:30 GMT-0700 (Pacific Daylight Time)',
      comments: [
        {
          content: 'We will begin them on the 31st and continue into the 7th if needed, as we need time on the 7th to do a review for the final. The order would be randomly selected. For the Gzip and Juvenile court teams, they will be presenting in class Monday of week 10, as decided by Professor Eggert. The TAs are going to be discussing with Professor Eggert tomorrow to begin making the final earlier so we can begin final review this week so more teams can do final presentations next week instead.',
          author: {
            username: 'User',
            firstName: 'Davis',
            lastName: 'Cho',
            role: 'TA',
          },
          creationTime: 'Fri May 24 2019 17:00:00 GMT-0700 (Pacific Daylight Time)',
        },
        {
          content: 'Compared to covering the materials of the last two lectures in the final review, it is much more preferable to do the presentations on Week 10.',
          author: {
            username: 'Anonymous',
            firstName: 'Anonymous',
            lastName: ' ',
            role: 'student',
          },
          creationTime: 'Fri May 31 2019 17:00:00 GMT-0700 (Pacific Daylight Time)',
        },
        {
          content: 'Still think there is not enough time to finish the project in week 9. Really need another week to work on.',
          author: {
            username: 'Anonymous',
            firstName: 'Anonymous',
            lastName: ' ',
            role: 'student',
          },
          creationTime: 'Fri May 17 2019 17:00:00 GMT-0700 (Pacific Daylight Time)',
        },
        {
          content: 'Feel free to bring this up with the professor tomorrow as he would likely listen to the students more than us lowly TAs :c We will also try to convince him as well',
          author: {
            username: 'User',
            firstName: 'Davis',
            lastName: 'Cho',
            role: 'TA',
          },
          creationTime: 'Fri May 10 2019 17:00:00 GMT-0700 (Pacific Daylight Time)',
        },
      ],
    },

    {
      id: 'id',
      title: 'The final presentation date',
      tags: [
        'Project',
        'Final presentation',
      ],
      content: 'Is it confirmed that the presentation is on May 31st or June 7th? Thanks!',
      author: {
        username: 'Anonymous',
        firstName: 'Anonymous',
        lastName: ' ',
        role: 'student',
      },
      creationTime: 'Fri June 7 2019 16:36:30 GMT-0700 (Pacific Daylight Time)',
      comments: [
        {
          content: 'We will begin them on the 31st and continue into the 7th if needed, as we need time on the 7th to do a review for the final. The order would be randomly selected. For the Gzip and Juvenile court teams, they will be presenting in class Monday of week 10, as decided by Professor Eggert. The TAs are going to be discussing with Professor Eggert tomorrow to begin making the final earlier so we can begin final review this week so more teams can do final presentations next week instead.',
          author: {
            username: 'User',
            firstName: 'Davis',
            lastName: 'Cho',
            role: 'TA',
          },
          creationTime: 'Fri May 24 2019 17:00:00 GMT-0700 (Pacific Daylight Time)',
        },
        {
          content: 'Compared to covering the materials of the last two lectures in the final review, it is much more preferable to do the presentations on Week 10.',
          author: {
            username: 'Anonymous',
            firstName: 'Anonymous',
            lastName: ' ',
            role: 'student',
          },
          creationTime: 'Fri May 31 2019 17:00:00 GMT-0700 (Pacific Daylight Time)',
        },
        {
          content: 'Still think there is not enough time to finish the project in week 9. Really need another week to work on.',
          author: {
            username: 'Anonymous',
            firstName: 'Anonymous',
            lastName: ' ',
            role: 'student',
          },
          creationTime: 'Fri May 17 2019 17:00:00 GMT-0700 (Pacific Daylight Time)',
        },
        {
          content: 'Feel free to bring this up with the professor tomorrow as he would likely listen to the students more than us lowly TAs :c We will also try to convince him as well',
          author: {
            username: 'User',
            firstName: 'Davis',
            lastName: 'Cho',
            role: 'TA',
          },
          creationTime: 'Fri May 10 2019 17:00:00 GMT-0700 (Pacific Daylight Time)',
        },
      ],
    },

  ],
  
  quizzes: [
    {
      id: 'id',
      name: 'Quiz for 5/15',
      questions: [
        {
          title: 'Agree or disagree: White-box testing is typically more cost-effective than black-box testing for testing the security of applications like my.ucla.edu.',
          text: '',
          responseType: 'choices',
          responseChoices: [
            'Agree',
            'Disagree',
            'I do not know',
          ],
        },
        {
          title: 'Please justify: For software reliability in an application like onboard communication and life-support software for the Deep Space Transport, N-version programming is overall more cost-effective than spending the same amount of money improving the reliability of a 1-version program.',
          text: '',
          responseType: 'string',
        },
        {
          title: 'Please justify: Formal methods are typically practical only for safety-critical applications, or for applications with an enormous number of users.',
          text: '',
          responseType: 'string',
        },
      ],
      startTime: 'Fri May 15 2019 21:00:00 GMT-0700 (Pacific Daylight Time)',
      endTime: 'Fri May 15 2019 21:00:05 GMT-0700 (Pacific Daylight Time)',
      openToRoles: [
        'TA',
        'student',
      ],
      resultVisibleToRoles: [
        'TA',
        'student',
      ],
      secret: 'pass',
    },

    {
      id: 'id',
      name: 'Quiz for 5/13',
      questions: [
        {
          title: 'Agree or disagree: White-box testing is typically more cost-effective than black-box testing for testing the security of applications like my.ucla.edu.',
          text: '',
          responseType: 'choices',
          responseChoices: [
            'Agree',
            'Disagree',
            'I do not know',
          ],
        },
        {
          title: 'Please justify: For software reliability in an application like onboard communication and life-support software for the Deep Space Transport, N-version programming is overall more cost-effective than spending the same amount of money improving the reliability of a 1-version program.',
          text: '',
          responseType: 'string',
        },
        {
          title: 'Please justify: Formal methods are typically practical only for safety-critical applications, or for applications with an enormous number of users.',
          text: '',
          responseType: 'string',
        },
      ],
      startTime: 'Fri May 15 2019 21:00:00 GMT-0700 (Pacific Daylight Time)',
      endTime: 'Fri May 15 2019 21:00:05 GMT-0700 (Pacific Daylight Time)',
      openToRoles: [
        'TA',
        'student',
      ],
      resultVisibleToRoles: [
        'TA',
        'student',
      ],
      secret: 'pass',
    },

    {
      id: 'id',
      name: 'Quiz for 5/8',
      questions: [
        {
          title: 'Agree or disagree: A native application is typically more trouble to design and maintain than an equivalent web application.',
          text: '',
          responseType: 'choices',
          responseChoices: [
            'Agree',
            'Disagree',
            'I do not know',
          ],
        },
        {
          title: 'Please justify: Experienced-based cost modeling is typically a better choice than algorithmic cost modeling when developing factory-floor software applications for a high-tech manufacturing firm like SpaceX.',
          text: '',
          responseType: 'string',
        },
        {
          title: 'Please justify: A project team in this course should have a single technical leader who manages the project.',
          text: '',
          responseType: 'string',
        },
      ],
      startTime: 'Fri May 15 2019 21:00:00 GMT-0700 (Pacific Daylight Time)',
      endTime: 'Fri May 15 2019 21:00:05 GMT-0700 (Pacific Daylight Time)',
      openToRoles: [
        'TA',
        'student',
      ],
      resultVisibleToRoles: [
        'TA',
        'student',
      ],
      secret: 'pass',
    },

    {
      id: 'id',
      name: 'Quiz for 5/6',
      questions: [
        {
          title: 'Agree or disagree: White-box testing is typically more cost-effective than black-box testing for testing the security of applications like my.ucla.edu.',
          text: '',
          responseType: 'choices',
          responseChoices: [
            'Agree',
            'Disagree',
            'I do not know',
          ],
        },
        {
          title: 'Please justify: For software reliability in an application like onboard communication and life-support software for the Deep Space Transport, N-version programming is overall more cost-effective than spending the same amount of money improving the reliability of a 1-version program.',
          text: '',
          responseType: 'string',
        },
        {
          title: 'Please justify: Formal methods are typically practical only for safety-critical applications, or for applications with an enormous number of users.',
          text: '',
          responseType: 'string',
        },
      ],
      startTime: 'Fri May 15 2019 21:00:00 GMT-0700 (Pacific Daylight Time)',
      endTime: 'Fri May 15 2019 21:00:05 GMT-0700 (Pacific Daylight Time)',
      openToRoles: [
        'TA',
        'student',
      ],
      resultVisibleToRoles: [
        'TA',
        'student',
      ],
      secret: 'pass',
    },

    {
      id: 'id',
      name: 'Quiz for 5/22',
      questions: [
        {
          title: 'Agree or disagree: A native application is typically more trouble to design and maintain than an equivalent web application.',
          text: '',
          responseType: 'choices',
          responseChoices: [
            'Agree',
            'Disagree',
            'I do not know',
          ],
        },
        {
          title: 'Please justify: Experienced-based cost modeling is typically a better choice than algorithmic cost modeling when developing factory-floor software applications for a high-tech manufacturing firm like SpaceX.',
          text: '',
          responseType: 'string',
        },
        {
          title: 'Please justify: A project team in this course should have a single technical leader who manages the project.',
          text: '',
          responseType: 'string',
        },
      ],
      startTime: 'Fri May 15 2019 21:00:00 GMT-0700 (Pacific Daylight Time)',
      endTime: 'Fri May 15 2019 21:00:05 GMT-0700 (Pacific Daylight Time)',
      openToRoles: [
        'TA',
        'student',
      ],
      resultVisibleToRoles: [
        'TA',
        'student',
      ],
      secret: 'pass',
    },

    {
      id: 'id',
      name: 'Quiz for 5/20',
      questions: [
        {
          title: 'Agree or disagree: White-box testing is typically more cost-effective than black-box testing for testing the security of applications like my.ucla.edu.',
          text: '',
          responseType: 'choices',
          responseChoices: [
            'Agree',
            'Disagree',
            'I do not know',
          ],
        },
        {
          title: 'Please justify: For software reliability in an application like onboard communication and life-support software for the Deep Space Transport, N-version programming is overall more cost-effective than spending the same amount of money improving the reliability of a 1-version program.',
          text: '',
          responseType: 'string',
        },
        {
          title: 'Please justify: Formal methods are typically practical only for safety-critical applications, or for applications with an enormous number of users.',
          text: '',
          responseType: 'string',
        },
      ],
      startTime: 'Fri May 15 2019 21:00:00 GMT-0700 (Pacific Daylight Time)',
      endTime: 'Fri May 15 2019 21:00:05 GMT-0700 (Pacific Daylight Time)',
      openToRoles: [
        'TA',
        'student',
      ],
      resultVisibleToRoles: [
        'TA',
        'student',
      ],
      secret: 'pass',
    },

    {
      id: 'id',
      name: 'Quiz for 5/29',
      questions: [
        {
          title: 'Agree or disagree: A native application is typically more trouble to design and maintain than an equivalent web application.',
          text: '',
          responseType: 'choices',
          responseChoices: [
            'Agree',
            'Disagree',
            'I do not know',
          ],
        },
        {
          title: 'Please justify: Experienced-based cost modeling is typically a better choice than algorithmic cost modeling when developing factory-floor software applications for a high-tech manufacturing firm like SpaceX.',
          text: '',
          responseType: 'string',
        },
        {
          title: 'Please justify: A project team in this course should have a single technical leader who manages the project.',
          text: '',
          responseType: 'string',
        },
      ],
      startTime: 'Fri May 15 2019 21:00:00 GMT-0700 (Pacific Daylight Time)',
      endTime: 'Fri May 15 2019 21:00:05 GMT-0700 (Pacific Daylight Time)',
      openToRoles: [
        'TA',
        'student',
      ],
      resultVisibleToRoles: [
        'TA',
        'student',
      ],
      secret: 'pass',
    },

    {
      id: 'id',
      name: 'Quiz for 5/27',
      questions: [
        {
          title: 'Agree or disagree: White-box testing is typically more cost-effective than black-box testing for testing the security of applications like my.ucla.edu.',
          text: '',
          responseType: 'choices',
          responseChoices: [
            'Agree',
            'Disagree',
            'I do not know',
          ],
        },
        {
          title: 'Please justify: For software reliability in an application like onboard communication and life-support software for the Deep Space Transport, N-version programming is overall more cost-effective than spending the same amount of money improving the reliability of a 1-version program.',
          text: '',
          responseType: 'string',
        },
        {
          title: 'Please justify: Formal methods are typically practical only for safety-critical applications, or for applications with an enormous number of users.',
          text: '',
          responseType: 'string',
        },
      ],
      startTime: 'Fri May 15 2019 21:00:00 GMT-0700 (Pacific Daylight Time)',
      endTime: 'Fri May 15 2019 21:00:05 GMT-0700 (Pacific Daylight Time)',
      openToRoles: [
        'TA',
        'student',
      ],
      resultVisibleToRoles: [
        'TA',
        'student',
      ],
      secret: 'pass',
    },


    {
      id: 'id',
      name: 'Quiz for 6/8',
      questions: [
        {
          title: 'Agree or disagree: Developers should strongly prefer inheritance to delegation.',
          text: '',
          responseType: 'choices',
          responseChoices: [
            'Agree',
            'Disagree',
            'I do not know',
          ],
        },
        {
          title: 'Please justify: Experienced-based cost modeling is typically a better choice than algorithmic cost modeling when developing factory-floor software applications for a high-tech manufacturing firm like SpaceX.',
          text: '',
          responseType: 'string',
        },
        {
          title: 'Please justify: A project team in this course should have a single technical leader who manages the project.',
          text: '',
          responseType: 'string',
        },
      ],
      startTime: 'Fri June 8 2019 21:00:00 GMT-0700 (Pacific Daylight Time)',
      endTime: 'Fri June 8 2019 21:00:05 GMT-0700 (Pacific Daylight Time)',
      openToRoles: [
        'TA',
        'student',
      ],
      resultVisibleToRoles: [
        'TA',
        'student',
      ],
      secret: 'pass',
    },

    {
      id: 'id',
      name: 'Quiz for 6/10',
      questions: [
        {
          title: 'Agree or disagree: Developers should strongly prefer inheritance to delegation.',
          text: '',
          responseType: 'choices',
          responseChoices: [
            'Agree',
            'Disagree',
            'I do not know',
          ],
        },
        {
          title: 'Please justify: Experienced-based cost modeling is typically a better choice than algorithmic cost modeling when developing factory-floor software applications for a high-tech manufacturing firm like SpaceX.',
          text: '',
          responseType: 'string',
        },
        {
          title: 'Please justify: A project team in this course should have a single technical leader who manages the project.',
          text: '',
          responseType: 'string',
        },
      ],
      startTime: 'Fri June 8 2019 21:00:00 GMT-0700 (Pacific Daylight Time)',
      endTime: 'Fri June 8 2019 21:00:05 GMT-0700 (Pacific Daylight Time)',
      openToRoles: [
        'TA',
        'student',
      ],
      resultVisibleToRoles: [
        'TA',
        'student',
      ],
      secret: 'pass',
    },

    {
      id: 'id',
      name: 'Quiz for 6/12',
      questions: [
        {
          title: 'Agree or disagree: Developers should strongly prefer inheritance to delegation.',
          text: '',
          responseType: 'choices',
          responseChoices: [
            'Agree',
            'Disagree',
            'I do not know',
          ],
        },
        {
          title: 'Please justify: Experienced-based cost modeling is typically a better choice than algorithmic cost modeling when developing factory-floor software applications for a high-tech manufacturing firm like SpaceX.',
          text: '',
          responseType: 'string',
        },
        {
          title: 'Please justify: A project team in this course should have a single technical leader who manages the project.',
          text: '',
          responseType: 'string',
        },
      ],
      startTime: 'Fri June 8 2019 21:00:00 GMT-0700 (Pacific Daylight Time)',
      endTime: 'Fri June 8 2019 21:00:05 GMT-0700 (Pacific Daylight Time)',
      openToRoles: [
        'TA',
        'student',
      ],
      resultVisibleToRoles: [
        'TA',
        'student',
      ],
      secret: 'pass',
    },

    {
      id: 'id',
      name: 'Quiz for 6/15',
      questions: [
        {
          title: 'Agree or disagree: Developers should strongly prefer inheritance to delegation.',
          text: '',
          responseType: 'choices',
          responseChoices: [
            'Agree',
            'Disagree',
            'I do not know',
          ],
        },
        {
          title: 'Please justify: Experienced-based cost modeling is typically a better choice than algorithmic cost modeling when developing factory-floor software applications for a high-tech manufacturing firm like SpaceX.',
          text: '',
          responseType: 'string',
        },
        {
          title: 'Please justify: A project team in this course should have a single technical leader who manages the project.',
          text: '',
          responseType: 'string',
        },
      ],
      startTime: 'Fri June 8 2019 21:00:00 GMT-0700 (Pacific Daylight Time)',
      endTime: 'Fri June 8 2019 21:00:05 GMT-0700 (Pacific Daylight Time)',
      openToRoles: [
        'TA',
        'student',
      ],
      resultVisibleToRoles: [
        'TA',
        'student',
      ],
      secret: 'pass',
    },

    {
      id: 'id',
      name: 'Quiz for 6/17',
      questions: [
        {
          title: 'Agree or disagree: A native application is typically more trouble to design and maintain than an equivalent web application.',
          text: '',
          responseType: 'choices',
          responseChoices: [
            'Agree',
            'Disagree',
            'I do not know',
          ],
        },
        {
          title: 'Please justify: Formal methods are typically practical only for safety-critical applications, or for applications with an enormous number of users.',
          text: '',
          responseType: 'string',
        },
        {
          title: 'Please justify: A project team in this course should have a single technical leader who manages the project.',
          text: '',
          responseType: 'string',
        },
      ],
      startTime: 'Fri June 7 2019 15:00:00 GMT-0700 (Pacific Daylight Time)',
      endTime: 'Fri June 7 2019 15:00:05 GMT-0700 (Pacific Daylight Time)',
      openToRoles: [
        'TA',
        'student',
      ],
      resultVisibleToRoles: [
        'TA',
        'student',
      ],
      secret: 'pass',
    },

    {
      id: 'id',
      name: 'Quiz for 6/7',
      questions: [
        {
          title: 'Agree or disagree: A native application is typically more trouble to design and maintain than an equivalent web application.',
          text: '',
          responseType: 'choices',
          responseChoices: [
            'Agree',
            'Disagree',
            'I do not know',
          ],
        },
        {
          title: 'Please justify: Formal methods are typically practical only for safety-critical applications, or for applications with an enormous number of users.',
          text: '',
          responseType: 'string',
        },
        {
          title: 'Please justify: A project team in this course should have a single technical leader who manages the project.',
          text: '',
          responseType: 'string',
        },
      ],
      startTime: 'Fri June 7 2019 15:00:00 GMT-0700 (Pacific Daylight Time)',
      endTime: 'Fri June 7 2019 15:00:05 GMT-0700 (Pacific Daylight Time)',
      openToRoles: [
        'TA',
        'student',
      ],
      resultVisibleToRoles: [
        'TA',
        'student',
      ],
      secret: 'pass',
    },

    {
      id: 'id',
      name: 'Quiz for 6/7',
      questions: [
        {
          title: 'Agree or disagree: A native application is typically more trouble to design and maintain than an equivalent web application.',
          text: '',
          responseType: 'choices',
          responseChoices: [
            'Agree',
            'Disagree',
            'I do not know',
          ],
        },
        {
          title: 'Please justify: Formal methods are typically practical only for safety-critical applications, or for applications with an enormous number of users.',
          text: '',
          responseType: 'string',
        },
        {
          title: 'Please justify: A project team in this course should have a single technical leader who manages the project.',
          text: '',
          responseType: 'string',
        },
      ],
      startTime: 'Fri June 7 2019 15:00:00 GMT-0700 (Pacific Daylight Time)',
      endTime: 'Fri June 7 2019 15:00:05 GMT-0700 (Pacific Daylight Time)',
      openToRoles: [
        'TA',
        'student',
      ],
      resultVisibleToRoles: [
        'TA',
        'student',
      ],
      secret: 'pass',
    },

    {
      id: 'id',
      name: 'Quiz for 6/7',
      questions: [
        {
          title: 'Agree or disagree: A native application is typically more trouble to design and maintain than an equivalent web application.',
          text: '',
          responseType: 'choices',
          responseChoices: [
            'Agree',
            'Disagree',
            'I do not know',
          ],
        },
        {
          title: 'Please justify: Formal methods are typically practical only for safety-critical applications, or for applications with an enormous number of users.',
          text: '',
          responseType: 'string',
        },
        {
          title: 'Please justify: A project team in this course should have a single technical leader who manages the project.',
          text: '',
          responseType: 'string',
        },
      ],
      startTime: 'Fri June 7 2019 15:00:00 GMT-0700 (Pacific Daylight Time)',
      endTime: 'Fri June 7 2019 15:00:05 GMT-0700 (Pacific Daylight Time)',
      openToRoles: [
        'TA',
        'student',
      ],
      resultVisibleToRoles: [
        'TA',
        'student',
      ],
      secret: 'pass',
    },

    {
      id: 'id',
      name: 'Quiz for 6/7',
      questions: [
        {
          title: 'Agree or disagree: A native application is typically more trouble to design and maintain than an equivalent web application.',
          text: '',
          responseType: 'choices',
          responseChoices: [
            'Agree',
            'Disagree',
            'I do not know',
          ],
        },
        {
          title: 'Please justify: Formal methods are typically practical only for safety-critical applications, or for applications with an enormous number of users.',
          text: '',
          responseType: 'string',
        },
        {
          title: 'Please justify: A project team in this course should have a single technical leader who manages the project.',
          text: '',
          responseType: 'string',
        },
      ],
      startTime: 'Fri June 7 2019 15:00:00 GMT-0700 (Pacific Daylight Time)',
      endTime: 'Fri June 7 2019 15:00:05 GMT-0700 (Pacific Daylight Time)',
      openToRoles: [
        'TA',
        'student',
      ],
      resultVisibleToRoles: [
        'TA',
        'student',
      ],
      secret: 'pass',
    },

  ],
  enrolledUsers: [
    {
      firstName: 'Yifei',
      lastName: 'Fu',
      uid: '5930492943',
      email: 'yf@g.com',
      username: 'xiazz',
      role: 'student',
    },
  ],
};
