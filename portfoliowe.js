/* Reset styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Global styles */
body {
  font-family: 'Poppins', sans-serif;
  line-height: 1.6;
  color: #333;
  background: linear-gradient(135deg, #f3f4f6, #ffffff);
  cursor: auto;
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header styles */
header {
  background-color: #6c63ff;
  color: #fff;
  padding: 20px;
  position: fixed;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo a {
  color: #fff;
  text-decoration: none;
  font-size: 24px;
  font-weight: bold;
  transition: color 0.3s ease;
}

.logo a:hover {
  color: #ffd700;
}

.nav-links {
  list-style: none;
  display: flex;
}

.nav-links li {
  margin-left: 20px;
}

.nav-links li a {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease, transform 0.3s ease;
}

.nav-links li a:hover {
  color: #ffd700;
  transform: scale(1.1);
}

.menu-btn {
  display: none;
  cursor: pointer;
}

/* Section styles */
.section {
  padding: 100px 0;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.section.fade-in {
  opacity: 1;
  transform: translateY(0);
}

.section h2 {
  text-align: center;
  margin-bottom: 40px;
  color: #6c63ff;
  text-transform: uppercase;
  letter-spacing: 2px;
}

/* Hero section styles */
#hero {
  background: linear-gradient(135deg, #6c63ff, #4a47ff);
  color: #fff;
  text-align: center;
  padding: 150px 0;
  position: relative;
  overflow: hidden;
}

.animated-text {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 1s ease forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.floating-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.shape {
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.1);
  position: absolute;
  animation: float 8s ease-in-out infinite;
  border-radius: 50%;
}

.shape1 {
  top: 10%;
  left: 20%;
  animation-delay: 0s;
}

.shape2 {
  top: 40%;
  left: 60%;
  animation-delay: 2s;
}

.shape3 {
  top: 70%;
  left: 30%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(45deg);
  }
}

/* About section styles */
.about-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.about-text {
  flex: 1;
}

.about-image {
  flex: 1;
}

.about-image img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Project styles */
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.project {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.project:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.project h3 {
  margin-bottom: 15px;
  color: #6c63ff;
}

.project img {
  max-width: 100%;
  height: 150px;
  object-fit: contain;
  margin-bottom: 15px;
}

.project ul {
  padding-left: 20px;
}

/* Experience styles */
.experience-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.experience {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.experience:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.experience h3 {
  margin-bottom: 15px;
  color: #6c63ff;
}

.experience img {
  max-width: 100%;
  height: 100px;
  object-fit: contain;
  margin-bottom: 15px;
}

.experience ul {
  padding-left: 20px;
}

/* Volunteering styles */
.volunteering-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.volunteering {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.volunteering:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.volunteering h3 {
  margin-bottom: 15px;
  color: #6c63ff;
}

.volunteering img {
  max-width: 100%;
  height: 100px;
  object-fit: contain;
  margin-bottom: 15px;
}

.volunteering ul {
  padding-left: 20px;
}

/* Certifications styles */
.certifications-list {
  list-style-type: none;
  padding: 0;
}

.certifications-list li {
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.certifications-list li:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* Publications styles */
.publication {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.publication:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.publication p {
  font-size: 16px;
  line-height: 1.6;
}

/* Contact section styles */
.social-links {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.social-links a {
  color: #6c63ff;
  font-size: 24px;
  transition: color 0.3s ease, transform 0.3s ease;
}

.social-links a:hover {
  color: #ffd700;
  transform: scale(1.2);
}

/* Download Resume Button */
.download-resume {
  text-align: center;
}

.download-btn {
  display: inline-block;
  padding: 12px 24px;
  color: #fff;
  background-color: #6c63ff;
  text-decoration: none;
  border-radius: 30px;
  margin: 20px 0;
  transition: background-color 0.3s ease, transform 0.3s ease;
  font-weight: 600;
}

.download-btn:hover {
  background-color: #ffd700;
  color: #333;
  transform: scale(1.05);
}

/* Footer styles */
footer {
  background-color: #6c63ff;
  color: #fff;
  text-align: center;
  padding: 20px;
}

/* Scroll to top button */
.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #6c63ff;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 24px;
  cursor: pointer;
  display: none;
  transition: background-color 0.3s ease;
  z-index: 1000;
}

.scroll-to-top:hover {
  background-color: #ffd700;
}

/* Responsive styles */
@media (max-width: 768px) {
  .menu-btn {
    display: block;
  }

  .nav-links {
    display: none;
    flex-direction: column;
    width: 100%;
    text-align: center;
    padding-top: 20px;
    background-color: #6c63ff;
    position: absolute;
    top: 100%;
    left: 0;
  }

  .nav-links li {
    margin: 10px 0;
  }

  .nav-links.active {
    display: flex;
  }

  .about-content {
    flex-direction: column;
  }

  .about-text {
    margin-right: 0;
    margin-bottom: 20px;
  }

  .project-grid,
  .experience-grid,
  .volunteering-grid {
    grid-template-columns: 1fr;
  }
}
