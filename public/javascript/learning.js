$(document).ready(function () {
  console.log('learning.js linked');

//post model constructor. each model instance will have these methods and data
//available to it

var Answer = Backbone.Model.extend({
  urlRoot: "/users/:id/learning",

  sayBye: function () {
    console.log('this is the model talking, say bye has been initiated');
    this.destroy();
  }
});

var AnswerCollection = Backbone.Collection.extend({

  model: Answer,

  url: "/users/:id/learning"
});


var AnswerCollectionView = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, "add", this.addPost);
  },

  addPost: function (answerFromCollection) {
    console.log('the collection i am observing added an aswer');
    new AnswerView({answer: answerFromCollection}).render();
  }
});




















});



