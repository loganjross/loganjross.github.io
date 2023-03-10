window.addEventListener('load', handleInit);
window.addEventListener('hashchange', handleNavigation);

const ANIMATION_TIMEOUT = 300;

let isInit = false;

const projects = [
  {
    name: 'Phoenix',
    companyDescription:
      "Ellipsis Labs is the team behind Phoenix, a decentralized limit order book built on Solana that's fully on-chain, non-custodial and crank-less.",
    jobDescription:
      'I designed and developed the entirety of their user-facing product from the ground up as a solo engineer. This included a highly polished Swaps interface, a striking Data interface, and a lightweight TypeScript SDK for interacting with their on-chain programs.',
    uniqueTechElements: ['<b>web3.js</b>', '<i class="fa-brands fa-rust"></i>'],
    link: 'ellipsislabs.xyz',
    visualFilename: 'phoenix-ui.gif',
  },
  {
    name: 'Slide',
    companyDescription:
      'Slide is a UX-focused custodial wallet and NFT payment rail for non-native crypto users.',
    jobDescription:
      "I restructured and rebuilt their TypeScript and React client SDK's while designing many core product features for their Polygon wallet. The feature I'm most proud of working on is their credit card based NFT checkout. For this, I played an important role in resolving some of the many UX frustrations associated with web3 payments.",
    uniqueTechElements: ['<b>ethers.js</b>'],
    link: 'slide.so',
    visualFilename: 'slide-ui.gif',
  },
  {
    name: 'Jet Protocol',
    companyDescription:
      'Jet is a decentralized lending and borrowing protocol built on Solana.',
    jobDescription: "As the first employee, I created the entirety of the V1 lending protocol's user interface and TypeScript SDK. Before leaving Jet, I also designed important features such as margin trading through Serum, what I called 'leveraged' swaps through Orca, and a custom component library which reduced development time greatly for newly on-boarded developers.",
    uniqueTechElements: ['<b>web3.js</b>', '<i class="fa-brands fa-rust"></i>'],
    link: 'jetprotocol.io',
    visualFilename: 'jet-ui.gif',
  },
  {
    name: 'Dealr',
    companyDescription:
      "Dealr is a cloud-based software that allows you to run your car dealership's website, inventory management, lead follow-up, and deal closings all in one system",
    jobDescription:
      "I created a composable and easy-to-use website CMS that integrated with Dealr's cloud-based dealership management platform. During my time here I was also responsible for the specification and implementation of widely requested features from customers, bug fixes, and overall code maintenance/refactoring.",
    uniqueTechElements: [
      '<i class="fa-brands fa-vuejs"></i>',
      '<i class="fa-brands fa-angular"></i>',
      '<b>MySQL</b>',
    ],
    link: 'dealr.cloud',
    visualFilename: 'dealr-ui.gif',
  },
];

function handleNavigation() {
  const hash = window.location.hash;
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (hash) {
    sections.forEach((section) => {
      if (section.getAttribute('id') === hash.replace('#', '')) {
        setTimeout(
          () => {
            section.classList.add('active');
          },
          isInit ? ANIMATION_TIMEOUT : 0
        );
      } else {
        section.classList.remove('active');
      }
    });
    navLinks.forEach((link) => {
      if (link.getAttribute('href') === hash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    const projectButtonsContainer = document.querySelector(
      'nav .project-buttons'
    );
    if (hash === '#projects') {
      projectButtonsContainer.classList.remove('hidden');

      const currentProjectName = document.querySelector(
        '#projects .project-info h2'
      ).innerHTML;
      if (currentProjectName) {
        const currentIndex = projects.findIndex(
          (project) => project.name === currentProjectName
        );
        for (let i = 0; i < projectButtonsContainer.children.length; i++) {
          const button = projectButtonsContainer.children[i];
          if (+button.dataset.projectIndex === currentIndex) {
            button.classList.add('active');
          }
        }
      } else {
        projectButtonsContainer.children[0].classList.add('active');
      }
    } else {
      projectButtonsContainer.classList.add('hidden');
    }
  } else {
    sections[0].classList.add('active');
    navLinks[0].classList.add('active');
  }

  // const bgImg = document.querySelector('.bg-img');
  // if (!window.location.hash || window.location.hash === '#home') {
  //   bgImg.classList.remove('blur');
  // } else {
  //   bgImg.classList.add('blur');
  // }

  if (!isInit) isInit = true;
}

function handleInit() {
  handleNavigation();

  const projectInfo = document.querySelector('#projects .project-info')
    .children[0];
  const projectVisual = document.querySelector(
    '#projects .project-visuals .screen-container'
  );
  const uniqueTechElements = document.querySelector(
    '#projects .project-info .unique-tech-stack'
  );
  projectInfo.children[1].innerHTML = projects[0].name;
  projectInfo.children[2].innerHTML = projects[0].link;
  projectInfo.children[2].href = 'https://' + projects[0].link;
  projectInfo.children[3].innerHTML = projects[0].companyDescription;
  projectInfo.children[4].innerHTML = projects[0].jobDescription;
  for (let i = 0; i < projects[0].uniqueTechElements.length; i++) {
    const element = projects[0].uniqueTechElements[i];
    const container = document.createElement('span');
    container.innerHTML = element;
    uniqueTechElements.appendChild(container);
  }
  projectVisual.children[0].src = `./assets/${projects[0].visualFilename}`;

  const projectButtons = document.querySelectorAll('nav .project-buttons a');
  projectButtons.forEach((button) => {
    const projectIndex = button.dataset.projectIndex;
    button.addEventListener('click', () => {
      while (uniqueTechElements.firstChild) {
        uniqueTechElements.removeChild(uniqueTechElements.firstChild);
      }

      const project = projects[projectIndex];
      for (let i = 0; i < project.uniqueTechElements.length; i++) {
        const element = project.uniqueTechElements[i];
        const container = document.createElement('span');
        container.innerHTML = element;
        uniqueTechElements.appendChild(container);
      }

      for (let i = 0; i < projectInfo.children.length; i++) {
        const child = projectInfo.children[i];
        if (i === 0 || i === projectInfo.children.length - 1) continue;
        if (i === 1) {
          child.innerHTML = project.name;
        }
        if (i === 2) {
          child.innerHTML = project.link;
          child.href = "https://" + project.link;
        }
        if (i === 3) {
          child.innerHTML = project.companyDescription;
        }
        if (i === 4) {
          child.innerHTML = project.jobDescription;
        }

        child.classList.add('wipe');
        setTimeout(() => child.classList.remove('wipe'), ANIMATION_TIMEOUT);
      }

      projectVisual.classList.add('wipe');
      projectVisual.children[0].src = `./assets/${project.visualFilename}`;
      setTimeout(
        () => projectVisual.classList.remove('wipe'),
        ANIMATION_TIMEOUT
      );
      projectButtons.forEach((b) => b.classList.remove('active'));
      button.classList.add('active');
    });
  });
}
