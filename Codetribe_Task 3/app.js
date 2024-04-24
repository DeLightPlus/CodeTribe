const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar_menu');
const navLogo = document.querySelector('#navbar_logo');

// Display Mobile Menu
const mobileMenu = () => {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
};

menu.addEventListener('click', mobileMenu);

// Show active menu when scrolling
const highlightMenu = () => {
  const elem = document.querySelector('.highlight');
  const homeMenu = document.querySelector('#home-page');
  const aboutMenu = document.querySelector('#about-page');
  const projectsMenu = document.querySelector('#projects-page');
  let scrollPos = window.scrollY;
  // console.log(scrollPos);

  // adds 'highlight' class to my menu items
  if (window.innerWidth > 960 && scrollPos < 600) 
  {
    homeMenu.classList.add('highlight');
    aboutMenu.classList.remove('highlight');
    return;
  } 
  else if (window.innerWidth > 960 && scrollPos < 1400) 
  {
    aboutMenu.classList.add('highlight');
    homeMenu.classList.remove('highlight');
    resumeMenu.classList.remove('highlight');
    return;
  } 
  else if (window.innerWidth > 960 && scrollPos < 2345)
  {
    servicesMenu.classList.add('highlight');
    aboutMenu.classList.remove('highlight');
    return;
  }

  if ((elem && window.innerWIdth < 960 && scrollPos < 600) || elem) 
  {
    elem.classList.remove('highlight');
  }
};

window.addEventListener('scroll', highlightMenu);
window.addEventListener('click', highlightMenu);

//  Close mobile Menu when clicking on a menu item
const hideMobileMenu = () => {
  const menuBars = document.querySelector('.is-active');
  if (window.innerWidth <= 768 && menuBars) {
    menu.classList.toggle('is-active');
    menuLinks.classList.remove('active');
  }
};

menuLinks.addEventListener('click', hideMobileMenu);
navLogo.addEventListener('click', hideMobileMenu);

//////////////////////////////////////////////////////////
////////// - - - Load Projects - - - //////////
///////////////////////////////////////////////////////////
window.addEventListener(('load'), ()=>
{
  loadProjects();
})

function loadProjects()
{
  const projects = [
                      {
                          picture:"Images/icons/github.png",
                          projectName: 'CodeTribe: Week 1',
                          techStacks: ['HTML', ' CSS'],
                          description: 'More ...'
                      },
                      {
                          picture:"Images/icons/github.png",
                          projectName: 'CodeTribe: Week 2',
                          techStacks: ['HTML', ' CSS'],
                          description: 'More ...'
                      },
                      {
                          picture:"Images/icons/github.png",
                          projectName: 'CodeTribe: Week 3',
                          techStacks: ['HTML', ' CSS', ' JavaScript'],
                          description: 'More ...'
                      }
                   ];

  const projectsWrapper = document.getElementById('projs_wrapper');

  


  projects.forEach((project)=>
  {
    const projectContainer = document.createElement('div');
    projectContainer.classList.add('project_card');
    projectContainer.innerHTML = `
                                      <div class='project_card'>
                                        <img src=${project.picture}>
                                        <h2>${project.projectName}</h2>
                                        <p>${project.techStacks}</p>
                                        <div class='projects_btn'><button>${project.description}</button></div>
                                      </div>     
                                  `;
    projectsWrapper.appendChild(projectContainer);
  })

}


//////////////////////////////////////////////////////////
//////////   Contact Form //////////
///////////////////////////////////////////////////////////

//Validate data ---------------------------------------------------
function validateForm(event)
{
  event.preventDefault();

  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const msgInput = document.getElementById("msg");

  const isEmailValid = emailInput.value.trim() !== ''
                         && emailInput.validity.valid;

  let isSubjectValid = subjectInput.value.trim() !== '';

  let isMsgValid = msgInput.value.trim() !== '';

  const isFormValid = isEmailValid && isMsgValid;

  if(isFormValid)
  {
      const formData = new FormData(event.target);
      const response = fetch('https://formspree.io/f/xleqajoy',
        {
            method: 'POST', body: formData, 
            headers:{'Accept': 'application/json'}
        }
      ).then( response => response.json()).then( data =>
        {
         console.log(data);
         if(data.ok)
         {
            ///alert('Email Successfully sent'); 
            const suc =  document.getElementById("suc");
            const sucSpan = document.createElement('span');

            sucSpan.innerText = ' Email Successfully sent ';
            suc.appendChild(sucSpan);
         }
        })
   
  }
  else
  {
   // alert('form invalid');
        if(isEmailValid !== true)
        {
            const emailLabel = document.getElementById("email_label");
            const emailSpan = document.createElement('span');

            emailSpan.innerText = ' is required!!!';
            emailLabel.appendChild(emailSpan);
        }       

        if(isMsgValid !== true)
        {
            const msgLabel = document.getElementById("msg_label");
            const msgSpan = document.createElement('span');

            msgSpan.innerText = ' is required!!!';
            msgLabel.appendChild(msgSpan);
        }
  }
}

