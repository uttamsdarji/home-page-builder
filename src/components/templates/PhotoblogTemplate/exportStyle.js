let style = `.template-preview {
  font-family: Poppins;
  background: #000000;
  padding-bottom: 20px;
  position: relative;
}

.template-preview .navbar {
  background: #000000;
  position: sticky;
  width: 100%;
  z-index: 1000;
  top: 0;
}

.template-preview .navbar .navbar-brand {
  color: #ffffff;
}

.navbar-toggler {
  background-color: #fff;
  border: 1px solid #fff;
}

.navbar-toggler-icon i {
  line-height: 30px;
  font-size: 30px;
}

.navbar-nav {
  width: 100%;
  justify-content: space-around;
}

.navbar-nav .nav-link {
  color: #ffffff;
}

.navbar-nav .nav-link:hover {
  color: #df0e62;
}

.bg-image {
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
}

.site-section-hero, .site-section-hero .row {
  height: 100vh;
  min-height: 500px;
  z-index: 2;
  position: relative;
  padding: 0 15px;
}

.site-section-hero {
  position: relative;
}

.bg-image {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.site-section-hero:before {
  position: absolute;
  content: "";
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.site-section-hero, .site-section-hero .row {
  height: 100vh;
  min-height: 500px;
  z-index: 2;
  position: relative;
}

.main-content .photos .photo-item {
  position: relative;
}

.main-content .photos .photo-container {
  padding: 2px !important;
}

.main-content .photos .photo-item img {
  width: 100%;
  object-fit: cover;
  height: 300px;
  margin-bottom: 5px;
}

.main-content .photos .photo-item:after {
  position: absolute;
  content: "";
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1;
  -webkit-transition: .3s all ease;
  -o-transition: .3s all ease;
  transition: .3s all ease;
  opacity: 0;
  visibility: hidden;
}

.main-content .photos .photo-item:hover:after {
  opacity: 1;
  visibility: visible;
}

.site-section.darken-bg {
  background: #1a1a1a;
  position: relative;
}

.site-section {
  padding: 7em 0;
}

@media (min-width: 768px) {
  .site-section {
      padding: 5em 0;
  }
}

.site-section.darken-bg:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100px;
  height: 4px;
  background: #df0e62;
}

.site-section .heading {
  text-transform: uppercase;
  font-size: 4rem;
  margin-bottom: 1em;
}

#bio p {
  color: gray;
}

@media (max-width: 991.98px) {
  .site-section .heading {
      font-size: 2.5rem;
  }
}`

export default style;