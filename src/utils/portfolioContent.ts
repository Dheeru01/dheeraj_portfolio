
export const getLivePortfolioContent = (): string => {
  const sections = document.querySelectorAll("section, .section, .projects-container, .skills, .resume, .certifications, [id*='hero'], [id*='about'], [id*='skills'], [id*='projects'], [id*='resume'], [id*='contact']");
  let content = "";

  sections.forEach(sec => {
    const element = sec as HTMLElement;
    const text = element.innerText?.trim();
    if (text && text.length > 40) {
      content += "\n\n" + text;
    }
  });

  // Also try to get content from common class names
  const additionalSelectors = ['.hero', '.about', '.skills-section', '.projects-section', '.resume-section', '.contact-section'];
  additionalSelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      const htmlElement = element as HTMLElement;
      const text = htmlElement.innerText?.trim();
      if (text && text.length > 40) {
        content += "\n\n" + text;
      }
    });
  });

  return content.slice(0, 8000); // limit to 8k tokens
};
