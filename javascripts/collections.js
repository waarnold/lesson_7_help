var usersData = [{
  id: 1,
  name: 'Leanne Graham',
}, {
  id: 2,
  name: 'Ervin Howell',
}, {
  id: 3,
  name: 'Clementine Bauch',
},
];

var Post  = Backbone.Model.extend({
  url: 'http://jsonplaceholder.typicode.com/posts',
  initialize: function () {
    if (!this.get('id')) this.set('id', this.collection.nextID());
  },
});

var User  = Backbone.Model.extend();

var Posts = Backbone.Collection.extend({
  model: Post,
  url: 'http://jsonplaceholder.typicode.com/posts',
  lastID: 0,
  setLastID: function () {
    if (this.isEmpty()) return;
    this.lastID = this.last().get('id');
  },

  nextID: function () {
    return this.lastID += 1;
  },

  initialize: function () {
    this.on('sync', this.setLastID);
  },
});

var Users = Backbone.Collection.extend({ model: User, });

var blogRoll = new Posts();
var blogAuthors = new Users();
blogAuthors.reset(usersData);

var newPost;

blogRoll.fetch({
  success: function (collection) {
    // newPost = collection.create({
    //   title: 'My New Blog Post',
    //   body: 'This is my latest blog post. I hope you like it!',
    //   userId: 1,
    // });

    console.log(collection);
    // console.log(newPost);
  },
});
