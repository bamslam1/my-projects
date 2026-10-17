let isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

theme();
function theme() {
document.body.style.backgroundColor = isDark ? 'rgb(25, 25, 25)' : 'rgb(244, 243, 242)';
  document.body.style.color = isDark ? 'white' : 'black';

  document.querySelectorAll('.move-button').forEach(button => {
    button.style.borderColor = isDark ? 'white' : 'black';
  });

  document.querySelectorAll('.reset-score-button').forEach(button => {
    button.style.backgroundColor = isDark ? 'white' : 'black';
    button.style.color = isDark ? 'black' : 'white';
  });
};