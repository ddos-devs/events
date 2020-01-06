function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
  });
  return vars;
}

function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}

function main() {
  const url = getUrlVars();
  if (url && url.n && events[url.n]) {
    updateTitle(url.n);
    updateSpeakers(events[url.n].speakers);
    updateFooter(events[url.n].footer);
  } else {
    console.error('invalid event')
  }
}

function updateTitle(number) {
  if (number) {
    document.title += number;
    document.getElementById('event-number').innerText += number;
  }
}

function updateSpeakers(speakers) {
  const speakerContainer = document.getElementById('speakers');

  speakers.forEach((speaker) => {
    const newSpeaker = createElementFromHTML(`<div>
      <img class="speaker-image" src="img/${speaker.img}">
      ${speaker.isGuest ? `<div class="speaker-guest">מרצה אורח</div>`: ""}
      <p class="speaker-author">${speaker.name}</p>
      <p class="speaker-title">${speaker.title}</p>
    </div>`);
    speakerContainer.append(newSpeaker);
  });
}

function updateFooter(footer) {
  const footerContainer = document.getElementById('footer');
  footer.forEach(element => {
    let newElement;
    if (element.sponsor) {
      newElement = createElementFromHTML(`<div class="container">
        <img src="img/${element.icon}">
       </div>`);
    } else {
      newElement = createElementFromHTML(`<div class="container">
        <img class="icon" src="img/${element.icon}">
        <address class="box">
          <p>${element.text[0]}</p>
          <p>${element.text[1]}</p>
        </address>
      </div>`);
    }

    footerContainer.append(newElement);
  });
}
