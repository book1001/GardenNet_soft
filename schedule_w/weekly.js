

let page = 1; // Initialize the page number

window.onload = function() {
  // Initial renering
  renderTitle(slug);
  renderChannel(slug, page);
}

function handleScroll() {
  let isScrollAtBottom = (window.pageYOffset + window.innerHeight + 10 > document.body.scrollHeight);

  if (isScrollAtBottom) {
    page++;
    renderChannel(slug, page);
  }
  console.log(page);
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('touchmove', handleScroll);



function renderTitle(slug) {
  // Fetch the channel title from the Are.na API
  let url = `https://api.are.na/v2/channels/${slug}/collaborators`;

  fetch(url)
    .then(response => response.json())
    .then(data => document.title = data.channel_title);
}

function renderChannel(slug, page) {
  // Add a loading message
  // let loading = `Loading...`;
  // document.body.innerHTML = loading;      

  // Fetch the channel data from the Are.na API
  let time = Date.now();
  let per = 30;
  let url = `https://api.are.na/v2/channels/${slug}/contents?t=${time}&direction=desc&sort=position&page=${page}&per=${per}`;


  fetch(url, {cache: 'no-cache'})
    .then(response => response.json())
    .then(channel => {

      // Channel Info
      // document.body.innerHTML = `
      let elements = `${channel.contents.map(block => {


            // We are going to return HTML, mixed in with the data from the block.
            return `
              <div class="Block ${block.class} ${block.title}">

                ${(() => {
                  if (block.title && block.class !== 'Link' && block.class !== 'Channel') {
                    return ``;
                  }

                  return ``;
                })()}


                ${(() => {
                  // Return a different bit of HTML, depending on what type of block it is
                  switch (block.class) {

                    case "Image":
                      return `
                      <a href="https://www.are.na/block/${block.id}" class="BlockInner__Link">
                        <img class="BlockInner__Image" src="${block.image.large.url}"/>
                      </a>
                      <a href="https://www.are.na/block/${block.id}">
                        <p style="text-align: center; text-transform: uppercase;">
                        ${block.title}
                      </p></a>
                      `;
                      
                    case "Text":
                      return `
                      <div class="cell1">
                        <p style="text-align: center; text-transform: uppercase;">
                          ${block.title}
                        </p>
                      </div>
                      <div class="cell2">
                        <p>
                          ${block.description}
                        </p>
                      </div>
                      <div class="cell3">
                        ${block.content}
                      </div>
                      `;
                      
                    case "Attachment":
                      return `
                      <a href="https://www.are.na/block/${block.id}" class="BlockInner__Channel">
                        – Open PDF
                      </a>
                      <a href="https://www.are.na/block/${block.id}">
                        <p style="max-height: 90px; overflow-y:auto; text-align: center; text-transform: uppercase;">
                          ${block.title}
                        </p>
                      </a>
                      `;
                
                    case "Link":
                      return `
                      <a href="${block.source && block.source.url}" class="BlockInner__Link">
                        <img class="BlockInner__Image" src="${block.image.large.url}"/>
                      </a>
                      <a href="https://www.are.na/block/${block.id}"><p style="text-align: center; text-transform: uppercase;">
                        ${block.title}
                      </p></a>
                      `;
                      
                    case "Media":
                      return `
                      <a href="${block.source && block.source.url}" class="BlockInner__Link">
                        <img class="BlockInner__Image" src="${block.image.large.url}"/>
                      </a>
                      <a href="https://www.are.na/block/${block.id}"><p style="text-align: center; text-transform: uppercase;">
                        ${block.title}
                      </p></a>
                      `;
                    
                    case "Channel":
                      return `
                      <a href="https://www.are.na/channel/${block.slug}" class="BlockInner__Link" style="color: #ffffff;">
                        <img class="BlockInner__Image" src="../img/arena.jpg">
                      </a>
                      <a href="https://www.are.na/channel/${block.slug}">
                        <p style="text-align: center; text-transform: uppercase;">
                        ${block.title}
                      </p></a>
                      `;
                  }
                })()}
              </div>
            `;
          }).join("")}`;
    
    let contents = document.getElementsByClassName("ChannelContents")[0];
    contents.insertAdjacentHTML("beforeend", elements);
  
  })
}