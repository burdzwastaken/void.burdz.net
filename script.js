let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiPosition = 0;

document.addEventListener('DOMContentLoaded', () => {
  const fetchBlogPosts = async () => {
    try {
      const posts = [
        {file: '2025-04-15-world-hello.md', title: 'World Hello? Resources Goodbye!', date: '2025-04-15'}
      ];

      const blogContainer = document.getElementById('blog-posts');
      if (posts.length === 0) return;

      blogContainer.innerHTML = '';

      // just show nine posts?
      for (const post of posts.slice(0, 9)) {
        try {
          const response = await fetch(`posts/${post.file}`);
          if (!response.ok) throw new Error(`failed to load ${post.file}`);

          const markdown = await response.text();
          const htmlContent = marked.parse(markdown);

          let preview = '';
          const contentWithoutTitle = markdown.replace(/^#.*\n+/, '').replace(/^Date:.*\n+/, '');
          const firstParagraphMatch = contentWithoutTitle.match(/^([^\n]+)/);

          if (firstParagraphMatch) {
            preview = firstParagraphMatch[0];
          }

          const postElement = document.createElement('div');
          postElement.className = 'blog-post';
          postElement.innerHTML = `
            <h3>${post.title}</h3>
            <div class="post-date">${post.date}</div>
            <div class="post-preview">${marked.parse(preview)}</div>
            <p><a href="#" onclick="showFullPost('${post.file}'); return false;">Read more</a></p>
          `;

          blogContainer.appendChild(postElement);
        } catch (postError) {
          console.error(`error loading post ${post.file}:`, postError);
        }
      }
    } catch (error) {
      console.error('error loading blog posts:', error);
    }
  };

  fetchBlogPosts();
});

async function showFullPost(postFile) {
  try {
    const response = await fetch(`posts/${postFile}`);
    if (!response.ok) throw new Error(`failed to load ${postFile}`);

    const markdown = await response.text();

    const titleMatch = markdown.match(/^# (.*?)$/m);
    const title = titleMatch ? titleMatch[1] : 'Untitled Post';

    const dateMatch = markdown.match(/Date: (.*?)$/m);
    const date = dateMatch ? dateMatch[1] : '';

    let contentWithoutTitleAndDate = markdown
      .replace(/^# .*?\n/m, '')
      .replace(/Date: .*\n/g, '');

    const htmlContent = marked.parse(contentWithoutTitleAndDate);

    const fullPostOverlay = document.createElement('div');
    fullPostOverlay.className = 'full-post-overlay';

    fullPostOverlay.innerHTML = `
      <div class="full-post-container">
        <div class="full-post-header">
          <h2>${title}</h2>
          <div class="post-date">${date}</div>
          <button onclick="closeFullPost()" class="close-button">×</button>
        </div>
        <div class="full-post-content">
          ${htmlContent}
        </div>
      </div>
    `;

    document.body.appendChild(fullPostOverlay);
    document.body.style.overflow = 'hidden';
  } catch (error) {
    console.error('error showing full post:', error);
  }
}

function closeFullPost() {
  const overlay = document.querySelector('.full-post-overlay');
  if (overlay) {
    overlay.remove();
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', function(e) {
  if (e.key === konamiCode[konamiPosition]) {
    konamiPosition++;

    if (konamiPosition === konamiCode.length) {
      konamiPosition = 0;

      document.body.innerHTML = '';
      document.body.style.backgroundColor = '#000';
      document.body.style.color = '#0f0';
      document.body.style.fontFamily = 'monospace';
      document.body.style.padding = '20px';

      let terminal = document.createElement('div');
      terminal.style.whiteSpace = 'pre-line';
      terminal.innerHTML = `
        <p>> whoami</p>
        <p>burdz</p>
        <p>> uptime</p>
        <p>uptime: 42 years, no sleep detected</p>
        <p>> kubectl get pods</p>
        <p>error: too many pods to display. you forgot to set a namespace again, didn't you?</p>
        <p>> kubectl delete deployment production</p>
        <p>deployment "production" deleted successfully. wait...</p>
        <p>> git blame</p>
        <p>all signs point to you</p>
        <p>> systemctl status life.service</p>
        <p>● life.service - Human Existence Manager
           Loaded: loaded (/etc/systemd/system/life.service; enabled; preset: enabled)
           Active: degraded (running) since Mon 1970-01-01 00:00:01 UTC; 42 years ago
         Main PID: 1 (burdz)
            Tasks: too many (coffee required)
           Memory: leaking
              CPU: overcommitted
           CGroup: /life.service
                   ├─1 /usr/bin/burdz --verbose --needs-coffee --stressed</p>
        <p>> curl -I http://prod.deez.nuts</p>
        <p>HTTP/1.1 500 Internal Server Error
           Date: ${new Date().toUTCString()}
           Server: nginx/1.14.0 (windows3.1)
           X-Error-Message: it worked in dev...</p>
        <p>> nslookup problem</p>
        <p>Name: problem
           Address: 127.0.0.1
           Comment: it's always DNS</p>
        <p>> ping happiness</p>
        <p>PING happiness: 56 data bytes
           Request timed out
           Request timed out
           Request timed out</p>
        <p>> ssh prod</p>
        <p>Access denied: production is sacred ground. did you file a ticket?</p>
        <p>> vim ~/.config/nixos/configuration.nix</p>
        <p>{
          programs.emacs.enable = false; # as it should be
          programs.vim.enable = true;

          nix.maxJobs = "all-cores-except-one-for-sanity";

          users.users.matt = {
            isOverworked = true;
            needsVacation = true;
            mechanicalKeyboards = "too-many";
          };

        }</p>
        <p>> exit</p>
        <p>there is no escape from being a cloud janitor.</p>
        <p>> sudo shutdown -h now</p>
        <p>system will restore in 15 seconds...</p>
        <p>>_</p>
      `;
      document.body.appendChild(terminal);

      setTimeout(function() {
        location.reload();
      }, 10000);
    }
  } else {
    konamiPosition = 0;
  }
});
