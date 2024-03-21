import React from 'react'

function Footer() {
  return (
    <div>
      <>
  <section id="contact">
    <div className="container">
      <h1>Let's work together...</h1>
      <p>Need help with your project? Just ask!</p>
      <div className="social">
        <div>
          <a target="_blank" href="https://www.facebook.com">
            <i className="fab fa-facebook fa-1x" />
             FACEBOOK
          </a>
          <a
            id="profile-link"
            target="_blank"
            
            href='https://github.com/Saikarthikaji/React.git'
          >
            <i className="fab fa-github fa-1x" />
            GITHUB
          </a>
          <a target="_blank" href="https://twitter.com/">
            <i className="fab fa-twitter fa-1x" />
          TWITTER
          </a>
          <a href="#">
            <a target='_blank' href="https://www.google.com/gmail/about/"></a>
            <i className="fab fa-gmail fa-1x" />
           GMAIL
          </a>
          <a href="#">
            <i className="fas fa-phone fa-1x" />
            MOBILE NUMBER
          </a>
        </div>
      </div>
    </div>
  </section>
  <footer id="main-footer">
    <div className="container">
      <p>© Copyright Free</p>
    </div>
  </footer>
</>

    </div>
  )
}

export default Footer;
