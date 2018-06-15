const html = require("html-template-tag");
const layout = require("./layout");

module.exports = () => layout(html`
  <h3>Add a Page</h3>
  <hr>
  <form method="POST" action="/wiki/">

    <div>
      <label for="name">Author </label>
      <input type="text" name="name" />
    </div>

    <div>
      <label for="email">Email </label>
      <input type="email" name="email"/>
    </div>

    <div class="form-group">
      <label for="title" class="col-sm-2 control-label">Page Title</label>
      <div class="col-sm-10">
        <input id="title" name="title" type="text" class="form-control"/>
      </div>
    </div>

    <div>
      <label for="content">Content</label>
      <textarea name="content"></textarea>
    </div>
    <div>
      <label for="status">Status</label>
      <input type="button" name="status"/>
    </div>

    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-primary">submit</button>
    </div>

  </form>
`);
