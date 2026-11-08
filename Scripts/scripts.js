async function getRepoLastModified(owner, repo) {
  // 1. Fixed the URL path to point to the official GitHub API endpoint
  const url = `https://api.github.com/repos/${owner}/${repo}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    const lastPush = data.pushed_at; // ISO format string: "YYYY-MM-DDTHH:MM:SSZ"
    
    const dateObj = new Date(lastPush);
    const formattedDate = `${String(dateObj.getMonth() + 1).padStart(2, '0')}/${String(dateObj.getDate()).padStart(2, '0')}/${dateObj.getFullYear()}`;
    const formattedDateLocal = `${String(new Date().getMonth() + 1).padStart(2, '0')}/${String(new Date().getDate()).padStart(2, '0')}/${new Date().getFullYear()}`;
    let formattedDateLong = null;

    if (formattedDateLocal === formattedDate) {
    formattedDateLong = dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
    formattedDateLong = 'Today at ' + formattedDateLong.split(',').pop().trim();
  } else {
    formattedDateLong = dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

    return formattedDateLong;
    
  } catch (error) {
    console.error("Error fetching repository data:", error);
  }
}

getRepoLastModified('bamslam1', 'rps').then(date => document.getElementById('rps-date').textContent = `Last modified: ${date}`).catch(err => console.error(err));

getRepoLastModified('bamslam1', 'french').then(date => document.getElementById('french-date').textContent = `Last modified: ${date}`).catch(err => console.error(err));

getRepoLastModified('bamslam1', 'french-early').then(date => document.getElementById('french-early-date').textContent = `Last modified: ${date}`).catch(err => console.error(err));
